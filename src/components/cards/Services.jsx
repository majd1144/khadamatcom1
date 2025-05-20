import React, { useState , useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { servicesCards } from '../../data.js';
import "./ServicesDetalis.css";
import Booknow from './Booknow.jsx';
import axios from 'axios';

export default function ServiceDetails() {
  const { id } = useParams();
  
  useEffect(() => {
    console.log("user");
    
    axios.get("http://localhost:4000/workers/service/"+ id, { withCredentials: true })
      .then((res) => console.log(res.data))
      .catch((err) => console.error("Error fetching user:", err));
  }, []);
   
  const services = servicesCards.filter((s) => s.id?.toString() === id?.toString());

  console.log(services);
  

  const [showForm, setShowForm] = useState(false);
  // دالة لتغيير الحالة عند الضغط على زر Book Now
  const handleBookNowClick = () => {
    setShowForm(true);
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
                  {/* زر Book Now */}
                  <button onClick={handleBookNowClick} className="btn btn-primary">
                    Book Now
                  </button>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* إظهار النموذج Booknow عند الضغط على Book Now */}
      {showForm && (
        <div className="form-container">
          <Booknow />
        </div>
      )}
    </div>
  );
}
