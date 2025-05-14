import React, { useState } from "react";
import WelcomeBoard from "../components/WelcomeBoard";  // استيراد مكون WelcomeBoard
import { servicesCards } from "../data.js";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom';
import InforMation from "./informations/informations.jsx";
import ServicesCards from './cards/ServicesCards.jsx';
import "../App.css";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Help from "./Help/Help.jsx";
import Testcom from "./Testcom.jsx"


export default function HomePage({ theme }) { // تمرير theme هنا
  // const [showAll, setShowAll] = useState(false);
  // const displayedServices = showAll ? servicesCards : servicesCards.slice(0, 10); 
  const location = useLocation();
  const [showAll, setShowAll] = useState(location.state?.showAllServices || false);

  useEffect(() => {
    if (location.state?.showAllServices) {
      setShowAll(true);
    }
  }, [location.state]);

  const displayedServices = showAll ? servicesCards : servicesCards.slice(0, 11);
  
  return (
    <div className="component">
      <Testcom/>
      {/* إضافة WelcomeBoard في الصفحة */}
      <WelcomeBoard theme={theme} /> {/* تمرير theme إلى WelcomeBoard */}
      
      <div className="container">
        {/* يمكن وضع المزيد من المحتوى هنا */}
      </div>
      
      <p className="p-under-welcomeboard" id="services-section">Popular services</p>
      <ServicesCards services={displayedServices} />
      
      <div className="majd">
        <InforMation className="majd"/>
      </div>
      <div>
        <br></br>
        <br></br>
        <Help/>
      </div>
    </div>

    
  );
}
