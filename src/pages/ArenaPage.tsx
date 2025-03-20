
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, Trophy, CheckCircle, Clock, Star, GraduationCap } from 'lucide-react';
import QuoteDisplay from "@/components/QuoteDisplay";
import { useAuth } from '@/hooks/use-auth';

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
}

const ArenaPage: React.FC = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
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
      isFeatured: true
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
      isNew: true
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
        <Button className="w-full">View Course</Button>
      </CardFooter>
    </Card>
  );

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
    </div>
  );
};

export default ArenaPage;
