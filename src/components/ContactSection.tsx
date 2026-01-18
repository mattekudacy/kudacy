'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';

const ContactSection = () => {
  return (
    <section id="contact" className="py-12 md:py-16 px-4 sm:px-8 md:px-16 lg:px-24 border-t border-gray-800">
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-gray-400 text-sm mb-2">//contact</p>
          <p className="text-gray-400 text-xs sm:text-sm mb-6 md:mb-8">
            <span className="text-gray-500">// </span>
            have a project in mind? i&apos;d love to hear about it.
          </p>

          <div className="space-y-3 sm:space-y-4">
            <a 
              href="mailto:cyrus2952@gmail.com"
              className="flex items-center gap-2 sm:gap-3 text-gray-300 hover:text-white transition-colors text-sm sm:text-base break-all"
            >
              <FaEnvelope className="text-gray-500 flex-shrink-0" />
              <span>cyrus2952@gmail.com</span>
            </a>
            
            <a 
              href="https://github.com/mattekudacy"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 sm:gap-3 text-gray-300 hover:text-white transition-colors text-sm sm:text-base"
            >
              <FaGithub className="text-gray-500 flex-shrink-0" />
              <span>github.com/mattekudacy</span>
            </a>
            
            <a 
              href="https://linkedin.com/in/cyrusmante"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 sm:gap-3 text-gray-300 hover:text-white transition-colors text-sm sm:text-base"
            >
              <FaLinkedin className="text-gray-500 flex-shrink-0" />
              <span>linkedin.com/in/cyrusmante</span>
            </a>
          </div>

          <div className="mt-6 sm:mt-8">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-gray-500 text-xs sm:text-sm">status: available for work</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
