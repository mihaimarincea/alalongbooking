// Gallery.tsx
import React, { useState, useEffect } from 'react';

const Gallery = () => {
  const images = [
    '/hero/intro_img.jpg', // Replace with actual image paths
    '/hero/intro_img1.jpg',
    '/hero/intro_img2.jpg',
    // ...add as many images as you have
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(intervalId); // Clear the interval on unmount
  }, [images.length]);

  return (
    <div className="gallery-container">
      {images.map((image, index) => (
        <img
          key={image}
          src={image}
          alt={`Slide ${index}`}
          className={`gallery-image ${index === currentImageIndex ? 'visible' : 'invisible'}`}
        />
      ))}
    </div>
  );
};

export default Gallery;
