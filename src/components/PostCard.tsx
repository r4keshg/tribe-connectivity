
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ThumbsUp, MessageSquare, BookmarkPlus, Share, Shield, PinIcon } from 'lucide-react';

interface PostProps {
  post: {
    id: string;
    title: string;
    content: string;
    author: string;
    clan: string;
    upvotes: number;
    comments: number;
    tags: string[];
    timeAgo: string;
    isPinned?: boolean;
  };
}

const PostCard: React.FC<PostProps> = ({ post }) => {
  return (
    <Card className={post.isPinned ? 'border-brand-500' : ''}>
      {post.isPinned && (
        <div className="bg-brand-50 px-4 py-1 text-xs flex items-center text-brand-700">
          <PinIcon className="h-3 w-3 mr-1" />
          Pinned post
        </div>
      )}
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <Link to={`/post/${post.id}`}>
              <CardTitle className="text-xl hover:text-brand-600">{post.title}</CardTitle>
            </Link>
            <CardDescription className="flex items-center mt-1">
              <span className="text-sm">Posted by <span className="font-medium">{post.author}</span></span>
              <span className="mx-2">•</span>
              <Link to={`/clan/${post.clan}`} className="flex items-center text-sm text-brand-600 hover:underline">
                <Shield className="h-3 w-3 mr-1" />
                {post.clan}
              </Link>
              <span className="mx-2">•</span>
              <span className="text-sm">{post.timeAgo}</span>
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 line-clamp-3">
          {post.content}
        </p>
        <div className="flex flex-wrap gap-2 mt-3">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="bg-gray-50">
              #{tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4 flex justify-between">
        <div className="flex space-x-3">
          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-brand-600">
            <ThumbsUp className="h-4 w-4 mr-1" />
            <span>{post.upvotes}</span>
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-brand-600" asChild>
            <Link to={`/post/${post.id}`}>
              <MessageSquare className="h-4 w-4 mr-1" />
              <span>{post.comments}</span>
            </Link>
          </Button>
        </div>
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm" className="text-gray-500">
            <BookmarkPlus className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-500">
            <Share className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
