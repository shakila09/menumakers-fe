import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UsedTemplates.css';

const UsedTemplates = () => {
    const [templates, setTemplates] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const userId = sessionStorage.getItem('userId');
        if (!userId) {
          alert("User not logged in.");
          return;
        }
      
        fetch(`http://localhost:5000/api/templates/user-templates?userId=${userId}`)
          .then((res) => {
            if (!res.ok) {
              throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
          })
          .then((data) => {
            console.log("Fetched templates data:", data);
            if (data.success) {
              setTemplates(data.templates);
            } else {
              alert("Failed to fetch saved templates.");
            }
          })
          .catch((error) => console.error("Error fetching templates:", error));
      }, []);
      
    
    
    const handleTemplateClick = (template) => {
        // const templateSrc = template.previewUrl || template.imageUrl;
        navigate('/menu-editor', { state: { templateSrc: template.imageUrl } });
    };
    
    return (
        <div className="used-templates-container">
            <h2>Your Saved Templates</h2>
            <div className="templates-grid">
                {templates.length > 0 ? (
                    templates.map((template) => (
                        <div
                            key={template.templateName}
                            className="template-card"
                            onClick={() => handleTemplateClick(template)}
                        >
                            <img
                                src={template.previewUrl || template.imageUrl}
                                alt={template.templateName}
                                className="template-image"
                            />
                            <p className="template-name">{template.templateName}</p>
                        </div>
                    ))
                ) : (
                    <p>No saved templates found.</p>
                )}
            </div>
        </div>
    );
};

export default UsedTemplates;