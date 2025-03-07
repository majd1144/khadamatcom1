import React, { useRef } from 'react';
import './ServicesCards.css';
import "C:/Users/lenovo/Desktop/khadamatcomN/khadamatcom1/khadamatcom11/src/components/ServicesDetalis.css"
import { Link, useLocation } from "react-router-dom"; // استخدام useLocation لالتقاط عنوان الصفحة
import './ServicesCards.css';
import "C:/Users/lenovo/Desktop/khadamatcomN/khadamatcom1/khadamatcom11/src/components/ServicesDetalis.css"

export default function ServicesCards({ services }) {
    const scrollRef = useRef(null);
    const location = useLocation(); // الحصول على الـ location

    // التحقق إذا كانت الصفحة هي صفحة الخدمات
    const isServicesPage = location.pathname === "/ServBtn"; // تأكد من المسار الصحيح

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            current.scrollBy({ left: direction === 'left' ? -300 : 300, behavior: 'smooth' });
        }
    };

    return (
        <div className="services-card-container">
            {/* عرض الأزرار فقط إذا كنت في صفحة الخدمات */}
            {!isServicesPage && (
                <>
                    <button className="scroll-btn left-btn" onClick={() => scroll('left')}>&#10094;</button>
                    <button className="scroll-btn right-btn" onClick={() => scroll('right')}>&#10095;</button>
                </>
            )}
            <div className="services-cards-wrapper" ref={scrollRef}>
                <div className="services-cards">
                    {services.map((service) => (
                        <Link to={`/services-in/${service.id}`} key={service.id} className="service-card" >
                            <img src={service.image} alt='service' />
                            <h3>{service.title}</h3>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
