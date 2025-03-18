
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Book, Users, Search, Award, Menu } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import Auth from './Auth';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  // Mock authentication state - in a real app, this would come from an auth context
  const isAuthenticated = false;

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <Book className="h-8 w-8 text-brand-600" />
                <span className="ml-2 text-xl font-bold text-brand-600 dark:text-brand-400">vSkill</span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 dark:text-gray-100 border-b-2 border-transparent hover:border-brand-500">
                Home
              </Link>
              <Link to="/tribe" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 dark:text-gray-400 border-b-2 border-transparent hover:border-brand-500 hover:text-gray-900 dark:hover:text-gray-100">
                <Users className="h-4 w-4 mr-1" />
                Tribe
              </Link>
              <Link to="/odyssey" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 dark:text-gray-400 border-b-2 border-transparent hover:border-brand-500 hover:text-gray-900 dark:hover:text-gray-100">
                <Award className="h-4 w-4 mr-1" />
                Odyssey
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
            <ThemeToggle />
            
            <div className="relative">
              <Button variant="outline" size="sm">
                <Search className="h-4 w-4 mr-1" />
                Search
              </Button>
            </div>
            
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="rounded-full p-0 w-8 h-8">
                    <img
                      className="h-8 w-8 rounded-full"
                      src="/placeholder.svg"
                      alt="User profile"
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/profile')}>Profile</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/odyssey')}>Dashboard</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Sign out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Auth />
            )}
          </div>
          <div className="flex items-center sm:hidden">
            <ThemeToggle />
            <Button variant="ghost" size="sm">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
