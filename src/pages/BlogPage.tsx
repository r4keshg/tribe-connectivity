
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Tag, Calendar, User } from 'lucide-react';

const BlogPage: React.FC = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Getting Started with vSkill: A Beginner's Guide",
      excerpt: "Learn how to make the most of the vSkill platform with these handy tips for new users.",
      author: "Alex Chen",
      date: "May 15, 2023",
      tags: ["Beginners", "Guide", "Tips"],
      image: "/placeholder.svg"
    },
    {
      id: 2,
      title: "How to Create Engaging Learning Content",
      excerpt: "Discover the secrets to creating learning content that keeps students engaged and motivated.",
      author: "Sarah Johnson",
      date: "June 22, 2023",
      tags: ["Content Creation", "Engagement", "Teaching"],
      image: "/placeholder.svg"
    },
    {
      id: 3,
      title: "Building a Supportive Learning Community",
      excerpt: "Tips for creating and nurturing a thriving learning community within your vSkill clan.",
      author: "Priya Patel",
      date: "July 8, 2023",
      tags: ["Community", "Collaboration", "Clan Management"],
      image: "/placeholder.svg"
    },
    {
      id: 4,
      title: "Gamification in Education: Why It Works",
      excerpt: "Explore how game mechanics can enhance the learning experience and boost motivation.",
      author: "Miguel Rodriguez",
      date: "August 14, 2023",
      tags: ["Gamification", "Motivation", "Learning Theory"],
      image: "/placeholder.svg"
    },
    {
      id: 5,
      title: "The Future of Online Learning",
      excerpt: "What trends are shaping the future of online education? We explore emerging technologies and approaches.",
      author: "Alex Chen",
      date: "September 30, 2023",
      tags: ["Future", "Trends", "EdTech"],
      image: "/placeholder.svg"
    },
  ];

  const popularTags = [
    "Beginners", "Guide", "Tips", "Content Creation", "Engagement", 
    "Teaching", "Community", "Collaboration", "Clan Management", "Gamification",
    "Motivation", "Learning Theory", "Future", "Trends", "EdTech"
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <section className="mb-10">
        <h1 className="text-3xl font-bold mb-2 text-brand-600">vSkill Blog</h1>
        <p className="text-gray-600 mb-6">Insights, guides, and stories from the vSkill community</p>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input placeholder="Search articles..." className="pl-10" />
          </div>
          <Button>
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-6">Recent Articles</h2>
            <div className="space-y-8">
              {blogPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden">
                  <div className="sm:flex">
                    <div className="sm:w-1/3 h-48 sm:h-auto bg-gray-200">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="sm:w-2/3">
                      <CardHeader>
                        <CardTitle className="text-xl">{post.title}</CardTitle>
                        <CardDescription className="text-sm flex items-center gap-2">
                          <User className="h-3 w-3" /> {post.author} 
                          <span>•</span> 
                          <Calendar className="h-3 w-3" /> {post.date}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">{post.excerpt}</p>
                      </CardContent>
                      <CardFooter className="flex justify-between items-center">
                        <div className="flex flex-wrap gap-2">
                          {post.tags.map((tag, index) => (
                            <span key={index} className="inline-flex items-center text-xs font-medium text-brand-600 bg-brand-100 px-2 py-0.5 rounded">
                              <Tag className="h-3 w-3 mr-1" /> {tag}
                            </span>
                          ))}
                        </div>
                        <Button variant="outline" size="sm">Read More</Button>
                      </CardFooter>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        </div>

        <div className="lg:col-span-4">
          <div className="sticky top-24">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-lg">Popular Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag, index) => (
                    <span key={index} className="inline-flex items-center text-sm font-medium text-brand-600 bg-brand-50 px-3 py-1 rounded-full cursor-pointer hover:bg-brand-100">
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Subscribe to Updates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">Get the latest articles and updates delivered to your inbox.</p>
                <Input placeholder="Your email address" type="email" />
                <Button className="w-full">Subscribe</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
