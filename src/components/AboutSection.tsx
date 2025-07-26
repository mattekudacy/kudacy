'use client';

import React from 'react';
import { ReactTyped } from 'react-typed';
import { motion } from 'framer-motion';
import { 
  SiPython, SiDjango, SiFastapi, SiDocker, SiAmazonwebservices, 
  SiGooglecloud, SiPostgresql , SiKubernetes,
  SiHtml5, SiJavascript, SiTypescript, 
  SiNextdotjs, SiReact, SiTailwindcss,
  SiPytorch, SiTensorflow, SiScikitlearn, SiPandas, SiNumpy, 
  SiJupyter, SiNvidia
} from 'react-icons/si';
import { DiNodejs } from 'react-icons/di';
import { FaCloud } from 'react-icons/fa';

const AboutSection = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1
    }
  };

  const techItemVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      rotateY: -90
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0
    }
  };

  return (
    <section id="about" className="py-20 bg-gray-800 overflow-hidden">
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
            About <span className="text-cyan-400 relative">
              Me
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
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Left content */}
          <motion.div 
            className="space-y-8 lg:col-span-2"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={itemVariants}>
              <motion.h2 
                className="text-4xl lg:text-5xl font-bold text-white mb-6"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                I Specialize in
              </motion.h2>
              <motion.div 
                className="text-3xl lg:text-4xl font-bold mb-6"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <span className="text-gray-300">&gt; </span>
                <ReactTyped
                  strings={[
                    'Machine Learning',
                    'Backend Development',
                    'Data Engineering',
                    'AI Solutions',
                    'Cloud Architecture'
                  ]}
                  typeSpeed={80}
                  backSpeed={50}
                  backDelay={2000}
                  loop={true}
                  className="text-cyan-400"
                />
                <motion.span 
                  className="text-gray-300"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  _
                </motion.span>
              </motion.div>
              <motion.p 
                className="text-gray-300 text-lg leading-relaxed mb-6"
                variants={itemVariants}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                I&apos;m a passionate Machine Learning Engineer with over 4 years of experience building 
                intelligent systems and scalable backend solutions. I specialize in creating AI-powered 
                applications and robust data pipelines that drive business value.
              </motion.p>
              <motion.p 
                className="text-gray-300 text-lg leading-relaxed"
                variants={itemVariants}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                Outside of work, you&apos;ll find me exploring new frameworks,
                and giving out talks on the latest advancements in AI. This way, I stay at the forefront of technology.
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Right content - Skills */}
          <motion.div 
            className="space-y-6 lg:col-span-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Backend Development */}
            <motion.div 
              className="bg-gray-900 p-6 rounded-lg border border-gray-700 hover:border-cyan-400 transition-all duration-500"
              variants={itemVariants}
              whileHover={{ 
                y: -5,
                boxShadow: "0 25px 50px rgba(6, 182, 212, 0.15)",
                scale: 1.02
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.h3 
                className="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-3"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <motion.span
                  whileHover={{ color: "#06b6d4" }}
                  transition={{ duration: 0.2 }}
                >
                  Back-End Development
                </motion.span>
              </motion.h3>
              <motion.div 
                className="grid grid-cols-4 gap-3"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {[
                  { name: 'Node.js', icon: DiNodejs, color: '#68A063' },
                  { name: 'Python', icon: SiPython, color: '#3776AB' },
                  { name: 'Django', icon: SiDjango, color: '#092E20' },
                  { name: 'FastAPI', icon: SiFastapi, color: '#009688' },
                  { name: 'PostgreSQL', icon: SiPostgresql, color: '#336791' },
                  { name: 'Docker', icon: SiDocker, color: '#2496ED' },
                  { name: 'AWS', icon: SiAmazonwebservices, color: '#FF9900' },
                  { name: 'Azure', icon: FaCloud, color: '#0078D4' },
                  { name: 'GCP', icon: SiGooglecloud, color: '#4285F4' },
                  { name: 'Kubernetes', icon: SiKubernetes, color: '#326CE5' },
                ].map((tech, index) => (
                  <motion.div 
                    key={tech.name} 
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 cursor-pointer group"
                    variants={techItemVariants}
                    whileHover={{ 
                      scale: 1.1,
                      y: -2,
                      backgroundColor: "rgba(6, 182, 212, 0.1)"
                    }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    <motion.div
                      whileHover={{ rotate: 360, color: tech.color }}
                      transition={{ duration: 0.5 }}
                    >
                      <tech.icon className="text-lg text-gray-400 flex-shrink-0 group-hover:text-cyan-400" />
                    </motion.div>
                    <span className="text-gray-300 text-sm font-medium truncate group-hover:text-white">{tech.name}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Frontend UI/UX Design */}
            <motion.div 
              className="bg-gray-900 p-6 rounded-lg border border-gray-700 hover:border-cyan-400 transition-all duration-500"
              variants={itemVariants}
              whileHover={{ 
                y: -5,
                boxShadow: "0 25px 50px rgba(6, 182, 212, 0.15)",
                scale: 1.02
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.h3 
                className="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-3"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <motion.span
                  whileHover={{ color: "#06b6d4" }}
                  transition={{ duration: 0.2 }}
                >
                  Front-End UI/UX Design
                </motion.span>
              </motion.h3>
              <motion.div 
                className="grid grid-cols-4 gap-3"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {[
                  { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
                  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
                  { name: 'React', icon: SiReact, color: '#61DAFB' },
                  { name: 'Next.js', icon: SiNextdotjs, color: '#000000' },
                  { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
                  { name: 'HTML5', icon: SiHtml5, color: '#E34F26' },
                ].map((tech, index) => (
                  <motion.div 
                    key={tech.name} 
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 cursor-pointer group"
                    variants={techItemVariants}
                    whileHover={{ 
                      scale: 1.1,
                      y: -2,
                      backgroundColor: "rgba(6, 182, 212, 0.1)"
                    }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    <motion.div
                      whileHover={{ rotate: 360, color: tech.color }}
                      transition={{ duration: 0.5 }}
                    >
                      <tech.icon className="text-lg text-gray-400 flex-shrink-0 group-hover:text-cyan-400" />
                    </motion.div>
                    <span className="text-gray-300 text-sm font-medium truncate group-hover:text-white">{tech.name}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Machine Learning */}
            <motion.div 
              className="bg-gray-900 p-6 rounded-lg border border-gray-700 hover:border-cyan-400 transition-all duration-500"
              variants={itemVariants}
              whileHover={{ 
                y: -5,
                boxShadow: "0 25px 50px rgba(6, 182, 212, 0.15)",
                scale: 1.02
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.h3 
                className="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-3"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <motion.span
                  whileHover={{ color: "#06b6d4" }}
                  transition={{ duration: 0.2 }}
                >
                  Machine Learning & AI
                </motion.span>
              </motion.h3>
              <motion.div 
                className="grid grid-cols-4 gap-3"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {[
                  { name: 'Python', icon: SiPython, color: '#3776AB' },
                  { name: 'PyTorch', icon: SiPytorch, color: '#EE4C2C' },
                  { name: 'TensorFlow', icon: SiTensorflow, color: '#FF6F00' },
                  { name: 'Scikit-learn', icon: SiScikitlearn, color: '#F7931E' },
                  { name: 'Pandas', icon: SiPandas, color: '#150458' },
                  { name: 'NumPy', icon: SiNumpy, color: '#013243' },
                  { name: 'Jupyter', icon: SiJupyter, color: '#F37626' },
                  { name: 'CUDA', icon: SiNvidia, color: '#76B900' },
                ].map((tech, index) => (
                  <motion.div 
                    key={tech.name} 
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 cursor-pointer group"
                    variants={techItemVariants}
                    whileHover={{ 
                      scale: 1.1,
                      y: -2,
                      backgroundColor: "rgba(6, 182, 212, 0.1)"
                    }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    <motion.div
                      whileHover={{ rotate: 360, color: tech.color }}
                      transition={{ duration: 0.5 }}
                    >
                      <tech.icon className="text-lg text-gray-400 flex-shrink-0 group-hover:text-cyan-400" />
                    </motion.div>
                    <span className="text-gray-300 text-sm font-medium truncate group-hover:text-white">{tech.name}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
