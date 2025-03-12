import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import ServicesCards from './ServicesCards';
import "./ServicesDetalis.css"

export default function ServBtn() {
    const location = useLocation();
    const services = location.state?.services || []; // تجنب الأخطاء إذا لم يتم تمرير بيانات

    return (
        <div>
        <h1 className='p-under-welcomeboard'>All Services</h1>
        <ServicesCards services={services} /> {/* عرض كل الخدمات */}
      </div>
    );
}
