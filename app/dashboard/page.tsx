'use client';

import { useUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import AppLayout from '@/components/layout/AppLayout';
import { useEffect } from 'react';

export default function Dashboard() {
  // Get the current user
  const { isSignedIn, user } = useUser();
  
  // If not logged in, redirect to home page
  useEffect(() => {
    if (!isSignedIn) {
      redirect('/');
    }
  }, [isSignedIn]);

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Welcome, {user?.firstName || 'Developer'}!</h1>
          
          <Link 
            href="/projects/new" 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Start New Project
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-4">Your Projects</h2>
            <div className="bg-gray-50 p-8 rounded text-center">
              <p className="text-gray-500">You haven't created any projects yet.</p>
              <Link 
                href="/projects/new" 
                className="mt-4 inline-block text-blue-600 hover:underline"
              >
                Create your first project
              </Link>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-4">Subscription Status</h2>
            <div className="flex items-center justify-between">
              <div>
                <span className="px-2 py-1 bg-gray-200 text-gray-800 rounded text-sm">Free Plan</span>
                <p className="mt-2 text-gray-600">1 project per month</p>
              </div>
              <Link 
                href="/pricing" 
                className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition"
              >
                Upgrade to Pro
              </Link>
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">Recommended Project Types</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 cursor-pointer transition">
              <h3 className="font-medium">Full-stack Web App</h3>
              <p className="text-sm text-gray-600 mt-1">Build a complete application with frontend and backend integration</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 cursor-pointer transition">
              <h3 className="font-medium">API Integration</h3>
              <p className="text-sm text-gray-600 mt-1">Work with third-party APIs and create meaningful interfaces</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 cursor-pointer transition">
              <h3 className="font-medium">Bug Fix Challenge</h3>
              <p className="text-sm text-gray-600 mt-1">Identify and solve issues in an existing codebase</p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
