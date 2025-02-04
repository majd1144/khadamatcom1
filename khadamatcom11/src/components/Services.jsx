import React from 'react';
import { Link } from "react-router-dom"; 
import ServicesIn from './ServicesIn';
import ServiceDetails from './ServiceDetails';
export default function Services(props) {
    return (
        <div id="services-section">
            {/* <Link to="/ServicesIn"> */}
            <Link to={`/services-in/${props.id}`}>  {/* تمرير الـ ID في الرابط */}

            <ul className="servicesCards"> 
                <li id='services'>
                    <img src={props.image} alt='service' />
                    <h3>{props.title}</h3>
                </li>
            </ul>
            </Link>
        </div>
    );
}
