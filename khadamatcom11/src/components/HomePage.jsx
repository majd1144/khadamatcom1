import React, { useState } from "react";
import WelcomeBoard from "../components/WelcomeBoard";  // استيراد مكون WelcomeBoard
import { servicesCards } from "../data.js";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom';
import InforMation from "./informations/informations.jsx";
import ServicesCards from './ServicesCards.jsx';
import "../App.css";

export default function HomePage({ theme }) { // تمرير theme هنا
  const [showAll, setShowAll] = useState(false);
  const displayedServices = showAll ? servicesCards : servicesCards.slice(0, 10); 

  return (
    <div className="component">
      {/* إضافة WelcomeBoard في الصفحة */}
      <WelcomeBoard theme={theme} /> {/* تمرير theme إلى WelcomeBoard */}
      
      <div className="container">
        {/* يمكن وضع المزيد من المحتوى هنا */}
      </div>
      
      <p className="p-under-welcomeboard" id="services-section">Popular services</p>
      
      <div>
        <ServicesCards services={displayedServices} />
      </div>
      
      <div className="majd">
        <InforMation className="majd"/>
      </div>
    </div>
  );
}
