// src/components/MyResume.jsx
import React from 'react';
import { FiEye, FiDownload } from 'react-icons/fi';

const Resume = () => {
  return (
    <section className="resume-section" id="resume">
      <div className="container resume-container-editorial">
        {/* Section Header */}
        <div className="section-header-editorial">
          <span className="section-label">Credentials</span>
          <h2 className="section-title-large">
            Professional <span className="italic">Resume</span>
          </h2>
          <p className="section-subtitle">
            My experience, education, and technical competencies at a glance.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="resume-buttons-editorial">
          <a
            href="/resumeSuhani.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            View PDF <FiEye />
          </a>
          <a
            href="/resume.pdf"
            download="resumeSuhani.pdf"
            className="btn btn-secondary"
          >
            Download PDF <FiDownload />
          </a>
        </div>

        {/* Embedded Iframe Preview */}
        <div className="resume-preview-frame">
          <iframe
            src="/resumeSuhani.pdf"
            title="Suhani Mathur Resume PDF"
            className="resume-iframe-editorial"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Resume;
