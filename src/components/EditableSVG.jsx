import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; 
import './EditableSVG.css';

const EditableSVG = () => {
    const location = useLocation();
    const { templateSrc } = location.state || {};
    const [svgContent, setSvgContent] = useState(null);

    const [editingText, setEditingText] = useState('');
    const [currentTextElement, setCurrentTextElement] = useState(null);
    const [fontColor, setFontColor] = useState('#000000');
    const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
// Helper function to convert RGB to Hex format
const rgbToHex = (rgb) => {
    const result = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/.exec(rgb);
    if (!result) return "#000000"; // Default to black if conversion fails

    const r = parseInt(result[1]);
    const g = parseInt(result[2]);
    const b = parseInt(result[3]);

    // Convert RGB values to Hex
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};
    
    // Fetch the latest customized SVG content from Cloudinary
    useEffect(() => {
        const fetchCustomizedSVG = async () => {
            if (!templateSrc) return;

            try {
                const response = await fetch(templateSrc, { cache: 'no-store' });
                const text = await response.text();
                console.log("Loaded customized SVG content:", text);
                setSvgContent(text);
            } catch (error) {
                console.error("Error loading customized SVG:", error);
            }
        };

        fetchCustomizedSVG();
    }, [templateSrc]);




    const handleTextClick = (event) => {
        const element = event.target;
        setCurrentTextElement(element);
        setEditingText(element.textContent);
        const currentColor = element.style.fill || '#000000';
        setFontColor(currentColor.startsWith("rgb") ? rgbToHex(currentColor) : currentColor);
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
        const hexColor = rgbToHex(color);
        setFontColor(hexColor);
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

    const downloadImage = (format) => {
        const svgElement = document.getElementById("editable-svg-container").querySelector("svg");
        const svgData = new XMLSerializer().serializeToString(svgElement);
        const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
        const url = URL.createObjectURL(svgBlob);

        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const context = canvas.getContext("2d");
            context.drawImage(img, 0, 0);

            const downloadLink = document.createElement("a");
            downloadLink.download = `menu.${format}`;
            downloadLink.href = canvas.toDataURL(`image/${format}`);
            downloadLink.click();

            URL.revokeObjectURL(url);
        };
        img.src = url;
    };

    // New function to save customized SVG to Cloudinary
    const [isSaving, setIsSaving] = useState(false);

    const saveCustomization = async () => {
        if (isSaving) return;
        setIsSaving(true);
    
        try {
            const svgElement = document.getElementById('editable-svg-container').querySelector('svg');
            const svgString = new XMLSerializer().serializeToString(svgElement);
            const encodedSvgContent = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgString)))}`;
            const userId = sessionStorage.getItem('userId');
            const templateName = templateSrc.split('/').pop().replace('.svg', '');
    
            if (!userId || !templateName) {
                alert('Missing user ID or template name.');
                setIsSaving(false);
                return;
            }
    
            const response = await fetch('http://localhost:5000/api/templates/save-svg', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, templateName, svgContent: encodedSvgContent }),
            });
    
            const data = await response.json();
            if (data.success) {
                alert('Customization saved successfully!');
                console.log('Image URL:', data.imageUrl);
    
                // Update the template source to the latest URL
                setSvgContent(await fetch(data.imageUrl, { cache: 'no-store' }).then((res) => res.text()));
            } else {
                alert('Failed to save customization.');
            }
        } catch (error) {
            console.error('Error saving customization:', error);
            alert('An error occurred while saving the customization.');
        } finally {
            setIsSaving(false);
        }
    };
    
    
    useEffect(() => {
        const fetchCustomizedSVG = async () => {
            // Check for a saved customized URL in sessionStorage
            const latestTemplateUrl = sessionStorage.getItem(`latestTemplateSrc_${templateSrc}`) || templateSrc;
    
            if (!latestTemplateUrl) return;
    
            try {
                const timestamp = new Date().getTime(); // Bypass browser cache
                const url = `${latestTemplateUrl}?t=${timestamp}`;
                console.log("Fetching SVG from URL:", url);
    
                const response = await fetch(url, { cache: 'no-store' });
                if (!response.ok) {
                    console.error("Failed to fetch SVG from Cloudinary. Status:", response.status);
                    return;
                }
    
                const text = await response.text();
                console.log("Loaded customized SVG content:", text);
                setSvgContent(text);
            } catch (error) {
                console.error("Error loading customized SVG:", error);
            }
        };
    
        fetchCustomizedSVG();
    }, [templateSrc]);
    
    
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

            <div className="download-container">
                <button className="download-button" onClick={() => downloadImage("png")}>Download as PNG</button>
                <button className="download-button" onClick={() => downloadImage("jpeg")}>Download as JPEG</button>
                <button className="download-button" onClick={() => downloadImage("pdf")}>Download as PDF</button>
                {/* <button className="save-button" onClick={saveCustomization}>Save Customization</button> */}
                <button className="save-button" onClick={saveCustomization} disabled={isSaving}>
    {isSaving ? 'Saving...' : 'Save Customization'}
</button>

            </div>
        </div>
    );
};

export default EditableSVG;