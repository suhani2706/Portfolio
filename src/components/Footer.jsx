// src/components/Footer.jsx
import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import illustrationImage from '../assets/popup.png';

const Footer = () => {
  const [modalView, setModalView] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const emailAddress = 'suhanim2705@gmail.com';

  const handleScrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const formatSubject = (details = {}) => `Portfolio inquiry${details.name ? ` from ${details.name}` : ''}`;

  const formatBody = (details = {}) => {
    const lines = [];
    if (details.name) lines.push(`Name: ${details.name}`);
    if (details.email) lines.push(`Email: ${details.email}`);
    if (details.phone) lines.push(`Phone: ${details.phone}`);
    if (details.message) lines.push(`Message: ${details.message}`);
    return lines.join('\n\n');
  };

  const openGmailCompose = (details = {}) => {
    const subject = encodeURIComponent(formatSubject(details));
    const body = encodeURIComponent(formatBody(details));
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(emailAddress)}&su=${subject}&body=${body}`;
    window.open(gmailUrl, '_blank', 'noopener');
  };

  const sendWithEmailJS = async (details = {}) => {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.warn('EmailJS config missing; opening Gmail compose as fallback.');
      openGmailCompose(details);
      return;
    }

    const templateParams = {
      from_name: details.name,
      reply_to: details.email,
      subject: formatSubject(details),
      message: formatBody(details),
      phone: details.phone,
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams, { publicKey });
    } catch (error) {
      console.error('EmailJS send failed:', error);
      openGmailCompose(details);
    }
  };

  const handleChoice = (type) => {
    if (type === 'mail') {
      openGmailCompose();
      setModalView(null);
      return;
    }

    setModalView('form');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendWithEmailJS(formData);
    setModalView(null);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const closeModal = () => {
    setModalView(null);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <>
      <footer className="footer-editorial" id="contact">
      <div className="container">
        {/* Footer Top Grid */}
        <div className="footer-top-grid">
          {/* Headline Column */}
          <div className="footer-headline-column">
            <div className="section-header-editorial-small">
              <span className="editorial-section-number">05</span>
              <h2 className="footer-headline-title">
                Let’s build <br />
                something meaningful.
              </h2>
            </div>
          </div>

          {/* Contacts Column */}
          <div className="footer-contact-column">
            <ul className="footer-contact-list">
              <li className="footer-contact-item">
                <span className="contact-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </span>
                <a href="mailto:suhanim2705@gmail.com" className="contact-link">
                  suhanim2705@gmail.com
                </a>
              </li>
              <li className="footer-contact-item">
                <span className="contact-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </span>
                <a href="https://www.linkedin.com/in/suhani-mathur06/" target="_blank" rel="noopener noreferrer" className="contact-link">
                  linkedin.com/in/suhani-mathur06
                </a>
              </li>
            </ul>

            <div className="footer-actions-row">
              <button
                type="button"
                className="btn-pinned footer-cta-link"
                onClick={() => setModalView('choice')}
              >
                Let's Collaborate
              </button>
            </div>
          </div>
        </div>

        {/* Footer Bottom Row */}
        <div className="footer-bottom-row">
          <p className="copyright-label">
            © {new Date().getFullYear()} Suhani Mathur
          </p>
          <p className="coffee-label">
            Designed with clarity and lots of coffee
          </p>
          <a href="#hero" onClick={handleScrollToTop} className="back-to-top-link">
            Back to top <span className="arrow-up-symbol">↑</span>
          </a>
        </div>
      </div>
    </footer>

    {modalView && (
      <div className="contact-modal-backdrop" onClick={closeModal}>
          <div className={`contact-modal-card ${modalView === 'choice' ? 'contact-choice-modal-card' : 'contact-form-modal-card'}`} onClick={(e) => e.stopPropagation()}>
            <button type="button" className="contact-modal-close" onClick={closeModal} aria-label="Close contact options">
              ×
            </button>

          {modalView === 'choice' ? (
            <div className="contact-choice-panel">
              <div className="contact-choice-copy">
                <div className="contact-choice-heading">
                  <span>Let’s</span>
                  <h1>Collab!</h1>
                </div>
                <p className="contact-choice-copybody">
                  I’m always excited to work on meaningful projects and bring ideas to life.
                  Let’s create something amazing together.
                </p>

                <div className="contact-choice-actions">
                  <button type="button" className="contact-choice-btn primary" onClick={() => handleChoice('mail')}>
                    <span className="cta-icon" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </span>
                    <span>Send me an email</span>
                  </button>
                  <button type="button" className="contact-choice-btn secondary" onClick={() => handleChoice('form')}>
                    <span className="cta-icon" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 20h9" />
                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                      </svg>
                    </span>
                    <span>Fill the form</span>
                  </button>
                </div>

                <p className="contact-choice-footnote">or just say hi!</p>
              </div>

              <div className="contact-choice-illustration">
                <img src={illustrationImage} alt="Collaboration illustration" className="contact-choice-illustration-image" />
              </div>
            </div>
          ) : (
            <div className="contact-form-panel">
              <div className="contact-modal-illustration">
                <div className="form-illustration-panel">
                  <span className="form-illustration-badge">AVAILABLE FOR NEW IDEAS</span>
                  <h4>Let’s shape your next meaningful project.</h4>
                  <p>I'm open to collaborations, freelance work, and thoughtful product conversations.</p>
                  <div className="form-illustration-details">
                    <div className="form-illustration-dot"></div>
                    <div className="form-illustration-dot"></div>
                    <div className="form-illustration-dot"></div>
                  </div>
                </div>
              </div>

              <div className="contact-modal-form">
                <div className="contact-form-header">
                  <p className="contact-choice-label">Tell me a bit about it</p>
                  <h2>Send a few details & I’ll get back to you.</h2>
                </div>

                <form onSubmit={handleSubmit} className="contact-form-fields">
                  <label>
                    <span>Your name</span>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="e.g. Suhani Mathur" required />
                  </label>
                  <label>
                    <span>Email address</span>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="e.g. suhani@mail.com" required />
                  </label>
                  <label>
                    <span>Phone number</span>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="e.g. +91 12345 67890" />
                  </label>
                  <label>
                    <span>What do you wanna talk about?</span>
                    <textarea name="message" value={formData.message} onChange={handleInputChange} rows="4" placeholder="Write your message here..." required />
                  </label>

                  <div className="contact-form-actions">
                    <button type="submit" className="form-submit-btn">
                      <span className="form-submit-icon" aria-hidden="true">✈</span>
                      Send message
                    </button>
                    <button type="button" className="form-cancel-btn" onClick={() => setModalView('choice')}>Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    )}
    </>
  );
};

export default Footer;