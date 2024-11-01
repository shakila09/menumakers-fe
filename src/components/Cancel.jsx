import React from 'react';
import './paymentStatus.css';
const Cancel = () => (
  <div>
     <div className="cancel-container">
    <h2 className="cancel-title">Payment Canceled</h2>
    <p className="cancel-message"> Your payment was canceled. Please try again if you want to complete the purchase.</p>
  </div>
  </div>
);

export default Cancel;
