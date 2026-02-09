'use client';

import React from 'react';
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';

const ContactSection = () => {
  return (
    <section className="max-w-4xl">
      <h2 className="text-xs text-gray-500 dark:text-gray-500 mb-2 font-medium uppercase tracking-widest">//contact</h2>
      <p className="text-zinc-500 dark:text-zinc-600 text-sm mb-8">
        have a project in mind? i&apos;d love to hear about it.
      </p>

      <div className="space-y-4">
        <a
          href="mailto:cyrus2952@gmail.com"
          className="flex items-center gap-4 text-zinc-700 dark:text-zinc-400 hover:text-primary transition-colors text-sm"
        >
          <FaEnvelope className="text-zinc-400 dark:text-zinc-600 flex-shrink-0" />
          <span>cyrus2952@gmail.com</span>
        </a>

        <a
          href="https://github.com/mattekudacy"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 text-zinc-700 dark:text-zinc-400 hover:text-primary transition-colors text-sm"
        >
          <FaGithub className="text-zinc-400 dark:text-zinc-600 flex-shrink-0" />
          <span>github.com/mattekudacy</span>
        </a>

        <a
          href="https://linkedin.com/in/cyrusmante"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 text-zinc-700 dark:text-zinc-400 hover:text-primary transition-colors text-sm"
        >
          <FaLinkedin className="text-zinc-400 dark:text-zinc-600 flex-shrink-0" />
          <span>linkedin.com/in/cyrusmante</span>
        </a>
      </div>

      <div className="mt-8">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <span className="text-zinc-500 dark:text-zinc-600 text-xs">status: available for work</span>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
