import React from 'react';
// import emailjs from 'emailjs-com';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import Modal from 'react-modal';
import './BuyTemplate.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const stripePromise = loadStripe('pk_test_51QFnlHKaDpnPRyI3d9z9MvyGOjVUOq1c51QQnNl8OkvUJuagTDtNd2PPiXcGfIzasDtZekFunZJbm2dycGQx9R6z00o4vEJHCK');

const BuyTemplate = ({ templates }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [purchasedTemplates, setPurchasedTemplates] = useState([]);

  // Authentication check: Prevent user from accessing the page without logging in
  useEffect(() => {
    const userEmail = sessionStorage.getItem('userEmail');

    // Redirect to login page if the user is not logged in
    if (!userEmail) {
      alert('You must be logged in to access this page.');
      navigate('/login');
    }
  }, [navigate]);


  // Find template details by ID
  const template = templates.find((temp) => temp.id === id);
  useEffect(() => {
    const userEmail = sessionStorage.getItem('userEmail');
    console.log("checkpurchase  " + userEmail);
    if (userEmail){
    // Fetch purchased templates for the logged-in user
    const fetchPurchasedTemplates = async () => {
      if (userEmail) {
        try {
          const response = await fetch(`http://localhost:5001/api/purchases/User-purchases?userEmail=${userEmail}`);
          const data = await response.json();
  
          if (!response.ok) {
            throw new Error(data.message);
          }
  
          // Store the names of purchased templates
          const purchasedNames = data.map((purchase) => purchase.templateName);
          setPurchasedTemplates(purchasedNames);
        } catch (error) {
          console.error('Error fetching purchased templates:', error);
        }
      }
    };
  
    fetchPurchasedTemplates();
  }}, []);
  // Check if the template is already purchased
  const isPurchased = (templateName) => purchasedTemplates.includes(templateName);

  const handleEditClick = () => {
    navigate('/menu-editor', { state: { templateSrc: template.src } });
  };

  
  const handleBuy = async () => {
    const stripe = await stripePromise;

    const response = await fetch('http://localhost:5001/api/payment/create-checkout-session', {

      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        templateId: template.id,
        templatePrice: parseFloat(template.price.replace('$', '')),
      }),
    });

    const session = await response.json();

    // Redirect to Stripe Checkout
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.error(result.error.message);
    }

    if(!result.error){
      emailjs.send('service_tykzw2c', 'template_es9bbh8', {
        to_email: sessionStorage.getItem('userEmail'), // This should be the recipient's email
        subject: 'Payment Successful',
        message: 'Thank you for your purchase! You can now edit your template.',
      }, 'HIiQgXkfmQYOqLiB8')
      .then(() => {
        alert('Email sent successfully');
      }, (error) => {
        console.error(error.text);
        alert('Failed to send email');
      });
    }
  };

  return (
    <div>             
      <div className="template-details-page">
      <header className="header">
        
      </header>
      <main className="main-content">
        <div className="image-section">
    
          <img src={template.src} alt={template.id} className="menu-image" />
        </div>
        
        <div className="info-section">
          <h2 className="title">Must Have Menus</h2>
          <h4 className="logo">MenuMakers <span className="star-rating">★★★★☆</span></h4>
          {template.category === 'Free' ? (
  <>
    <p>This is a free template. Click on the button below to edit it directly.</p>
    <button onClick={handleEditClick} className="customize-button">Edit This Template</button>
  </>
) :  isPurchased(template.id) ? (
        <><p>You have already purchased this template. Click on the button below to edit it  </p>
              <button onClick={handleEditClick} className="customize-button">Edit This Template</button></>
            ) : (

    <>
          <p className="size">{template.price}</p>

          <ul className="features">
            <li><a href="#">7 Matching Design Options</a></li>
             <li><FontAwesomeIcon icon={faCheckCircle} className="feature-icon" />Easy to Customize</li>
            <li><FontAwesomeIcon icon={faCheckCircle} className="feature-icon" />Digital download</li>
            <li><FontAwesomeIcon icon={faCheckCircle} className="feature-icon" />Brand and menu management Tools</li>
            <li><FontAwesomeIcon icon={faCheckCircle} className="feature-icon" />High-Quality Printing Options</li>
          </ul>

          
          <div className="design-details">
            <h3>Design Details</h3>
            <p>
            Welcome to the MenuMakers MustHaveMenus Collection! With MenuMakers, updating your menu is as easy as a few clicks. Use our drag-and-drop editor to adjust prices, add new items, and even change colors to match your brand.
              Make your edits, order prints or download the design, and thrill your customers with a brand-new menu.
            </p>
            <button onClick={() => setIsModalOpen(true)} className="customize-button">Buy This Template</button>
          </div> 
          </>
          )}
        </div>
      </main>
    </div>
      {/* Buy button that opens the modal */}
      {/* <button onClick={() => setIsModalOpen(true)} className="purchase-button">Buy</button> */}
      {/* <button onClick={() => setIsModalOpen(true)} className="customize-button">Customize This Template</button> */}
      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Buy Template Modal"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          content: {
            width: '300px',
            height: '200px',
            margin: 'auto',
            padding: '20px',
            borderRadius: '8px',
          },
        }}
      >
      {/* <h2>{template.name}</h2> */}
      <p>Are you sure you want to make this purchase?</p>
      <button onClick={handleBuy} className="confirm-purchase-button">Confirm</button>
      <button onClick={() => setIsModalOpen(false)} className="cancel-button">Cancel</button>
      </Modal>
    </div>
  );
};

export default BuyTemplate;