
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThumbsUp, MessageSquare, BookmarkPlus, Share, Shield, PinIcon, Send } from 'lucide-react';

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
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  
  // Mock comments data
  const [comments, setComments] = useState([
    {
      id: '1',
      author: 'user123',
      content: 'Great post! I found this really helpful.',
      timeAgo: '1 hour ago',
      likes: 5
    },
    {
      id: '2',
      author: 'learner456',
      content: 'I\'ve been looking for this kind of information. Thanks for sharing!',
      timeAgo: '30 minutes ago',
      likes: 2
    }
  ]);
  
  const handleAddComment = () => {
    if (!commentText.trim()) return;
    
    const newComment = {
      id: Date.now().toString(),
      author: 'You', // In a real app, this would come from the authenticated user
      content: commentText,
      timeAgo: 'Just now',
      likes: 0
    };
    
    setComments([...comments, newComment]);
    setCommentText('');
  };
  
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
      <CardFooter className="border-t pt-4 flex flex-col">
        <div className="flex justify-between w-full">
          <div className="flex space-x-3">
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-brand-600">
              <ThumbsUp className="h-4 w-4 mr-1" />
              <span>{post.upvotes}</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-gray-500 hover:text-brand-600"
              onClick={() => setShowComments(!showComments)}
            >
              <MessageSquare className="h-4 w-4 mr-1" />
              <span>{comments.length}</span>
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
        </div>
        
        {/* Comments section */}
        {showComments && (
          <div className="mt-4 w-full">
            <div className="space-y-4 mb-4">
              {comments.map(comment => (
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
                    <div className="flex items-center mt-1 pl-2 space-x-2">
                      <button className="text-xs text-gray-500 hover:text-brand-600 flex items-center">
                        <ThumbsUp className="h-3 w-3 mr-1" />
                        <span>{comment.likes}</span>
                      </button>
                      <button className="text-xs text-gray-500 hover:text-brand-600">Reply</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex space-x-2">
              <Textarea 
                placeholder="Add a comment..." 
                className="min-h-[80px]"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <Button 
                size="icon" 
                className="shrink-0 h-10 w-10 self-end"
                disabled={!commentText.trim()}
                onClick={handleAddComment}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default PostCard;
