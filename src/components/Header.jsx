// src/components/Header.jsx
import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

const Header = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false); // 👈 state for mobile menu
  const location = useLocation();

  const navItems = [
    { id: "about", label: "About" },
    { id: "toolbox", label: "Skills" },
    { id: "work", label: "Work" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" },
  ];

  useEffect(() => {
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
      { rootMargin: "-30% 0px -30% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach(s => observer.observe(s));
    return () => sections.forEach(s => observer.unobserve(s));
  }, [location.pathname]);

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <div className="logo">
          <a href="/">
            <h1>Suhani Mathur</h1>
          </a>
        </div>

        {/* Hamburger button */}
        <button 
          className={`hamburger ${menuOpen ? "open" : ""}`} 
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Nav Menu */}
        <nav className={`nav-menu ${menuOpen ? "show" : ""}`}>
          <ul className="nav-links">
            {navItems.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={location.pathname === "/" ? `#${id}` : `/#${id}`}
                  className={location.pathname === "/" && activeSection === id ? "active" : ""}
                  onClick={() => setMenuOpen(false)} // 👈 close menu on click
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* Resume Button */}
          <div className="resume-btn">
            <Link
              to="/resume"
              className={`btn btn-secondary ${location.pathname === "/resume" ? "active" : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              Resume
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
