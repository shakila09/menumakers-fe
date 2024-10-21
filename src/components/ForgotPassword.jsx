// ForgotPassword.jsx
import { useState } from "react";
import axios from "axios";
import '../css/form.css';

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send email to the backend
      const response = await axios.post("http://localhost:3000/api/auth/forgot-password", { email });
      console.log(response);
      // If successful, display a message to the user
      if (response.status==200) {
        setMessage("A password reset link has been sent to your email.");
      } 
    } catch (error) {
      console.log(error);
      if(error.response.status==404){
        setMessage(error.response.data.message);

      }
      else{
      setMessage("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div>
      <div className="form-container">
      <div className="form-wrapper">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /></div>
        <button type="submit">Send Reset Link</button>
      </form>
      {message && <p>{message}</p>}
    </div>
    </div> </div>
  );
}

export default ForgotPassword;
