import React, { useRef } from 'react';
import '../../styles/PhotoCard.css';

function PhotoCard({ src, alt }) {
  const containerRef = useRef(null);
  const overlayRef = useRef(null);

  const handleMouseMove = (e) => {
    const container = containerRef.current;
    const overlay = overlayRef.current;
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    const rotateY = (-1 / 5) * x + 20;
    const rotateX = (4 / 30) * y - 20;

    overlay.style.backgroundPosition = `${x / 5 + y / 5}%`;
    overlay.style.filter = `opacity(${x / 200}) brightness(1.2)`;

    container.style.transform = `perspective(350px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseOut = () => {
    const container = containerRef.current;
    const overlay = overlayRef.current;

    overlay.style.filter = 'opacity(0)';
    container.style.transform = 'perspective(350px) rotateY(0deg) rotateX(0deg)';
  };

  return (
    <div
      className="container"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseOut={handleMouseOut}
    >
      <div className="overlay" ref={overlayRef}></div>
      <div className="Photocard" style={{ backgroundImage: `url(${src})` }}></div>
    </div>
  );
}

export default PhotoCard;