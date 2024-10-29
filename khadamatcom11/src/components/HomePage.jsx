import WelcomeBoard from '../components/WelcomeBoard';
import NavBar from '../components/Navbar/Navbar.jsx';
import { servicesCards } from '../data.js';
import React ,{useState} from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom';
import FooteRr from "./Footerr.jsx";
import InforMation from "./informations/informations.jsx";
import ServicesCards from './ServicesCards.jsx';
import ServicesIn from './ServicesIn.jsx';


export default function HomePage(){
  const [showAll, setShowAll] = useState(false);
    const [theme, setTheme] = useState('light');
    const displayedServices = showAll ? servicesCards : servicesCards.slice(0, 7); 
    return(
        <div className='component'>
          <NavBar className='nav' theme={theme} setTheme={setTheme} />
        <div className='container'>
       
          <WelcomeBoard />
        </div>
        
        <p className='p-under-welcomeboard'>Popular services</p>
        <div>
                {/* تمرير العناصر المحددة إلى ServicesCards */}
                <ServicesCards services={displayedServices} />
            </div>

            {/* زر لتحميل كل الخدمات */}
            {!showAll && (<li className="nav-item">
              <Link to="/ServicesIn" className="nav-link">
                <button onClick={() => setShowAll(true)} className="button-more">
                  
                </button>
                </Link>
                </li>
            )}

        {/* <li className="nav-item">
              <Link to="/ServicesIn" className="nav-link">
              <button className="button-more"></button>              </Link>
            </li> */}
        
        
        <div className='majd'>
          <InforMation className='majd'/>
        </div>
       <div>
        <FooteRr/>
       </div>
      </div>
    );
}    