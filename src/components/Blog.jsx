// src/components/Blog.jsx
import React from 'react';
import { FiArrowUpRight } from 'react-icons/fi';

const Blog = () => {
  const articles = [
    {
      category: "UX Research",
      title: "Designing for the Metaverse: Spatial UX Frameworks",
      readTime: "5 min read",
      link: "#"
    },
    {
      category: "Design Systems",
      title: "How Neobrutalism is Redefining Modern Web UI",
      readTime: "4 min read",
      link: "#"
    },
    {
      category: "Product Thinking & Accessibility",
      title: "Essential UI/UX Rules to Enhance Inclusive Design",
      readTime: "6 min read",
      link: "#"
    }
  ];

  return (
    <section className="blog" id="thoughts">
      <div className="container">
        {/* Section Header */}
        <div className="section-title-container">
          <span className="section-label">Journal</span>
          <h2 className="section-title-editorial">
            Thoughts & <span className="italic">Reflections</span>
          </h2>
        </div>

        {/* Blog Grid */}
        <div className="blog-grid">
          {articles.map((article, index) => (
            <a key={index} href={article.link} className="blog-card">
              <div className="blog-header">
                <span className="blog-meta-tag">{article.category}</span>
                <h3 className="blog-title-text">{article.title}</h3>
              </div>
              <div className="blog-footer">
                <span className="blog-readtime">{article.readTime}</span>
                <span className="blog-arrow"><FiArrowUpRight /></span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
