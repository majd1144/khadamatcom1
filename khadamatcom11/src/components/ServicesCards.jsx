import React, { useRef } from 'react';
import Services from '../components/Services';
import React from 'react';
//import { servicesCards } from '../data.js';
//import "C:\Users\lenovo\Desktop\khadamatcom1\khadamatcom11\src\components\Navbar\Navbar.css";
export default function ServicesCards({services}){
    return(
        <div id='servicescard' className='Services'>
        {services.map((service, index) => (
          <Services key={index} {...service} />
        ))}
      </div>
      <button className="scroll-btn right-btn" onClick={scrollRight}>&gt;</button>
    </div>
  );
}
