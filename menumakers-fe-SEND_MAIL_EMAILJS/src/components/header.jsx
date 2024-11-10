import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';


function Header() {
  return (
    <header className="home-header">
      <h1>MenuMakers</h1>
      <nav>
        <ul>
        <li>
            {/* Home link with icon */}
            <Link to="/">
              <FontAwesomeIcon icon={faHome} />
            </Link>
          </li>

          <li><Link to="/register">Register</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
