import React from 'react';
import './Footer.css';

export function Footer({ onLogoClick }) {
  const links = [
    { label: 'GitHub', href: 'https://github.com/codewithot' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/victory-ikuomola' },
    { label: 'Email', href: 'mailto:victoryikuomola@gmail.com' },
  ];

  return (
    <footer className="footer-bar">
      <div className="footer-inner">
        <div className="footer-left">
          <a
            href="#"
            className="brand-logo footer-logo"
            onClick={(e) => {
              e.preventDefault();
              if (onLogoClick) onLogoClick();
            }}
            aria-label="Back to top"
          >
            VI
          </a>
        </div>

        <div className="footer-right">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
