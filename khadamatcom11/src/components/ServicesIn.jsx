import ServicesCards from './ServicesCards';
import { servicesCards } from '../data.js'; 
import ServBtn from './ServBtn';
import "C:/Users/lenovo/Desktop/khadamatcomN/khadamatcom1/khadamatcom11/src/components/ServicesDetalis.css"


export default function ServicesIn() {
    return (
        <div>
            <h1 className='p-under-welcomeboard ' >The services!</h1> 
            <ServicesCards services={servicesCards} />
        </div>
    );
}
