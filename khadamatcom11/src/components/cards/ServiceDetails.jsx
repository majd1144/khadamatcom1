import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ServicesDetalis.css';
import Booknow from './Booknow.jsx';
import person from "../../asset/person.png";
import ServBtn from "../cards/ServBtn.jsx";

export default function ServiceDetails() {
  const { servicecategory } = useParams();
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedWorkerId, setSelectedWorkerId] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:4000/workers/service/${servicecategory}`)
      .then((response) => {
        setWorkers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching workers:", error);
        setLoading(false);
      });
  }, [servicecategory]);

  const handleBookNowClick = (workerId) => {
    setSelectedWorkerId(workerId);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedWorkerId(null);
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!Array.isArray(workers) || workers.length === 0) {
    return <h2>No workers found for this service.</h2>;
  }

  return (
    <div className="container">
      <ServBtn />
      <h2 className="text-center mb-4">Workers for: {servicecategory}</h2>
      <div className="services-cards-wrapper">
        {workers.map((w) => (
          <div className="card CardWorker" key={w.id} style={{ width: '400px' }}>
            <img className="card" src={person} alt={w.img} />
            <br />
            <div className="card-body">
              <h3 className="card-title">{w.firstname} {w.lastname}</h3>
              <br />
              <h4 className="card-subtitle">The job: {w.servicecategory}</h4>
              <br />
              <h4 className="card-subtitle">Location: {w.governorate}</h4>
              <p className="card-rating">⭐ {w.average_rating || "0"}</p>

              <div className="btn-group">
                <Link to={`/worker/${w.worker_id}`} className="btn-CARDW">
                  See Profile
                </Link>
                <span className="me-3">
                  <button onClick={() => handleBookNowClick(w.worker_id)} className="btn-CARDW">
                    Book Now
                  </button>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="form-container">
          <Booknow
            handleCloseForm={handleCloseForm}
            selectedWorkerId={selectedWorkerId}
          />
        </div>
      )}
    </div>
  );
}


/*import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { servicesCards } from '../../data.js';
import axios from 'axios';
import './ServicesDetalis.css';
import Booknow from './Booknow.jsx';
import person from "../../asset/person.png";
import ServBtn from "../cards/ServBtn.jsx";
import ServicesCards from './ServicesCards';


export default function ServiceDetails() {
  const { id } = useParams();
  const services = servicesCards.filter((s) => s.id?.toString() === id?.toString());
  const { servicecategory } = useParams();
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:4000/workers/service/${servicecategory}`)
      .then((response) => {
        setWorkers(response.data);
        console.log(response.data)
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching workers:", error);
        setLoading(false);
      });
  }, [servicecategory]);

  const handleBookNowClick = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

if (!Array.isArray(workers) || workers.length === 0) {
  return <h2>No workers found for this service.</h2>;
}

  return (
    <div className="container">
      <ServBtn/>      
      <h2 className="text-center mb-4">Workers for: {servicecategory}</h2>
      <div className="services-cards-wrapper">
        {workers.map((w) => (
          <div className="card CardWorker" key={w.id} style={{ width: '400px' }}>
            <img className="card" src={person} alt={w.img} />
            <br />
            <div className="card-body">
              <h3 className="card-title">{w.firstname} {w.lastname}</h3>
              <br />
              <h4 className="card-subtitle">The job: {w.servicecategory}</h4>
              <br />
              <h4 className="card-subtitle">Location: {w.governorate}</h4>
              <p className="card-rating">⭐ {w.average_rating || "0"}</p>

              <div className="btn-group">
                <Link to={`/worker/${w.worker_id}`} className=" btn-CARDW">
                  See Profile
                  {/* btn btn-primary */
                /*}
                </Link>
                <span className="me-3">
                  <button onClick={handleBookNowClick} className=" btn-CARDW">
                    Book Now
                  </button>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="form-container">
          <Booknow handleCloseForm={handleCloseForm} />
        </div>
      )}
    </div>
  );
}
*/