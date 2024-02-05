// Footer.tsx
"use client";

import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="mb-2">
            <h2 className="text-lg font-semibold">MyApp</h2>
            <p className="text-sm">? {new Date().getFullYear()} MyApp. All rights reserved.</p>
          </div>
          <div className="flex space-x-4 mb-2">
            {/* Link the 'home' text to the /home page */}
            <Link href="/home">
              <a className="text-white hover:underline cursor-pointer">home</a>
            </Link>
            {/* Add more links as needed */}
            {/* ... */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
