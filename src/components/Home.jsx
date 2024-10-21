// Home.jsx
import React from 'react';
import '../css/home.css';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-container">
      {/* <header className="home-header">
        <h1>MenuMakers</h1>
        <nav>
          <ul>
            <li><a href="/register">Register</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </nav>
      </header> */}

      <section className="hero">
        <div className="hero-content">
          <h2>Create Custom Menus with Ease</h2>
          <p>MenuMakers allows you to design, edit, and download personalized menus in just a few clicks.</p>
          <Link to="/register"><button className="cta-button">Get Started</button> </Link>
        </div>
      </section>

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
}

export default Home;
