import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Toolbox from './components/Toolbox';
import Projects from './components/Projects';
import WorkExperience from './components/WorkExperience';
import Resume from './components/Resume';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route
            path="/"
            element={(
              <>
                <Hero />
                <About />
                <Toolbox />
                <Projects />
                <WorkExperience />
                
              </>
            )}
          />
          <Route path="/resume" element={<Resume />} />
        </Routes>
        <Footer />
      </main>
    </div>
  );
}

export default App;
