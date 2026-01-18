'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';

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
    <section id="projects" className="py-12 md:py-16 px-4 sm:px-8 md:px-16 lg:px-24 border-t border-gray-800">
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-gray-400 text-sm mb-6 md:mb-8">//projects</p>
          
          <div className="space-y-5 md:space-y-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <FaGithub className="text-gray-400 mt-1 flex-shrink-0 text-sm sm:text-base" />
                  <div className="flex-1 min-w-0">
                    <a 
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:underline text-sm sm:text-base break-words">
                      {project.title}
                    </a>
                    <p className="text-gray-400 text-xs sm:text-sm mt-1">
                      <span className="text-gray-500">// </span>
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1 sm:gap-2 mt-2">
                      {project.tech.map((tech) => (
                        <span 
                          key={tech}
                          className="text-xs text-gray-500"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
