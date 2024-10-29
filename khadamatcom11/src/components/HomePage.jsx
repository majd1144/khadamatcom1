import WelcomeBoard from '../components/WelcomeBoard';
// import Services from '../components/Services';
import NavBar from '../components/Navbar/Navbar.jsx';
// import { servicesCards } from '../data.js'; // تأكد من عدم الحاجة لاستيراد "./data.js" مجددًا
import React ,{useState} from "react"
import ServicesCards from './ServicesCards.jsx';
import InforMations from '../components/informations/informations.jsx'
import FooteRr from './footerr.jsx';
// import "C:/Users/lenovo/Desktop/khadamatcom1/khadamatcom11/components/App.css";
export default function HomePage(){
    const [theme, setTheme] = useState('light');

    return(
        <div className='component'>
          <NavBar className='nav' theme={theme} setTheme={setTheme} />
        <div className='container'>
       
          <WelcomeBoard />
        </div>
        
        <p className='p-under-welcomeboard'>Popular services</p>
        <div>
        <ServicesCards/> </div>
        <button className="button-more"></button>
        
        <div className='majd'>
          <InforMations className='majd'/>
        </div>
       <div>
        <FooteRr/>
       </div>
      </div>
    );
}    
