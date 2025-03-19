
import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, CheckCircle, Clock, TrendingUp, Award, BookOpen, Zap, Flame } from 'lucide-react';
import StreakCalendar from "@/components/StreakCalendar";
import { useAuth } from '@/hooks/use-auth';
import { triggerOdysseyConfetti } from '@/utils/confetti';

interface Course {
  id: string;
  title: string;
  description: string;
  progress: number;
  modules: number;
  image: string;
  tags: string[];
  status: 'not-started' | 'in-progress' | 'completed';
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  date?: string;
}

const OdysseyPage: React.FC = () => {
  const { user, profile } = useAuth();

  useEffect(() => {
    // Trigger confetti when visiting the Odyssey page
    triggerOdysseyConfetti();
  }, []);

  // Sample courses data - in a real app, you would fetch this from your database
  const sampleCourses: Course[] = [
    {
      id: '1',
      title: 'Introduction to Programming',
      description: 'Learn the basics of programming with JavaScript',
      progress: 100,
      modules: 10,
      image: '/placeholder.svg',
      tags: ['Beginner', 'Programming', 'JavaScript'],
      status: 'completed'
    },
    {
      id: '2',
      title: 'Web Development Fundamentals',
      description: 'Master HTML, CSS and JavaScript',
      progress: 60,
      modules: 12,
      image: '/placeholder.svg',
      tags: ['Web', 'HTML', 'CSS'],
      status: 'in-progress'
    },
    {
      id: '3',
      title: 'React for Beginners',
      description: 'Build modern UIs with React',
      progress: 25,
      modules: 8,
      image: '/placeholder.svg',
      tags: ['React', 'Frontend', 'JavaScript'],
      status: 'in-progress'
    },
    {
      id: '4',
      title: 'Data Structures & Algorithms',
      description: 'Essential computer science concepts',
      progress: 0,
      modules: 15,
      image: '/placeholder.svg',
      tags: ['Computer Science', 'Algorithms'],
      status: 'not-started'
    },
    {
      id: '5',
      title: 'Machine Learning Foundations',
      description: 'Introduction to ML concepts and tools',
      progress: 0,
      modules: 10,
      image: '/placeholder.svg',
      tags: ['AI', 'Python', 'Data Science'],
      status: 'not-started'
    }
  ];

  // Sample achievements
  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'First Steps',
      description: 'Completed your first course',
      icon: <Award className="h-8 w-8 text-yellow-500" />,
      unlocked: true,
      date: '2023-06-15'
    },
    {
      id: '2',
      title: 'Consistent Learner',
      description: 'Maintained a 7-day streak',
      icon: <Flame className="h-8 w-8 text-orange-500" />,
      unlocked: true,
      date: '2023-07-02'
    },
    {
      id: '3',
      title: 'Knowledge Seeker',
      description: 'Completed 5 courses',
      icon: <BookOpen className="h-8 w-8 text-blue-500" />,
      unlocked: false
    },
    {
      id: '4',
      title: 'Community Contributor',
      description: 'Published 3 blog posts',
      icon: <Zap className="h-8 w-8 text-purple-500" />,
      unlocked: false
    }
  ];

  const completedCourses = sampleCourses.filter(course => course.status === 'completed');
  const ongoingCourses = sampleCourses.filter(course => course.status === 'in-progress');
  const popularCourses = [...sampleCourses].sort(() => Math.random() - 0.5).slice(0, 3); // Random sorting for demo

  const CourseCard: React.FC<{ course: Course }> = ({ course }) => (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <CardTitle className="text-lg">{course.title}</CardTitle>
          {course.status === 'completed' && <CheckCircle className="h-5 w-5 text-green-500" />}
        </div>
        <CardDescription>{course.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-1 mb-3">
          {course.tags.map((tag, index) => (
            <Badge key={index} variant="secondary">{tag}</Badge>
          ))}
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{course.progress}%</span>
          </div>
          <Progress value={course.progress} className="h-2" />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant={course.status === 'completed' ? 'outline' : 'default'}>
          {course.status === 'not-started' ? 'Start Learning' : 
           course.status === 'in-progress' ? 'Continue Learning' : 
           'Review Course'}
        </Button>
      </CardFooter>
    </Card>
  );

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      {/* Welcome section - Changes based on authentication status */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          {user ? `Welcome back, ${profile?.username || 'Learner'}!` : 'Start Your Learning Journey'}
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          {user 
            ? `Continue your learning journey. Current streak: ${profile?.streak_days || 0} days` 
            : 'Track your progress, earn achievements, and join a community of learners'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Main content area - 3/4 width on desktop */}
        <div className="md:col-span-3 space-y-8">
          {/* Course sections */}
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All Courses</TabsTrigger>
              <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="popular">Popular</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sampleCourses.map(course => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="ongoing" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {ongoingCourses.length > 0 ? (
                  ongoingCourses.map(course => (
                    <CourseCard key={course.id} course={course} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-8">
                    <p className="text-gray-500">You have no ongoing courses.</p>
                    <Button className="mt-4">Explore Courses</Button>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="completed" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {completedCourses.length > 0 ? (
                  completedCourses.map(course => (
                    <CourseCard key={course.id} course={course} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-8">
                    <p className="text-gray-500">You haven't completed any courses yet.</p>
                    <Button className="mt-4">Start Learning</Button>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="popular" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {popularCourses.map(course => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar - 1/4 width on desktop */}
        <div className="space-y-6">
          {/* User stats summary */}
          {user && profile ? (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Your Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Rank</p>
                    <p className="font-medium">{profile.rank}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Coins</p>
                    <p className="font-medium">{profile.coins}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Completed</p>
                    <p className="font-medium">{profile.completed_courses} courses</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Blogs Published</p>
                  <p className="font-medium">{profile.created_blogs}</p>
                </div>
                {profile.is_clan_admin && (
                  <Badge className="mt-2" variant="outline">Clan Admin</Badge>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Why Join vSkill?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-brand-500" />
                  <span>Track your learning progress</span>
                </div>
                <div className="flex items-center">
                  <Trophy className="h-5 w-5 mr-2 text-brand-500" />
                  <span>Earn achievements and badges</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-brand-500" />
                  <span>Build consistent learning habits</span>
                </div>
                <Button className="w-full" onClick={() => document.dispatchEvent(new CustomEvent('open-auth-dialog'))}>
                  Create Account
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Activity & Streak Calendar */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Activity Streaks</CardTitle>
            </CardHeader>
            <CardContent>
              <StreakCalendar />
            </CardContent>
          </Card>

          {/* Achievements section */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Achievements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {achievements.map(achievement => (
                <div 
                  key={achievement.id} 
                  className={`flex items-start p-2 rounded-md ${
                    achievement.unlocked 
                      ? 'bg-gray-50 dark:bg-gray-800' 
                      : 'opacity-50'
                  }`}
                >
                  <div className="mr-3">{achievement.icon}</div>
                  <div>
                    <p className="font-medium">{achievement.title}</p>
                    <p className="text-sm text-gray-500">{achievement.description}</p>
                    {achievement.unlocked && achievement.date && (
                      <p className="text-xs text-gray-400 mt-1">Unlocked: {new Date(achievement.date).toLocaleDateString()}</p>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OdysseyPage;
