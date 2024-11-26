import React, { useEffect, useState }  from 'react';
import './paymentStatus.css'; 
import { useLocation } from 'react-router-dom';
const Success = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const templateId = queryParams.get('templateId');
  const userEmail =sessionStorage.getItem("userEmail");
  const [isSaved, setIsSaved] = useState(false); // Prevent duplicate saves
// Function to save purchase details
const savePurchaseDetails = async () => {

  if (!templateId || !userEmail || isSaved) {
    console.error('Missing templateId or userEmail');
    return;
  }

  try {
    const response = await fetch('http://localhost:5001/api/payment/save-purchase', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        templateName: templateId,
        userEmail: userEmail,
      }),
    });

    const data = await response.json();
    console.log('Purchase saved:', data);

    if (!response.ok) {
      throw new Error(data.message);
    }
    setIsSaved(true);
  } catch (error) {
    console.error('Error saving purchase:', error);
  }
};
// Save purchase details when the component loads
useEffect(() => {
  savePurchaseDetails();
}, []);

  return(
  <div>
    <div className="success-container">
    <h2 className="success-title">Payment Successful</h2>
    <p className="success-message">Thank you for your purchase! You can now edit your template.Please check your email.</p>
  </div>
  </div>
);
};

export default Success;
