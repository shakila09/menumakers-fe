import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import EditableSVG from './EditableSVG';
import './MenuEditor.css';

const MenuEditor = () => {
    const { state } = useLocation();
    const templateSrc = state?.templateSrc;
    const navigate = useNavigate();
   

    return (
        <div className="menu-editor-container">
            <h2>Menu Editor</h2>
            {templateSrc ? (
                <EditableSVG templateSrc={templateSrc} />
            ) : (
                <p>No template selected</p>
            )}

            <button onClick={() => navigate('/')} className="home-button">Go to Home</button>

           
        </div>
    );
};

export default MenuEditor;
