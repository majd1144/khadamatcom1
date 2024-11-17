import Services from '../components/Services';
import React from 'react';
export default function ServicesCards({services}){
    return(
        <div id='servicescard' className='Services'>
        {services.map((service, index) => (
            <Services key={index} {...service} />
          ))}</div>
    );
}