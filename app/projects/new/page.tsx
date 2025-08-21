'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { redirect, useRouter } from 'next/navigation';
import Link from 'next/link';
import AppLayout from '@/components/layout/AppLayout';

export default function NewProject() {
  // Get the current user
  const { isSignedIn, user } = useUser();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [skills, setSkills] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState('beginner');
  const [experience, setExperience] = useState('');
  const [error, setError] = useState('');
  
  // If not logged in, redirect to home page
  useEffect(() => {
    if (!isSignedIn) {
      redirect('/');
    }
  }, [isSignedIn]);
  
  // Handle skill toggle
  const handleSkillToggle = (skill: string) => {
    if (skills.includes(skill)) {
      setSkills(skills.filter(s => s !== skill));
    } else {
      setSkills([...skills, skill]);
    }
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (skills.length === 0) {
      setError('Please select at least one skill');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          skills,
          difficulty,
          experience
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create project');
      }
      
      // Redirect to the new project page
      router.push(`/projects/${data.project.id}`);
    } catch (error) {
      console.error('Error creating project:', error);
      setError(error instanceof Error ? error.message : 'Failed to create project');
      setIsSubmitting(false);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link href="/projects" className="text-blue-600 hover:underline flex items-center">
            ← Back to Projects
          </Link>
          <h1 className="text-3xl font-bold mt-4">Create New Project</h1>
        </div>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}
        
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-1">
                What skills do you want to develop or showcase?
              </label>
              <p className="text-sm text-gray-500 mb-2">Select all that apply</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="react" 
                    className="h-4 w-4 text-blue-600 rounded" 
                    checked={skills.includes('React')}
                    onChange={() => handleSkillToggle('React')}
                  />
                  <label htmlFor="react" className="ml-2 text-sm text-gray-700">React</label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="node" 
                    className="h-4 w-4 text-blue-600 rounded" 
                    checked={skills.includes('Node.js')}
                    onChange={() => handleSkillToggle('Node.js')}
                  />
                  <label htmlFor="node" className="ml-2 text-sm text-gray-700">Node.js</label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="api" 
                    className="h-4 w-4 text-blue-600 rounded" 
                    checked={skills.includes('API Integration')}
                    onChange={() => handleSkillToggle('API Integration')}
                  />
                  <label htmlFor="api" className="ml-2 text-sm text-gray-700">API Integration</label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="database" 
                    className="h-4 w-4 text-blue-600 rounded" 
                    checked={skills.includes('Database')}
                    onChange={() => handleSkillToggle('Database')}
                  />
                  <label htmlFor="database" className="ml-2 text-sm text-gray-700">Database</label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="typescript" 
                    className="h-4 w-4 text-blue-600 rounded" 
                    checked={skills.includes('TypeScript')}
                    onChange={() => handleSkillToggle('TypeScript')}
                  />
                  <label htmlFor="typescript" className="ml-2 text-sm text-gray-700">TypeScript</label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="auth" 
                    className="h-4 w-4 text-blue-600 rounded" 
                    checked={skills.includes('Authentication')}
                    onChange={() => handleSkillToggle('Authentication')}
                  />
                  <label htmlFor="auth" className="ml-2 text-sm text-gray-700">Authentication</label>
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-1">
                Preferred difficulty level
              </label>
              <select 
                id="difficulty" 
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              >
                <option value="beginner">Beginner - I'm new to these technologies</option>
                <option value="intermediate">Intermediate - I have some experience</option>
                <option value="advanced">Advanced - I want a real challenge</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                Tell us about your experience (optional)
              </label>
              <textarea
                id="experience"
                rows={4}
                placeholder="e.g., I've built a few small React apps and am comfortable with basic JavaScript. I want to learn more about API integration..."
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              ></textarea>
            </div>
            
            <div className="pt-4">
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
                disabled={isSubmitting || skills.length === 0}
              >
                {isSubmitting ? 'Generating Project...' : 'Generate My Project'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}
