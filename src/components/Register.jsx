import { useState } from 'react';
import axios from 'axios';
import '../css/form.css'; 
const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState([]);

  const { name, email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:3000/api/auth/register', formData);
        alert('User registered successfully');
      console.log(response.data);
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        alert('Error registering user');
      }
    }
  };

  return (
    <div>
      <div className="form-container">
      <div className="form-wrapper">
      <h2>Register</h2>
      <form onSubmit={onSubmit}>
    
          <div className="form-group">
          <input
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            placeholder="Enter your name"
            required
          />
          </div>
        
        <div className="form-group">
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            placeholder="Enter your email"
            required
          />
        </div>
       
        <div className="form-group">
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      
      {errors.length > 0 && (
        <div>
          <h3>Errors</h3>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error.msg}</li>
            ))}
          </ul>
        </div>
      )}
      </div>
      </div>
    </div>
  );
};

export default Register;
