
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, Users } from "lucide-react";

interface CourseCardProps {
  title: string;
  description: string;
  author: string;
  progress?: number;
  enrolled?: number;
  duration?: string;
  imageUrl?: string;
  type: 'popular' | 'ongoing' | 'completed';
}

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  description,
  author,
  progress = 0,
  enrolled = 0,
  duration = '0h',
  imageUrl = '/placeholder.svg',
  type
}) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative h-48 w-full">
        <img 
          src={imageUrl} 
          alt={title} 
          className="h-full w-full object-cover"
        />
        {type === 'popular' && (
          <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
            Popular
          </div>
        )}
        {type === 'completed' && (
          <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
            Completed
          </div>
        )}
      </div>
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">By {author}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm mb-3 line-clamp-2">{description}</p>
        
        {type === 'ongoing' && (
          <div className="mb-3">
            <div className="flex justify-between text-xs mb-1">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
        
        <div className="flex justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            <span>{enrolled} enrolled</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{duration}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button variant="outline" size="sm" className="w-full">
          <BookOpen className="mr-2 h-4 w-4" />
          {type === 'completed' ? 'Review Course' : 'View Course'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
