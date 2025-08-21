'use client';

import { CheckIcon } from 'lucide-react';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import AppLayout from '@/components/layout/AppLayout';

export default function Pricing() {
  const { isSignedIn } = useUser();

  return (
    <AppLayout>
      <div className="py-8 sm:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
              Simple, transparent pricing
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
              Choose the plan that fits your needs to accelerate your career growth
            </p>
          </div>

          <div className="mt-12 sm:mt-16 grid gap-8 lg:grid-cols-2 lg:gap-8">
            {/* Free Tier */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-8">
                <h2 className="text-xl font-semibold text-gray-900">Free</h2>
                <p className="mt-4 text-gray-600">
                  Perfect for trying out DevAscend and building your first portfolio project
                </p>
                <p className="mt-8">
                  <span className="text-4xl font-extrabold text-gray-900">$0</span>
                  <span className="text-base font-medium text-gray-500">/month</span>
                </p>
                <Link 
                  href={isSignedIn ? "/dashboard" : "/sign-up"} 
                  className="mt-8 block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md text-center"
                >
                  {isSignedIn ? "Get Started" : "Sign Up Free"}
                </Link>
              </div>
              <div className="px-6 pt-6 pb-8">
                <h3 className="text-sm font-semibold text-gray-900 tracking-wide uppercase">
                  What's included
                </h3>
                <ul className="mt-6 space-y-4">
                  <li className="flex space-x-3">
                    <CheckIcon className="flex-shrink-0 h-5 w-5 text-green-500" />
                    <span className="text-base text-gray-600">1 project per month</span>
                  </li>
                  <li className="flex space-x-3">
                    <CheckIcon className="flex-shrink-0 h-5 w-5 text-green-500" />
                    <span className="text-base text-gray-600">AI-guided project steps</span>
                  </li>
                  <li className="flex space-x-3">
                    <CheckIcon className="flex-shrink-0 h-5 w-5 text-green-500" />
                    <span className="text-base text-gray-600">Basic project export (PDF)</span>
                  </li>
                  <li className="flex space-x-3">
                    <CheckIcon className="flex-shrink-0 h-5 w-5 text-green-500" />
                    <span className="text-base text-gray-600">Community forum access</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Pro Tier */}
            <div className="bg-white rounded-lg shadow-md border border-blue-100 overflow-hidden ring-1 ring-blue-200">
              <div className="px-6 py-8">
                <h2 className="text-xl font-semibold text-gray-900">Pro</h2>
                <p className="mt-4 text-gray-600">
                  For developers serious about building an impressive portfolio quickly
                </p>
                <p className="mt-8">
                  <span className="text-4xl font-extrabold text-gray-900">$15</span>
                  <span className="text-base font-medium text-gray-500">/month</span>
                </p>
                <Link 
                  href={isSignedIn ? "/dashboard/upgrade" : "/sign-up?plan=pro"} 
                  className="mt-8 block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md text-center"
                >
                  {isSignedIn ? "Upgrade Now" : "Get Started"}
                </Link>
              </div>
              <div className="px-6 pt-6 pb-8">
                <h3 className="text-sm font-semibold text-gray-900 tracking-wide uppercase">
                  What's included
                </h3>
                <ul className="mt-6 space-y-4">
                  <li className="flex space-x-3">
                    <CheckIcon className="flex-shrink-0 h-5 w-5 text-green-500" />
                    <span className="text-base font-medium text-gray-900">Unlimited projects</span>
                  </li>
                  <li className="flex space-x-3">
                    <CheckIcon className="flex-shrink-0 h-5 w-5 text-green-500" />
                    <span className="text-base font-medium text-gray-900">Advanced AI guidance with detailed hints</span>
                  </li>
                  <li className="flex space-x-3">
                    <CheckIcon className="flex-shrink-0 h-5 w-5 text-green-500" />
                    <span className="text-base font-medium text-gray-900">Premium project export (PDF, GitHub)</span>
                  </li>
                  <li className="flex space-x-3">
                    <CheckIcon className="flex-shrink-0 h-5 w-5 text-green-500" />
                    <span className="text-base font-medium text-gray-900">Interactive portfolio website</span>
                  </li>
                  <li className="flex space-x-3">
                    <CheckIcon className="flex-shrink-0 h-5 w-5 text-green-500" />
                    <span className="text-base font-medium text-gray-900">Resume integration</span>
                  </li>
                  <li className="flex space-x-3">
                    <CheckIcon className="flex-shrink-0 h-5 w-5 text-green-500" />
                    <span className="text-base font-medium text-gray-900">Priority support</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <h2 className="text-lg font-medium text-gray-900">Frequently Asked Questions</h2>
            <div className="mt-6 max-w-3xl mx-auto">
              <div className="space-y-8">
                <div>
                  <h3 className="text-md font-medium text-gray-900">Can I cancel my subscription anytime?</h3>
                  <p className="mt-2 text-sm text-gray-600">
                    Yes, you can cancel your Pro subscription at any time. Your benefits will remain active until the end of your current billing period.
                  </p>
                </div>
                <div>
                  <h3 className="text-md font-medium text-gray-900">What happens to my projects if I downgrade?</h3>
                  <p className="mt-2 text-sm text-gray-600">
                    Your existing projects will remain accessible, but you'll be limited to the free tier features for new projects.
                  </p>
                </div>
                <div>
                  <h3 className="text-md font-medium text-gray-900">Do you offer student discounts?</h3>
                  <p className="mt-2 text-sm text-gray-600">
                    Yes! We offer a 30% discount for students. Contact our support team with your academic email for details.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
