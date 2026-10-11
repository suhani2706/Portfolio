// src/App.jsx
import React, { useState, useEffect, Suspense, lazy } from 'react';
import './App.css';
import './firebase';
import Header from './components/Header';
import BackgroundGrid from './components/BackgroundGrid';
import Hero from './components/Hero';
import About from './components/About';
import Toolbox from './components/Toolbox';
import BehindScenes from './components/BehindScenes';
import Footer from './components/Footer';

const Projects = lazy(() => import('./components/Projects'));

function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const openContactModal = () => setIsContactModalOpen(true);
  const closeContactModal = () => setIsContactModalOpen(false);

  // Set up intersection observer to change grid opacity based on active section
  useEffect(() => {
    const sections = ['hero', 'projects', 'toolbox', 'about', 'contact'];
    
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
      <Header openContactModal={openContactModal} />
      
      <main>
        {/* Hero Section */}
        <Hero />

        {/* Section 02 - Selected Work */}
        <Suspense fallback={
          <div className="projects-loading-skeleton" aria-label="Loading projects">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="project-skeleton-card">
                <div className="project-skeleton-row">
                  <div className="project-skeleton-line tall" />
                </div>
                <div className="project-skeleton-line long" />
                <div className="project-skeleton-line long" />
                <div className="project-skeleton-line medium" />
                <div className="project-skeleton-button-row">
                  <div className="project-skeleton-line button" />
                  <div className="project-skeleton-line button" />
                </div>
              </div>
            ))}
          </div>
        }>
          <Projects />
        </Suspense>

        {/* Section 03 - Key Skills */}
        <Toolbox />

        {/* Section 04 - About Me */}
        <About />
      </main>

      {/* Section 05 - Contact / Footer */}
      <Footer openContactModal={openContactModal} isContactModalOpen={isContactModalOpen} closeContactModal={closeContactModal} />
    </div>
  );
}

export default App;
