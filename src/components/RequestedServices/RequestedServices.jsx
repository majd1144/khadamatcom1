import React, { useEffect, useState } from "react";
import axios from "axios";
import "./RequestedServices.css";

const RequestedServices = () => {
  const [user, setUser] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingRequests, setLoadingRequests] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        setLoadingUser(true);
        const res = await axios.get("http://localhost:4000/users/loggedin_user", {
          withCredentials: true,
        });
        setUser(res.data);
      } catch (err) {
        setError("Failed to load user info.");
      } finally {
        setLoadingUser(false);
      }
    };

    fetchLoggedInUser();
  }, []);

  useEffect(() => {
    if (!user?.id) return;

    const fetchRequests = async () => {
      try {
        setLoadingRequests(true);
        const res = await axios.get(`http://localhost:4000/requests/users/${user.id}`, {
          withCredentials: true,
        });
        setRequests(res.data);
      } catch {
        setError("Failed to load your requests.");
      } finally {
        setLoadingRequests(false);
      }
    };

    fetchRequests();
  }, [user]);

  const handleCancel = async (requestId) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this request?");
    if (!confirmCancel) return;

    try {
      await axios.delete(`http://localhost:4000/requests/${requestId}`, {
        withCredentials: true,
      });
      setRequests((prev) => prev.filter((req) => req.id !== requestId && req._id !== requestId));
    } catch (err) {
      alert("Failed to cancel request. Please try again.");
      console.error(err);
    }
  };

  if (loadingUser) return <p>Loading user information...</p>;
  if (loadingRequests) return <p>Loading your requests...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  const statuses = ["pending", "accepted", "rejected", "completed"];

  return (
    <div>
      <h2>My Requested Services</h2>
      {statuses.map((status) => {
        const filtered = requests.filter((r) => r.status.toLowerCase() === status);
        if (!filtered.length) return null;
        return (
          <section key={status}>
            <h3 style={{ textTransform: "capitalize" }}>{status} requests</h3>
            {filtered.map((req) => (
              <div
                key={req.id || req._id}
                style={{ border: "1px solid #ccc", margin: "0.5rem", padding: "0.5rem" }}
              >
                <p>
                  <strong>Service:</strong> {req.servicecategory || "N/A"}
                </p>
                <p>
                  <strong>Price:</strong> {req.fee ?? "N/A"} JD
                </p>
                <p>
                  <strong>Status:</strong> {req.status}
                </p>
                <p>
                  <strong>Requested at:</strong>{" "}
                  {new Date(req.createdat || req.createdAt).toLocaleString()}
                </p>
                <p>
                  <strong>Worker Name:</strong>{" "}
                  {req.worker_firstname && req.worker_lastname
                    ? `${req.worker_firstname} ${req.worker_lastname}`
                    : "N/A"}
                </p>
                {status === "pending" && (
                  <button className="cancel-button" onClick={() => handleCancel(req.id || req._id)}>
                    Cancel Request
                  </button>
                )}
              </div>
            ))}
          </section>
        );
      })}
    </div>
  );
};

export default RequestedServices;


/*

import React, { useEffect, useState } from "react";
import "./RequestedServices.css";

const RequestedServices = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mockData = [
      {
        id: 1,
        status: "Pending",
        createdAt: new Date().toISOString(),
        worker: {
          user: { name: "Ahmad Ali" },
          jobType: "Electrician",
          price: 25,
        },
      },
      {
        id: 2,
        status: "Accepted",
        createdAt: new Date().toISOString(),
        worker: {
          user: { name: "Sara Hasan" },
          jobType: "Babysitter",
          price: 40,
        },
      },
      {
        id: 3,
        status: "Rejected",
        createdAt: new Date().toISOString(),
        worker: {
          user: { name: "Mohammad Zaid" },
          jobType: "Painter",
          price: 30,
        },
     },
      {
        id: 4,
        status: "Accepted",
        createdAt: new Date().toISOString(),
        worker: {
          user: { name: "Ayham Zataimeh" },
          jobType: "Carbenter",
          price: 150,
        }
      },{
        id: 5,
        status: "Accepted",
        createdAt: new Date().toISOString(),
        worker: {
          user: { name: "raghad saadat" },
          jobType: "Teacher",
          price: 10,
        }
      },
    ];

    setTimeout(() => {
      setRequests(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  const handleCancel = (requestId) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this request?");
    if (!confirmCancel) return;

    setRequests(prev => prev.filter(req => req.id !== requestId));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="requested-services">
      <h2>My Requested Services</h2>
      <hr/>
      {requests.length === 0 ? (
        <p>No requested services found.</p>
      ) : (
        <div className="services-list">
          {requests.map((req) => (
            <div key={req.id} className={`service-card status-${req.status.toLowerCase()}`}>
              <h3>{req.worker.user.name} - {req.worker.jobType}</h3>
              <p><strong>Price:</strong> {req.worker.price} JD</p>
              <p><strong>Status:</strong> {req.status}</p>
              <p><strong>Requested at:</strong> {new Date(req.createdAt).toLocaleString()}</p>
              {req.status === "Pending" && (
                <button className="cancel-button" onClick={() => handleCancel(req.id)}>Cancel Request</button>
              )}
            </div>
            
          ))}
        
        </div>
      )}
    </div>
  );
};

export default RequestedServices;



// // RequestedServices.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./RequestedServices.css";

// const RequestedServices = () => {
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchRequestedServices = async () => {
//       try {
//         const res = await axios.get("http://localhost:4000/requests/user", { withCredentials: true });
//         setRequests(res.data);
//       } catch (err) {
//         console.error("Error fetching requested services:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRequestedServices();
//   }, []);

//   const handleCancel = async (requestId) => {
//     const confirmCancel = window.confirm("Are you sure you want to cancel this request?");
//     if (!confirmCancel) return;

//     try {
//       await axios.delete(`http://localhost:4000/requests/${requestId}`);
//       setRequests(prev => prev.filter(req => req.id !== requestId));
//     } catch (err) {
//       console.error("Error cancelling request:", err);
//     }
//   };

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div className="requested-services">
//       <h2>My Requested Services</h2>
//       {requests.length === 0 ? (
//         <p>No requested services found.</p>
//       ) : (
//         <div className="services-list">
//           {requests.map((req) => (
//             <div key={req.id} className={`service-card status-${req.status.toLowerCase()}`}>
//               <h3>{req.worker?.user?.name} - {req.worker?.jobType}</h3>
//               <p><strong>Price:</strong> {req.worker?.price} JD</p>
//               <p><strong>Status:</strong> {req.status}</p>
//               <p><strong>Requested at:</strong> {new Date(req.createdAt).toLocaleString()}</p>
//               {req.status === "Pending" && (
//                 <button className="cancel-button" onClick={() => handleCancel(req.id)}>Cancel Request</button>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default RequestedServices;

// RequestedServices.jsx
*/