'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  SiPython, SiDjango, SiFastapi, SiDocker, SiAmazonwebservices, 
  SiGooglecloud, SiPostgresql, SiKubernetes,
  SiJavascript, SiTypescript, 
  SiNextdotjs, SiReact, SiTailwindcss,
  SiPytorch, SiTensorflow, SiScikitlearn, SiPandas, SiNumpy, 
  SiJupyter, SiNvidia
} from 'react-icons/si';
import { DiNodejs } from 'react-icons/di';
import { FaCloud } from 'react-icons/fa';

const AboutSection = () => {
  const skills = [
    {
      category: 'Machine Learning & AI',
      icon: '🧠',
      items: [
        { name: 'Python', icon: SiPython },
        { name: 'PyTorch', icon: SiPytorch },
        { name: 'TensorFlow', icon: SiTensorflow },
        { name: 'Scikit-learn', icon: SiScikitlearn },
        { name: 'Pandas', icon: SiPandas },
        { name: 'NumPy', icon: SiNumpy },
        { name: 'Jupyter', icon: SiJupyter },
        { name: 'CUDA', icon: SiNvidia },
      ]
    },
    {
      category: 'Backend Development',
      icon: '⚙️',
      items: [
        { name: 'Node.js', icon: DiNodejs },
        { name: 'Python', icon: SiPython },
        { name: 'Django', icon: SiDjango },
        { name: 'FastAPI', icon: SiFastapi },
        { name: 'PostgreSQL', icon: SiPostgresql },
        { name: 'Docker', icon: SiDocker },
      ]
    },
    {
      category: 'Cloud & DevOps',
      icon: '☁️',
      items: [
        { name: 'AWS', icon: SiAmazonwebservices },
        { name: 'Azure', icon: FaCloud },
        { name: 'GCP', icon: SiGooglecloud },
        { name: 'Kubernetes', icon: SiKubernetes },
      ]
    },
    {
      category: 'Frontend',
      icon: '🎨',
      items: [
        { name: 'React', icon: SiReact },
        { name: 'Next.js', icon: SiNextdotjs },
        { name: 'TypeScript', icon: SiTypescript },
        { name: 'JavaScript', icon: SiJavascript },
        { name: 'Tailwind', icon: SiTailwindcss },
      ]
    },
  ];

  return (
    <section id="about" className="py-32 bg-gray-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800 via-gray-900 to-gray-900"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-4 block">
            About Me
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Turning Data Into
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"> Intelligence</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            I&apos;m a Machine Learning Engineer passionate about building AI solutions 
            that solve real-world problems and drive business value.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {/* About Card */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="h-full p-8 rounded-3xl bg-gradient-to-br from-gray-800/50 to-gray-800/30 border border-gray-700/50 backdrop-blur-sm">
              <div className="space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-2xl">
                  👨‍💻
                </div>
                <h3 className="text-2xl font-bold text-white">My Journey</h3>
                <p className="text-gray-400 leading-relaxed">
                  With over 4 years of experience, I&apos;ve built intelligent systems across 
                  various domains including computer vision, NLP, and predictive analytics.
                </p>
                <p className="text-gray-400 leading-relaxed">
                  I love exploring new frameworks and sharing knowledge through talks on 
                  AI advancements. Always learning, always building.
                </p>
                <div className="pt-4 flex gap-3">
                  <span className="px-3 py-1 rounded-full text-sm bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    Problem Solver
                  </span>
                  <span className="px-3 py-1 rounded-full text-sm bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    Tech Speaker
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Skills Grid */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skills.map((skillGroup, groupIndex) => (
                <motion.div
                  key={skillGroup.category}
                  className="p-6 rounded-2xl bg-gray-800/30 border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: groupIndex * 0.1 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{skillGroup.icon}</span>
                    <h4 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">
                      {skillGroup.category}
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill) => (
                      <div 
                        key={skill.name}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-900/50 text-gray-300 text-sm hover:bg-cyan-500/10 hover:text-cyan-400 transition-all duration-200"
                      >
                        <skill.icon className="text-base" />
                        <span>{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {[
            { value: '4+', label: 'Years Experience', color: 'cyan' },
            { value: '40+', label: 'Projects Completed', color: 'blue' },
            { value: '20+', label: 'Happy Clients', color: 'purple' },
            { value: '10+', label: 'AI Models Deployed', color: 'pink' },
          ].map((stat, index) => (
            <div 
              key={stat.label}
              className="text-center p-6 rounded-2xl bg-gray-800/30 border border-gray-700/50 hover:border-gray-600 transition-colors"
            >
              <div className={`text-4xl lg:text-5xl font-bold mb-2 ${
                stat.color === 'cyan' ? 'text-cyan-400' :
                stat.color === 'blue' ? 'text-blue-400' :
                stat.color === 'purple' ? 'text-purple-400' : 'text-pink-400'
              }`}>
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
