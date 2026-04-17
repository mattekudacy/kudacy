'use client';

import React, { useEffect, useState } from 'react';
import Footer from './Footer';

interface HeroSectionProps {
  children?: React.ReactNode;
}

const HeroSection = ({ children }: HeroSectionProps) => {
  const [time, setTime] = useState('--:--:-- --');
  const [isDark, setIsDark] = useState(false);
  const [visitorCount] = useState(() => Math.floor(Math.random() * 90000) + 10000);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleString('en-US', {
        timeZone: 'Asia/Manila',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      setTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    setIsDark(!isDark);
  };

  return (
    <>
      {/* Marquee ticker */}
      <div className="marquee-wrapper">
        <span className="marquee-content">
          ★★★ WELCOME TO CYRUS MANTE&apos;S AWESOME WEBSITE!!! ★★★ &nbsp;&nbsp; BEST VIEWED IN 800x600 RESOLUTION &nbsp;&nbsp; ★★★ AI ENGINEER &amp; DATA SCIENTIST FROM THE PHILIPPINES!!! ★★★ &nbsp;&nbsp; CLICK THE LINKS BELOW FOR COOL STUFF!!! &nbsp;&nbsp; ★★★ THIS SITE IS UNDER CONSTRUCTION 🚧 COME BACK LATER FOR MORE!!!! ★★★ &nbsp;&nbsp; YOU ARE VISITOR NUMBER {visitorCount.toLocaleString()} &nbsp;&nbsp;
        </span>
      </div>

      {/* Outer page table layout */}
      <table id="top" width="100%" cellPadding={0} cellSpacing={0} style={{ borderCollapse: 'collapse', width: '100%' }}>
        <tbody>
          <tr>
            <td>
              {/* Main header banner */}
              <table width="100%" cellPadding={8} cellSpacing={2} style={{ background: 'linear-gradient(180deg, #000080 0%, #0000cc 100%)', border: '4px ridge #aaaaff' }}>
                <tbody>
                  <tr>
                    <td align="center" style={{ padding: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
                        <img
                          src="/images/me.jpg"
                          alt="Cyrus Mante"
                          style={{
                            width: '90px',
                            height: '90px',
                            borderRadius: '50%',
                            border: '4px groove #ffff00',
                            objectFit: 'cover',
                          }}
                        />
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '30px', fontWeight: 'bold', fontFamily: '"Impact", "Arial Black", sans-serif', letterSpacing: '2px' }}>
                            <span className="rainbow-text">★ CYRUS MANTE ★</span>
                          </div>
                          <div style={{ color: '#00ffff', fontSize: '14px', fontFamily: '"Comic Sans MS", cursive', marginTop: '4px' }}>
                            ~*~ AI Engineer &amp; Data Scientist ~*~
                          </div>
                          <div style={{ color: '#ffff00', fontSize: '11px', marginTop: '4px' }} suppressHydrationWarning>
                            <span className="blink">🔴</span> ONLINE NOW |&nbsp;
                            Manila Time: <strong suppressHydrationWarning>{time}</strong>
                          </div>
                        </div>
                        <img
                          src="/images/me.jpg"
                          alt="Cyrus Mante"
                          style={{
                            width: '90px',
                            height: '90px',
                            borderRadius: '50%',
                            border: '4px groove #ffff00',
                            objectFit: 'cover',
                            transform: 'scaleX(-1)',
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Navigation bar */}
              <table width="100%" cellPadding={4} cellSpacing={2} style={{ background: '#c0c0c0', border: '3px ridge #ffffff', borderTop: '3px inset #888888' }}>
                <tbody>
                  <tr>
                    <td align="center">
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', justifyContent: 'center' }}>
                        {[
                          { label: 'HOME', href: '#top' },
                          { label: 'ABOUT ME', href: '#about' },
                          { label: 'MY PROJECTS!!!', href: '#projects' },
                          { label: 'BLOG', href: '#blog' },
                          { label: 'CONTACT ME', href: '#contact' },
                        ].map(({ label, href }) => (
                          <a
                            key={label}
                            href={href}
                            style={{
                              display: 'inline-block',
                              background: 'linear-gradient(180deg, #e0e0e0, #a0a0a0)',
                              border: '2px outset #ffffff',
                              padding: '3px 10px',
                              fontSize: '11px',
                              fontWeight: 'bold',
                              color: '#000080',
                              cursor: 'pointer',
                              fontFamily: '"Arial", sans-serif',
                              textDecoration: 'none',
                              userSelect: 'none',
                            }}
                          >
                            {label}
                          </a>
                        ))}
                        <button
                          onClick={toggleTheme}
                          style={{
                            display: 'inline-block',
                            background: 'linear-gradient(180deg, #ffffcc, #ffff88)',
                            border: '2px outset #ffffff',
                            padding: '3px 10px',
                            fontSize: '11px',
                            fontWeight: 'bold',
                            color: '#cc0000',
                            cursor: 'pointer',
                            fontFamily: '"Arial", sans-serif',
                          }}
                        >
                          💡 {isDark ? 'LIGHT MODE' : 'DARK MODE'}
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Main 2-column layout */}
              <table width="100%" cellPadding={0} cellSpacing={4} style={{ marginTop: '4px' }}>
                <tbody>
                  <tr>
                    {/* LEFT SIDEBAR */}
                    <td width="200" valign="top">
                      {/* Visitor counter box */}
                      <table width="100%" cellPadding={6} cellSpacing={0} style={{ border: '3px inset #888888', background: '#000000', marginBottom: '8px' }}>
                        <tbody>
                          <tr>
                            <td align="center">
                              <div style={{ color: '#ff0000', fontSize: '10px', fontFamily: '"Arial", sans-serif', fontWeight: 'bold' }}>YOU ARE VISITOR:</div>
                              <div style={{ color: '#00ff00', fontSize: '22px', fontFamily: '"Courier New", monospace', fontWeight: 'bold', letterSpacing: '4px' }}>
                                {String(visitorCount).split('').map((d, i) => (
                                  <span key={i} style={{ background: '#004400', padding: '0 2px', margin: '0 1px', border: '1px inset #00aa00' }}>{d}</span>
                                ))}
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      {/* Under construction */}
                      <table width="100%" cellPadding={6} cellSpacing={0} style={{ border: '3px outset #ffff00', background: '#ffff00', marginBottom: '8px', textAlign: 'center' }}>
                        <tbody>
                          <tr>
                            <td>
                              <div style={{ fontSize: '30px', lineHeight: '1' }}>🚧</div>
                              <div style={{ fontSize: '10px', fontWeight: 'bold', color: '#000000', fontFamily: '"Arial", sans-serif' }}>
                                UNDER<br />CONSTRUCTION!
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      {/* Links box */}
                      <table width="100%" cellPadding={6} cellSpacing={0} style={{ border: '3px ridge #0000cc', background: '#eeeeff', marginBottom: '8px' }}>
                        <tbody>
                          <tr>
                            <td>
                              <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#000080', marginBottom: '6px', fontFamily: '"Arial", sans-serif', borderBottom: '1px solid #0000cc' }}>
                                🔗 COOL LINKS!!!
                              </div>
                              <div style={{ fontSize: '11px', lineHeight: '1.8', fontFamily: '"Arial", sans-serif' }}>
                                <div>📧 <a href="mailto:cyrus2952@gmail.com">EMAIL ME!!!</a></div>
                                <div>💻 <a href="https://github.com/mattekudacy" target="_blank" rel="noopener noreferrer">MY GITHUB</a></div>
                                <div>👔 <a href="https://linkedin.com/in/cyrusmante" target="_blank" rel="noopener noreferrer">LINKEDIN</a></div>
                                <div>🌐 <a href="https://mattekudacy.is-a.dev">MY SITE</a></div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      {/* Availability badge */}
                      <table width="100%" cellPadding={6} cellSpacing={0} style={{ border: '3px ridge #00aa00', background: '#ccffcc', marginBottom: '8px', textAlign: 'center' }}>
                        <tbody>
                          <tr>
                            <td>
                              <div style={{ fontSize: '20px' }}><span className="blink">✅</span></div>
                              <div style={{ fontSize: '10px', fontWeight: 'bold', color: '#006600', fontFamily: '"Arial", sans-serif' }}>
                                AVAILABLE<br />FOR WORK!!!
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      {/* Philippines flag */}
                      <table width="100%" cellPadding={6} cellSpacing={0} style={{ border: '3px ridge #cccccc', background: '#ffffff', marginBottom: '8px', textAlign: 'center' }}>
                        <tbody>
                          <tr>
                            <td>
                              <div style={{ fontSize: '28px' }}>🇵🇭</div>
                              <div style={{ fontSize: '10px', fontWeight: 'bold', fontFamily: '"Arial", sans-serif', color: '#000' }}>PHILIPPINES</div>
                              <div style={{ fontSize: '9px', fontFamily: '"Arial", sans-serif', color: '#555' }}>Representing!!! 🌟</div>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      {/* Best viewed notice */}
                      <table width="100%" cellPadding={6} cellSpacing={0} style={{ border: '2px solid #999999', background: '#f0f0f0', textAlign: 'center' }}>
                        <tbody>
                          <tr>
                            <td>
                              <div style={{ fontSize: '9px', fontFamily: '"Arial", sans-serif', color: '#333333', lineHeight: '1.4' }}>
                                🖥️ BEST VIEWED IN<br />
                                <strong>INTERNET EXPLORER 6</strong><br />
                                800×600 RESOLUTION<br />
                                <span style={{ color: '#666' }}>(or any modern browser lol)</span>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>

                    {/* MAIN CONTENT AREA */}
                    <td valign="top" style={{ padding: '0 0 0 4px' }}>
                      {/* About section */}
                      <table id="about" width="100%" cellPadding={8} cellSpacing={0} style={{ border: '3px ridge #0000cc', background: '#fffef0', marginBottom: '8px' }}>
                        <tbody>
                          <tr>
                            <td>
                              <div style={{ background: 'linear-gradient(90deg, #000080, #0000cc)', color: '#ffff00', fontWeight: 'bold', fontSize: '13px', padding: '4px 8px', marginBottom: '8px', fontFamily: '"Arial Black", sans-serif' }}>
                                ★ ABOUT ME ★
                              </div>
                              <p style={{ fontSize: '12px', lineHeight: '1.7', fontFamily: '"Comic Sans MS", cursive', color: '#000000', margin: 0 }}>
                                Hi!!!! I&apos;m <strong>Cyrus</strong>, my friends call me <strong>cy</strong> 😁
                                I enjoy building <span className="rainbow-text" style={{ fontWeight: 'bold' }}>SUPER DYNAMIC AND CREATIVE</span> products
                                from start to finish!!! I focus on developing intuitive experiences
                                that constantly grow and improve. If you wanna collab, <a href="mailto:cyrus2952@gmail.com">EMAIL ME!!!</a> 💌
                              </p>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      {/* Work Experience */}
                      <table width="100%" cellPadding={8} cellSpacing={0} style={{ border: '3px ridge #cc0000', background: '#fff0f0', marginBottom: '8px' }}>
                        <tbody>
                          <tr>
                            <td>
                              <div style={{ background: 'linear-gradient(90deg, #cc0000, #ff4444)', color: '#ffffff', fontWeight: 'bold', fontSize: '13px', padding: '4px 8px', marginBottom: '8px', fontFamily: '"Arial Black", sans-serif' }}>
                                💼 WORK EXPERIENCE!!!
                              </div>

                              {/* Job 1 */}
                              <table width="100%" cellPadding={6} cellSpacing={0} style={{ border: '2px inset #ff8888', background: '#ffffff', marginBottom: '8px' }}>
                                <tbody>
                                  <tr>
                                    <td>
                                      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                                        <strong style={{ color: '#000080', fontSize: '12px', fontFamily: '"Arial", sans-serif' }}>📚 Cambridge University Press</strong>
                                        <span style={{ color: '#666666', fontSize: '10px', fontFamily: '"Arial", sans-serif' }}>Oct 2025 - Present</span>
                                      </div>
                                      <div style={{ color: '#cc0000', fontSize: '11px', fontFamily: '"Comic Sans MS", cursive', marginTop: '2px' }}>AI Software Developer 🤖</div>
                                      <ul style={{ margin: '6px 0 0 16px', padding: 0, fontSize: '11px', fontFamily: '"Arial", sans-serif', color: '#333333', lineHeight: '1.6' }}>
                                        <li>Collaborating with design teams on complex UIs 🎨</li>
                                        <li>Migrating monolith → microservices architecture ⚡</li>
                                      </ul>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>

                              {/* Job 2 */}
                              <table width="100%" cellPadding={6} cellSpacing={0} style={{ border: '2px inset #ff8888', background: '#ffffff' }}>
                                <tbody>
                                  <tr>
                                    <td>
                                      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                                        <strong style={{ color: '#000080', fontSize: '12px', fontFamily: '"Arial", sans-serif' }}>🏢 Accenture</strong>
                                        <span style={{ color: '#666666', fontSize: '10px', fontFamily: '"Arial", sans-serif' }}>Sept 2024 - Sept 2025</span>
                                      </div>
                                      <div style={{ color: '#cc0000', fontSize: '11px', fontFamily: '"Comic Sans MS", cursive', marginTop: '2px' }}>AI/ML Computational Science Analyst 🧮</div>
                                      <ul style={{ margin: '6px 0 0 16px', padding: 0, fontSize: '11px', fontFamily: '"Arial", sans-serif', color: '#333333', lineHeight: '1.6' }}>
                                        <li>ML models for predictive analytics and NLP 🧠</li>
                                        <li>Built data pipelines and automated workflows 🔧</li>
                                      </ul>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      {/* Technologies */}
                      <table width="100%" cellPadding={8} cellSpacing={0} style={{ border: '3px ridge #008800', background: '#f0fff0', marginBottom: '8px' }}>
                        <tbody>
                          <tr>
                            <td>
                              <div style={{ background: 'linear-gradient(90deg, #006600, #00aa00)', color: '#ffff00', fontWeight: 'bold', fontSize: '13px', padding: '4px 8px', marginBottom: '8px', fontFamily: '"Arial Black", sans-serif' }}>
                                💾 MY AWESOME TECH STACK!!!
                              </div>
                              <table width="100%" cellPadding={4} cellSpacing={4}>
                                <tbody>
                                  <tr>
                                    {[
                                      { label: '🤖 AI/ML', techs: 'Python • TensorFlow • PyTorch • Scikit-learn' },
                                      { label: '🌐 Frontend', techs: 'React • Next.js • TypeScript • TailwindCSS' },
                                      { label: '⚙️ Backend', techs: 'Node.js • Django • FastAPI • PostgreSQL' },
                                      { label: '☁️ Cloud', techs: 'AWS • Docker • GCP • Azure' },
                                    ].map((cat) => (
                                      <td key={cat.label} valign="top" style={{ border: '2px inset #88cc88', background: '#ffffff', padding: '6px', fontSize: '10px', fontFamily: '"Arial", sans-serif', width: '25%' }}>
                                        <div style={{ fontWeight: 'bold', color: '#006600', marginBottom: '4px' }}>{cat.label}</div>
                                        <div style={{ color: '#333333', lineHeight: '1.5' }}>{cat.techs}</div>
                                      </td>
                                    ))}
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      {/* Child sections (Projects, Blog, Contact) */}
                      {children}
                    </td>
                  </tr>
                </tbody>
              </table>

              <Footer />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default HeroSection;
