
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Laptop, BookOpen, MessageSquare, Shield } from 'lucide-react';

const Index = () => {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Learn Skills & Connect with</span>
            <span className="block text-brand-600">Our Vibrant Community</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Take your skills to the next level with expert courses and engage with fellow learners in our interactive Tribe community.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <Button className="w-full flex items-center justify-center px-8 py-3 md:py-4 text-base font-medium rounded-md text-white bg-brand-600 hover:bg-brand-700 md:text-lg">
                Get Started
              </Button>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <Link to="/tribe">
                <Button variant="outline" className="w-full flex items-center justify-center px-8 py-3 md:py-4 text-base font-medium rounded-md text-brand-600 bg-white hover:bg-gray-50 md:text-lg">
                  <Users className="mr-2 h-5 w-5" />
                  Join our Tribe
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Everything you need to succeed
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              vSkill combines learning resources with community engagement
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-brand-500 text-white">
                  <Laptop className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-medium text-gray-900">Expert-Led Courses</h3>
                <p className="mt-2 text-base text-gray-500 text-center">
                  Learn from industry professionals with courses designed for practical skill development.
                </p>
              </div>

              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-brand-500 text-white">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-medium text-gray-900">Community Tribe</h3>
                <p className="mt-2 text-base text-gray-500 text-center">
                  Connect with like-minded learners, share knowledge, and grow together in our Tribe.
                </p>
              </div>

              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-brand-500 text-white">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-medium text-gray-900">Specialized Clans</h3>
                <p className="mt-2 text-base text-gray-500 text-center">
                  Join topic-specific clans to dive deeper into your areas of interest with focused discussions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Courses */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Popular Courses
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Start your learning journey with our most popular offerings
            </p>
          </div>

          <div className="mt-10 grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white overflow-hidden shadow rounded-lg">
                <div className="h-48 bg-gray-200" />
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="bg-brand-50 text-brand-700 border-brand-200">
                      Development
                    </Badge>
                    <span className="text-sm text-gray-500">4.9 ★</span>
                  </div>
                  <h3 className="mt-3 text-lg font-semibold text-gray-900">
                    Web Development Fundamentals
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Learn the core concepts of modern web development
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm font-medium text-brand-600">
                      $49.99
                    </span>
                    <Button size="sm">
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <Button variant="outline">
              View All Courses
              <BookOpen className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Tribe Teaser */}
      <section className="py-16 bg-brand-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div>
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                Join our learning Tribe
              </h2>
              <p className="mt-3 max-w-md text-lg text-brand-100">
                Connect with fellow learners, join discussions, share knowledge, and be part of a supportive community.
              </p>
              <div className="mt-8 flex">
                <div className="inline-flex rounded-md shadow">
                  <Link to="/tribe">
                    <Button className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-brand-600 bg-white hover:bg-brand-50">
                      <MessageSquare className="mr-2 h-5 w-5" />
                      Explore the Tribe
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="mt-8 lg:mt-0 lg:flex-shrink-0">
              <div className="w-full h-64 bg-brand-500 rounded-lg shadow-lg lg:w-80" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
