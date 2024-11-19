// Home.jsx
import React from 'react';
import { useState, useEffect } from 'react';
import './Home.css';
import './template.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const [svgPaths, setSvgPaths] = useState([]);
  const [svgPaths_pre, setSvgPaths_pre] = useState([]);
  const [purchasedTemplates, setPurchasedTemplates] = useState([]);

  // Dynamically import all SVG files from the templates folder using import.meta.glob
  useEffect(() => {
    const svgFiles_Free = import.meta.glob('/src/templates/Free/*.svg', { eager: true });
    const svgFiles_Premium = import.meta.glob('/src/templates/Premium/*.svg', { eager: true });
    console.log('Free Templates:', svgFiles_Free);


    // Map each file to an object with `id` and `src`
    const freeTemplateArray = Object.entries(svgFiles_Free).map(([filePath, module]) => ({
      id: filePath.split('/').pop().replace('.svg', ''), // Unique ID based on file name
      src: module.default,
    }));

    const premiumTemplateArray = Object.entries(svgFiles_Premium).map(([filePath, module]) => ({
      id: filePath.split('/').pop().replace('.svg', ''),
      src: module.default,
    }));
    
    setSvgPaths(freeTemplateArray);
    setSvgPaths_pre(premiumTemplateArray);
  }, []);


  useEffect(() => {
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      alert("User not logged in.");
      return;
    }
  
    fetch(`http://localhost:5000/api/templates/user-templates?userId=${userId}`, {
      cache: 'no-store',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched customized templates data:", data);
        if (data.success) {
          setCustomizedTemplates(data.templates); // Store customized templates separately
        } else {
          alert("Failed to fetch customized templates.");
        }
      })
      .catch((error) => console.error("Error fetching customized templates:", error));
  }, []);
  



 // Fetch purchased templates for the logged-in user
 useEffect(() => {
  const userEmail = sessionStorage.getItem('userEmail');
  console.log("checkpurchase  " + userEmail);

  if (!userEmail) return;

  const fetchPurchasedTemplates = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/purchases/User-purchases?userEmail=${userEmail}`
      );
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
  };

  fetchPurchasedTemplates();
}, []);


  // Function to handle template click with login check for free templates
  const handleTemplateClick = (templateId, templateSrc) => {
    const userEmail = sessionStorage.getItem('userEmail');
    if (userEmail) {
      // User is logged in, navigate directly to the editor with templateSrc
      navigate('/menu-editor', { state: { templateSrc } });
    } else {
      // User is not logged in, store intended path and templateSrc, and redirect to login
      sessionStorage.setItem(
        'redirectAfterLogin',
        JSON.stringify({ path: '/menu-editor', templateSrc })
      );
      alert('Please log in to edit or buy templates');
      navigate('/login');
    }
  };
  

  // Function to handle premium template purchase
  const handlePremiumTemplateClick = (template) => {
    const userEmail = sessionStorage.getItem('userEmail');

    if (userEmail) {
      // User is logged in, navigate to BuyTemplate with ID and templateSrc
      navigate(`/Buytemplate/${template.id}`, { state: { templateSrc: template.src } });
    } else {
      // User is not logged in, save redirect info and ask them to log in
      sessionStorage.setItem(
        'redirectAfterLogin',
        JSON.stringify({ path: `/Buytemplate/${template.id}`, templateSrc: template.src })
      );
      alert('Please log in to purchase premium templates');
      navigate('/login');
    }
  };

 


  // Check if the template is already purchased
  const isPurchased = (templateName) => purchasedTemplates.includes(templateName);

  return (
    <div className="home-container">
      <section className="hero">
        <div className="hero-content">
          <h2>Create Custom Menus with Ease</h2>
          <p>MenuMakers allows you to design, edit, and download personalized menus in just a few clicks.</p>
          <Link to="/register">
            <button className="cta-button">Get Started</button>
          </Link>
        </div>
      </section>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {/* Render Free Templates */}
        {svgPaths.map((template) => (
          <div key={template.id} style={{ margin: '40px' }}>
            <div
              className="template-card"
              onClick={() => navigate(`/template/${template.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <img src={template.src} alt={`SVG Template ${template.id}`} width="270" height="350" />
              <div className="overlay">
                <button
                  className="edit-button"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleTemplateClick(template.id, template.src); // Pass templateSrc to the function
                  }}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Render Premium Templates */}
        {svgPaths_pre.map((template) => (
          <div key={template.id} style={{ margin: '40px' }}>
              <div className="template-card" 
              onClick={() => navigate(`/template/${template.id}`, { state: { isPurchased: isPurchased(template.id)  } })}
            
           
              style={{ cursor: 'pointer' }}
            >
              <img src={template.src} alt={`SVG Template ${template.id}`} width="270" height="350" />
              <div className="overlay">
                {/* Disable the Buy button if the template is already purchased */}
                {isPurchased(template.id) ? (
                  <button className="purchased-button" disabled>
                    Purchased
                  </button>
                ) : (
                  <button
                    className="edit-button"
                    onClick={(event) => {
                      event.stopPropagation();
                      handlePremiumTemplateClick(template); // Pass templateSrc to the function
                    }}
                  >
                    Buy Now
                  </button>
                )}
                <button className="pro-badge">Pro</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <section className="features">
        <h3>Why Choose MenuMakers?</h3>
        <div className="features-list">
          <div className="feature">
            <h4>Easy to Use</h4>
            <p>Our intuitive interface makes menu creation simple for anyone.</p>
          </div>
          <div className="feature">
            <h4>Customizable Templates</h4>
            <p>Choose from a variety of templates and customize them to suit your needs.</p>
          </div>
          <div className="feature">
            <h4>Download in Multiple Formats</h4>
            <p>Export your menus in PDF, PNG, or JPG formats with a single click.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
