import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with the service role key for admin privileges
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

export async function POST(req: Request) {
  // For now, we'll skip proper webhook verification
  // In a production environment, you would use svix to verify the webhook signature
  
  // Get the body
  const payload = await req.json();
  const evt = payload as WebhookEvent;

  // Handle the webhook
  const eventType = evt.type;

  if (eventType === 'user.created') {
    // When a user is created in Clerk, create a profile in Supabase
    const { id, email_addresses } = evt.data;
    const primaryEmail = email_addresses[0]?.email_address;

    if (id && primaryEmail) {
      try {
        // Check if user already exists in Supabase
        const { data: existingUser } = await supabaseAdmin
          .from('profiles')
          .select('id')
          .eq('id', id)
          .single();

        if (!existingUser) {
          // Insert new user
          const { error } = await supabaseAdmin
            .from('profiles')
            .insert({
              id: id,
              email: primaryEmail,
              created_at: new Date().toISOString(),
              subscription_tier: 'free',
              projects_this_month: 0,
              last_project_reset: new Date().toISOString(),
            });

          if (error) {
            console.error('Error creating user in Supabase:', error);
            return new Response('Error creating user', { status: 500 });
          }
        }
      } catch (error) {
        console.error('Error handling user.created webhook:', error);
        return new Response('Error processing webhook', { status: 500 });
      }
    }
  } else if (eventType === 'user.updated') {
    // When a user is updated in Clerk, update their profile in Supabase
    const { id, email_addresses } = evt.data;
    const primaryEmail = email_addresses[0]?.email_address;

    if (id && primaryEmail) {
      try {
        const { error } = await supabaseAdmin
          .from('profiles')
          .update({
            email: primaryEmail,
          })
          .eq('id', id);

        if (error) {
          console.error('Error updating user in Supabase:', error);
          return new Response('Error updating user', { status: 500 });
        }
      } catch (error) {
        console.error('Error handling user.updated webhook:', error);
        return new Response('Error processing webhook', { status: 500 });
      }
    }
  } else if (eventType === 'user.deleted') {
    // When a user is deleted in Clerk, handle it in Supabase
    // For now, we'll keep the data for reference but you could delete it
    const { id } = evt.data;

    if (id) {
      try {
        // Option 1: Delete the user data from Supabase
        // const { error } = await supabaseAdmin
        //   .from('profiles')
        //   .delete()
        //   .eq('id', id);

        // Option 2: Mark the user as deleted but keep their data
        const { error } = await supabaseAdmin
          .from('profiles')
          .update({
            deleted: true,
            deleted_at: new Date().toISOString(),
          })
          .eq('id', id);

        if (error) {
          console.error('Error handling deleted user in Supabase:', error);
          return new Response('Error handling deleted user', { status: 500 });
        }
      } catch (error) {
        console.error('Error handling user.deleted webhook:', error);
        return new Response('Error processing webhook', { status: 500 });
      }
    }
  }

  return new Response('Webhook received', { status: 200 });
}
