'use client';

import React from 'react';

const ProjectsSection = () => {
  const projects = [
    {
      id: 1,
      title: "My Personal Website",
      description: "A personal portfolio website showcasing my projects, skills, and experience as a Machine Learning Engineer and Data Scientist.",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "React"],
      githubUrl: "https://github.com/carlhanson/smart-trading-bot",
      image: "/images/portfolio.png"
    },
    {
      id: 2,
      title: "Tapix",
      description: "A Django-based web application that allows users to create and publish professional online portfolios. Users can choose from different templates, add their projects, skills, and contact information, and share their portfolio using a unique URL. This project also supports future NFC card integration.",
      tech: ["Python", "Django", "PostgreSQL", "Arduino"],
      githubUrl: "https://github.com/mattekudacy/tapix",
      image: "/images/tapix.png"
    },
    {
      id: 3,
      title: "NoteVision",
      description: "A mobile app for classifying Philippine banknote bills for blind people using computer vision and machine learning. This project utilizes TensorFlow for model training and Android Studio for app development.",
      tech: ["Python", "Tensorflow", "Android Studio"],
      githubUrl: "https://github.com/mattekudacy/notevision-app",
      image: "https://github.com/mattekudacy/notevision-app/raw/master/images/1.jpg?raw=true"
    },
    {
      id: 4,
      title: "Extractify",
      description: "Extractify is an application designed to extract relevant details such as business name, address, TIN number, date, and total cost from images of official receipts using Optical Character Recognition (OCR) and Large Language Models (LLMs). The app supports both real-time image capture from a webcam and image uploads, making it easy to digitize receipts for personal or business needs.",
      tech: ["Python", "OpenCV", "Flet"],
      githubUrl: "https://github.com/mattekudacy/extractify",
      image: "/images/extractify.png"
    },
    {
      id: 5,
      title: "Sentiment Analysis on Youtube Rewind 2018",
      description: "Out of curiosity, I wanted to analyze the sentiment of the comments on the Youtube Rewind 2018 video, a generally disliked video. I used Python and NLP techniques to perform this analysis. View the results on my GitHub.",
      tech: ["Python", "VaderSentiment", "NLTK", "Transformers", "Wordclouds"],
      githubUrl: "https://github.com/mattekudacy/sentiment-analysis-nltk",
      image: "/images/nltk.png"
    },
    {
      id: 6,
      title: "ELIFAI (Explain Like I'm Five AI)",
      description: "ELIFAI is an interactive and educational project designed to provide users with informative and playful responses to a variety of questions. It was inspired from the ELI5(Explain like I'm 5) subreddit. This project was submitted as a prototype for the lablab: NextGen GPT AI Hackathon This document also serves as a comprehensive guide to help users understand the features, architecture, and usage of ELIFAI.",
      tech: ["Python", "OpenAI", "Streamlit", "DALL·E 2"],
      githubUrl: "https://github.com/mattekudacy/ELIFAI_V2",
      image: "/images/elifai.png"
    }
  ];

  return (
    <section id="projects" className="py-20 bg-gray-900">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Featured <span className="text-cyan-400">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-cyan-400"></div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="bg-gray-800 border border-gray-700 overflow-hidden hover:border-cyan-400 transition-colors group"
            >
              {/* Project Image */}
              <div className="h-48 overflow-hidden bg-gray-900">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Project Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  {project.title}
                </h3>
                
                <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, index) => (
                    <span 
                      key={index}
                      className="text-xs px-2 py-1 bg-gray-900 text-cyan-400 border border-gray-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* GitHub Link */}
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block text-sm text-cyan-400 hover:text-cyan-300"
                >
                  View on GitHub →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
