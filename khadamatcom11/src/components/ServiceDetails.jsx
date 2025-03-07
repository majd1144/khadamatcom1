
import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { servicesCards } from '../data.js'; // استدعاء البيانات
import "C:/Users/lenovo/Desktop/khadamatcomN/khadamatcom1/khadamatcom11/src/components/ServicesDetalis.css"
export default function ServiceDetails() {
  const { id } = useParams(); // التقاط الـ ID من الرابط
  // تصفية الخدمات التي تتطابق مع الـ id
  const services = servicesCards.filter((s) => s.id?.toString() === id?.toString());
  if (services.length === 0) {
    return <h2>Service Not Found</h2>;
  }

  return (
    <span>
      {services.map((service) => (
       <div className="container_welcome">
            <h1>{service.title} <br /><span style={{ fontFamily: "'Playwrite IN', serif" }}></span></h1>
            <br /><br /><br />
            <div className="search-bar_wel">
                <input type="text" placeholder="Search for any service..." />
                <button className="fa fa-search" type="submit"></button>
            </div>
        </div>))}
<div className="container">
      <div className="services-list">
        {services.map((service) => (
          <div className="card" key={service.id} style={{ width: '400px' }}>
            <img className="card-img-top" src={service.image} alt={service.title} style={{ width: '100%' }} />
            <div className="card-body">
              <h4 className="card-title">{service.title}</h4>
              <p className="card-text">{service.description}</p>
              <div className="btn-group">
              {/* <a href="#" className="btn btn-primary">See Profile</a> */}
              <Link to={`/worker/${service.id}`} className="btn btn-primary">
  See Profile
</Link>

               <span className="me-3">
                    <Link to="/Join" className="nav-link"><a href="#" className="btn btn-primary">book now !</a></Link>
                  </span>
             </div>

            </div>
          </div>
        ))}
      </div>
    </div>
    </span>
    
  );
}

