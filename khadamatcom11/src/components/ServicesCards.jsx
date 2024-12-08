import React, { useRef } from 'react';
import Services from '../components/Services';
import '../components/ServicesCards.css';
//hi 
export default function ServicesCards({ services }) {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({
      left: -220, // Width of one card (200px) + margin (20px)
      behavior: 'smooth',
    });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({
      left: 220, // Width of one card (200px) + margin (20px)
      behavior: 'smooth',
    });
  };

  return (
    <div className="services-card-container">
      <button className="scroll-btn left-btn" onClick={scrollLeft}>&lt;</button>
      <div ref={scrollRef} className="services-cards-wrapper">
        {services.map((service, index) => (
          <Services key={index} {...service} />
        ))}
      </div>
      <button className="scroll-btn right-btn" onClick={scrollRight}>&gt;</button>
    </div>
  );
}