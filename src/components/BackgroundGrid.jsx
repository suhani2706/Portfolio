// src/components/BackgroundGrid.jsx
import React, { useState, useEffect } from 'react';

const BackgroundGrid = ({ activeSection }) => {
  const [translateY, setTranslateY] = useState(0);

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      // Move grid up slightly as user scrolls (0.015px per scrolled pixel, max -15px)
      const offset = Math.max(-15, window.scrollY * -0.015);
      setTranslateY(offset);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Map active section to grid opacity
  const getGridOpacity = () => {
    switch (activeSection) {
      case 'hero':
        return 1.0;
      case 'about':
        return 0.6;
      case 'toolbox':
        return 0.35;
      case 'projects':
        return 0.2;
      case 'contact':
        return 0.0;
      default:
        return 1.0;
    }
  };

  const opacity = getGridOpacity();

  // Grid accents (aligned with 64px cells relative to center)
  // Each accent: { type, n (horizontal multiplier), m (vertical offset in px) }
  const accents = [
    { type: 'plus', n: -6, m: 192 },      // Hero Left
    { type: 'star', n: 5, m: 256 },       // Hero Right
    { type: 'crosshair', n: -4, m: 576 },  // About Left
    { type: 'mark', n: 4, m: 832 }        // Toolbox Right
  ];

  return (
    <div 
      className="grid-overlay-container" 
      style={{ 
        opacity: opacity,
        transform: `translateY(${translateY}px)`
      }}
    >
      <div className="grid-overlay-canvas" />
      
      {/* Grid Accents */}
      {accents.map((accent, idx) => (
        <div
          key={idx}
          className={`grid-accent grid-accent-${accent.type}`}
          style={{
            left: `calc(50% + ${accent.n * 64}px)`,
            top: `${accent.m}px`
          }}
        >
          {accent.type === 'plus' && (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 1V11M1 6H11" stroke="currentColor" strokeWidth="1" />
            </svg>
          )}
          {accent.type === 'star' && (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5L6 0Z" fill="currentColor" />
            </svg>
          )}
          {accent.type === 'crosshair' && (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="4" stroke="currentColor" strokeWidth="1" />
              <path d="M7 0V14M0 7H14" stroke="currentColor" strokeWidth="0.8" strokeDasharray="1 2" />
            </svg>
          )}
          {accent.type === 'mark' && (
            <svg width="16" height="8" viewBox="0 0 16 8" fill="none">
              <path d="M0 0H16M0 0V6M4 0V4M8 0V6M12 0V4M16 0V6" stroke="currentColor" strokeWidth="1" />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
};

export default BackgroundGrid;
