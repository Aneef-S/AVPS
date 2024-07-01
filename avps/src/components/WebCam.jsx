import React, { useState, useRef } from 'react';
import Webcam from "react-webcam";


const WebCam = () => {
  const webRef = useRef(null);
  const [imageData, setImageData] = useState(null); // Store captured image data

  const captureImage = () => {
    const image = webRef.current.getScreenshot(); // Capture image data
    setImageData(image); // Update state with captured image
  };

  return (
    <div className="web">
      <Webcam ref={webRef} />
      <button onClick={captureImage} ></button>
      {imageData && ( // Conditionally render image if captured
        <img src={imageData} alt="Captured from Webcam" />
      )}
    </div>
  );
};


export default WebCam;

