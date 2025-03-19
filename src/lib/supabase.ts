
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Flag to check if Supabase is properly configured
export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured) {
  console.warn('Supabase environment variables are missing. Some features will be disabled. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment.');
}

// Create a mock client if configuration is missing
export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createClient('https://placeholder-url.supabase.co', 'placeholder-key', {
      auth: {
        persistSession: false,
      },
    });

// User types
export type UserProfile = {
  id: string;
  username: string;
  email: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
  last_active: string;
  streak_days: number;
  coins: number;
  rank: string;
  completed_courses: number;
  created_blogs: number;
  is_clan_admin: boolean;
};

// Activity type
export type UserActivity = {
  id: string;
  user_id: string;
  activity_type: 'login' | 'course_completion' | 'blog_creation' | 'clan_creation' | 'post_creation';
  activity_date: string;
  activity_data?: Record<string, any>;
};
