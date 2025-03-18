
import React from 'react';
import { Link } from 'react-router-dom';
import { Book, Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center">
              <Book className="h-8 w-8 text-brand-600" />
              <span className="ml-2 text-xl font-bold text-brand-600">vSkill</span>
            </div>
            <p className="mt-4 text-sm text-gray-600 max-w-md">
              vSkill is an innovative eLearning platform with integrated community features to enhance your learning experience.
            </p>
            <div className="mt-4 flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-800 tracking-wider uppercase">Platform</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/" className="text-sm text-gray-600 hover:text-brand-600">Home</Link>
              </li>
              <li>
                <Link to="/tribe" className="text-sm text-gray-600 hover:text-brand-600">Tribe</Link>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-brand-600">Courses</a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-brand-600">Resources</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-800 tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-brand-600">About</a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-brand-600">Blog</a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-brand-600">Contact</a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-brand-600">Careers</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-sm text-gray-400 text-center">
            &copy; {new Date().getFullYear()} vSkill eLearning. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
