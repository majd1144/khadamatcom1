import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { servicesCards } from '../data.js';
import "./ServicesDetalis.css";
import Booknow from './Booknow.jsx';

export default function ServiceDetails() {
  const { id } = useParams();
  const services = servicesCards.filter((s) => s.id?.toString() === id?.toString());

  const [showForm, setShowForm] = useState(false);  // الحالة للتحكم في عرض النموذج

  // دالة لتغيير الحالة عند الضغط على زر Book Now
  const handleBookNowClick = () => {
    setShowForm(true); // عند الضغط على الزر، نعرض النموذج
  };

  if (services.length === 0) {
    return <h2>Service Not Found</h2>;
  }

  return (
    <div className="container">
      <div className="services-list">
        {services.map((service) => (
          <div className="card" key={service.id} style={{ width: '400px' }}>
            <img className="card" src={service.image} alt={service.name} style={{ width: '100%' }} />
            <div className="card-body" style={{ textAlign: "center" }}>
              <h3 className="card-title" style={{ fontFamily: "roman" }}>{service.name}</h3>
              <br />
              <h4 className="card-subtitle">{service.title}</h4>
              <br />
              <h4 className="card-subtitle">{service.location}</h4>

              <p className="card-rating">⭐ {service.rating} / 5</p>

              <div className="btn-group">
                <Link to={`/worker/${service.id}`} className="btn btn-primary">
                  See Profile
                </Link>
                <span className="me-3">
                  {/* زر Book Now الذي عند الضغط عليه يعرض الفورم */}
                  <button onClick={handleBookNowClick} className="btn btn-primary">
                    Book Now
                  </button>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* إظهار الفورم عند الضغط على Book Now */}
      {showForm && (
        <div className="form-container">
          <Booknow />
        </div>
      )}
    </div>
  );
}
