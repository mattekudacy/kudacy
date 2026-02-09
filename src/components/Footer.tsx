'use client';

import React from 'react';

const Footer = () => {
  return (
    <footer className="p-6 md:p-12 border-t terminal-border mt-20">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 opacity-40 hover:opacity-100 transition-opacity">
        <p className="text-[10px]">© 2026 CYRUS MANTE — BUILT WITH PRECISION</p>
        <div className="flex gap-8 text-[10px]">
          <a className="hover:text-primary transition-colors" href="https://github.com/mattekudacy" target="_blank" rel="noopener noreferrer">GITHUB</a>
          <a className="hover:text-primary transition-colors" href="https://linkedin.com/in/cyrusmante" target="_blank" rel="noopener noreferrer">LINKEDIN</a>
          <a className="hover:text-primary transition-colors" href="mailto:cyrus2952@gmail.com">EMAIL</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
