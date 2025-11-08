'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaEnvelope,  
  FaMapMarkerAlt, 
  FaLinkedin, 
  FaGithub, 
} from 'react-icons/fa';

const ContactSection = () => {
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

  const iconVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0,
      rotate: -180
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0
    }
  };

  const contactInfo = [
    {
      icon: FaEnvelope,
      label: 'Email',
      value: 'cyrus2952@gmail.com',
      link: 'mailto:cyrus2952@gmail.com',
      color: '#EF4444'
    },
    {
      icon: FaMapMarkerAlt,
      label: 'Location',
      value: 'Philippines',
      link: null,
      color: '#F59E0B'
    }
  ];

  const socialLinks = [
    {
      icon: FaLinkedin,
      label: 'LinkedIn',
      url: 'https://linkedin.com/in/cyrusmante',
      color: '#0077B5'
    },
    {
      icon: FaGithub,
      label: 'GitHub',
      url: 'https://github.com/mattekudacy',
      color: '#333333'
    },
  ];

  return (
    <section id="contact" className="py-20 bg-gray-900 overflow-hidden">
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
            Let&apos;s <span className="text-cyan-400 relative">
              Connect
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
            Ready to bring your ideas to life? Let&apos;s discuss your project and 
            how I can help you achieve your goals.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Contact Info */}
          <motion.div 
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={itemVariants}>
              <motion.h3 
                className="text-2xl font-semibold text-white mb-6"
                whileHover={{ x: 10 }}
                transition={{ duration: 0.2 }}
              >
                Get in Touch
              </motion.h3>
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <motion.div 
                    key={item.label}
                    className="group"
                    variants={itemVariants}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item.link ? (
                      <motion.a
                        href={item.link}
                        className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-800 transition-all duration-300 cursor-pointer"
                        whileHover={{ 
                          x: 10,
                          backgroundColor: "rgba(6, 182, 212, 0.1)"
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <motion.div 
                          className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                          variants={iconVariants}
                          transition={{ delay: index * 0.2 + 0.3 }}
                          whileHover={{ 
                            backgroundColor: item.color,
                            rotate: 360
                          }}
                        >
                          <item.icon className="text-white text-xl" />
                        </motion.div>
                        <div>
                          <p className="text-gray-400 text-sm group-hover:text-cyan-400 transition-colors">
                            {item.label}
                          </p>
                          <p className="text-white text-lg group-hover:text-cyan-300 transition-colors">
                            {item.value}
                          </p>
                        </div>
                      </motion.a>
                    ) : (
                      <motion.div
                        className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-800 transition-all duration-300"
                        whileHover={{ 
                          x: 10,
                          backgroundColor: "rgba(6, 182, 212, 0.1)"
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <motion.div 
                          className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                          variants={iconVariants}
                          transition={{ delay: index * 0.2 + 0.3 }}
                          whileHover={{ 
                            backgroundColor: item.color,
                            rotate: 360
                          }}
                        >
                          <item.icon className="text-white text-xl" />
                        </motion.div>
                        <div>
                          <p className="text-gray-400 text-sm group-hover:text-cyan-400 transition-colors">
                            {item.label}
                          </p>
                          <p className="text-white text-lg group-hover:text-cyan-300 transition-colors">
                            {item.value}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants}>
              <motion.h4 
                className="text-lg font-semibold text-white mb-6"
                whileHover={{ x: 10 }}
                transition={{ duration: 0.2 }}
              >
                Follow Me
              </motion.h4>
              <motion.div 
                className="flex space-x-4"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                    variants={iconVariants}
                    transition={{ delay: index * 0.1 + 0.5 }}
                    whileHover={{ 
                      scale: 1.2,
                      y: -5
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <motion.div 
                      className="w-12 h-12 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-all duration-300 border border-gray-700 hover:border-cyan-400"
                      whileHover={{ 
                        backgroundColor: social.color,
                        borderColor: social.color,
                        boxShadow: `0 10px 30px ${social.color}40`
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <social.icon className="text-white text-xl group-hover:scale-110 transition-transform duration-300" />
                    </motion.div>
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Call to Action Card */}
          <motion.div 
            className="relative"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.3 }}
          >
            <motion.div 
              className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700 hover:border-cyan-400 transition-all duration-500 relative overflow-hidden"
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 25px 50px rgba(6, 182, 212, 0.15)"
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Animated background gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 via-blue-500/10 to-purple-500/10 opacity-0 hover:opacity-100 transition-opacity duration-500"
                animate={{
                  background: [
                    "linear-gradient(45deg, rgba(6, 182, 212, 0.1), rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))",
                    "linear-gradient(90deg, rgba(6, 182, 212, 0.1), rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))",
                    "linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))",
                    "linear-gradient(180deg, rgba(6, 182, 212, 0.1), rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))",
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              
              <div className="relative z-10">
                <motion.h3 
                  className="text-2xl font-bold text-white mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  Ready to Start Your Project?
                </motion.h3>
                <motion.p 
                  className="text-gray-300 text-lg mb-6 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  I&apos;m always excited to work on new and challenging projects. 
                  Whether you need help with machine learning solutions, backend development, 
                  or full-stack applications, let&apos;s bring your ideas to life!
                </motion.p>
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <motion.a
                    href="mailto:cyrus2952@gmail.com"
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 text-center"
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 10px 30px rgba(6, 182, 212, 0.3)"
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    📧 Send Email
                  </motion.a>
                  <motion.a
                    href="https://linkedin.com/in/cyrusmante"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 text-center border border-gray-600 hover:border-cyan-400"
                    whileHover={{ 
                      scale: 1.05,
                      backgroundColor: "#0077B5"
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    💼 LinkedIn
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
