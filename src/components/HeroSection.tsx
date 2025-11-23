'use client';

import React, { useState } from 'react';
import { ReactTyped } from 'react-typed';

const HeroSection = () => {
  const [nameTyped, setNameTyped] = useState(false);
  
  return (
    <section id="home" className="min-h-screen bg-gray-900 text-white flex items-center relative overflow-hidden pt-16">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div className="space-y-8 order-2 lg:order-1">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-gray-300">&gt; </span>
                <ReactTyped
                  strings={['Cyrus Mante']}
                  typeSpeed={100} 
                  showCursor={true}
                  cursorChar="_"
                  className="text-white"
                  onComplete={() => setNameTyped(true)}
                />
              </h1>
              
              <div className={`transition-opacity duration-1000 ${nameTyped ? 'opacity-100' : 'opacity-0'}`}>
                <h2 className="text-3xl lg:text-4xl font-bold leading-tight">
                  <span className="text-cyan-400">Machine Learning Engineer</span> &{' '}
                  <br />
                  <span className="text-cyan-400">Data Scientist</span>
                </h2>
              </div>
            </div>

            <div className={`transition-opacity duration-1000 delay-500 ${nameTyped ? 'opacity-100' : 'opacity-0'}`}>
              <p className="text-gray-400 text-lg max-w-xl leading-relaxed">
                Building intelligent systems that transform data into actionable insights. 
                I design and deploy machine learning models that solve real-world problems, 
                from predictive analytics to computer vision and natural language processing, 
                helping businesses unlock the power of artificial intelligence.
              </p>
            </div>

            {/* Statistics */}
            <div className={`transition-opacity duration-1000 delay-1000 ${nameTyped ? 'opacity-100' : 'opacity-0'}`}>
              <div className="flex flex-wrap gap-12 pt-8 border-t border-gray-700">
                <div className="hover:scale-110 transition-transform duration-300">
                  <div className="text-4xl lg:text-5xl font-bold text-red-400 mb-2">4+</div>
                  <div className="text-gray-400 text-sm uppercase tracking-wide">Years of<br />Experience</div>
                </div>
                <div className="hover:scale-110 transition-transform duration-300">
                  <div className="text-4xl lg:text-5xl font-bold text-blue-400 mb-2">20+</div>
                  <div className="text-gray-400 text-sm uppercase tracking-wide">Satisfied<br />Clients</div>
                </div>
                <div className="hover:scale-110 transition-transform duration-300">
                  <div className="text-4xl lg:text-5xl font-bold text-cyan-400 mb-2">40+</div>
                  <div className="text-gray-400 text-sm uppercase tracking-wide">Solutions<br />Deployed</div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className={`transition-opacity duration-1000 delay-1500 ${nameTyped ? 'opacity-100' : 'opacity-0'}`}>
              <div className="pt-8">
                <a href='https://docs.google.com/document/d/1DhbWY81LX608xCGZq3zYWxomhyi0VqsXO1zBR0d8UHQ/edit?usp=sharing' target='_blank'>
                  <button className="group bg-transparent text-white px-8 py-4 font-medium hover:bg-cyan-500/10 transition-all duration-300 border border-cyan-500/50 hover:border-cyan-400 rounded-lg">
                    <span className="relative z-10">Download Resume</span>
                  </button>
                </a>
              </div>
            </div>
          </div>

          {/* Right content - Image */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="relative group">
              {/* Main image container */}
              <div className="w-80 h-96 lg:w-96 lg:h-[500px] bg-gray-800 rounded-2xl overflow-hidden border border-gray-700/50 shadow-xl transition-all duration-500 hover:border-cyan-500/30">
                {/* Professional headshot placeholder with better styling */}
                <div className="w-full h-full flex items-center justify-center relative">
                  <div className="text-8xl text-cyan-400 transition-transform duration-500">
                    <img src="/images/me.jpg" alt="Cyrus Mante" className="w-full h-full object-cover" />
                  </div>
                  {/* Overlay text */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg p-3 border border-gray-700/50">
                      <p className="text-white text-sm font-medium">Cyrus Mante</p>
                      <p className="text-gray-400 text-xs">And his C2 Green Bottle</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Enhanced decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full opacity-20 blur-xl animate-pulse group-hover:opacity-40 transition-opacity duration-500"></div>
              <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20 blur-lg animate-pulse group-hover:opacity-40 transition-opacity duration-500"></div>
              
              {/* Additional accent elements */}
              <div className="absolute top-1/2 -right-2 w-4 h-16 bg-cyan-400 rounded-full opacity-30 animate-pulse group-hover:opacity-60 transition-opacity duration-500"></div>
              <div className="absolute bottom-1/4 -left-2 w-3 h-12 bg-blue-400 rounded-full opacity-40 animate-pulse group-hover:opacity-70 transition-opacity duration-500"></div>
              
              {/* Floating particles */}
              <div className="absolute top-10 right-10 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
              <div className="absolute bottom-20 left-10 w-1 h-1 bg-blue-400 rounded-full animate-ping"></div>
              <div className="absolute top-1/3 left-5 w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
