'use client';

import React from 'react';
import { 
  FaEnvelope,  
  FaMapMarkerAlt, 
  FaLinkedin, 
  FaGithub, 
} from 'react-icons/fa';

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
    {
      icon: FaLinkedin,
      label: 'LinkedIn',
      url: 'https://linkedin.com/in/cyrusmante'
    },
    {
      icon: FaGithub,
      label: 'GitHub',
      url: 'https://github.com/mattekudacy'
    },
  ];

  return (
    <section id="contact" className="py-20 bg-gray-800">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Get In <span className="text-cyan-400">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-cyan-400"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
            
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-900 border border-gray-700 flex items-center justify-center">
                    <item.icon className="text-cyan-400 text-lg" />
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">{item.label}</div>
                    {item.link ? (
                      <a href={item.link} className="text-white hover:text-cyan-400">
                        {item.value}
                      </a>
                    ) : (
                      <div className="text-white">{item.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="pt-8">
              <h4 className="text-lg font-semibold text-white mb-4">Follow Me</h4>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gray-900 border border-gray-700 flex items-center justify-center hover:border-cyan-400 hover:bg-gray-800 transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="text-cyan-400 text-lg" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Message Form */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-400 text-sm mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-3 focus:outline-none focus:border-cyan-400"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-400 text-sm mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-3 focus:outline-none focus:border-cyan-400"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-400 text-sm mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-3 focus:outline-none focus:border-cyan-400 resize-none"
                  placeholder="Your message"
                />
              </div>

              <button
                type="submit"
                className="bg-cyan-400 text-gray-900 px-6 py-3 font-semibold hover:bg-cyan-300 transition-colors w-full"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
