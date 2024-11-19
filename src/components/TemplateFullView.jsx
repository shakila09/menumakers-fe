import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './TemplateFullView.css';

function TemplateFullView({ templates }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  // const { isPurchased } = location.state || {}; // Access isPurchased from navigation state
  const userEmail = sessionStorage.getItem('userEmail');
  const [isPurchased, setIsPurchased] = useState(false);

   sessionStorage.getItem('userEmail');
     // Get isPurchased from navigation state if available
  const navigationIsPurchased = location.state?.isPurchased;

  console.log(isPurchased);
  // Find the selected template by ID
  const template = templates.find((temp) => temp.id === id);
  
// Fetch purchase status if not available from navigation state
useEffect(() => {
  const fetchPurchaseStatus = async () => {
    if (navigationIsPurchased !== undefined) {
      setIsPurchased(navigationIsPurchased);
    } else if (userEmail && template) {
      try {
        const response = await fetch(`http://localhost:5000/api/purchases/User-purchases?userEmail=${userEmail}`);
        const data = await response.json();
        const purchasedTemplates = data.map((purchase) => purchase.templateName);
        setIsPurchased(purchasedTemplates.includes(template.id));
      } catch (error) {
        console.error('Error fetching purchase status:', error);
      }
    }
  };

  fetchPurchaseStatus();
}, [navigationIsPurchased, userEmail, template]);



  // Function to handle "Edit" click with login check
  const handleEditClick = () => {
    const userEmail = sessionStorage.getItem('userEmail'); // Check if the user is logged in
    if (userEmail) {
      // If logged in, navigate to the editor with the template data
      navigate('/menu-editor', { state: { templateSrc: template.src } });
    } else {
      sessionStorage.setItem('redirectAfterLogin', JSON.stringify({ path: '/menu-editor', templateSrc: template.src }));

      alert('Please log in to edit templates'); // Alert user to log in
      navigate('/login'); // Redirect to login page if not logged in
    }
  };
  // Function to handle "Buy" click for premium templates with login check
  const handlePremiumTemplateClick = (template) => {
    const userEmail = sessionStorage.getItem('userEmail');
  
    if (userEmail) {
      // Check if the template is already purchased
      if (isPurchased) {
        alert('You have already purchased this template.');
        return; // Stop further execution if already purchased
      }
      // User is logged in, navigate to BuyTemplate with ID and templateSrc
      navigate(`/Buytemplate/${template.id}`, { state: { templateSrc: template.src } });
    } else {
      // User is not logged in, save redirect info and ask them to log in
      sessionStorage.setItem('redirectAfterLogin', JSON.stringify({ path: `/Buytemplate/${template.id}`, templateSrc: template.src }));
      alert('Please log in to purchase premium templates');
      navigate('/login');
    }
  };
  
  return (
    <div className="template-full-view-container">
      {template ? (
        <div>
          <img src={template.src} alt={template.id} className="full-size-template" />
          <p><strong>Description:</strong> {template.description}</p>
          {template.category === 'Premium' ? (
           <> <p><strong>Price:</strong>{template.price}</p>
          {/* Show "Purchased" button if already bought, otherwise show "Buy" button */}
          {(isPurchased) ? (
                <button className="edit-button1" onClick={handleEditClick}>Edit</button>
              ) : (

  <button className="purchase-button" onClick={() => handlePremiumTemplateClick(template)} >Buy</button> )} </>
    ) : (
            <button className="edit-button1" onClick={handleEditClick}>Edit</button>
          )}
        </div>
      ) : (
        <p>Template not found</p>
      )}
    </div>
  );
}

export default TemplateFullView;
