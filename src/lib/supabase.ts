
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://fsiipvxohbnxetnwesrh.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzaWlwdnhvaGJueGV0bndlc3JoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIzNjE0NzAsImV4cCI6MjA1NzkzNzQ3MH0.1l9P5826ope18LKzzCv-9YM1wxT1ic1Lz2c3xH7GAB4';

// Flag to check if Supabase is properly configured
export const isSupabaseConfigured = true; // We now have configured Supabase

// Create client using our project values
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
