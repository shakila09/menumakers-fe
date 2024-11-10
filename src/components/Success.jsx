//import React from 'react';
import './paymentStatus.css';
import emailjs from 'emailjs-com';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    emailjs.send(
      'service_tykzw2c',
      'template_es9bbh8',
      {
        to_email: sessionStorage.getItem('userEmail'), // This should be the recipient's email
        subject: 'Payment Successful',
        message: 'Thank you for your purchase! You can now edit your template.',
      },
      'HIiQgXkfmQYOqLiB8'
    )
      .then(() => {
        alert('Email sent successfully');
      })
      .catch((error) => {
        console.error(error.text);
        alert('Failed to send email');
      });
  }, []);

  // Function to navigate to the home page
  const goToHome = () => {
    navigate('/home');
  };

  return (
    <div>
      <div className="success-container">
        <h2 className="success-title">Payment Successful</h2>
        <p className="success-message">
          Thank you for your purchase! You can now edit your template. Please check your email.
        </p>
        <button className="home-button" onClick={goToHome}>
          Go to Home Page
        </button>
      </div>
    </div> 
  );
};

export default Success;
