'use client';

import React from 'react';
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';
import { motion } from 'framer-motion';

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] } },
};

const ContactSection = () => {
  return (
    <motion.section
      className="max-w-4xl"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={staggerContainer}
    >
      <motion.h2
        variants={staggerItem}
        className="font-mono text-xs text-gray-500 dark:text-gray-500 mb-2 font-medium uppercase tracking-widest border-l-2 border-primary/40 pl-3"
      >
        //contact
      </motion.h2>
      <motion.p variants={staggerItem} className="text-zinc-500 dark:text-zinc-600 text-sm mb-8 font-light">
        have a project in mind? i&apos;d love to hear about it.
      </motion.p>

      <div className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
        <motion.a
          variants={staggerItem}
          href="mailto:cyrus2952@gmail.com"
          className="flex items-center gap-4 text-zinc-700 dark:text-zinc-400 hover:text-primary transition-colors text-sm py-4 first:pt-0"
        >
          <FaEnvelope className="text-zinc-400 dark:text-zinc-600 flex-shrink-0" />
          <span>cyrus2952@gmail.com</span>
        </motion.a>

        <motion.a
          variants={staggerItem}
          href="https://github.com/mattekudacy"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 text-zinc-700 dark:text-zinc-400 hover:text-primary transition-colors text-sm py-4"
        >
          <FaGithub className="text-zinc-400 dark:text-zinc-600 flex-shrink-0" />
          <span>github.com/mattekudacy</span>
        </motion.a>

        <motion.a
          variants={staggerItem}
          href="https://linkedin.com/in/cyrusmante"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 text-zinc-700 dark:text-zinc-400 hover:text-primary transition-colors text-sm py-4"
        >
          <FaLinkedin className="text-zinc-400 dark:text-zinc-600 flex-shrink-0" />
          <span>linkedin.com/in/cyrusmante</span>
        </motion.a>
      </div>

      <motion.div variants={staggerItem} className="mt-8">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <span className="text-zinc-500 dark:text-zinc-600 text-xs">status: available for work</span>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default ContactSection;
