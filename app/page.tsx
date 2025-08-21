'use client';

import Image from "next/image";
import Link from "next/link";
import { SignInButton, SignUpButton, useUser } from "@clerk/nextjs";
import AppLayout from "@/components/layout/AppLayout";

export default function Home() {
  const { isSignedIn } = useUser();

  return (
    <AppLayout>
      <div className="flex flex-col items-center">
        {/* Hero Section */}
        <section className="py-16 md:py-24 text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Build Your Path to a Tech Career
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            DevAscend helps entry-level developers build impressive portfolio projects with AI guidance,
            simulating real-world senior workflows and challenges.
          </p>
          
          {isSignedIn ? (
            <Link 
              href="/dashboard"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium text-lg hover:bg-blue-700 transition"
            >
              Go to Dashboard
            </Link>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <SignUpButton mode="modal">
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium text-lg hover:bg-blue-700 transition">
                  Get Started
                </button>
              </SignUpButton>
              
              <SignInButton mode="modal">
                <button className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-lg hover:bg-gray-50 transition">
                  Sign In
                </button>
              </SignInButton>
            </div>
          )}
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-gray-50 w-full">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose DevAscend?</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Image 
                    src="/file.svg" 
                    alt="Project icon" 
                    width={24} 
                    height={24} 
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">Real-world Projects</h3>
                <p className="text-gray-600">
                  Build projects that simulate actual industry challenges, not just basic tutorials
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Image 
                    src="/globe.svg" 
                    alt="AI icon" 
                    width={24} 
                    height={24} 
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">AI Guidance</h3>
                <p className="text-gray-600">
                  Get intelligent hints and feedback as you work through challenging tasks
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <Image 
                    src="/window.svg" 
                    alt="Portfolio icon" 
                    width={24} 
                    height={24} 
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">Shareable Portfolios</h3>
                <p className="text-gray-600">
                  Export your work as polished portfolio pieces to impress potential employers
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
