'use client';

import React from 'react';

const ProjectsSection = () => {
  const projects = [
    {
      id: 1,
      title: "My Personal Website",
      description: "A modern portfolio website showcasing my projects and skills as a Machine Learning Engineer.",
      tech: ["Next.js", "TypeScript", "Tailwind CSS"],
      githubUrl: "https://github.com/mattekudacy/kudacy",
      emoji: "🌐",
    },
    {
      id: 2,
      title: "Tapix",
      description: "Django-based web app for creating professional online portfolios with NFC card integration support.",
      tech: ["Python", "Django", "PostgreSQL"],
      githubUrl: "https://github.com/mattekudacy/tapix",
      emoji: "💳",
    },
    {
      id: 3,
      title: "NoteVision",
      description: "Mobile app for classifying Philippine banknotes for visually impaired users using computer vision.",
      tech: ["Python", "TensorFlow", "Android Studio"],
      githubUrl: "https://github.com/mattekudacy/notevision-app",
      emoji: "👁️",
    },
    {
      id: 4,
      title: "Extractify",
      description: "OCR application that extracts business details from receipt images using LLMs.",
      tech: ["Python", "OpenCV", "Flet"],
      githubUrl: "https://github.com/mattekudacy/extractify",
      emoji: "🧾",
    },
    {
      id: 5,
      title: "YouTube Sentiment Analysis",
      description: "NLP analysis of YouTube Rewind 2018 comments using sentiment analysis techniques.",
      tech: ["Python", "NLTK", "Transformers"],
      githubUrl: "https://github.com/mattekudacy/sentiment-analysis-nltk",
      emoji: "📊",
    },
  ];

  return (
    <table id="projects" width="100%" cellPadding={8} cellSpacing={0} style={{ border: '3px ridge #cc6600', background: '#fff8f0', marginBottom: '8px' }}>
      <tbody>
        <tr>
          <td>
            <div style={{ background: 'linear-gradient(90deg, #cc6600, #ff8800)', color: '#ffffff', fontWeight: 'bold', fontSize: '13px', padding: '4px 8px', marginBottom: '8px', fontFamily: '"Arial Black", sans-serif' }}>
              🚀 MY TOTALLY AWESOME PROJECTS!!! 🚀
            </div>

            <table width="100%" cellPadding={4} cellSpacing={4}>
              <tbody>
                {projects.map((project, idx) => (
                  <tr key={project.id} style={{ background: idx % 2 === 0 ? '#fffaec' : '#fff5e0' }}>
                    <td style={{ width: '30px', textAlign: 'center', fontSize: '20px', verticalAlign: 'top', paddingTop: '8px' }}>
                      {project.emoji}
                    </td>
                    <td style={{ border: '2px inset #ddaa66', background: '#ffffff', padding: '6px', verticalAlign: 'top' }}>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontWeight: 'bold', fontSize: '12px', fontFamily: '"Arial", sans-serif', color: '#000080' }}
                      >
                        {project.title}
                      </a>
                      <div style={{ fontSize: '11px', fontFamily: '"Comic Sans MS", cursive', color: '#333333', marginTop: '3px', lineHeight: '1.5' }}>
                        {project.description}
                      </div>
                      <div style={{ marginTop: '4px', display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            style={{
                              background: '#000080',
                              color: '#ffffff',
                              fontSize: '9px',
                              padding: '1px 5px',
                              fontFamily: '"Courier New", monospace',
                              fontWeight: 'bold',
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td style={{ width: '80px', textAlign: 'center', verticalAlign: 'middle' }}>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-block',
                          background: 'linear-gradient(180deg, #ffff88, #ffcc00)',
                          border: '2px outset #ffffff',
                          padding: '3px 8px',
                          fontSize: '10px',
                          fontWeight: 'bold',
                          color: '#000000',
                          textDecoration: 'none',
                          fontFamily: '"Arial", sans-serif',
                          cursor: 'pointer',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        🐙 CLICK!!!
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default ProjectsSection;
