import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Search, Filter, Trophy, CheckCircle, Clock, Star, GraduationCap, Plus, Video, FileText, List } from 'lucide-react';
import QuoteDisplay from "@/components/QuoteDisplay";
import { useAuth } from '@/hooks/use-auth';
import { useNavigate } from 'react-router-dom';
import CourseForm from "@/components/CourseForm";

interface CourseItem {
  id: string;
  title: string;
  description: string;
  instructor: string;
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
}

interface CourseModule {
  id: string;
  title: string;
  type: 'video' | 'text' | 'quiz';
  content: string;
  duration: string;
  isCompleted?: boolean;
}

const ArenaPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCourse, setSelectedCourse] = useState<CourseItem | null>(null);
  const [isViewingCourse, setIsViewingCourse] = useState(false);
  const [isCreatingCourse, setIsCreatingCourse] = useState(false);
  
  // Sample courses data - in a real app, you would fetch this from your database
  const sampleCourses: CourseItem[] = [
    {
      id: '1',
      title: 'Introduction to Web Development',
      description: 'Learn the basics of HTML, CSS, and JavaScript to create your first website',
      instructor: 'Sarah Johnson',
      coverImage: '/placeholder.svg',
      rating: 4.8,
      studentsCount: 3420,
      duration: '12 hours',
      level: 'Beginner',
      category: 'Web Development',
      tags: ['HTML', 'CSS', 'JavaScript'],
      isFeatured: true,
      modules: [
        {
          id: 'm1',
          title: 'Getting Started with HTML',
          type: 'video',
          content: 'https://www.youtube.com/embed/qz0aGYrrlhU',
          duration: '15 min',
          isCompleted: false
        },
        {
          id: 'm2',
          title: 'CSS Fundamentals',
          type: 'text',
          content: 'CSS (Cascading Style Sheets) is used to style HTML elements. Learn about selectors, properties, and values.',
          duration: '10 min',
          isCompleted: false
        },
        {
          id: 'm3',
          title: 'JavaScript Basics',
          type: 'video',
          content: 'https://www.youtube.com/embed/W6NZfCO5SIk',
          duration: '20 min',
          isCompleted: false
        },
        {
          id: 'm4',
          title: 'Module 1 Quiz',
          type: 'quiz',
          content: JSON.stringify({
            questions: [
              {
                question: 'What does HTML stand for?',
                options: ['Hyper Text Markup Language', 'High Tech Multi Language', 'Hyper Transfer Markup Language', 'Home Tool Markup Language'],
                answer: 0
              },
              {
                question: 'Which tag is used to create a hyperlink in HTML?',
                options: ['<link>', '<a>', '<href>', '<url>'],
                answer: 1
              }
            ]
          }),
          duration: '5 min',
          isCompleted: false
        }
      ]
    },
    {
      id: '2',
      title: 'React for Beginners',
      description: 'Master modern React development with hooks and functional components',
      instructor: 'Michael Chen',
      coverImage: '/placeholder.svg',
      rating: 4.9,
      studentsCount: 2845,
      duration: '15 hours',
      level: 'Intermediate',
      category: 'Frontend',
      tags: ['React', 'JavaScript', 'Frontend'],
      isNew: true,
      modules: [
        {
          id: 'm1',
          title: 'Introduction to React',
          type: 'video',
          content: 'https://www.youtube.com/embed/SqcY0GlETPk',
          duration: '15 min',
          isCompleted: false
        },
        {
          id: 'm2',
          title: 'React Hooks',
          type: 'text',
          content: 'Hooks are functions that let you "hook into" React state and lifecycle features from function components.',
          duration: '10 min',
          isCompleted: false
        }
      ]
    },
    {
      id: '3',
      title: 'Advanced Data Structures & Algorithms',
      description: 'Ace technical interviews with advanced DSA techniques',
      instructor: 'Dr. Alan Turing',
      coverImage: '/placeholder.svg',
      rating: 4.7,
      studentsCount: 1945,
      duration: '20 hours',
      level: 'Advanced',
      category: 'Computer Science',
      tags: ['DSA', 'Interviews', 'Problem Solving']
    },
    {
      id: '4',
      title: 'UI/UX Design Fundamentals',
      description: 'Create beautiful and user-friendly interfaces that people love',
      instructor: 'Emily Roberts',
      coverImage: '/placeholder.svg',
      rating: 4.6,
      studentsCount: 3120,
      duration: '18 hours',
      level: 'All Levels',
      category: 'Design',
      tags: ['UI', 'UX', 'Design Thinking']
    },
    {
      id: '5',
      title: 'Python for Data Science',
      description: 'Learn to analyze data and build visualizations with Python',
      instructor: 'David Kim',
      coverImage: '/placeholder.svg',
      rating: 4.9,
      studentsCount: 4250,
      duration: '22 hours',
      level: 'Intermediate',
      category: 'Data Science',
      tags: ['Python', 'Data Analysis', 'Visualization'],
      isFeatured: true
    },
    {
      id: '6',
      title: 'Mobile App Development with Flutter',
      description: 'Build beautiful cross-platform apps for iOS and Android',
      instructor: 'Jessica Wong',
      coverImage: '/placeholder.svg',
      rating: 4.5,
      studentsCount: 2100,
      duration: '25 hours',
      level: 'Intermediate',
      category: 'Mobile',
      tags: ['Flutter', 'Dart', 'Mobile Development'],
      isNew: true
    }
  ];
  
  // Filter courses based on search query and category
  const filteredCourses = sampleCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || course.category.toLowerCase() === selectedCategory.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });
  
  // Get unique categories for the filter
  const categories = ['all', ...Array.from(new Set(sampleCourses.map(course => course.category)))];
  
  // Featured courses
  const featuredCourses = sampleCourses.filter(course => course.isFeatured);
  
  // New courses
  const newCourses = sampleCourses.filter(course => course.isNew);
  
  const handleViewCourse = (course: CourseItem) => {
    setSelectedCourse(course);
    setIsViewingCourse(true);
  };
  
  const handleModuleCompletion = (moduleId: string) => {
    if (!selectedCourse) return;
    
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
      import('@/utils/confetti').then(({ triggerCourseCompletionConfetti }) => {
        triggerCourseCompletionConfetti();
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
                <p className="font-medium">{selectedCourse.instructor}</p>
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
                      onEnded={() => handleModuleCompletion(module.id)}
                    ></iframe>
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
          {filteredCourses.length > 0 ? (
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="new" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
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
          <CourseForm onSuccess={() => setIsCreatingCourse(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ArenaPage;
