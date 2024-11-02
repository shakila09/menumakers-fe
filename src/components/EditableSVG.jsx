import React, { useState, useEffect } from 'react';
import './EditableSVG.css';

const EditableSVG = ({ templateSrc }) => {
    const [svgContent, setSvgContent] = useState(null);
    const [editingText, setEditingText] = useState('');
    const [currentTextElement, setCurrentTextElement] = useState(null);
    const [fontColor, setFontColor] = useState('#000000');
    const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');

    useEffect(() => {
        fetch(templateSrc)
            .then((response) => response.text())
            .then((text) => {
                setSvgContent(text);
            })
            .catch((error) => console.error("Error loading SVG:", error));
    }, [templateSrc]);

    const handleTextClick = (event) => {
        const element = event.target;
        setCurrentTextElement(element);
        setEditingText(element.textContent);
        setFontColor(element.style.fill || '#000000');
    };

    const handleInputChange = (event) => {
        const newText = event.target.value;
        setEditingText(newText);
        if (currentTextElement) {
            currentTextElement.textContent = newText;
        }
    };

    const applyStyle = (style) => {
        if (!currentTextElement) return;

        switch (style) {
            case 'bold':
                currentTextElement.style.fontWeight = currentTextElement.style.fontWeight === 'bold' ? 'normal' : 'bold';
                break;
            case 'italic':
                currentTextElement.style.fontStyle = currentTextElement.style.fontStyle === 'italic' ? 'normal' : 'italic';
                break;
            case 'increase-font':
                const newSizeIncrease = parseInt(currentTextElement.style.fontSize || 16) + 2;
                currentTextElement.style.fontSize = `${newSizeIncrease}px`;
                break;
            case 'decrease-font':
                const newSizeDecrease = parseInt(currentTextElement.style.fontSize || 16) - 2;
                currentTextElement.style.fontSize = `${Math.max(6, newSizeDecrease)}px`;
                break;
            default:
                break;
        }
    };

    const changeFontColor = (color) => {
        setFontColor(color);
        if (currentTextElement) {
            currentTextElement.style.fill = color;
        }
    };

    const changeBackgroundColor = (color) => {
        setBackgroundColor(color);
        const svgContainer = document.querySelector('#editable-svg-container svg');
        
        const rect = svgContainer?.querySelector('rect');
        if (rect) {
            rect.setAttribute('fill', color);
        } else if (svgContainer) {
            svgContainer.style.backgroundColor = color;
        }
    };

    if (!svgContent) return <p>Loading SVG...</p>;

    return (
        <div className="editor-container">
            <div className="toolbar-container">
                <h3>Editable SVG Template</h3>
                <div className="toolbar">
                    <button onClick={() => applyStyle('bold')}>Bold</button>
                    <button onClick={() => applyStyle('italic')}>Italic</button>
                    <button onClick={() => applyStyle('increase-font')}>Increase Font</button>
                    <button onClick={() => applyStyle('decrease-font')}>Decrease Font</button>

                    <div className="color-input-container">
                        <label>Font Color:</label>
                        <input type="color" value={fontColor} onChange={(e) => changeFontColor(e.target.value)} />
                    </div>
                    <div className="color-input-container">
                        <label>Background Color:</label>
                        <input type="color" value={backgroundColor} onChange={(e) => changeBackgroundColor(e.target.value)} />
                    </div>
                </div>

                {currentTextElement && (
                    <div className="edit-text-container">
                        <label>Edit Text: </label>
                        <input type="text" value={editingText} onChange={handleInputChange} autoFocus />
                    </div>
                )}
            </div>

            <div id="editable-svg-container" className="svg-preview" dangerouslySetInnerHTML={{ __html: svgContent }} onClick={(event) => { if (event.target.tagName === 'text') { handleTextClick(event); } }} />
        </div>
    );
};

export default EditableSVG;
