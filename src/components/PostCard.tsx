
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThumbsUp, MessageSquare, BookmarkPlus, Share, Shield, PinIcon, Send } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from '@/hooks/use-auth';
import { toast } from "@/hooks/use-toast";

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
  const { user } = useAuth();
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Fetch comments when showComments is toggled to true
  useEffect(() => {
    if (showComments) {
      fetchComments();
    }
  }, [showComments]);
  
  const fetchComments = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('post_comments')
        .select(`
          id,
          content,
          likes,
          created_at,
          profiles:user_id (
            id,
            username
          )
        `)
        .eq('post_id', post.id)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      // Format comments for display
      const formattedComments = data.map(comment => ({
        id: comment.id,
        author: comment.profiles.username,
        authorId: comment.profiles.id,
        content: comment.content,
        timeAgo: formatTimeAgo(new Date(comment.created_at)),
        likes: comment.likes
      }));
      
      setComments(formattedComments);
    } catch (error) {
      console.error('Error fetching comments:', error);
      toast({
        title: "Error",
        description: "Failed to load comments",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleAddComment = async () => {
    if (!commentText.trim() || !user) return;
    
    try {
      const { data, error } = await supabase
        .from('post_comments')
        .insert({
          post_id: post.id,
          user_id: user.id,
          content: commentText.trim()
        })
        .select();
      
      if (error) throw error;
      
      // Add new comment to the list
      const newComment = {
        id: data[0].id,
        author: user.email?.split('@')[0] || 'User', // Fallback if no username available
        authorId: user.id,
        content: commentText.trim(),
        timeAgo: 'Just now',
        likes: 0
      };
      
      setComments([newComment, ...comments]);
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
  
  const handleLikeComment = async (commentId: string) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to like comments",
        variant: "default",
      });
      return;
    }
    
    try {
      // Find the comment to update
      const commentIndex = comments.findIndex(c => c.id === commentId);
      if (commentIndex === -1) return;
      
      // Update likes in the database
      const { error } = await supabase
        .from('post_comments')
        .update({ likes: comments[commentIndex].likes + 1 })
        .eq('id', commentId);
      
      if (error) throw error;
      
      // Update local state
      const updatedComments = [...comments];
      updatedComments[commentIndex] = {
        ...updatedComments[commentIndex],
        likes: updatedComments[commentIndex].likes + 1
      };
      
      setComments(updatedComments);
    } catch (error) {
      console.error('Error liking comment:', error);
      toast({
        title: "Error",
        description: "Failed to like comment",
        variant: "destructive",
      });
    }
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
              <span>{comments.length > 0 ? comments.length : post.comments}</span>
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
              {isLoading ? (
                <p className="text-center py-4 text-sm text-gray-500">Loading comments...</p>
              ) : comments.length > 0 ? (
                comments.map(comment => (
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
                        <button 
                          className="text-xs text-gray-500 hover:text-brand-600 flex items-center"
                          onClick={() => handleLikeComment(comment.id)}
                        >
                          <ThumbsUp className="h-3 w-3 mr-1" />
                          <span>{comment.likes}</span>
                        </button>
                        <button className="text-xs text-gray-500 hover:text-brand-600">Reply</button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center py-4 text-sm text-gray-500">No comments yet. Be the first to comment!</p>
              )}
            </div>
            <div className="flex space-x-2">
              <Textarea 
                placeholder={user ? "Add a comment..." : "Please log in to comment"}
                className="min-h-[80px]"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                disabled={!user}
              />
              <Button 
                size="icon" 
                className="shrink-0 h-10 w-10 self-end"
                disabled={!user || !commentText.trim()}
                onClick={handleAddComment}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            {!user && (
              <p className="text-xs text-gray-500 mt-2 text-center">
                <Link to="#" onClick={() => document.dispatchEvent(new CustomEvent('open-auth-dialog'))} className="text-brand-600 hover:underline">
                  Log in
                </Link> to join the conversation
              </p>
            )}
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default PostCard;
