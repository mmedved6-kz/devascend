'use client';

import Link from 'next/link';
import { UserButton, SignInButton, SignUpButton, useUser } from '@clerk/nextjs';

const Navbar = () => {
  const { isSignedIn } = useUser();

  return (
    <nav className="w-full py-4 px-6 flex justify-between items-center bg-white shadow-sm">
      <Link href="/" className="text-xl font-bold">
        DevAscend
      </Link>
      
      <div className="flex items-center gap-4">
        {isSignedIn ? (
          <>
            <Link 
              href="/dashboard" 
              className="text-gray-700 hover:text-gray-900"
            >
              Dashboard
            </Link>
            <Link 
              href="/projects" 
              className="text-gray-700 hover:text-gray-900"
            >
              My Projects
            </Link>
            <UserButton afterSignOutUrl="/" />
          </>
        ) : (
          <div className="flex gap-4">
            <SignInButton mode="modal">
              <button className="px-4 py-2 text-gray-700 hover:text-gray-900">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Sign Up
              </button>
            </SignUpButton>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
