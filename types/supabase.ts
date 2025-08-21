export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          created_at: string
          subscription_tier: 'free' | 'pro'
          projects_this_month: number
          last_project_reset: string
        }
        Insert: {
          id: string
          email: string
          subscription_tier?: 'free' | 'pro'
          projects_this_month?: number
          last_project_reset?: string
        }
        Update: {
          email?: string
          subscription_tier?: 'free' | 'pro'
          projects_this_month?: number
          last_project_reset?: string
        }
      }
      projects: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string
          scenario: string
          skills: string[]
          tasks: any[] // JSONB column in Supabase, flexible type here
          progress: number
          difficulty: string
          created_at: string
          completed_at: string | null
          updated_at: string
        }
        Insert: {
          user_id: string
          title: string
          description: string
          scenario?: string
          skills?: string[]
          tasks?: any[]
          progress?: number
          difficulty?: string
        }
        Update: {
          title?: string
          description?: string
          scenario?: string
          tasks?: any[]
          progress?: number
          completed_at?: string | null
        }
      }
      task_progress: {
        Row: {
          id: string
          project_id: string
          task_id: number
          completed: boolean
          notes: string | null
          completed_at: string | null
          created_at: string
        }
        Insert: {
          project_id: string
          task_id: number
          completed?: boolean
          notes?: string | null
          completed_at?: string | null
        }
        Update: {
          completed?: boolean
          notes?: string | null
          completed_at?: string | null
        }
      }
    }
  }
}