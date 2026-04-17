'use client';

import React from 'react';

const ContactSection = () => {
  return (
    <table id="contact" width="100%" cellPadding={8} cellSpacing={0} style={{ border: '3px ridge #006688', background: '#f0faff', marginBottom: '8px' }}>
      <tbody>
        <tr>
          <td>
            <div style={{ background: 'linear-gradient(90deg, #004466, #0088bb)', color: '#ffff00', fontWeight: 'bold', fontSize: '13px', padding: '4px 8px', marginBottom: '8px', fontFamily: '"Arial Black", sans-serif' }}>
              📬 CONTACT ME!!! DON&apos;T BE SHY!!! 📬
            </div>

            <p style={{ fontSize: '12px', fontFamily: '"Comic Sans MS", cursive', color: '#004466', marginBottom: '12px', lineHeight: '1.6' }}>
              Have a project in mind?? I&apos;d <strong>LOVE</strong> to hear about it!!!
              Click the buttons below or yell at me on the internet!!! 🎉
            </p>

            <table cellPadding={4} cellSpacing={6}>
              <tbody>
                <tr>
                  <td>
                    <a
                      href="mailto:cyrus2952@gmail.com"
                      style={{
                        display: 'inline-block',
                        background: 'linear-gradient(180deg, #ffcccc, #ff6666)',
                        border: '3px outset #ff0000',
                        padding: '6px 14px',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        color: '#ffffff',
                        textDecoration: 'none',
                        fontFamily: '"Arial", sans-serif',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      📧 EMAIL ME!!!
                    </a>
                  </td>
                  <td>
                    <a
                      href="https://github.com/mattekudacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-block',
                        background: 'linear-gradient(180deg, #cccccc, #333333)',
                        border: '3px outset #666666',
                        padding: '6px 14px',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        color: '#ffffff',
                        textDecoration: 'none',
                        fontFamily: '"Arial", sans-serif',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      🐙 MY GITHUB!!!
                    </a>
                  </td>
                  <td>
                    <a
                      href="https://linkedin.com/in/cyrusmante"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-block',
                        background: 'linear-gradient(180deg, #aaccff, #0066cc)',
                        border: '3px outset #0044aa',
                        padding: '6px 14px',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        color: '#ffffff',
                        textDecoration: 'none',
                        fontFamily: '"Arial", sans-serif',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      👔 LINKEDIN!!!
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>

            <div style={{ marginTop: '12px', padding: '6px', background: '#ccffcc', border: '2px solid #00aa00', display: 'inline-block' }}>
              <span style={{ fontSize: '12px', fontFamily: '"Comic Sans MS", cursive', color: '#006600' }}>
                ✅ STATUS: <strong>AVAILABLE FOR WORK!!!</strong> 🎉🎉🎉
              </span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default ContactSection;
