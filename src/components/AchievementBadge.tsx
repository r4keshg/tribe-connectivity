
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { 
  Trophy, 
  Award, 
  Star, 
  Flame, 
  GraduationCap, 
  CheckCheck, 
  BadgeCheck 
} from "lucide-react";
import { cn } from "@/lib/utils";

type BadgeType = 'streak' | 'completion' | 'rank' | 'contribution' | 'special';

interface AchievementBadgeProps {
  type: BadgeType;
  title: string;
  description: string;
  level?: 1 | 2 | 3;
  unlocked?: boolean;
  className?: string;
}

const AchievementBadge: React.FC<AchievementBadgeProps> = ({
  type,
  title,
  description,
  level = 1,
  unlocked = false,
  className
}) => {
  const getBadgeIcon = () => {
    switch (type) {
      case 'streak':
        return <Flame className={`h-8 w-8 ${!unlocked ? 'text-gray-400' : 'text-orange-500'}`} />;
      case 'completion':
        return <CheckCheck className={`h-8 w-8 ${!unlocked ? 'text-gray-400' : 'text-green-500'}`} />;
      case 'rank':
        return <Trophy className={`h-8 w-8 ${!unlocked ? 'text-gray-400' : 'text-yellow-500'}`} />;
      case 'contribution':
        return <Star className={`h-8 w-8 ${!unlocked ? 'text-gray-400' : 'text-blue-500'}`} />;
      case 'special':
        return <Award className={`h-8 w-8 ${!unlocked ? 'text-gray-400' : 'text-purple-500'}`} />;
      default:
        return <BadgeCheck className={`h-8 w-8 ${!unlocked ? 'text-gray-400' : 'text-brand-600'}`} />;
    }
  };

  const getLevelIndicator = () => {
    return (
      <div className="flex gap-1 mt-1">
        {[...Array(3)].map((_, i) => (
          <div 
            key={i} 
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              i < level ? (unlocked ? "bg-brand-600" : "bg-gray-400") : "bg-gray-200"
            )}
          />
        ))}
      </div>
    );
  };

  return (
    <Card className={cn(
      "hover:shadow-md transition-shadow", 
      unlocked ? "bg-white dark:bg-gray-800" : "bg-gray-100 dark:bg-gray-900 opacity-70",
      className
    )}>
      <CardContent className="p-4 flex flex-col items-center text-center">
        <div className="mb-3 mt-2">
          {getBadgeIcon()}
        </div>
        <h3 className={`font-medium text-sm ${!unlocked ? 'text-gray-500' : ''}`}>{title}</h3>
        <p className="text-xs text-muted-foreground mt-1 mb-2">{description}</p>
        {getLevelIndicator()}
      </CardContent>
    </Card>
  );
};

export default AchievementBadge;
