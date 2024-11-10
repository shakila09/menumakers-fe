import React, { useState } from 'react';
import axios from 'axios';
import './login.css'; 
import backgroundImage from './background.jpg';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState([]); // State to store validation errors

  const { email, password } = formData;
  const navigate = useNavigate(); // Initialize navigate

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setErrors([]); // Clear previous errors
  
      // Make POST request with withCredentials set to true
      const response = await axios.post('http://localhost:5001/api/auth/login', formData, { withCredentials: true });
      
      // Set user data in sessionStorage if available
      // if (response.data && response.data.name) {
        // sessionStorage.setItem('userName', response.data.name); // Assuming the server sends back the user's name
      // }
      console.log(formData.email);
      sessionStorage.setItem('userEmail', formData.email);
      
      alert('User logged in successfully');

   // Check if there's a stored redirect path
   const redirectInfo = sessionStorage.getItem('redirectAfterLogin');
   if (redirectInfo) {
     const { path, templateSrc } = JSON.parse(redirectInfo);
     sessionStorage.removeItem('redirectAfterLogin'); // Clear the stored path after using it
     navigate(path, { state: { templateSrc } });
   } else {
     // Default redirection after login

      navigate('/home');}
      window.location.reload()
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
              {errors.some((error) => error.param === 'password') && (
                <span className="error-message">
                  {errors.find((error) => error.param === 'password').msg}
                </span>
              )}
              {errors.some((error) => error.msg === 'Invalid credentials') && (
                <span className="error-message">Invalid email or password</span>
              )}
            </div>

            <div className="forgot-password-link">
              <Link to="/forgot-password">Forgot Password?</Link> 
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
