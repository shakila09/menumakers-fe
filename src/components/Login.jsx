import React, { useState } from 'react';
import axios from 'axios';
import './login.css'; 
import backgroundImage from './background.jpg';
import { Link } from 'react-router-dom'; 

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState([]); // State to store validation errors

  const { email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setErrors([]);

      // Send a POST request to your backend for login
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      sessionStorage.setItem('userEmail', formData.email)
      console.log('User logged in:', response.data);
      alert('User logged in successfully');
    } catch (error) {
      if (error.response && error.response.data.errors) {
        // Set the validation errors from the backend response
        setErrors(error.response.data.errors);
      } else {
        alert('Error logging in user');
      }
    }
  };

  return (
    <div className="register-page">
      <div className="register-content">
        <div className="register-form-container">
          <h2>Login to Your Account</h2>
          <p>Please fill in the form to log in.</p>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                placeholder="Enter your email"
                required
              />
              {/* Display error message for email */}
              {errors.some((error) => error.param === 'email') && (
                <span className="error-message">
                  {errors.find((error) => error.param === 'email').msg}
                </span>
              )}
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                placeholder="Enter your password"
                required
              />
              {/* Display error message for password */}
              {errors.some((error) => error.param === 'password') && (
                <span className="error-message">
                  {errors.find((error) => error.param === 'password').msg}
                </span>
              )}
              {/* Display error for invalid credentials */}
              {errors.some((error) => error.msg === 'Invalid credentials') && (
                <span className="error-message">Invalid email or password</span>
              )}
            </div>

            {/* Forgot Password Link */}
            <div className="forgot-password-link">
              <Link to="/forgot-password">Forgot Password?</Link> 
              {/*/forgot-password is a route that renders ForgotPassword component */}
            </div>

            <button type="submit" className="sign-in-button">Login</button>
          </form>
          <p className="sign-up-option">
            Don't have an account? <a href="/register">Register</a>
          </p>
        </div>
        <div className="register-image-container">
          <img src={backgroundImage} alt="Background" />
        </div>
      </div>
    </div>
  );
};

export default Login;
