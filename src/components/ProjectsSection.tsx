'use client';

import React from 'react';
import { motion } from 'framer-motion';

const ProjectsSection = () => {
  const projects = [
    {
      id: 1,
      title: "My Personal Website",
      description: "A personal portfolio website showcasing my projects, skills, and experience as a Machine Learning Engineer and Data Scientist.",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "React"],
      stars: 0,
      forks: 0,
      githubUrl: "https://github.com/carlhanson/smart-trading-bot",
      image: "/images/portfolio.png"
    },
    {
      id: 2,
      title: "Tapix",
      description: "A Django-based web application that allows users to create and publish professional online portfolios. Users can choose from different templates, add their projects, skills, and contact information, and share their portfolio using a unique URL. This project also supports future NFC card integration.",
      tech: ["Python", "Django", "PostgreSQL", "Arduino"],
      stars: 0,
      forks: 0,
      githubUrl: "https://github.com/mattekudacy/tapix",
      image: "/images/tapix.png"
    },
    {
      id: 3,
      title: "NoteVision",
      description: "A mobile app for classifying Philippine banknote bills for blind people using computer vision and machine learning. This project utilizes TensorFlow for model training and Android Studio for app development.",
      tech: ["Python", "Tensorflow", "Android Studio"],
      stars: 0,
      forks: 0,
      githubUrl: "https://github.com/mattekudacy/notevision-app ",
      image: "https://github.com/mattekudacy/notevision-app/raw/master/images/1.jpg?raw=true"
    },
    {
      id: 4,
      title: "Extractify",
      description: "Extractify is an application designed to extract relevant details such as business name, address, TIN number, date, and total cost from images of official receipts using Optical Character Recognition (OCR) and Large Language Models (LLMs). The app supports both real-time image capture from a webcam and image uploads, making it easy to digitize receipts for personal or business needs.",
      tech: ["Python", "OpenCV", "Flet"],
      stars: 0,
      forks: 0,
      githubUrl: "https://github.com/mattekudacy/extractify",
      image: "/images/extractify.png"
    },
    {
      id: 5,
      title: "Sentiment Analysis on Youtube Rewind 2018",
      description: "Out of curiosity, I wanted to analyze the sentiment of the comments on the Youtube Rewind 2018 video, a generally disliked video. I used Python and NLP techniques to perform this analysis. View the results on my GitHub.",
      tech: ["Python", "VaderSentiment", "NLTK", "Transformers", "Wordclouds"],
      stars: 0,
      forks: 0,
      githubUrl: "https://github.com/mattekudacy/sentiment-analysis-nltk",
      image: "/images/nltk.png"
    },
    {
      id: 6,
      title: "ELIFAI (Explain Like I'm Five AI)",
      description: "ELIFAI is an interactive and educational project designed to provide users with informative and playful responses to a variety of questions. It was inspired from the ELI5(Explain like I'm 5) subreddit. This project was submitted as a prototype for the lablab: NextGen GPT AI Hackathon This document also serves as a comprehensive guide to help users understand the features, architecture, and usage of ELIFAI.",
      tech: ["Python", "OpenAI", "Streamlit", "DALL·E 2"],
      stars: 0,
      forks: 0,
      githubUrl: "https://github.com/mattekudacy/ELIFAI_V2",
      image: "/images/elifai.png"
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const projectVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1
    }
  };

  return (
    <section id="projects" className="py-20 bg-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Animated Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2 
            className="text-4xl lg:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Latest <span className="text-cyan-400 relative">
              Projects
              <motion.span
                className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                viewport={{ once: true }}
                style={{ originX: 0 }}
              />
            </span>
          </motion.h2>
          <motion.p 
            className="text-gray-400 text-lg max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Take a look at my personal and fun projects!
          </motion.p>
        </motion.div>

        {/* Projects Container */}
        <motion.div 
          className="space-y-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              className="group"
              variants={projectVariants}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Project Image - Always on the left */}
                <motion.div 
                  className="relative"
                  initial={{ 
                    opacity: 0, 
                    x: -100
                  }}
                  whileInView={{ 
                    opacity: 1, 
                    x: 0
                  }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.2
                  }}
                  viewport={{ once: true }}
                >
                  <motion.div 
                    className="relative bg-gray-800 rounded-lg overflow-hidden border border-gray-700 group-hover:border-cyan-400 transition-all duration-500"
                    whileHover={{ 
                      y: -10,
                      boxShadow: "0 25px 50px rgba(6, 182, 212, 0.3)",
                      scale: 1.05
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Animated border glow */}
                    <motion.div
                      className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-lg opacity-0 group-hover:opacity-75 blur transition-opacity duration-500"
                      animate={{
                        background: [
                          "linear-gradient(0deg, #06b6d4, #3b82f6, #8b5cf6)",
                          "linear-gradient(120deg, #06b6d4, #3b82f6, #8b5cf6)",
                          "linear-gradient(240deg, #06b6d4, #3b82f6, #8b5cf6)",
                          "linear-gradient(360deg, #06b6d4, #3b82f6, #8b5cf6)"
                        ]
                      }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    />
                    
                    <div className="relative bg-gray-800 rounded-lg overflow-hidden">
                      <motion.img 
                        src={project.image}
                        alt={project.title}
                        className="w-full h-64 object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                      {/* Fallback placeholder */}
                      <div className="w-full h-64 bg-gray-700 flex items-center justify-center text-6xl" style={{ display: 'none' }}>
                        💻
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Project Details - Always on the right */}
                <motion.div 
                  className="space-y-6"
                  initial={{ 
                    opacity: 0, 
                    x: 100
                  }}
                  whileInView={{ 
                    opacity: 1, 
                    x: 0 
                  }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.2 + 0.3
                  }}
                  viewport={{ once: true }}
                >
                  {/* Project Title */}
                  <motion.h3 
                    className="text-3xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300"
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {project.title}
                  </motion.h3>

                  {/* Project Description */}
                  <motion.p 
                    className="text-gray-300 text-lg leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 + 0.5, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    {project.description}
                  </motion.p>

                  {/* Technologies */}
                  <motion.div 
                    className="flex flex-wrap gap-3"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 + 0.7, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    {project.tech.map((tech, techIndex) => (
                      <motion.span 
                        key={tech}
                        className="px-4 py-2 bg-gray-800 text-cyan-300 rounded-full text-sm border border-gray-700 hover:border-cyan-400 hover:bg-gray-700 transition-all duration-300"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ 
                          delay: index * 0.2 + 0.9 + techIndex * 0.1, 
                          duration: 0.4,
                          type: "spring",
                          stiffness: 300
                        }}
                        whileHover={{ 
                          scale: 1.1,
                          y: -2
                        }}
                        viewport={{ once: true }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </motion.div>

                  {/* GitHub Stats */}
                  <motion.div 
                    className="flex items-center space-x-8 text-gray-400"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 + 1.1, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <motion.div 
                      className="flex items-center space-x-2"
                      whileHover={{ scale: 1.1, color: "#fbbf24" }}
                      transition={{ duration: 0.2 }}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.953a1 1 0 00.95.69h4.159c.969 0 1.371 1.24.588 1.81l-3.364 2.445a1 1 0 00-.364 1.118l1.286 3.953c.3.921-.755 1.688-1.54 1.118L10 13.587l-3.364 2.445c-.784.57-1.838-.197-1.539-1.118l1.286-3.953a1 1 0 00-.364-1.118L2.655 9.38c-.783-.57-.38-1.81.588-1.81h4.159a1 1 0 00.95-.69l1.286-3.953z"/>
                      </svg>
                      <span>{project.stars}</span>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-center space-x-2"
                      whileHover={{ scale: 1.1, color: "#06b6d4" }}
                      transition={{ duration: 0.2 }}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414L2.586 7l3.707-3.707a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      <span>{project.forks}</span>
                    </motion.div>
                    
                    <motion.a 
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 font-medium transition-colors group"
                      whileHover={{ scale: 1.05, x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      <span>View Project</span>
                    </motion.a>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Animated View More Button */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="https://github.com/mattekudacy"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <motion.button 
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-4 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(6, 182, 212, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              View All Projects
            </motion.button>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
