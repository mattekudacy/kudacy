'use client';

import React from 'react';
import { FaGithub } from 'react-icons/fa';
import { motion } from 'framer-motion';

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] } },
};

const ProjectsSection = () => {
  const projects = [
    {
      id: 1,
      title: "My Personal Website",
      description: "A modern portfolio website showcasing my projects and skills as a Machine Learning Engineer.",
      tech: ["Next.js", "TypeScript", "Tailwind CSS"],
      githubUrl: "https://github.com/mattekudacy/kudacy",
    },
    {
      id: 2,
      title: "Tapix",
      description: "Django-based web app for creating professional online portfolios with NFC card integration support.",
      tech: ["Python", "Django", "PostgreSQL"],
      githubUrl: "https://github.com/mattekudacy/tapix",
    },
    {
      id: 3,
      title: "NoteVision",
      description: "Mobile app for classifying Philippine banknotes for visually impaired users using computer vision.",
      tech: ["Python", "TensorFlow", "Android Studio"],
      githubUrl: "https://github.com/mattekudacy/notevision-app",
    },
    {
      id: 4,
      title: "Extractify",
      description: "OCR application that extracts business details from receipt images using LLMs.",
      tech: ["Python", "OpenCV", "Flet"],
      githubUrl: "https://github.com/mattekudacy/extractify",
    },
    {
      id: 5,
      title: "YouTube Sentiment Analysis",
      description: "NLP analysis of YouTube Rewind 2018 comments using sentiment analysis techniques.",
      tech: ["Python", "NLTK", "Transformers"],
      githubUrl: "https://github.com/mattekudacy/sentiment-analysis-nltk",
    },
  ];

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
        className="font-mono text-xs text-gray-500 dark:text-gray-500 mb-8 font-medium uppercase tracking-widest border-l-2 border-primary/40 pl-3"
      >
        //projects
      </motion.h2>

      <div className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
        {projects.map((project) => (
          <motion.a
            key={project.id}
            variants={staggerItem}
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-4 py-5 first:pt-0"
          >
            <FaGithub className="text-zinc-400 dark:text-zinc-600 mt-1 flex-shrink-0 group-hover:text-primary transition-colors" />
            <div className="flex-1 min-w-0">
              <span className="font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-primary transition-colors text-sm">
                {project.title}
              </span>
              <p className="text-zinc-600 dark:text-zinc-500 text-sm mt-1 font-light">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-3 mt-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </motion.section>
  );
};

export default ProjectsSection;
