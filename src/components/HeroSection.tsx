'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleString('en-US', {
        timeZone: 'Asia/Manila',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
      setTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Fixed Top Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0f0f0f] border-b border-gray-800 px-4 sm:px-8 md:px-16 lg:px-24 py-3 md:py-4">
        <div className="flex flex-wrap justify-between text-[10px] sm:text-xs md:text-sm gap-4 md:gap-6">
          <div className="flex flex-col">
            <span className="text-gray-500">//portfolio</span>
            <span className="text-gray-300">mattekudacy.is-a.dev</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500">//contact</span>
            <span className="text-gray-300 truncate max-w-[120px] sm:max-w-none">cyrus2952@gmail.com</span>
          </div>
          <div className="flex flex-col hidden sm:flex">
            <span className="text-gray-500">//github</span>
            <span className="text-gray-300">github.com/mattekudacy</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500">//location</span>
            <span className="text-gray-300">PH {time}</span>
          </div>
        </div>
      </header>

      <section id="home" className="min-h-screen relative px-4 sm:px-8 md:px-16 lg:px-24 pt-28 sm:pt-32 pb-16 md:pb-20">
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >

          {/* Profile Section */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mb-12 md:mb-16 text-center sm:text-left">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 flex-shrink-0"
            >
              <div className="w-full h-full rounded-full border-2 border-gray-700 overflow-hidden bg-gray-800">
                <div className="w-full h-full flex items-center justify-center text-4xl sm:text-5xl md:text-6xl">
                  👨‍💻
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-white">
                &lt;Cyrus Mante&gt;
              </h1> 
              <p className="text-sm sm:text-base md:text-lg text-gray-400 mt-1">
                //ai engineer and data scientist
              </p>
            </motion.div>
          </div>

          {/* About Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mb-12 md:mb-16"
          >
            <p className="text-gray-400 text-sm mb-3 md:mb-4">//about</p>
            <p className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed">
              hi, i&apos;m Cyrus, my friends call me cy. i enjoy building 
              dynamic, creative products from start to finish, focused on 
              developing intuitive experiences that constantly grow and improve 
              based on your satisfaction.
            </p>
          </motion.div>

          {/* Work Experience Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <p className="text-gray-400 text-sm mb-6 md:mb-8">//work experience</p>
            
            <div className="space-y-8 md:space-y-10">
              {/* Job 1 */}
              <div className="grid grid-cols-1 sm:grid-cols-[140px,1fr] md:grid-cols-[180px,1fr] gap-2 sm:gap-4">
                <div className="text-xs sm:text-sm text-gray-500">
                  oct 2025 - present
                </div>
                <div>
                  <div className="inline-block px-2 sm:px-3 py-1 border border-gray-600 rounded text-xs sm:text-sm mb-2 sm:mb-3">
                    <span className="text-white">Cambridge University Press</span>
                    <span className="text-gray-400 block sm:inline"> //ai software developer</span>
                  </div>
                  <ul className="text-xs sm:text-sm text-gray-300 space-y-2">
                    <li className="flex gap-2">
                      <span className="text-gray-500">●</span>
                      <span>collaborate with design teams to implement various complex user interfaces to prioritize features for the product releases.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-gray-500">●</span>
                      <span>migrated endpoints architecture from monolith to microservices for efficient scaling.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Job 2 */}
              <div className="grid grid-cols-1 sm:grid-cols-[140px,1fr] md:grid-cols-[180px,1fr] gap-2 sm:gap-4">
                <div className="text-xs sm:text-sm text-gray-500">
                  sept 2024 - sept 2025
                </div>
                <div>
                  <div className="inline-block px-2 sm:px-3 py-1 border border-gray-600 rounded text-xs sm:text-sm mb-2 sm:mb-3">
                    <span className="text-white">Accenture</span>
                    <span className="text-gray-400 block sm:inline"> //ai/ml computational science analyst</span>
                  </div>
                  <ul className="text-xs sm:text-sm text-gray-300 space-y-2">
                    <li className="flex gap-2">
                      <span className="text-gray-500">●</span>
                      <span>developed and deployed machine learning models for predictive analytics and natural language processing.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-gray-500">●</span>
                      <span>built data pipelines and automated workflows for model training and inference.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
