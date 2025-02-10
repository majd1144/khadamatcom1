import ServicesCards from './ServicesCards';
import { servicesCards } from '../data.js'; 

export default function ServicesIn() {
    return (
        <div>
            <h1 className='p-under-welcomeboard' >The services!</h1> 
            <ServicesCards services={servicesCards} />
        </div>
    );
}
