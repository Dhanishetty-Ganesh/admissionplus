import React, { useRef, useEffect } from 'react';

const DynamicImage = ({ instituteName }) => {
  const canvasRef = useRef(null);
  const imageUrl = "https://res.cloudinary.com/dvwnbhpcy/image/upload/v1720009834/Copy_of_QR_code1_lnumex.jpg";

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const image = new Image();

    image.src = imageUrl;
    image.onload = () => {
      // Set canvas dimensions to match the image
      canvas.width = image.width;
      canvas.height = image.height;

      // Draw the image
      context.drawImage(image, 0, 0);

      // Add the institute name text
      context.font = '30px Arial'; // Set font size and style
      context.fillStyle = 'black'; // Set text color
      context.textAlign = 'center'; // Center align the text
      context.fillText(instituteName, canvas.width / 2, 50); // Draw the text at the top center
    };
  }, [instituteName, imageUrl]);

  return (
    <div>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default DynamicImage;
