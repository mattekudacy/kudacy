'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaGithub } from 'react-icons/fa';

const ContactSection = () => {
  const contactInfo = [
    {
      icon: FaEnvelope,
      label: 'Email',
      value: 'cyrus2952@gmail.com',
      link: 'mailto:cyrus2952@gmail.com'
    },
    {
      icon: FaMapMarkerAlt,
      label: 'Location',
      value: 'Philippines',
      link: null
    }
  ];

  const socialLinks = [
    { icon: FaLinkedin, url: 'https://linkedin.com/in/cyrusmante', label: 'LinkedIn' },
    { icon: FaGithub, url: 'https://github.com/mattekudacy', label: 'GitHub' },
  ];

  return (
    <section id="contact" className="py-32 bg-gray-900 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent"></div>
      </div>

      <div className="max-w-3xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-4 block">
            Contact
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Let&apos;s Work <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Together</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Have a project in mind? I&apos;d love to hear about it. 
            Reach out through any of the channels below.
          </p>
        </motion.div>

        {/* Contact Info Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {contactInfo.map((item, index) => (
            <div 
              key={index} 
              className="p-6 rounded-2xl bg-gray-800/30 border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gray-800/50 border border-gray-700/50 flex items-center justify-center group-hover:border-cyan-500/30 group-hover:bg-cyan-500/5 transition-all duration-300">
                  <item.icon className="text-xl text-cyan-400" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">{item.label}</div>
                  {item.link ? (
                    <a href={item.link} className="text-white hover:text-cyan-400 transition-colors font-medium">
                      {item.value}
                    </a>
                  ) : (
                    <div className="text-white font-medium">{item.value}</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Social Links */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h4 className="text-white font-semibold mb-6">Connect with me</h4>
          <div className="flex justify-center gap-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 rounded-2xl bg-gray-800/50 border border-gray-700/50 flex items-center justify-center text-gray-400 hover:text-white hover:border-cyan-500/30 hover:bg-cyan-500/10 transition-all duration-300"
                aria-label={social.label}
              >
                <social.icon className="text-xl" />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Availability Card */}
        <motion.div 
          className="mt-12 p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-white font-semibold">Currently Available</span>
          </div>
          <p className="text-gray-400 text-sm">
            I&apos;m open to freelance projects and full-time opportunities. 
            Let&apos;s discuss how I can help with your next project.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
