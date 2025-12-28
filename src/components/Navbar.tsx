'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900 border-b border-gray-800">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-white hover:text-cyan-400 transition-colors">
              kudacy
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="flex items-baseline space-x-8">
              <Link 
                href="#home" 
                className="text-gray-300 hover:text-cyan-400 px-3 py-2 text-sm font-medium transition-colors"
              >
                Home
              </Link>
              <Link 
                href="#about" 
                className="text-gray-300 hover:text-cyan-400 px-3 py-2 text-sm font-medium transition-colors"
              >
                About
              </Link>
              <Link 
                href="#projects" 
                className="text-gray-300 hover:text-cyan-400 px-3 py-2 text-sm font-medium transition-colors"
              >
                Projects
              </Link>
              <Link 
                href="#contact" 
                className="text-gray-300 hover:text-cyan-400 px-3 py-2 text-sm font-medium transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="bg-gray-800 p-2 text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-800" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link 
                href="#home" 
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-300 hover:text-cyan-400 hover:bg-gray-800 block px-3 py-2 text-base font-medium"
              >
                Home
              </Link>
              <Link 
                href="#about" 
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-300 hover:text-cyan-400 hover:bg-gray-800 block px-3 py-2 text-base font-medium"
              >
                About
              </Link>
              <Link 
                href="#projects" 
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-300 hover:text-cyan-400 hover:bg-gray-800 block px-3 py-2 text-base font-medium"
              >
                Projects
              </Link>
              <Link 
                href="#contact" 
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-300 hover:text-cyan-400 hover:bg-gray-800 block px-3 py-2 text-base font-medium"
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
