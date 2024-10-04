import React from 'react';

export default function Services(props) {
    return (
        <div>
            <ul className="servicesCards"> 
                <li id='services'>
                    <img src={props.image} alt='service' />
                    <h3>{props.title}</h3>
                </li>
            </ul>
        </div>
    );
}
