import React, { useRef } from 'react';
import { Link } from "react-router-dom";
import './ServicesCards.css';

export default function Services({ services }) {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            current.scrollBy({ left: direction === 'left' ? -300 : 300, behavior: 'smooth' });
        }
    };

    return (
        <div className="services-card-container">
            <button className="scroll-btn left-btn" onClick={() => scroll('left')}>&#10094;</button>
            <div className="services-cards-wrapper" ref={scrollRef}>
                <div className="services-cards">
                    {services.map((service) => (
                        <Link to={`/services-in/${service.id}`} key={service.id} className="service-card">
                            <img src={service.image} alt='service' />
                            <h3>{service.title}</h3>
                        </Link>
                    ))}
                </div>
            </div>
            <button className="scroll-btn right-btn" onClick={() => scroll('right')}>&#10095;</button>
        </div>
    );
}
