'use client';

import { useUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ChevronRightIcon } from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';
import { useEffect } from 'react';

// In a real app, you would fetch the project data from Supabase
// based on the id from params
export default function ProjectView({ params }: { params: { id: string } }) {
  const { isSignedIn } = useUser();
  
  // If not logged in, redirect to home page
  useEffect(() => {
    if (!isSignedIn) {
      redirect('/');
    }
  }, [isSignedIn]);

  // For now, we'll use mock data
  const project = {
    id: params.id,
    title: "Personal Task Manager",
    description: "A simple web app to track personal tasks and todos with basic CRUD operations",
    scenario: "You're building a tool to help busy professionals organize their daily tasks. Users should be able to add, edit, complete, and delete tasks.",
    skills: ["React", "JavaScript", "CSS"],
    progress: 25,
    tasks: [
      {
        id: 1,
        title: "Set up project structure",
        description: "Create a new project and set up the basic folder structure with necessary dependencies.",
        completed: true
      },
      {
        id: 2,
        title: "Create task components",
        description: "Build components to display individual tasks and task lists",
        completed: false
      },
      {
        id: 3,
        title: "Implement state management",
        description: "Add state management to handle tasks data and user interactions",
        completed: false
      },
      {
        id: 4,
        title: "Style your application",
        description: "Add CSS styling to make your application look professional",
        completed: false
      }
    ]
  };

  // Calculate completion percentage
  const completedTasks = project.tasks.filter(task => task.completed).length;
  const totalTasks = project.tasks.length;
  const completionPercentage = Math.round((completedTasks / totalTasks) * 100);

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Link href="/projects" className="text-blue-600 hover:underline flex items-center">
            ← Back to Projects
          </Link>
          
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold">{project.title}</h1>
              <div className="mt-2 flex gap-2">
                {project.skills.map((skill) => (
                  <span 
                    key={skill} 
                    className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mt-4 sm:mt-0">
              <Link 
                href={`/projects/${project.id}/export`} 
                className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition"
              >
                Export Project
              </Link>
            </div>
          </div>
          
          <div className="mt-6">
            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 rounded-full" 
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
            <div className="mt-2 flex justify-between text-sm text-gray-600">
              <span>{completedTasks} of {totalTasks} tasks completed</span>
              <span>{completionPercentage}% complete</span>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Project Details */}
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold mb-4">Project Details</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Description</h3>
                  <p className="mt-1">{project.description}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Scenario</h3>
                  <p className="mt-1">{project.scenario}</p>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Resources</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center">
                      React Documentation
                      <ChevronRightIcon className="ml-1 h-4 w-4" />
                    </a>
                  </li>
                  <li>
                    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center">
                      JavaScript MDN Docs
                      <ChevronRightIcon className="ml-1 h-4 w-4" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Tasks */}
          <div className="md:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold mb-4">Project Tasks</h2>
              
              <div className="space-y-6">
                {project.tasks.map((task) => (
                  <div 
                    key={task.id} 
                    className={`border-l-4 ${task.completed ? 'border-green-500' : 'border-blue-500'} pl-4`}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{task.title}</h3>
                      <span className={`px-2 py-1 rounded text-xs ${
                        task.completed 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {task.completed ? 'Completed' : 'In Progress'}
                      </span>
                    </div>
                    <p className="mt-2 text-gray-600">{task.description}</p>
                    <div className="mt-4">
                      {task.completed ? (
                        <div className="flex gap-4">
                          <Link 
                            href={`/projects/${project.id}/tasks/${task.id}`} 
                            className="text-sm text-blue-600 hover:underline"
                          >
                            View Details
                          </Link>
                        </div>
                      ) : (
                        <Link 
                          href={`/projects/${project.id}/tasks/${task.id}`} 
                          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition inline-block"
                        >
                          Work on Task
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
