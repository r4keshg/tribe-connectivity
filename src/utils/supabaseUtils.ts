
import { supabase } from "@/lib/supabase";

/**
 * Increments a user's completed courses count
 * 
 * @param userId The user's ID
 * @returns A promise that resolves when the operation is complete
 */
export const incrementCompletedCourses = async (userId: string): Promise<void> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update({ 
        completed_courses: supabase.rpc('increment_completed_courses_count', { user_id: userId })
      })
      .eq('id', userId);
    
    if (error) {
      console.error('Error incrementing completed courses:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error in incrementCompletedCourses function:', error);
    // Fall back to direct increment if RPC fails
    try {
      // Get current count
      const { data: profile, error: fetchError } = await supabase
        .from('profiles')
        .select('completed_courses')
        .eq('id', userId)
        .single();
      
      if (fetchError) throw fetchError;
      
      // Increment count
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ 
          completed_courses: (profile?.completed_courses || 0) + 1 
        })
        .eq('id', userId);
      
      if (updateError) throw updateError;
    } catch (fallbackError) {
      console.error('Error in fallback increment:', fallbackError);
    }
  }
};
