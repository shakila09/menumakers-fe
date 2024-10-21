// ResetPassword.jsx
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // assuming you're using React Router
import '../css/form.css';

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
 const { token } = useParams(); // get the token from the URL

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:3000/api/auth/reset-password/${token}`, { password });
      console.log(response);
      // If successful, display a message to the user
      if (response.status==200) {
        setMessage(response.data.message);
      } 
    } catch (error) {
      console.log(error);
      if(error.response.status==400){
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
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /></div>
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div></div></div>
  );
}

export default ResetPassword;
