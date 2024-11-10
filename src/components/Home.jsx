
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
  // Dynamically import all SVG files from the templates folder using import.meta.glob
  useEffect(() => {
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



  return (
    <div className="home-container">
      <section className="hero">
        <div className="hero-content">
          <h2>Create Custom Menus with Ease</h2>
          <p>MenuMakers allows you to design, edit, and download personalized menus in just a few clicks.</p>
          <Link to="/register"><button className="cta-button">Get Started</button> </Link>
        </div>
        </section>

        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {svgPaths.map((template) => (
          <div key={template.id} style={{ margin: '40px'}}>
            <div className="template-card" 
                 onClick={() => navigate(`/template/${template.id}`)}
          style={{ cursor: 'pointer' }} >
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
        
        {svgPaths_pre.map((template) => (
          <div key={template.id} style={{ margin: '40px'}}>
            <div className="template-card" onClick={() => navigate(`/template/${template.id}`)}
          style={{ cursor: 'pointer' }}>
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

      {/* <footer className="footer">
        <p>&copy; 2024 MenuMakers. All rights reserved.</p>
      </footer> */}
    </div>
  );

}

export default Home;
