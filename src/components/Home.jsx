// Home.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [svgPaths, setSvgPaths] = useState([]);
  const navigate = useNavigate();

  // Dynamically import all SVG files from the templates folder using import.meta.glob
  useEffect(() => {
    const svgFiles = import.meta.glob('/src/templates/*.svg', { eager: true });
    const paths = Object.values(svgFiles).map((module) => module.default);
    setSvgPaths(paths);
  }, []);

  // Navigate to editor when a template is clicked
  const handleTemplateClick = (src) => {
    navigate('/editor', { state: { templateSrc: src } });
  };

  return (
    <div className="home-container">
      <section className="hero">
        <div className="hero-content">
          <h2>Create Custom Menus with Ease</h2>
          <p>MenuMakers allows you to design, edit, and download personalized menus in just a few clicks.</p>
          <Link to="/register"><button className="cta-button">Get Started</button></Link>
        </div>
      </section>

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {svgPaths.map((src, index) => (
          <div 
            key={index} 
            style={{ margin: '40px', cursor: 'pointer' }} 
            onClick={() => handleTemplateClick(src)}
          >
            <img src={src} alt={`SVG Template ${index + 1}`} width="270" height="350" />
          </div>
        ))}
      </div>

      <section className="features">
        <h3>Why Choose MenuMakers?</h3>
        <div className="features-list">
          <div className="feature">
            <h4>Easy to Use</h4>
            <p>Our intuitive interface makes menu creation simple for anyone.</p>
          </div>
          <div className="feature">
            <h4>Customizable Templates</h4>
            <p>Choose from a variety of templates and customize them to suit your needs.</p>
          </div>
          <div className="feature">
            <h4>Download in Multiple Formats</h4>
            <p>Export your menus in PDF, PNG, or JPG formats with a single click.</p>
          </div>
        </div>
      </section>

      {/* <footer className="footer">
        <p>&copy; 2024 MenuMakers. All rights reserved.</p>
      </footer> */}
    </div>
  );
};

export default Home;
