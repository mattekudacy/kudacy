'use client';

import React from 'react';
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
    <section className="max-w-4xl">
      <h2 className="text-xs text-gray-500 dark:text-gray-500 mb-8 font-medium uppercase tracking-widest">//projects</h2>

      <div className="space-y-6">
        {projects.map((project) => (
          <a
            key={project.id}
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
          >
            <div className="flex items-start gap-4">
              <FaGithub className="text-zinc-400 dark:text-zinc-600 mt-1 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <span className="text-zinc-900 dark:text-zinc-100 group-hover:text-primary transition-colors text-sm">
                  {project.title}
                </span>
                <p className="text-zinc-600 dark:text-zinc-500 text-sm mt-1">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-3 mt-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] text-zinc-500 uppercase tracking-widest"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
