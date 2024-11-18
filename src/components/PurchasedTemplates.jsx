import React, { useEffect, useState } from 'react';
import "./PurchasedTemplates.css";
import { useNavigate } from 'react-router-dom';

const PurchasedTemplates = () => {
  const [purchases, setPurchases] = useState([]);
  const userEmail = sessionStorage.getItem('userEmail');
console.log("checking email for purchases " + sessionStorage.getItem('userEmail'));
const navigate = useNavigate();
  // Function to fetch purchased templates
  const fetchPurchasedTemplates = async () => {
    if (!userEmail) {
      console.error('User email not found in sessionStorage');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5001/api/purchases/User-purchases?userEmail=${userEmail}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setPurchases(data);
    } catch (error) {
      console.error('Error fetching purchased templates:', error);
    }
  };

// Handle click on a template
const handleTemplateClick = (templateName) => {
  const templateSrc = `src/templates/Premium/${templateName}.svg`;
  navigate('/menu-editor', { state: { templateSrc } });
};
  
  // Fetch purchased templates when the component loads
  useEffect(() => {
    fetchPurchasedTemplates();
  }, []);

  return (
    <div className="purchased-templates-container">
      <h2>Your Purchased Templates</h2>
      {purchases.length === 0 ? (
        <p>You have not purchased any templates yet.</p>
      ) : (
        <ul className="template-list">
          {purchases.map((purchase) => (
            <li key={purchase._id} className="template-item" onClick={() => handleTemplateClick(purchase.templateName)}>
              <h3>Template Name: {purchase.templateName}</h3>
              <p>Purchased on: {new Date(purchase.date).toLocaleDateString()}</p>
              {/* Display the actual template using the constructed file path */}
              <img
                   src={`src/templates/Premium/${purchase.templateName}.svg`}
                   alt={purchase.templateName}
                  class="purchased-template-image"
                />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PurchasedTemplates;
