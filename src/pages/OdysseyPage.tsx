
import React from 'react';
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, Clock, Award, Flame } from "lucide-react";
import QuoteDisplay from "@/components/QuoteDisplay";
import StreakCalendar from "@/components/StreakCalendar";

const OdysseyPage: React.FC = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <section className="mb-12">
        <div className="mb-8">
          <QuoteDisplay />
        </div>
        
        <h1 className="text-3xl font-bold mb-2 text-brand-600">Your Learning Odyssey</h1>
        <p className="text-gray-600 mb-6">Embark on structured learning paths to master new skills</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-brand-50 to-white border-brand-100">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-brand-600" />
                Active Paths
              </CardTitle>
              <CardDescription>Learning journeys you're currently pursuing</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-brand-600">3</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-brand-50 to-white border-brand-100">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="h-5 w-5 mr-2 text-brand-600" />
                Completed
              </CardTitle>
              <CardDescription>Paths you've successfully finished</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-brand-600">2</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-brand-50 to-white border-brand-100">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Flame className="h-5 w-5 mr-2 text-brand-600" />
                Current Streak
              </CardTitle>
              <CardDescription>Days in a row you've been learning</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-brand-600">7</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Your Activity Streak</h2>
          <StreakCalendar />
        </div>
        
        {/* Course Creation Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-10 border">
          <h2 className="text-xl font-semibold mb-4">Create New Course</h2>
          <p className="text-gray-600 mb-6">Design your custom learning path with modules, videos, and quizzes</p>
          <Button>Start Course Creation</Button>
        </div>
        
        {/* Admin Panel Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-10 border">
          <h2 className="text-xl font-semibold mb-4">Admin Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Clan Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Review and moderate clan activities</p>
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
                <p className="text-gray-600">Review reported posts and comments</p>
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
