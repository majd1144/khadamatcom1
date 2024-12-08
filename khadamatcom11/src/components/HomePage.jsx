import WelcomeBoard from '../components/WelcomeBoard';
import { servicesCards } from '../data.js';
import React ,{useState} from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom';
import InforMation from "./informations/informations.jsx";
import ServicesCards from './ServicesCards.jsx';
import "../App.css";

export default function HomePage(){
  const [showAll, setShowAll] = useState(false);
    const displayedServices = showAll ? servicesCards : servicesCards.slice(0, 10); 
    return(
        <div className='component'>
        <div className='container'>
       
          <WelcomeBoard />
        </div>
        
        <p className='p-under-welcomeboard'>Popular services</p>
        <div>
                <ServicesCards services={displayedServices} />
            </div>

            {/* Button to download all services*/}
            {!showAll && (<li className="nav-item">
              <Link to="/ServicesIn" className="nav-link">
                <button onClick={() => setShowAll(true)} className="button-more">
                  
                </button>
                </Link>
                </li>
            )}

        <div className='majd'>
          <InforMation className='majd'/>
        </div>
        
      </div>
    );
}    