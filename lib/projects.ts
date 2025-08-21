'use client';

import { supabase } from '@/lib/supabase';
import { useUser } from '@clerk/nextjs';

// Project Types
export type ProjectDifficulty = 'beginner' | 'intermediate' | 'advanced';

export interface ProjectInput {
  title: string;
  description: string;
  scenario: string;
  skills: string[];
  difficulty: ProjectDifficulty;
  userId: string;
}

export interface TaskInput {
  title: string;
  description: string;
  hints?: string[];
  resources?: { title: string, url: string }[];
}

// Create a new project
export async function createProject(projectData: ProjectInput, tasks: TaskInput[]) {
  try {
    // First create the project
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .insert({
        user_id: projectData.userId,
        title: projectData.title,
        description: projectData.description,
        scenario: projectData.scenario,
        skills: projectData.skills,
        difficulty: projectData.difficulty,
        tasks: tasks,
        progress: 0,
      })
      .select()
      .single();

    if (projectError) throw projectError;

    return { success: true, project };
  } catch (error) {
    console.error('Error creating project:', error);
    return { success: false, error };
  }
}

// Get all projects for a user
export async function getUserProjects(userId: string) {
  try {
    const { data: projects, error } = await supabase
      .from('projects')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return { success: true, projects };
  } catch (error) {
    console.error('Error fetching projects:', error);
    return { success: false, error };
  }
}

// Get a single project by ID
export async function getProject(projectId: string) {
  try {
    const { data: project, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', projectId)
      .single();

    if (error) throw error;

    return { success: true, project };
  } catch (error) {
    console.error('Error fetching project:', error);
    return { success: false, error };
  }
}

// Update project progress
export async function updateProjectProgress(projectId: string, progress: number) {
  try {
    const { data, error } = await supabase
      .from('projects')
      .update({ progress })
      .eq('id', projectId)
      .select()
      .single();

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error('Error updating project progress:', error);
    return { success: false, error };
  }
}

// Mark a task as completed
export async function completeTask(projectId: string, taskId: number, notes?: string) {
  try {
    const { data, error } = await supabase
      .from('task_progress')
      .insert({
        project_id: projectId,
        task_id: taskId,
        completed: true,
        notes,
        completed_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error('Error completing task:', error);
    return { success: false, error };
  }
}

// Check if a user can create a new project based on their subscription
export async function canCreateProject(userId: string) {
  try {
    // Get the user profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (profileError) throw profileError;

    // If they are on the pro plan, they can always create a project
    if (profile.subscription_tier === 'pro') {
      return { success: true, canCreate: true };
    }

    // For free tier, check if they've used their quota for the month
    const currentDate = new Date();
    const lastReset = new Date(profile.last_project_reset);
    
    // If it's been a month since the last reset
    if (currentDate.getMonth() !== lastReset.getMonth() || currentDate.getFullYear() !== lastReset.getFullYear()) {
      // Reset the counter
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          projects_this_month: 0,
          last_project_reset: currentDate.toISOString(),
        })
        .eq('id', userId);
        
      if (updateError) throw updateError;
      
      return { success: true, canCreate: true };
    }
    
    // Check if they've reached the limit (1 project per month on free plan)
    return { 
      success: true, 
      canCreate: profile.projects_this_month < 1,
      projectsThisMonth: profile.projects_this_month,
    };
    
  } catch (error) {
    console.error('Error checking project creation eligibility:', error);
    return { success: false, error };
  }
}

// Hook to get the current user's projects
export function useProjects() {
  const { user } = useUser();
  
  const fetchProjects = async () => {
    if (!user) {
      return { success: false, error: 'No user authenticated' };
    }
    
    return await getUserProjects(user.id);
  };
  
  return { fetchProjects };
}
