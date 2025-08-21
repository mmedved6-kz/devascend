'use client';

import { useUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import AppLayout from '@/components/layout/AppLayout';
import { useEffect } from 'react';

export default function Projects() {
  // Get the current user
  const { isSignedIn, user } = useUser();
  
  // If not logged in, redirect to home page
  useEffect(() => {
    if (!isSignedIn) {
      redirect('/');
    }
  }, [isSignedIn]);

  // Mock projects (in real app, fetch from Supabase)
  const projects = [];

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Your Projects</h1>
          
          <Link 
            href="/projects/new" 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Start New Project
          </Link>
        </div>
        
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Project cards would go here */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold mb-2">Sample Project</h3>
              <div className="flex gap-2 mb-3">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">React</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">API</span>
              </div>
              <p className="text-gray-600 mb-4 line-clamp-2">
                This is a sample project description. It would show key details about what the project involves.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Progress: 30%</span>
                <Link 
                  href="/projects/1" 
                  className="text-blue-600 hover:underline"
                >
                  Continue
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white p-12 rounded-lg shadow-sm text-center border border-gray-100">
            <h2 className="text-2xl font-semibold mb-2">No projects yet</h2>
            <p className="text-gray-600 mb-6 max-w-lg mx-auto">
              Start your first project to begin building your portfolio with real-world scenarios and challenges.
            </p>
            <Link 
              href="/projects/new" 
              className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Start Your First Project
            </Link>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
