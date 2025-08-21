import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/supabase'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Auth helpers (same as before)
export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })
  return { data, error }
}

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// Development Mode Bypass (as discussed)
export const DEV_MODE = process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_BYPASS_AUTH === 'true'

export const createMockUser = () => ({
  id: 'dev-user-123',
  email: 'dev@test.com',
  created_at: new Date().toISOString(),
  // Add other user properties you might expect, e.g.,
  user_metadata: {},
  app_metadata: {}
})

export const getCurrentUserDev = async () => {
  if (DEV_MODE) {
    return createMockUser()
  }
  return getCurrentUser()
}