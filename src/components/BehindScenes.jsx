// src/components/BehindScenes.jsx
import React from 'react';
import { FiSearch, FiTarget, FiMessageSquare, FiBookOpen } from 'react-icons/fi';

const BehindScenes = () => {
  const cards = [
    {
      title: "Curious Researcher",
      desc: "I love asking \"why\" until I get to the real insight.",
      icon: <FiSearch />
    },
    {
      title: "Detail Oriented",
      desc: "I notice the little things others might miss.",
      icon: <FiTarget />
    },
    {
      title: "Empathetic Listener",
      desc: "People, stories and emotions inspire my design.",
      icon: <FiMessageSquare />
    },
    {
      title: "Always Learning",
      desc: "New skills, new ideas, new me.",
      icon: <FiBookOpen />
    }
  ];

  return (
    <section className="behind-scenes-editorial" id="behind-scenes">
      <div className="container behind-scenes-container-grid">
        {/* Section Title Column */}
        <div className="behind-scenes-header-column">
          <div className="section-header-editorial-small">
            <span className="editorial-section-number">04</span>
            <h2 className="editorial-section-title">Behind the scenes.</h2>
          </div>
        </div>

        {/* 4 Cards Grid Column */}
        <div className="behind-scenes-cards-column">
          <div className="bts-grid-editorial">
            {cards.map((card, idx) => (
              <div key={idx} className="bts-card-editorial">
                <div className="bts-card-icon">
                  {card.icon}
                </div>
                <h3 className="bts-card-title">{card.title}</h3>
                <p className="bts-card-desc">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BehindScenes;
