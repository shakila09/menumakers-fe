import React, { useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom'; // Import Link from react-router-dom

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5001/api/auth/reset-password/${token}`, { password });
      setMessage(response.data.msg);
    } catch (error) {
      setMessage('Error resetting password');
    }
  };

  return (
    <div className="register-page">
      <div className="register-content">
        <div className="register-form-container">
          <h2>Reset Password</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>New Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your new password"
                required
              />
            </div>
            <button type="submit" className="sign-in-button">Reset Password</button>
          </form>
          {message && <p>{message}</p>}
          {/* Back to login link */}
          <p>
            <Link to="/login">Back to Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
