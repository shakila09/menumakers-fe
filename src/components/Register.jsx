import React, { useState } from "react";
import axios from "axios";
import "./Register.css";
import backgroundImage from "./background.jpg";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState([]); // State to store validation errors

  const { name, email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      // Clear any previous errors
      setErrors([]);

      // Send a POST request to your backend
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );
      console.log("User registered:", response.data);
      alert("User registered successfully");
    } catch (error) {
      if (error.response && error.response.data.errors) {
        // Set the validation errors
        console.log("fsdfdsfdsfdsfsd",error)
        setErrors(error.response.data.errors);
      } else {
        alert("Error registering user");
      }
    }
  };

  console.log("errors", errors);

  console.log("errors.some((error) => error.param === )",errors.some((error) => error.param === "name"))


  return (
    <div className="register-page">
      <div className="register-content">
        <div className="register-form-container">
          <h2>Create an Account</h2>
          <p>Please fill in the form to create an account.</p>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={onChange}
                placeholder="Enter your name"
                required
              />
              {/* Display error message for name */}
              {errors.some((error) => error.path === "name") && (
                <span className="error-message">
                  {errors.find((error) => error.path === "name").msg}
                </span>
              )}
            </div>
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
              {errors.some((error) => error.path === "email") && (
                <span className="error-message">
                  {errors.find((error) => error.path === "email").msg}
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
              {errors.some((error) => error.path === "password") && (
                <span className="error-message">
                  {errors.find((error) => error.path === "password").msg}
                </span>
              )}
            </div>
            <button type="submit" className="sign-in-button">
              Register
            </button>
          </form>
          <p className="sign-up-option">
            Already have an account? <a href="/login">Log in</a>
          </p>
        </div>
        <div className="register-image-container">
          <img src={backgroundImage} alt="Background" />
        </div>
      </div>
    </div>
  );
};

export default Register;
