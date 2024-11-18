import React, { useState } from 'react';
import axios from 'axios';
import './ForgotPassword.css';  
import backgroundImage from './background.jpg'; 

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(''); // For error messages

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear previous messages
    setError('');   // Clear previous errors
    try {
      const response = await axios.post('http://localhost:5001/api/auth/forgot-password', { email });
      setMessage(response.data.msg); // Set success message
    } catch (error) {
      if (error.response && error.response.data.msg) {
        setError(error.response.data.msg); // Set error message from backend
      } else {
        setError('Error sending reset link'); // Default error message
      }
    }
  };

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-content">
        <div className="forgot-password-form-container">
          <h2>Forgot Password</h2>
          <p>Enter your email address to receive a password reset link.</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <button type="submit" className="submit-button">Send Reset Link</button>
          </form>
          {message && <p className="success-message">{message}</p>}
          {error && <p className="error-message">{error}</p>}
          <p className="back-to-login-option">
            <a href="/login">Back to Login</a>
          </p>
        </div>
        <div className="forgot-password-image-container">
          <img src={backgroundImage} alt="Background" />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
