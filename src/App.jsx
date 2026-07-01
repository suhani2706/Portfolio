// src/App.jsx
import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import BackgroundGrid from './components/BackgroundGrid';
import Hero from './components/Hero';
import About from './components/About';
import Toolbox from './components/Toolbox';
import Projects from './components/Projects';
import BehindScenes from './components/BehindScenes';
import Footer from './components/Footer';

function App() {
  const [activeSection, setActiveSection] = useState('hero');

  // Set up intersection observer to change grid opacity based on active section
  useEffect(() => {
    const sections = ['hero', 'about', 'toolbox', 'projects', 'contact'];
    
    const observerOptions = {
      root: null,
      // Focus on the middle section of the viewport
      rootMargin: '-30% 0px -40% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="App">
      {/* Background Architectural Grid overlay */}
      <BackgroundGrid activeSection={activeSection} />
      
      {/* Top Navbar */}
      <Header />
      
      <main>
        {/* Hero Section */}
        <Hero />
        
        {/* Section 01 - About Me */}
        <About />
        
        {/* Section 02 - Toolbox */}
        <Toolbox />
        
        {/* Section 03 - Selected Work */}
        <Projects />
        
        {/* Section 04 - Behind the Scenes */}
        <BehindScenes />
      </main>

      {/* Section 05 - Contact / Footer */}
      <Footer />
    </div>
  );
}

export default App;
