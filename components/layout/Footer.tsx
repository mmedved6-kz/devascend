import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="w-full py-6 px-6 bg-gray-100">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="text-lg font-bold">
              DevAscend
            </Link>
            <p className="text-sm text-gray-600 mt-1">
              Build career-advancing portfolio projects
            </p>
          </div>
          
          <div className="flex gap-6">
            <Link href="/about" className="text-sm text-gray-600 hover:text-gray-900">
              About
            </Link>
            <Link href="/pricing" className="text-sm text-gray-600 hover:text-gray-900">
              Pricing
            </Link>
            <Link href="/faq" className="text-sm text-gray-600 hover:text-gray-900">
              FAQ
            </Link>
            <Link href="/contact" className="text-sm text-gray-600 hover:text-gray-900">
              Contact
            </Link>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-gray-200 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} DevAscend. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
