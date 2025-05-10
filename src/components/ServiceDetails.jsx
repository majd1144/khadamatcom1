import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { servicesCards } from '../data.js';
import "./ServicesDetalis.css";
import axios from 'axios';
import './ServicesDetalis.css';
import Booknow from './Booknow.jsx';
import person from "../asset/person.png";//


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
      <h2 className="text-center mb-4">Workers for: {servicecategory}</h2>
      <div className="services-cards-wrapper">
        {workers.map((w) => (
          <div className="card" key={w.id} style={{ width: '400px' }}>
            <img className="card" src={person} alt={w.img} />
            <br />
            <div className="card-body">
              <h3 className="card-title" style={{ fontFamily: 'roman' }}>{w.firstname} {w.lastname}</h3>
              <br />
              <h4 className="card-subtitle">The job: {w.servicecategory}</h4>
              <br />
              <h4 className="card-subtitle">Location: {w.governorate}</h4>
              <p className="card-rating">⭐ {w.average_rating || "0"}</p>

              <div className="btn-group">
                <Link to={`/worker/${w.worker_id}`} className="btn btn-primary">
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







// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
// import { servicesCards } from '../data.js';
// import "./ServicesDetalis.css";
// import Booknow from './Booknow.jsx';

// export default function ServiceDetails() {
//   const { id } = useParams();
//   const services = servicesCards.filter((s) => s.id?.toString() === id?.toString());

//   const [showForm, setShowForm] = useState(false);

//   // دالة لتغيير الحالة عند الضغط على زر Book Now
//   const handleBookNowClick = () => {
//     setShowForm(true); // عند الضغط على الزر، نعرض النموذج
//   };

//   // دالة لإخفاء النموذج عند الضغط على زر Close
//   const handleCloseForm = () => {
//     setShowForm(false); // إخفاء النموذج عند الضغط على زر "Close"
//   };

//   if (services.length === 0) {
//     return <h2>Service Not Found</h2>;
//   }

//   return (
//     <div className="container">
//       <div className="services-list">
//         {services.map((service) => (
//           <div className="card" key={service.id} style={{ width: '400px' }}>
//             <img className="card" src={service.image} alt={service.name}  />
//            <br/>
//             <div className="card-body" >
//               <h3 className="card-title" style={{ fontFamily: "roman" }}>{service.name}</h3>
//               <br />
//               <h4 className="card-subtitle">The job : {service.title}</h4>
//               <br />
//               <h4 className="card-subtitle"> location : {service.location}</h4>
//               <p className="card-rating">⭐ {service.rating} </p>

//               <div className="btn-group">
//               <Link to={`/worker/${service.id}`} className="btn btn-primary">
//                   See Profile 
//                 </Link>
//                 <span className="me-3">
//                   <button onClick={handleBookNowClick} className="btn btn-primary">
//                     Book Now
//                   </button>
//                 </span>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* إظهار الفورم عند الضغط على Book Now */}
//       {showForm && (
//         <div className="form-container">
//           <Booknow handleCloseForm={handleCloseForm} /> {/* تمرير الدالة هنا */}
//         </div>
//       )}
//     </div>
//   );
// }
// import axios from 'axios';
// import './ServicesDetalis.css';
// import Booknow from './Booknow.jsx';



// export default function ServiceDetails() {
//   const { id } = useParams();
//   const services = servicesCards.filter((s) => s.id?.toString() === id?.toString());


//   useEffect(() => {
//     console.log("user");
    
//     axios.get("http://localhost:4000/workers/service/"+ id, { withCredentials: true })
//       .then((res) => console.log(res.data))
//       //services =res.data 
//       .catch((err) => console.error("Error fetching user:", err));
//   }, [id] );
      

//   const { servicecategory } = useParams();
//   const [workers, setWorkers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showForm, setShowForm] = useState(false);

//   useEffect(() => {
//     axios.get(`http://localhost:4000/workers/service/${servicecategory}`)
//       .then((response) => {
//         console.log("API response data:", response.data);
//         console.log("Type of data:", typeof response.data);
//         setWorkers(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching workers:", error);
//         setLoading(false);
//       });
//   }, [servicecategory]);

//   const handleBookNowClick = () => {
//     setShowForm(true);
//   };

//   const handleCloseForm = () => {
//     setShowForm(false);
//   };

//   if (loading) {
//     return <h2>Loading... {servicecategory}</h2>;
//   }

// if (!Array.isArray(workers) || workers.length === 0) {
//   return <h2>No workers found for this service.</h2>;
// }

//   return (
//     <div className="container">
//       <h2 className="text-center mb-4">Workers for: {servicecategory}</h2>
//       <div className="services-list">
//         {workers.map((worker) => (
//           <div className="card" key={worker.id} style={{ width: '400px' }}>
//             <img className="card" src={worker.image} alt={worker.name} />
//             <br />
//             <div className="card-body">
//               <h3 className="card-title" style={{ fontFamily: 'roman' }}>{worker.firstname} {worker.lastname}</h3>
//               <br />
//               <h4 className="card-subtitle">The job: {worker.servicecategory}</h4>
//               <br />
//               <h4 className="card-subtitle">Location: {worker.governorate}</h4>
//               <p className="card-rating">⭐ {worker.rating}</p>

//               <div className="btn-group">
//                 <Link to={`/worker/${worker.id}`} className="btn btn-primary">
//                 <p>{worker.id}</p>
//                   See Profile
//                 </Link>
//                 <span className="me-3">
//                   <button onClick={handleBookNowClick} className="btn btn-primary">
//                     Book Now
//                   </button>
//                 </span>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {showForm && (
//         <div className="form-container">
//           <Booknow handleCloseForm={handleCloseForm} />
//         </div>
//       )}
//     </div>
//   );
// }
