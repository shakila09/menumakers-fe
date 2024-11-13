import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import './Home.css';
import axios from 'axios';

function Header() {
  const [userName, setUserName] = useState(null);
  const [ loggedIn, setLoggedIn ] = useState(false)
  const navigate = useNavigate();


  useEffect(() => {
    // Check the session on component mount
    const checkSession = async () => {
      const userEmail = sessionStorage.getItem("userEmail");
      if (userEmail && userEmail.length > 0) {
        setLoggedIn(true);
      }
    };

    checkSession();
  }, []);

  const handleLogout = async () => {
    try {
      // Clear session storage and navigate to login
      sessionStorage.clear();
      setLoggedIn(false);
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Error logging out. Please try again.');
    }
  };

// //OLD SESSION
//   useEffect(() => {
//     // Check the session on component mount
//     const checkSession = async () => {
//       if(sessionStorage.getItem("userEmail").length > 0)
//       {
//         setLoggedIn(!loggedIn)

//       }
//     };

//     checkSession();
//   }, []);

//   const handleLogout = async () => {
//     try {
//       // Send a request to logout on the backend
//       // Clear session storage
//       sessionStorage.clear();

//       // Clear user state and navigate to login
//       setLoggedIn(false);
//       navigate('/login');
//     } catch (error) {
//       console.error('Logout failed:', error);
//       alert('Error logging out. Please try again.');
//     }
//   };

  return (
    <header className="home-header">
      <h1>MenuMakers</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">
              <FontAwesomeIcon icon={faHome} />
            </Link>
          </li>
          <li><Link to="/about" className="nav-link" >About Us</Link></li>
          <li><Link to="/contact" className="nav-link" >Contact</Link></li>
          {loggedIn ? (
            <> 
           <li><Link to="/purchased-templates" className="nav-link"  >Purchased Templates</Link></li>
              <li>Hi!! {sessionStorage.getItem('userName')}</li>
              <li>
                <Link to="/" className="nav-link" onClick={handleLogout}>Logout</Link>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/register" className="nav-link">Register</Link></li>
              <li><Link to="/login" className="nav-link">Login</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
