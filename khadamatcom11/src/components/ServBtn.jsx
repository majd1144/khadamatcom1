// import ServicesCards from './ServicesCards';
// import { servicesCards } from '../data.js'; 
// import React, { useRef } from 'react';
import { Link } from "react-router-dom";
// import './ServicesCards.css';

// export default function ServBtn({services }) {
//     return (
//         <div>
//             <h1 className='p-under-welcomeboard ' >The services!</h1> 
//              <div className="services-card-container" >
//                         <button className="scroll-btn left-btn" ></button>
//                         <div className="services-cards-wrapper" >
//                             <div className="services-cards">
//                                 {services.map((service) => (
//                                     <Link to={`/services-in/${service.id}`} key={service.id} className="service-card"  >
//                                         <img src={service.image} alt='service' />
//                                         <h3>{service.title}</h3>
//                                     </Link>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>
//             {/* <ServicesCards services={servicesCards} /> */}
//         </div>
//     );
// }
import { useLocation } from "react-router-dom";
import ServicesCards from './ServicesCards';

import "./ServicesDetalis.css"

export default function ServBtn() {
    const location = useLocation();
    const services = location.state?.services || []; // تجنب الأخطاء إذا لم يتم تمرير بيانات

    return (
        <div>
        <h1 className='p-under-welcomeboard'>All Services</h1>
        <ServicesCards services={services} /> {/* عرض كل الخدمات */}
      </div>
        // <div>
        //     <h1 className='p-under-welcomeboard'>The services!</h1>
        //     <div className="services-card-container">
        //         <button className="scroll-btn left-btn"></button>
        //         <div className="services-cards-wrapper">
        //             <div className="services-cards">
        //                 {services.map((service) => (
        //                     <Link to={`/services-in/${service.id}`} key={service.id} className="service-card">
        //                         <img src={service.image} alt='service' />
        //                         <h3>{service.title}</h3>
        //                     </Link>
        //                 ))}
        //             </div>
        //         </div>
        //     </div>
        // </div>
    );
}
