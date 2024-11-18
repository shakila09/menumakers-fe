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
//     const svgFiles_Free = import.meta.glob('/src/templates/Free/*.svg', { eager: true });
//     const svgFiles_Premium = import.meta.glob('/src/templates/Premium/*.svg', { eager: true });

//     const freeTemplateArray = Object.entries(svgFiles_Free).map(([filePath, module]) => ({
//       id: filePath.split('/').pop().replace('.svg', ''),
//       src: module.default,
//     }));

//     const premiumTemplateArray = Object.entries(svgFiles_Premium).map(([filePath, module]) => ({
//       id: filePath.split('/').pop().replace('.svg', ''),
//       src: module.default,
//     }));

//     setSvgPaths(freeTemplateArray);
//     setSvgPaths_pre(premiumTemplateArray);
//   }, []);

//   // Function to handle template click with login check
//   const handleTemplateClick = (template) => {
//     const userEmail = sessionStorage.getItem('userEmail');

    const svgFiles_Free = import.meta.glob('/src/templates/Free/*.svg',{ eager: true });
    const svgFiles_Premium = import.meta.glob('/src/templates/Premium/*.svg',{ eager: true });
     // Extract the default export from each SVG file and store it in svgPaths
    //  const paths = Object.values(svgFiles_Free).map((module) => module.default);
    //  const paths_pre = Object.values(svgFiles_Premium).map((module) => module.default);
// Map each file to an object with `id` and `src`
const freeTemplateArray = Object.entries(svgFiles_Free).map(([filePath, module]) => ({
  id: filePath.split('/').pop().replace('.svg', ''), // Unique ID based on file name
  src: module.default
}));

const premiumTemplateArray = Object.entries(svgFiles_Premium).map(([filePath, module]) => ({
  id: filePath.split('/').pop().replace('.svg', ''),
  src: module.default
}));


     setSvgPaths(freeTemplateArray);
     setSvgPaths_pre(premiumTemplateArray);
   }, []);

   

// Function to handle template click with login check
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
    alert('Please log in to edit or buy  templates');
    navigate('/login');
  }
};
const handlePremiumTemplateClick = (template) => {
  const userEmail = sessionStorage.getItem('userEmail');

  if (userEmail) {
    // User is logged in, navigate to BuyTemplate with ID and templateSrc
    navigate(`/Buytemplate/${template.id}`, { state: { templateSrc: template.src } });
  } else {
    // User is not logged in, save redirect info and ask them to log in
    sessionStorage.setItem('redirectAfterLogin', JSON.stringify({ path: `/Buytemplate/${template.id}`, templateSrc: template.src }));
    alert('Please log in to purchase premium templates');
    navigate('/login');
  }
};

useEffect(() => {
  const userEmail = sessionStorage.getItem('userEmail');
  console.log("checkpurchase  " + userEmail);
  if (userEmail){
  // Fetch purchased templates for the logged-in user
  const fetchPurchasedTemplates = async () => {
    if (userEmail) {
      navigate('/menu-editor', { state: { templateSrc: template.imageUrl } });
    } else {
      sessionStorage.setItem('redirectAfterLogin', JSON.stringify({ path: '/menu-editor', templateSrc }));
      alert('Please log in to edit or buy templates');
      navigate('/login');
    }
  };

  useEffect(() => {
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      alert("User not logged in.");
      return;
    }

    fetch(`http://localhost:5000/api/templates/user-customized?userId=${userId}`, {
      cache: 'no-store',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched customized templates data:", data);
        if (data.success) {
          setSvgPaths(data.templates);
        } else {
          alert("Failed to fetch customized templates.");
        }
      })
      .catch((error) => console.error("Error fetching customized templates:", error));
  }, []);

  useEffect(() => {
    const userEmail = sessionStorage.getItem('userEmail');

    const fetchPurchasedTemplates = async () => {
      if (userEmail) {
        try {
          const response = await fetch(`http://localhost:5000/api/purchases/User-purchases?userEmail=${userEmail}`);
          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message);
          }

          const purchasedNames = data.map((purchase) => purchase.templateName);
          setPurchasedTemplates(purchasedNames);
        } catch (error) {
          console.error('Error fetching purchased templates:', error);
        }
      }
    };

//     fetchPurchasedTemplates();
//   }, []);

//   const isPurchased = (templateName) => purchasedTemplates.includes(templateName);
  fetchPurchasedTemplates();
}}, []);
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

// //         <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>

//       {/* Updated Container for Template Cards */}
//       <div
//         style={{
//           display: 'flex',
//           flexWrap: 'wrap',
//           justifyContent: 'center',
//           alignItems: 'flex-start',
//           gap: '20px',
//           padding: '20px',
//         }}
//       >
//         {/* Render Free Templates */}
        {svgPaths.map((template) => (
          <div key={template.id} style={{ margin: '20px' }}>
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
                    handleTemplateClick(template);
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
//           <div key={template.id} style={{ margin: '20px' }}>
//             <div
//               className="template-card"
//               onClick={() => navigate(`/template/${template.id}`)}
//               style={{ cursor: 'pointer' }}
//             >
//               <img src={template.src} alt={`SVG Template ${template.id}`} width="270" height="350" />
//               <div className="overlay">
//                 {isPurchased(template.id) ? (
//                   <button className="purchased-button" disabled>
//                     Purchased
//                   </button>
//                 ) : (
//                   <Link to={`/Buytemplate/${template.id}`}>
//                     <button className="edit-button">Buy Now</button>
//                   </Link>
//                 )}
//                 <button className="pro-badge">Pro</button>

          <div key={template.id} style={{ margin: '40px'}}>
            <div className="template-card" onClick={() => navigate(`/template/${template.id}`, { state: { isPurchased: isPurchased(template.id)  } })}
          style={{ cursor: 'pointer' }}>
            <img src={template.src} alt={`SVG Template ${template.id}`} width="270" height="350" />
            <div className="overlay">
            
            {/* <button
                  className="edit-button"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleTemplateClick(template.id, template.src); // Pass templateSrc to the function
                  }}
                >
                  Edit
                </button> */}
               
               {/* Disable the Buy button if the template is already purchased */}
            {isPurchased(template.id) ? (
              <button className="purchased-button" disabled>Purchased</button>
            ) : (
             
                <button  className="edit-button" onClick={(event) => {
                  event.stopPropagation();
                  handlePremiumTemplateClick(template); // Pass templateSrc to the function
                }} >Buy Now</button>
             
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
