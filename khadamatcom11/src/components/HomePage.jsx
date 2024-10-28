import WelcomeBoard from '../components/WelcomeBoard';
// import Services from '../components/Services';
import NavBar from '../components/Navbar/Navbar.jsx';
// import { servicesCards } from '../data.js'; // تأكد من عدم الحاجة لاستيراد "./data.js" مجددًا
import React ,{useState} from "react"
import ServicesCards from './ServicesCards.jsx';
import "C:/Users/lenovo/Desktop/khadamatcom1/khadamatcom11/src/App.css";
import InforMation from "./informations/informations";
//import ServicesIn from './ServicesIn.jsx';
import { Link } from 'react-router-dom';
import { servicesCards } from '../data.js';

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
        {/* <div>
          <CustomSlider/>
        </div> */}
      </div>
    );
}    