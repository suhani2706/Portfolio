import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ubuy from "../assets/ubuypng.png";
import celebal from "../assets/celebal.jpg";
import codeup from "../assets/codeup.jpg";
import wisflux from "../assets/wisflux.jpg";

const WorkExperience = () => {
  const experiences = [
    {
      id: 1,
      role: 'Graphic / UIUX Designer',
      company: 'Ubuy Technologies Pvt. Ltd.',
      duration: 'June 2025 - Aug 2025',
      bullets: [
        'Designed Instagram carousel posts to engage and attract the audience',
        'Created blog banners and social media graphics consistent with brand identity',
        'Focused on visually appealing designs that balance aesthetics and functionality',
        'Ensured brand consistency across all digital platforms',
      ],
      logoText: ubuy,
      accent: '#F9C784',
    },
    {
      id: 2,
      role: 'React developer',
      company: 'Cerebral Technologies',
      duration: 'June 2025 - Aug 2025',
      bullets: [
        'React Dashboard: Developed an interactive dashboard with tables, charts, and responsive UI components.',
        "Spotify Clone: Built a functional music player interface replicating Spotify's design, including playlists and search functionality.",
        'Form Application: Created a dynamic form with validation, user-friendly design, and smooth interactions.',
      ],
      logoText: celebal,
      accent: '#F498AF',
    },
    {
      id: 3,
      role: 'Design Intern',
      company: 'CodeUp Ace Academy',
      duration: 'Sept 2024 - Mar 2025',
      bullets: [
        'Designed the UI for the Student Performance Management App.',
        'Created wireframes, user flows, and interactive prototypes.',
        'Developed a consistent color scheme, typography, and design system.',
        'Focused on user-centered design for easy navigation and usability.',
      ],
      logoText: codeup,
      accent: '#96E6B3',
    },
    {
      id: 4,
      role: 'Design Trainee',
      company: 'Wizflux Tech Labs',
      duration: 'April 2024 - May 2024',
      bullets: [
        'Designed the UI for BeMySelf Mental Health App.',
        'Created wireframes, user flows, and interactive prototypes.',
        'Developed a consistent color palette, typography, and visual system.',
        'Focused on user-friendly, empathetic design to support mental wellness.',
      ],
      logoText: wisflux,
      accent: '#C9B6E4',
    },
  ];

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  return (
    <section className="experience-section" id="experience">
      <div className="experience-container">
        <h2 className="section-title">Work Experience.</h2>
        <p className="section-subtitle">What Have I Done So Far</p>

        <div className="timeline-v2">
          <div className="timeline-centerline"></div>

          {experiences.map((exp, index) => {
            const isLeft = index % 2 === 0;
            return (
              <div
                key={exp.id}
                className={`timeline-row ${isLeft ? 'left' : 'right'}`}
              >
                {/* Logo circle animation */}
                <div
                  className="timeline-logo"
                  style={{ backgroundColor: 'white', border: '1px solid black' }}
                  data-aos="zoom-in"
                  data-aos-delay={index * 200} // staggered popping
                >
                  <img
                    src={exp.logoText} // ✅ actual logo image
                    alt={exp.company}
                    className="timeline-logo-img"
                  />
                </div>


                {/* Card animation */}
                <article
                  className={`timeline-card ${isLeft ? 'left' : 'right'}`}
                  data-aos={isLeft ? 'fade-right' : 'fade-left'}
                  data-aos-delay={index * 200 + 150} // little delay after circle
                >
                  <header className="timeline-card-header">
                    <h3 className="experience-role">{exp.role}</h3>
                    <p className="experience-company">{exp.company}</p>
                    <p className="experience-duration">{exp.duration}</p>
                  </header>
                  <ul className="experience-points">
                    {exp.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </article>
              </div>
            );
          })}


        </div>
      </div>
    </section>
  );
};

export default WorkExperience;
