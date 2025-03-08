import React from 'react';
import { Link } from "react-router-dom"; 
import ServicesIn from './ServicesIn';
import ServiceDetails from './ServiceDetails';

import "./ServicesDetalis.css"
export default function Services(props) {
    return (
        <div >
            <Link to={`/services-in/${props.id}`}>  

            <ul className="servicesCards" > 
                <li id='services'>
                    <img src={props.image} alt='service' />
                    <h3>{props.title}</h3>
                </li>
            </ul>
            </Link>
        </div>
    );
}
