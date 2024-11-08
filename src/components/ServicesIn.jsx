import ServicesCards from './ServicesCards';
import { servicesCards } from '../data.js'; // استيراد بيانات الخدمات
//import"./App.css";

export default function ServicesIn() {
    return (
        <div>
            <h1 className='p-under-welcomeboard'>The services!</h1> {/* يمكنك إضافة عنوان إذا أردت */}
            <ServicesCards services={servicesCards} /> {/* تمرير خاصية `services` */}
        </div>
    );
}
