import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './ServicesDetalis.css';
import Booknow from './Booknow.jsx';
import person from '../asset/person.png';
export default function ServiceDetails() {
  const { servicecategory } = useParams(); // نجيب نوع الخدمة من الرابط
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // دالة لجلب العمّال حسب نوع الخدمة
  useEffect(() => {
    axios.get(`http://localhost:4000/workers?servicecategory=${servicecategory}`)
      .then((response) => {
        console.log("Response data:", response.data); // طباعة البيانات للتأكد من محتوياتها
        setWorkers(response.data); // نخزن البيانات المستلمة في حالة العمال
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching workers:", error);
        setLoading(false);
      });
  }, [servicecategory]); // إعادة تحميل البيانات كلما تغيرت الفئة

  const handleBookNowClick = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (workers.length === 0) {
    return <h2>No workers found for this service.</h2>;
  }

  return (
    <div className="container">
      <h2 className="text-center mb-4">Workers for: {servicecategory|| 'undefined'}</h2>
      <div className="services-list">
        {workers.map((worker) => (
          <div className="card" key={worker.id} style={{ width: '400px' }}>
            {/* التأكد من أن الصورة موجودة */}
            <img className="card-img-top" src={worker.picture ? `http://localhost:4000/images/${worker.picture}` : {person}} alt={worker.name} />
            <div className="card-body">
              {/* التأكد من وجود الاسم */}
              <h4 className="card-title" >The Name: {worker.firstname || 'No Name Available'}</h4>
              {/* التأكد من وجود الوصف */}
              <h4 className="card-subtitle">The job: {worker.servicecategory}</h4>
              <h4 className="card-subtitle">Location: {worker.governorate || 'Not Available'}</h4>
              {/* التأكد من وجود التقييم */}
              <p className="card-rating">⭐ {worker.average_rating || 'No Rating'}</p>

              <div className="btn-group">
                <Link to={`/worker/${worker.id}`} className="btn btn-primary">
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

      {showForm && (
        <div className="form-container">
          <Booknow handleCloseForm={handleCloseForm} />
        </div>
      )}
    </div>
  );
}
