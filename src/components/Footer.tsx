'use client';

import React from 'react';

const Footer = () => {
  return (
    <table width="100%" cellPadding={0} cellSpacing={0} style={{ marginTop: '8px', borderTop: '4px groove #000080' }}>
      <tbody>
        {/* Rainbow bar */}
        <tr>
          <td>
            <div style={{ height: '8px', background: 'linear-gradient(90deg, #ff0000, #ff8800, #ffff00, #00aa00, #0000ff, #8800ff, #ff0000)' }} />
          </td>
        </tr>
        <tr>
          <td style={{ background: 'linear-gradient(180deg, #000080, #000044)', padding: '10px' }}>
            <table width="100%" cellPadding={0} cellSpacing={0}>
              <tbody>
                <tr>
                  <td style={{ color: '#ffff00', fontSize: '10px', fontFamily: '"Comic Sans MS", cursive', textAlign: 'center' }}>
                    <div>© 2026 <strong>CYRUS MANTE</strong> — BUILT WITH ❤️ AND WAY TOO MUCH COFFEE ☕</div>
                    <div style={{ marginTop: '6px', display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
                      <a href="https://github.com/mattekudacy" target="_blank" rel="noopener noreferrer" style={{ color: '#00ffff' }}>🐙 GITHUB</a>
                      <a href="https://linkedin.com/in/cyrusmante" target="_blank" rel="noopener noreferrer" style={{ color: '#00ffff' }}>👔 LINKEDIN</a>
                      <a href="mailto:cyrus2952@gmail.com" style={{ color: '#00ffff' }}>📧 EMAIL</a>
                    </div>
                    <div style={{ marginTop: '8px', color: '#888888', fontSize: '9px' }}>
                      This site best viewed in Netscape Navigator 4.0 or Internet Explorer 5.5+
                    </div>
                    <div style={{ marginTop: '4px' }}>
                      <span style={{ color: '#ff8800', fontSize: '9px' }}>
                        🚧 PAGE LAST UPDATED: WHENEVER I FELT LIKE IT 🚧
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        {/* Bottom rainbow bar */}
        <tr>
          <td>
            <div style={{ height: '8px', background: 'linear-gradient(90deg, #8800ff, #0000ff, #00aa00, #ffff00, #ff8800, #ff0000, #8800ff)' }} />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Footer;
