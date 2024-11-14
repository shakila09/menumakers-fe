import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import './TemplateFullView.css';

function TemplateFullView({ templates }) {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the selected template by ID
  const template = templates.find((temp) => temp.id === id);

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
  
  return (
    <div className="template-full-view-container">
      {template ? (
        <div>
          <img src={template.src} alt={template.id} className="full-size-template" />
          <p><strong>Description:</strong> {template.description}</p>
          {template.category === 'Premium' ? (
           <> <p><strong>Price:</strong>{template.price}</p>

             {/* {templates.map((template) => ( */}
        <Link key={template.id} to={`/Buytemplate/${template.id}`}>   <button className="purchase-button">Buy</button></Link> </>
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
