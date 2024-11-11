import React from 'react';
import './AboutUs.css';
import team from './team.jpg';

const AboutUs = () => {
  return (
    <div className="about-us-page">
      <div className="about-hero-section">
        <div className="text-content">
          <h2>Our Journey to Revolutionize Menu Design</h2>
          <p>
            At MenuMakers, we believe that a well-crafted menu is at the heart of every memorable dining experience. 
            Founded by a group of passionate designers and tech enthusiasts, our mission is to empower restaurants 
            of all sizes with easy-to-use, customizable menu templates that make a lasting impression on customers.
          </p>
        </div>
        <div className="image-content">
          <img src={team} alt="MenuMakers Team" />
        </div>
      </div>

      <div className="stats-section">
        <div className="stat-item">
          <h3>5+</h3>
          <p>Years of Experience</p>
        </div>
        <div className="stat-item">
          <h3>50+</h3>
          <p>Customizable Templates</p>
        </div>
        <div className="stat-item">
          <h3>10,000+</h3>
          <p>Happy Customers</p>
        </div>
        <div className="stat-item">
          <h3>4.8/5</h3>
          <p>Average Rating</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
