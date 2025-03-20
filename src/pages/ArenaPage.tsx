
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Search, Filter, Trophy, CheckCircle, Clock, Star, GraduationCap, Plus, Video, FileText, List, Send } from 'lucide-react';
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import QuoteDisplay from "@/components/QuoteDisplay";
import { useAuth } from '@/hooks/use-auth';
import { useNavigate } from 'react-router-dom';
import CourseForm from "@/components/CourseForm";
import { supabase } from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";
import { triggerCourseCompletionConfetti } from '@/utils/confetti';
import { sampleCourses } from "@/lib/supabase";

interface CourseModule {
  id: string;
  title: string;
  type: 'video' | 'text' | 'quiz';
  content: string;
  duration: string;
  isCompleted?: boolean;
}

interface CourseComment {
  id: string;
  author: string;
  authorId: string;
  content: string;
  timeAgo: string;
  likes: number;
}

interface CourseItem {
  id: string;
  title: string;
  description: string;
  instructor: {
    id: string;
    name: string;
  };
  coverImage: string;
  rating: number;
  studentsCount: number;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  category: string;
  tags: string[];
  isFeatured?: boolean;
  isNew?: boolean;
  modules?: CourseModule[];
  created_at?: string;
}

const ArenaPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCourse, setSelectedCourse] = useState<CourseItem | null>(null);
  const [isViewingCourse, setIsViewingCourse] = useState(false);
  const [isCreatingCourse, setIsCreatingCourse] = useState(false);
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [moduleComments, setModuleComments] = useState<Record<string, CourseComment[]>>({});
  const [commentText, setCommentText] = useState('');
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  
  useEffect(() => {
    fetchCourses();
  }, []);
  
  const fetchCourses = async () => {
    setLoading(true);
    try {
      // Start with sample courses
      let coursesData: CourseItem[] = [...sampleCourses];
      
      // Fetch courses from Supabase
      const { data, error } = await supabase
        .from('courses')
        .select(`
          id,
          title,
          description,
          tags,
          created_by,
          created_at
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // For each course, get the creator's username from profiles
      if (data && data.length > 0) {
        const processedCourses = await Promise.all(data.map(async (course) => {
          // Fetch user profile
          const { data: profileData } = await supabase
            .from('profiles')
            .select('username')
            .eq('id', course.created_by)
            .single();
          
          // Fetch modules for this course
          const { data: modulesData } = await supabase
            .from('course_modules')
            .select('*')
            .eq('course_id', course.id)
            .order('position', { ascending: true });
          
          // Count enrolled students
          const { count } = await supabase
            .from('user_course_progress')
            .select('user_id', { count: 'exact', head: true })
            .eq('module_id', modulesData && modulesData.length > 0 ? modulesData[0].id : '');
          
          // Process modules
          const modules = modulesData ? modulesData.map(module => {
            let moduleType: 'video' | 'text' | 'quiz' = 'text';
            
            if (module.youtube_url) {
              moduleType = 'video';
            }
            
            // Calculate duration
            const getDuration = () => {
              if (moduleType === 'video') return '15 min';
              if (moduleType === 'quiz') return '5 min';
              const words = module.content?.split(' ').length || 0;
              const minutes = Math.max(1, Math.ceil(words / 200));
              return `${minutes} min`;
            };
            
            return {
              id: module.id,
              title: module.title,
              type: moduleType,
              content: moduleType === 'video' ? module.youtube_url : module.content,
              duration: getDuration(),
              isCompleted: false
            };
          }) : [];
          
          // Calculate course duration
          const totalMinutes = modules.reduce((total, module) => {
            const minutes = parseInt(module.duration.split(' ')[0]) || 0;
            return total + minutes;
          }, 0);
          
          // Format duration
          const formatDuration = (totalMinutes: number) => {
            if (totalMinutes < 60) return `${totalMinutes} minutes`;
            const hours = Math.floor(totalMinutes / 60);
            const minutes = totalMinutes % 60;
            if (minutes === 0) return `${hours} hour${hours > 1 ? 's' : ''}`;
            return `${hours} hour${hours > 1 ? 's' : ''} ${minutes} min`;
          };
          
          // Return formatted course
          return {
            id: course.id,
            title: course.title,
            description: course.description,
            instructor: {
              id: course.created_by,
              name: profileData?.username || 'Anonymous'
            },
            coverImage: '/placeholder.svg',
            rating: 4.5,
            studentsCount: count || 0,
            duration: formatDuration(totalMinutes),
            level: 'All Levels',
            category: course.tags?.[0] || 'General',
            tags: course.tags || [],
            isFeatured: false,
            isNew: new Date(course.created_at).getTime() > Date.now() - (7 * 24 * 60 * 60 * 1000),
            modules: modules,
            created_at: course.created_at
          };
        }));
        
        // Add the processed courses to our array
        coursesData = [...coursesData, ...processedCourses];
      }
      
      setCourses(coursesData);
    } catch (error) {
      console.error('Error fetching courses:', error);
      // Even if there's an error, still set the sample courses
      setCourses(sampleCourses);
      toast({
        title: "Notice",
        description: "Using sample courses due to database connection issue",
        variant: "default",
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Filter courses based on search query and category
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || course.category.toLowerCase() === selectedCategory.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });
  
  // Get unique categories for the filter
  const categories = ['all', ...Array.from(new Set(courses.map(course => course.category)))];
  
  // Featured courses
  const featuredCourses = courses.filter(course => course.isFeatured);
  
  // New courses
  const newCourses = courses.filter(course => course.isNew);
  
  const handleViewCourse = async (course: CourseItem) => {
    try {
      // If the user is logged in, fetch their progress for this course
      if (user) {
        // Fetch user progress for all modules of this course
        const moduleIds = course.modules?.map(m => m.id) || [];
        if (moduleIds.length > 0) {
          const { data: progressData, error: progressError } = await supabase
            .from('user_course_progress')
            .select('*')
            .eq('user_id', user.id)
            .in('module_id', moduleIds);
          
          if (progressError) throw progressError;
          
          // Update the completed status of each module
          if (progressData && course.modules) {
            const updatedModules = course.modules.map(module => {
              const progress = progressData.find(p => p.module_id === module.id);
              return {
                ...module,
                isCompleted: progress ? progress.completed : false
              };
            });
            
            course = {
              ...course,
              modules: updatedModules
            };
          }
        }
      }
      
      setSelectedCourse(course);
      setIsViewingCourse(true);
      
      // If there are modules, set the first one as active
      if (course.modules && course.modules.length > 0) {
        setActiveModuleId(course.modules[0].id);
        // Fetch comments for the first module
        fetchModuleComments(course.modules[0].id);
      }
    } catch (error) {
      console.error('Error preparing course for viewing:', error);
      toast({
        title: "Error",
        description: "Failed to load course details",
        variant: "destructive",
      });
    }
  };
  
  const fetchModuleComments = async (moduleId: string) => {
    try {
      // For sample courses, use mock comments
      if (moduleId.startsWith('module-')) {
        const mockComments = [
          {
            id: `comment-${Math.random().toString(36).substr(2, 9)}`,
            author: 'Alex Johnson',
            authorId: 'instructor-1',
            content: 'Great module! Let me know if you have any questions.',
            timeAgo: '2 days ago',
            likes: 5
          },
          {
            id: `comment-${Math.random().toString(36).substr(2, 9)}`,
            author: 'Maria Garcia',
            authorId: 'user-2',
            content: 'This was very helpful, thanks!',
            timeAgo: '1 day ago',
            likes: 2
          }
        ];
        
        setModuleComments(prev => ({
          ...prev,
          [moduleId]: mockComments
        }));
        return;
      }
      
      // For real courses, fetch from database
      const { data, error } = await supabase
        .from('course_comments')
        .select(`
          id,
          content,
          created_at,
          user_id
        `)
        .eq('module_id', moduleId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // For each comment, get the user profile
      const formattedComments = await Promise.all(data.map(async (comment) => {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('username')
          .eq('id', comment.user_id)
          .single();
        
        return {
          id: comment.id,
          author: profileData?.username || 'Anonymous',
          authorId: comment.user_id,
          content: comment.content,
          timeAgo: formatTimeAgo(new Date(comment.created_at)),
          likes: 0
        };
      }));
      
      // Update the comments state
      setModuleComments(prev => ({
        ...prev,
        [moduleId]: formattedComments
      }));
      
    } catch (error) {
      console.error('Error fetching module comments:', error);
      // Provide fallback comments if needed
      setModuleComments(prev => ({
        ...prev,
        [moduleId]: []
      }));
    }
  };
  
  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + ' years ago';
    
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + ' months ago';
    
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + ' days ago';
    
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + ' hours ago';
    
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + ' minutes ago';
    
    return Math.floor(seconds) + ' seconds ago';
  };
  
  const handleModuleCompletion = async (moduleId: string) => {
    if (!selectedCourse || !user) return;
    
    try {
      // Skip for sample courses
      if (moduleId.startsWith('module-')) {
        // Just update local state for sample courses
        const updatedCourse = {
          ...selectedCourse,
          modules: selectedCourse.modules?.map(module => 
            module.id === moduleId ? { ...module, isCompleted: true } : module
          )
        };
        
        setSelectedCourse(updatedCourse);
        
        // Check if all modules are completed
        const allCompleted = updatedCourse.modules?.every(module => module.isCompleted);
        if (allCompleted) {
          triggerCourseCompletionConfetti();
          toast({
            title: "🎉 Course Completed!",
            description: `Congratulations! You've completed "${selectedCourse.title}"`,
          });
        }
        return;
      }
      
      // For real courses, update the database
      // First check if there's an existing progress record
      const { data: existingProgress, error: checkError } = await supabase
        .from('user_course_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('module_id', moduleId)
        .maybeSingle();
      
      if (checkError) throw checkError;
      
      if (existingProgress) {
        // Update existing progress
        const { error: updateError } = await supabase
          .from('user_course_progress')
          .update({
            completed: true,
            completed_at: new Date().toISOString()
          })
          .eq('id', existingProgress.id);
        
        if (updateError) throw updateError;
      } else {
        // Create new progress record
        const { error: insertError } = await supabase
          .from('user_course_progress')
          .insert({
            user_id: user.id,
            module_id: moduleId,
            completed: true,
            completed_at: new Date().toISOString()
          });
        
        if (insertError) throw insertError;
      }
      
      // Update the local state
      const updatedCourse = {
        ...selectedCourse,
        modules: selectedCourse.modules?.map(module => 
          module.id === moduleId ? { ...module, isCompleted: true } : module
        )
      };
      
      setSelectedCourse(updatedCourse);
      
      // Check if all modules are completed
      const allCompleted = updatedCourse.modules?.every(module => module.isCompleted);
      if (allCompleted) {
        // Trigger confetti for course completion
        triggerCourseCompletionConfetti();
        
        // Update user profile stats
        const { error: profileError } = await supabase.rpc('increment_completed_courses', {
          user_id: user.id
        });
        
        if (profileError) {
          console.error('Error updating profile stats:', profileError);
        }
        
        toast({
          title: "🎉 Course Completed!",
          description: `Congratulations! You've completed "${selectedCourse.title}"`,
        });
      }
    } catch (error) {
      console.error('Error marking module as completed:', error);
      toast({
        title: "Error",
        description: "Failed to update progress",
        variant: "destructive",
      });
    }
  };
  
  const handleAddComment = async () => {
    if (!commentText.trim() || !user || !activeModuleId) return;
    
    try {
      // Handle sample courses
      if (activeModuleId.startsWith('module-')) {
        const newComment: CourseComment = {
          id: `comment-${Math.random().toString(36).substr(2, 9)}`,
          author: user.email?.split('@')[0] || 'You',
          authorId: user.id,
          content: commentText.trim(),
          timeAgo: 'Just now',
          likes: 0
        };
        
        setModuleComments(prev => ({
          ...prev,
          [activeModuleId]: [newComment, ...(prev[activeModuleId] || [])]
        }));
        
        setCommentText('');
        return;
      }
      
      // Add comment to database for real courses
      const { data, error } = await supabase
        .from('course_comments')
        .insert({
          module_id: activeModuleId,
          user_id: user.id,
          content: commentText.trim()
        })
        .select();
      
      if (error) throw error;
      
      // Get user profile for the comment
      const { data: profileData } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', user.id)
        .single();
      
      // Format the new comment
      const newComment: CourseComment = {
        id: data[0].id,
        author: profileData?.username || 'You',
        authorId: user.id,
        content: commentText.trim(),
        timeAgo: 'Just now',
        likes: 0
      };
      
      // Add the new comment to the comments list
      setModuleComments(prev => ({
        ...prev,
        [activeModuleId]: [newComment, ...(prev[activeModuleId] || [])]
      }));
      
      // Clear the comment input
      setCommentText('');
      
    } catch (error) {
      console.error('Error adding comment:', error);
      toast({
        title: "Error",
        description: "Failed to add comment",
        variant: "destructive",
      });
    }
  };
  
  const CourseCard: React.FC<{ course: CourseItem }> = ({ course }) => (
    <Card className="h-full overflow-hidden transition-shadow hover:shadow-md">
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img 
          src={course.coverImage} 
          alt={course.title} 
          className="h-full w-full object-cover"
        />
        {course.isFeatured && (
          <Badge className="absolute top-2 left-2 bg-yellow-500">Featured</Badge>
        )}
        {course.isNew && (
          <Badge className="absolute top-2 left-2 bg-green-500">New</Badge>
        )}
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <CardTitle className="text-lg line-clamp-1">{course.title}</CardTitle>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <span className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 mr-1" fill="currentColor" />
            {course.rating}
          </span>
          <span>|</span>
          <span>{course.studentsCount.toLocaleString()} students</span>
        </div>
        <CardDescription className="line-clamp-2">{course.description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex flex-wrap gap-1 mb-3">
          {course.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="outline">{tag}</Badge>
          ))}
        </div>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center">
            <GraduationCap className="h-4 w-4 mr-1" />
            <span>{course.level}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={() => handleViewCourse(course)}>View Course</Button>
      </CardFooter>
    </Card>
  );

  // Course Viewer Component
  const CourseViewer = () => {
    if (!selectedCourse) return null;
    
    const completedModulesCount = selectedCourse.modules?.filter(m => m.isCompleted).length || 0;
    const totalModules = selectedCourse.modules?.length || 0;
    const progressPercentage = totalModules > 0 ? (completedModulesCount / totalModules) * 100 : 0;
    
    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-2/3">
            <h1 className="text-2xl font-bold mb-2">{selectedCourse.title}</h1>
            <p className="text-gray-600 mb-4">{selectedCourse.description}</p>
            <div className="flex items-center mb-4">
              <div className="mr-4">
                <p className="text-sm text-gray-500">Instructor</p>
                <p className="font-medium">{selectedCourse.instructor.name}</p>
              </div>
              <div className="mr-4">
                <p className="text-sm text-gray-500">Level</p>
                <p className="font-medium">{selectedCourse.level}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Duration</p>
                <p className="font-medium">{selectedCourse.duration}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedCourse.tags.map((tag, index) => (
                <Badge key={index} variant="outline">{tag}</Badge>
              ))}
            </div>
          </div>
          
          <div className="md:w-1/3 bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Your Progress</h3>
            <Progress value={progressPercentage} className="h-2 mb-2" />
            <p className="text-sm text-gray-600">
              {completedModulesCount} of {totalModules} modules completed
            </p>
          </div>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Course Content</h2>
          {selectedCourse.modules?.map((module, index) => (
            <Card key={module.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    {module.type === 'video' && <Video className="h-5 w-5 mr-2 text-brand-600" />}
                    {module.type === 'text' && <FileText className="h-5 w-5 mr-2 text-brand-600" />}
                    {module.type === 'quiz' && <List className="h-5 w-5 mr-2 text-brand-600" />}
                    <CardTitle className="text-lg">
                      {index + 1}. {module.title}
                    </CardTitle>
                  </div>
                  {module.isCompleted && (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                </div>
                <CardDescription>{module.duration}</CardDescription>
              </CardHeader>
              <CardContent>
                {module.type === 'video' && (
                  <div className="aspect-video">
                    <iframe
                      src={module.content}
                      title={module.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                    {!module.isCompleted && (
                      <Button 
                        className="mt-4" 
                        onClick={() => handleModuleCompletion(module.id)}
                      >
                        Mark as Completed
                      </Button>
                    )}
                  </div>
                )}
                
                {module.type === 'text' && (
                  <div className="prose max-w-none">
                    <p>{module.content}</p>
                    {!module.isCompleted && (
                      <Button 
                        className="mt-4" 
                        onClick={() => handleModuleCompletion(module.id)}
                      >
                        Mark as Completed
                      </Button>
                    )}
                  </div>
                )}
                
                {module.type === 'quiz' && (
                  <div className="space-y-4">
                    {(() => {
                      try {
                        const quizData = JSON.parse(module.content);
                        return (
                          <>
                            <h3 className="font-medium">Quiz: {module.title}</h3>
                            <div className="space-y-6">
                              {quizData.questions.map((q: any, qIndex: number) => (
                                <div key={qIndex} className="space-y-2">
                                  <p className="font-medium">{qIndex + 1}. {q.question}</p>
                                  <div className="space-y-2">
                                    {q.options.map((option: string, oIndex: number) => (
                                      <div key={oIndex} className="flex items-center space-x-2">
                                        <input 
                                          type="radio" 
                                          id={`q${qIndex}-o${oIndex}`} 
                                          name={`question-${qIndex}`} 
                                          className="h-4 w-4"
                                        />
                                        <label htmlFor={`q${qIndex}-o${oIndex}`}>{option}</label>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                            {!module.isCompleted && (
                              <Button 
                                className="mt-4" 
                                onClick={() => handleModuleCompletion(module.id)}
                              >
                                Submit Quiz
                              </Button>
                            )}
                          </>
                        );
                      } catch (e) {
                        return <p>Error loading quiz content</p>;
                      }
                    })()}
                  </div>
                )}
                
                {/* Module comments section */}
                <div className="mt-6 pt-4 border-t">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-medium">Discussion</h4>
                  </div>
                  
                  <div className="flex space-x-2 mb-4">
                    <Textarea 
                      placeholder={user ? "Add a comment..." : "Please log in to comment"}
                      className="min-h-[80px]"
                      value={activeModuleId === module.id ? commentText : ''}
                      onChange={(e) => {
                        setActiveModuleId(module.id);
                        setCommentText(e.target.value);
                      }}
                      disabled={!user}
                    />
                    <Button 
                      size="icon" 
                      className="shrink-0 h-10 w-10 self-end"
                      disabled={!user || !commentText.trim() || activeModuleId !== module.id}
                      onClick={handleAddComment}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {!user && (
                    <p className="text-xs text-gray-500 mb-4 text-center">
                      <a href="#" onClick={(e) => {
                        e.preventDefault();
                        document.dispatchEvent(new CustomEvent('open-auth-dialog'));
                      }} className="text-brand-600 hover:underline">
                        Log in
                      </a> to join the discussion
                    </p>
                  )}
                  
                  <div className="space-y-4">
                    {moduleComments[module.id]?.length > 0 ? (
                      moduleComments[module.id].map(comment => (
                        <div key={comment.id} className="flex space-x-3 text-sm">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{comment.author[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <div className="flex justify-between">
                                <span className="font-semibold">{comment.author}</span>
                                <span className="text-xs text-gray-500">{comment.timeAgo}</span>
                              </div>
                              <p className="mt-1">{comment.content}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center py-2 text-sm text-gray-500">No comments yet</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          The Arena: Master Your Skills
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-4">
          Discover courses taught by industry experts and level up your skills
        </p>
        <QuoteDisplay />
      </div>

      {/* Search and Filter Section */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search for courses..." 
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex-shrink-0">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <select 
              className="rounded-md border border-gray-300 bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
        </div>
        <Button onClick={() => setIsCreatingCourse(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Course
        </Button>
      </div>

      {/* Course sections */}
      <Tabs defaultValue="all" className="space-y-8">
        <TabsList>
          <TabsTrigger value="all">All Courses</TabsTrigger>
          <TabsTrigger value="featured">Featured</TabsTrigger>
          <TabsTrigger value="new">New Releases</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          {loading ? (
            <div className="text-center py-10">
              <p className="text-gray-500 mb-4">Loading courses...</p>
            </div>
          ) : filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500 mb-4">No courses found matching your criteria</p>
              <Button onClick={() => {setSearchQuery(''); setSelectedCategory('all');}}>
                Clear Filters
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="featured" className="mt-6">
          {featuredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCourses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500 mb-4">No featured courses yet</p>
              <Button onClick={() => setIsCreatingCourse(true)}>
                Create Your First Course
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="new" className="mt-6">
          {newCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {newCourses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500 mb-4">No new courses available</p>
              <Button onClick={() => setIsCreatingCourse(true)}>
                Create a New Course
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Course Viewing Dialog */}
      <Dialog open={isViewingCourse} onOpenChange={setIsViewingCourse}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Course</DialogTitle>
            <DialogDescription>
              Learn at your own pace
            </DialogDescription>
          </DialogHeader>
          <CourseViewer />
        </DialogContent>
      </Dialog>

      {/* Course Creation Dialog */}
      <Dialog open={isCreatingCourse} onOpenChange={setIsCreatingCourse}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Course</DialogTitle>
            <DialogDescription>
              Create and share your knowledge with the community
            </DialogDescription>
          </DialogHeader>
          <CourseForm 
            onSuccess={() => {
              setIsCreatingCourse(false);
              fetchCourses(); // Refresh courses after creating one
            }} 
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ArenaPage;
