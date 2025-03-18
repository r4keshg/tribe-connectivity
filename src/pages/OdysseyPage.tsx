
import React, { useState, useEffect } from 'react';
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, Clock, Award, Flame, Trophy, Coins, BadgeCheck, GraduationCap } from "lucide-react";
import QuoteDisplay from "@/components/QuoteDisplay";
import StreakCalendar from "@/components/StreakCalendar";
import CourseCard from "@/components/CourseCard";
import AchievementBadge from "@/components/AchievementBadge";
import ConfettiEffect from "@/components/ConfettiEffect";
import { toast } from 'sonner';

// Mock data for demonstration
const popularCourses = [
  { 
    id: 1, 
    title: "Advanced React Patterns", 
    description: "Learn the most powerful React patterns used by top developers worldwide.", 
    author: "Sarah Johnson", 
    enrolled: 2456, 
    duration: "8h 30m",
    imageUrl: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?q=80&w=2070" 
  },
  { 
    id: 2, 
    title: "Machine Learning Fundamentals", 
    description: "Start your journey into AI and ML with this comprehensive course.", 
    author: "Michael Chen", 
    enrolled: 1892, 
    duration: "12h 15m",
    imageUrl: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2070" 
  },
  { 
    id: 3, 
    title: "Backend Development with Node.js", 
    description: "Build scalable backends with Node.js, Express, and MongoDB.", 
    author: "Alex Martinez", 
    enrolled: 1543, 
    duration: "10h 45m",
    imageUrl: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=2074" 
  }
];

const ongoingCourses = [
  { 
    id: 1, 
    title: "Data Structures & Algorithms", 
    description: "Master the core computer science concepts needed for technical interviews.", 
    author: "Prof. David Kim", 
    progress: 68, 
    enrolled: 3241, 
    duration: "15h 20m",
    imageUrl: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=2728" 
  },
  { 
    id: 2, 
    title: "Modern CSS Techniques", 
    description: "Learn advanced CSS including Grid, Flexbox, and animations.", 
    author: "Emma Wilson", 
    progress: 32, 
    enrolled: 1756, 
    duration: "6h 40m",
    imageUrl: "https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?q=80&w=2671" 
  }
];

const completedCourses = [
  { 
    id: 1, 
    title: "HTML & CSS Fundamentals", 
    description: "Build a solid foundation in web development with HTML and CSS.", 
    author: "Jessica Lee", 
    enrolled: 5678, 
    duration: "4h 15m",
    imageUrl: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?q=80&w=2670" 
  }
];

const achievements = [
  { 
    id: 1, 
    type: 'streak' as const, 
    title: "7-Day Streak", 
    description: "Login for 7 consecutive days", 
    level: 1 as const, 
    unlocked: true 
  },
  { 
    id: 2, 
    type: 'streak' as const, 
    title: "30-Day Streak", 
    description: "Login for 30 consecutive days", 
    level: 2 as const, 
    unlocked: false 
  },
  { 
    id: 3, 
    type: 'completion' as const, 
    title: "Quick Learner", 
    description: "Complete first course", 
    level: 1 as const, 
    unlocked: true 
  },
  { 
    id: 4, 
    type: 'rank' as const, 
    title: "Rising Star", 
    description: "Reach 100 reputation points", 
    level: 1 as const, 
    unlocked: false 
  },
  { 
    id: 5, 
    type: 'contribution' as const, 
    title: "Helpful Hand", 
    description: "Answer 5 community questions", 
    level: 1 as const, 
    unlocked: false 
  },
  { 
    id: 6, 
    type: 'special' as const, 
    title: "Early Adopter", 
    description: "Join during platform beta", 
    level: 3 as const, 
    unlocked: true 
  }
];

const OdysseyPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  
  // Simulate checking for authentication
  useEffect(() => {
    // In a real app, this would check for auth tokens or similar
    const checkAuth = () => {
      const storedUsername = localStorage.getItem('username');
      if (storedUsername) {
        setIsAuthenticated(true);
        setUsername(storedUsername);
        
        // Show confetti for first login of the day
        const lastLogin = localStorage.getItem('lastLogin');
        const today = new Date().toDateString();
        
        if (lastLogin !== today) {
          setShowConfetti(true);
          localStorage.setItem('lastLogin', today);
          toast.success('Welcome back! +10 coins for your daily login!');
        }
      }
    };
    
    checkAuth();
  }, []);
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    let greeting = "";
    
    if (hour < 12) greeting = "Good morning";
    else if (hour < 18) greeting = "Good afternoon";
    else greeting = "Good evening";
    
    return username ? `${greeting}, ${username}!` : greeting;
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <ConfettiEffect trigger={showConfetti} />
      
      <section className="mb-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{getGreeting()}</h2>
          <QuoteDisplay />
        </div>
        
        <h1 className="text-3xl font-bold mb-2 text-brand-600">Your Learning Odyssey</h1>
        <p className="text-gray-600 mb-6">Embark on structured learning paths to master new skills</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-brand-50 to-white border-brand-100 dark:from-gray-800 dark:to-gray-900 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-brand-600 dark:text-brand-400" />
                Active Paths
              </CardTitle>
              <CardDescription>Learning journeys you're currently pursuing</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-brand-600 dark:text-brand-400">3</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-brand-50 to-white border-brand-100 dark:from-gray-800 dark:to-gray-900 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="h-5 w-5 mr-2 text-brand-600 dark:text-brand-400" />
                Completed
              </CardTitle>
              <CardDescription>Paths you've successfully finished</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-brand-600 dark:text-brand-400">2</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-brand-50 to-white border-brand-100 dark:from-gray-800 dark:to-gray-900 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Flame className="h-5 w-5 mr-2 text-brand-600 dark:text-brand-400" />
                Current Streak
              </CardTitle>
              <CardDescription>Days in a row you've been learning</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-brand-600 dark:text-brand-400">7</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Your Activity Streak</h2>
          <StreakCalendar />
        </div>

        {/* User Stats Section */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Your Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Rank</p>
                    <h3 className="text-2xl font-bold">Explorer</h3>
                  </div>
                  <Trophy className="h-8 w-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Coins</p>
                    <h3 className="text-2xl font-bold">750</h3>
                  </div>
                  <Coins className="h-8 w-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Badges</p>
                    <h3 className="text-2xl font-bold">3/12</h3>
                  </div>
                  <BadgeCheck className="h-8 w-8 text-brand-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Courses</p>
                    <h3 className="text-2xl font-bold">6</h3>
                  </div>
                  <GraduationCap className="h-8 w-8 text-brand-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Course Sections */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Your Courses</h2>
          
          {/* Ongoing Courses */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Continue Learning</h3>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ongoingCourses.map(course => (
                <CourseCard
                  key={course.id}
                  title={course.title}
                  description={course.description}
                  author={course.author}
                  progress={course.progress}
                  enrolled={course.enrolled}
                  duration={course.duration}
                  imageUrl={course.imageUrl}
                  type="ongoing"
                />
              ))}
            </div>
          </div>
          
          {/* Completed Courses */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Completed Courses</h3>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedCourses.map(course => (
                <CourseCard
                  key={course.id}
                  title={course.title}
                  description={course.description}
                  author={course.author}
                  enrolled={course.enrolled}
                  duration={course.duration}
                  imageUrl={course.imageUrl}
                  type="completed"
                />
              ))}
            </div>
          </div>
          
          {/* Popular Courses */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Popular Courses</h3>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularCourses.map(course => (
                <CourseCard
                  key={course.id}
                  title={course.title}
                  description={course.description}
                  author={course.author}
                  enrolled={course.enrolled}
                  duration={course.duration}
                  imageUrl={course.imageUrl}
                  type="popular"
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Achievements Section */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Achievements & Badges</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {achievements.map(badge => (
              <AchievementBadge
                key={badge.id}
                type={badge.type}
                title={badge.title}
                description={badge.description}
                level={badge.level}
                unlocked={badge.unlocked}
              />
            ))}
          </div>
        </div>
        
        {/* Course Creation Section */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm mb-10 border dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4">Create New Course</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Design your custom learning path with modules, videos, and quizzes</p>
          <Button>Start Course Creation</Button>
        </div>
        
        {/* Admin Panel Section */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm mb-10 border dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4">Admin Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Clan Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">Review and moderate clan activities</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm">Manage Clans</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Content Moderation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">Review reported posts and comments</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm">View Reports</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OdysseyPage;
