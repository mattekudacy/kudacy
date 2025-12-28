'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const ProjectsSection = () => {
  const projects = [
    {
      id: 1,
      title: "My Personal Website",
      description: "A modern portfolio website showcasing my projects and skills as a Machine Learning Engineer.",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "React"],
      githubUrl: "https://github.com/mattekudacy/kudacy",
      image: "/images/portfolio.png",
      featured: true
    },
    {
      id: 2,
      title: "Tapix",
      description: "Django-based web app for creating professional online portfolios with NFC card integration support.",
      tech: ["Python", "Django", "PostgreSQL", "Arduino"],
      githubUrl: "https://github.com/mattekudacy/tapix",
      image: "/images/tapix.png",
      featured: true
    },
    {
      id: 3,
      title: "NoteVision",
      description: "Mobile app for classifying Philippine banknotes for visually impaired users using computer vision.",
      tech: ["Python", "TensorFlow", "Android Studio"],
      githubUrl: "https://github.com/mattekudacy/notevision-app",
      image: "https://github.com/mattekudacy/notevision-app/raw/master/images/1.jpg?raw=true",
      featured: true
    },
    {
      id: 4,
      title: "Extractify",
      description: "OCR application that extracts business details from receipt images using LLMs.",
      tech: ["Python", "OpenCV", "Flet"],
      githubUrl: "https://github.com/mattekudacy/extractify",
      image: "/images/extractify.png"
    },
    {
      id: 5,
      title: "YouTube Sentiment Analysis",
      description: "NLP analysis of YouTube Rewind 2018 comments using sentiment analysis techniques.",
      tech: ["Python", "NLTK", "Transformers"],
      githubUrl: "https://github.com/mattekudacy/sentiment-analysis-nltk",
      image: "/images/nltk.png"
    },
    {
      id: 6,
      title: "ELIFAI",
      description: "Interactive AI project providing playful responses, inspired by ELI5 subreddit. Hackathon submission.",
      tech: ["Python", "OpenAI", "Streamlit", "DALL·E 2"],
      githubUrl: "https://github.com/mattekudacy/ELIFAI_V2",
      image: "/images/elifai.png"
    }
  ];

  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  return (
    <section id="projects" className="py-32 bg-gray-800 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.02)_1px,transparent_1px)] bg-[size:80px_80px]"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-4 block">
            Portfolio
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Projects</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A collection of projects showcasing my expertise in machine learning, 
            computer vision, and full-stack development.
          </p>
        </motion.div>

        {/* Featured Projects */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="h-full rounded-3xl overflow-hidden bg-gray-900/50 border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/10">
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent"></div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.slice(0, 3).map((tech) => (
                      <span 
                        key={tech}
                        className="px-2.5 py-1 text-xs font-medium rounded-full bg-gray-800 text-gray-300 border border-gray-700"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-gray-800 text-gray-500">
                        +{project.tech.length - 3}
                      </span>
                    )}
                  </div>
                  
                  {/* Links */}
                  <div className="flex gap-3">
                    <a 
                      href={project.githubUrl} 
                      target="_blank"
                      className="flex items-center gap-2 text-sm text-gray-400 hover:text-cyan-400 transition-colors"
                    >
                      <FaGithub /> Code
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other Projects */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-2xl font-bold text-white mb-8 text-center">More Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {otherProjects.map((project, index) => (
              <motion.a
                key={project.id}
                href={project.githubUrl}
                target="_blank"
                className="group p-6 rounded-2xl bg-gray-900/30 border border-gray-700/50 hover:border-cyan-500/30 hover:bg-gray-900/50 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-cyan-400">
                    <FaGithub className="text-lg" />
                  </div>
                  <FaExternalLinkAlt className="text-gray-600 group-hover:text-cyan-400 transition-colors" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h4>
                <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.slice(0, 3).map((tech) => (
                    <span key={tech} className="text-xs text-gray-500">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* View More */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <a 
            href="https://github.com/mattekudacy" 
            target="_blank"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gray-700 text-gray-300 hover:text-white hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all duration-300"
          >
            <FaGithub /> View All Projects on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
