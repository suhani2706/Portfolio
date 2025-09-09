// src/components/Header.jsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const [activeSection, setActiveSection] = useState(null);
  const location = useLocation();

  useEffect(() => {
    // Only observe sections on the home route
    if (location.pathname !== '/') return;

    const sections = Array.from(document.querySelectorAll('section[id]'));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting);

        if (visible.length) {
          const best = visible.reduce((a, b) =>
            a.intersectionRatio > b.intersectionRatio ? a : b
          );
          setActiveSection(best.target.id);
          return;
        }

        let closest = null;
        let closestDistance = Infinity;
        sections.forEach(s => {
          const rect = s.getBoundingClientRect();
          const distance = Math.abs(rect.top - (window.innerHeight * 0.12));
          if (distance < closestDistance) {
            closestDistance = distance;
            closest = s;
          }
        });
        if (closest) setActiveSection(closest.id);
      },
      {
        root: null,
        rootMargin: '-30% 0px -30% 0px',
        threshold: [0, 0.01, 0.25, 0.5, 0.75, 1],
      }
    );

    sections.forEach(s => observer.observe(s));
    return () => sections.forEach(s => observer.unobserve(s));
  }, [location.pathname]);

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <a href="#about">
            <h1>Suhani Mathur</h1>
          </a>
        </div>
        <nav className="nav-menu">
  <ul className="nav-links">
    <li><a href="/#about" className={location.pathname === '/' && activeSection === 'about' ? 'active' : ''}>About</a></li>
    <li><a href="/#toolbox" className={location.pathname === '/' && activeSection === 'toolbox' ? 'active' : ''}>Skills</a></li>
    <li><a href="/#work" className={location.pathname === '/' && activeSection === 'work' ? 'active' : ''}>Work</a></li>
    <li><a href="/#experience" className={location.pathname === '/' && activeSection === 'experience' ? 'active' : ''}>Experience</a></li>
    <li><a href="/#contact" className={location.pathname === '/' && activeSection === 'contact' ? 'active' : ''}>Contact</a></li>
  </ul>

  <div className="resume-btn">
    <a
      href="/resume"
      className={`btn btn-secondary ${location.pathname === "/resume" ? "active" : ""}`}
    >
      Resume
    </a>
  </div>
</nav>

      </div>
    </header>
  );
};

export default Header;
