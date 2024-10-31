// TemplateFullView.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import './TemplateFullView.css';
import { Link } from 'react-router-dom';

function TemplateFullView({ templates }) {
  const { id } = useParams();
console.log(templates);
  // Find the selected template by ID
  const template = templates.find((temp) => temp.id === id);

  return (
    <div className="template-full-view-container">
      {template ? (
        <div>
        <img src={template.src} alt={template.id} className="full-size-template" />
        <p><strong>Description:</strong> {template.description}</p>
        {template.category === 'Premium' ? (
            <> <p><strong>Price:</strong>{template.price}</p>
        <Link to="/BuyTemplate">   <button className="purchase-button">Buy</button></Link> </>
    ) : (
        <Link to="/EditTemplate">
          <button className="edit-button1">Edit</button>
        </Link>
    )}
        </div>
        
      ) : (
        <p>Template not found</p>
      )}
    </div>
  );
}

export default TemplateFullView;
