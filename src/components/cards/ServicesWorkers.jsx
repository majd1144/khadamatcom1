import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
// import './ServicesWorkers.css';

export default function ServicesWorkers() {
  const { servicecategory } = useParams();
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    console.log("Requested category:", servicecategory);
  
    fetch(`http://localhost:4000/workers/service/${servicecategory}`)
      .then(res => res.json())
      .then(data => {
        console.log("Received workers:", data);
        setWorkers(data);
      })
      .catch(err => console.error("Error fetching workers:", err));
  }, [servicecategory]);
  

  return (
    <div className="workers-container">
      <h2>Workers for {servicecategory}</h2>
      <div className="workers-list">
        {workers.length === 0 ? (
          <p>No workers available.</p>
        ) : (
          workers.map(worker => (
            // <Link to={`/worker/${worker.id}`} key={worker.id} className="worker-card">
            //   <img src={worker.image || '/default-worker.png'} alt={worker.name} />
            //   <h3>{worker.name}</h3>
            //   <p>Rating: {worker.rating || 0} ⭐</p>
            //   <p>Price: {worker.fee} JD</p>
            // </Link>
            <Link to={`/worker/${worker.id}`} key={worker.id} className="worker-card">
  <img src={worker.picture || '/default-worker.png'} alt={`${worker.firstname} ${worker.lastname}`} />
  <h3>{worker.firstname} {worker.lastname}</h3>
  <p>Rating: {worker.average_rating || 0} ⭐</p>
  <p>Price: {worker.fee} JD</p>
</Link>

          ))
        )}
      </div>
    </div>
  );
}
