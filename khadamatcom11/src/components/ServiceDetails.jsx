import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { servicesCards } from '../data.js';
import "./ServicesDetalis.css";
import Booknow from './Booknow.jsx';
import axios from 'axios';



export default function ServiceDetails() {
  const { id } = useParams();
  const services = servicesCards.filter((s) => s.id?.toString() === id?.toString());


  useEffect(() => {
    console.log("user");
    
    axios.get("http://localhost:4000/workers/service/"+ id, { withCredentials: true })
      .then((res) => console.log(res.data))
      //services =res.data 
      .catch((err) => console.error("Error fetching user:", err));
  }, [id] );
      

  const [showForm, setShowForm] = useState(false);

  // دالة لتغيير الحالة عند الضغط على زر Book Now
  const handleBookNowClick = () => {
    setShowForm(true); // عند الضغط على الزر، نعرض النموذج
  };

  // دالة لإخفاء النموذج عند الضغط على زر Close
  const handleCloseForm = () => {
    setShowForm(false); // إخفاء النموذج عند الضغط على زر "Close"
  };

  if (services.length === 0) {
    return <h2>Service Not Found</h2>;
  }

  return (
    <div className="container">
      <div className="services-list">
        {services.map((service) => (
          <div className="card" key={service.id} style={{ width: '400px' }}>
            <img className="card" src={service.image} alt={service.name}  />
           <br/>
            <div className="card-body" >
              <h3 className="card-title" style={{ fontFamily: "roman" }}>{service.name}</h3>
              <br />
              <h4 className="card-subtitle">The job : {service.title}</h4>
              <br />
              <h4 className="card-subtitle"> location : {service.location}</h4>
              <p className="card-rating">⭐ {service.rating} </p>

              <div className="btn-group">
              <Link to={`/worker/${service.id}`} className="btn btn-primary">
                  See Profile 
                </Link>
                <span className="me-3">
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
          <Booknow handleCloseForm={handleCloseForm} /> {/* تمرير الدالة هنا */}
        </div>
      )}
    </div>
  );
}
