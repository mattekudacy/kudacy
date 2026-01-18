'use client';

import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0f0f0f] border-b border-gray-800 px-4 sm:px-8 md:px-16 lg:px-24 py-3 md:py-4">
      <div className="flex flex-wrap justify-between items-center text-[10px] sm:text-xs md:text-sm gap-4 md:gap-6">
        <Link href="/" className="flex flex-col hover:opacity-80 transition-opacity">
          <span className="text-gray-500">//portfolio</span>
          <span className="text-gray-300">cyrus.dev</span>
        </Link>
        <div className="flex flex-col">
          <span className="text-gray-500">//contact</span>
          <span className="text-gray-300 truncate max-w-[120px] sm:max-w-none">cyrus2952@gmail.com</span>
        </div>
        <div className="flex flex-col hidden sm:flex">
          <span className="text-gray-500">//github</span>
          <span className="text-gray-300">github.com/mattekudacy</span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
