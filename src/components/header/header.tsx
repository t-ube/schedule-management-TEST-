// Header.tsx
"use client";

import Link from 'next/link';

export function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-500 to-purple-500 py-4 shadow-md w-full">
      <nav className="max-w-screen-xl mx-auto flex justify-between items-center px-4 md:px-6 lg:px-8">
        <div>
          <Link href="/">
            <div className="text-white text-2xl font-bold cursor-pointer hover:text-gray-200 transition duration-300">
              My App
            </div>
          </Link>
        </div>
        <div className="space-x-4 flex">
          <Link href="/login">
            <div className="text-white hover:text-gray-200 transition duration-300 cursor-pointer">login</div>
          </Link>
          <Link href="/home">
            <div className="text-white hover:text-gray-200 transition duration-300 cursor-pointer">home</div>
          </Link>
          <Link href="/chart">
            <div className="text-white hover:text-gray-200 transition duration-300 cursor-pointer">chart</div>
          </Link>
          <Link href="/calendar">
            <div className="text-white hover:text-gray-200 transition duration-300 cursor-pointer">calendar</div>
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
