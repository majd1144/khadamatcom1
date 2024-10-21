import Services from '../components/Services';
import { servicesCards } from '../data.js';
//import "C:\Users\lenovo\Desktop\khadamatcom1\khadamatcom11\src\components\Navbar\Navbar.css";
export default function ServicesCards(){
    return(
        <div id='servicescard' className='Services'>
        {servicesCards.map((service, index) => (
            <Services key={index} {...service} />
          ))}</div>
    );
}