// Footer.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

import './Home.css';

function Footer() {
  return (
    <footer className="footer">
      <p style={{color: 'white', textAlign: 'center'}}>&copy; 2024 MenuMakers. All rights reserved.</p>
      <p style={{color: 'white', textAlign: 'center'}}>       < FontAwesomeIcon icon={faEnvelope} />
      &nbsp;  menumakersnoreply@gmail.com</p>
    </footer>
  );
}

export default Footer;