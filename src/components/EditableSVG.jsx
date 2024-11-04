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
        downloadLink.download = ⁠ menu.${ format } ⁠;
        downloadLink.href = canvas.toDataURL(⁠ image / ${ format } ⁠);
        downloadLink.click();

        URL.revokeObjectURL(url);
    };
    img.src = url;
};

// Download Buttons
<button className="download-button" onClick={() => downloadImage("png")}>Download as PNG</button>
<button className="download-button" onClick={() => downloadImage("jpeg")}>Download as JPEG</button>
<button className="download-button" onClick={() => downloadImage("pdf")}>Download as PDF</button>
