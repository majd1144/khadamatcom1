import React, { useEffect, useState } from "react";
import axios from "axios";

const MyServices = () => {
  const [worker, setWorker] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loadingWorker, setLoadingWorker] = useState(true);
  const [loadingRequests, setLoadingRequests] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkerInfo = async () => {
      try {
        setLoadingWorker(true);
        const userRes = await axios.get("http://localhost:4000/users/loggedin_user", { withCredentials: true });
        if (userRes.data.role !== "worker") {
          setError("You are not authorized to view this page.");
          return;
        }
        const workerRes = await axios.get(`http://localhost:4000/workers/users/${userRes.data.id}`, { withCredentials: true });
        setWorker(workerRes.data);
      } catch {
        setError("Failed to load worker info.");
      } finally {
        setLoadingWorker(false);
      }
    };

    fetchWorkerInfo();
  }, []);

  useEffect(() => {
    if (!worker?.id && !worker?.worker_id) return;

    const id = worker.id || worker.worker_id;
    const fetchRequests = async () => {
      try {
        setLoadingRequests(true);
        const res = await axios.get(`http://localhost:4000/requests/workers/${id}`, { withCredentials: true });
        setRequests(res.data);
      } catch {
        setError("Failed to load worker's requests.");
      } finally {
        setLoadingRequests(false);
      }
    };

    fetchRequests();
  }, [worker]);

  const handleStatusChange = async (requestId, newStatus) => {
    try {
      await axios.patch(
        `http://localhost:4000/requests/${requestId}`,
        { status: newStatus },
        { withCredentials: true }
      );
      setRequests((prev) =>
        prev.map((req) =>
          req.id === requestId || req._id === requestId
            ? { ...req, status: newStatus }
            : req
        )
      );
    } catch {
      alert("Failed to update request status.");
    }
  };

  if (loadingWorker) return <p>Loading worker info...</p>;
  if (loadingRequests) return <p>Loading requests...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  const statuses = ["pending", "accepted", "rejected", "completed"];

  return (
    <div>
      <h2>Requests Assigned To You</h2>
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
                <p><strong>Service:</strong> {req.servicecategory || "N/A"}</p>
                <p><strong>Price:</strong> {req.fee ?? "N/A"} JD</p>
                <p><strong>Status:</strong> {req.status}</p>
                <p><strong>User Name:</strong> {req.firstname && req.lastname ? `${req.firstname} ${req.lastname}` : "N/A"}</p>

                {status === "pending" && (
                  <div>
                    <button onClick={() => handleStatusChange(req.id || req._id, "accepted")}>Accept</button>
                    <button onClick={() => handleStatusChange(req.id || req._id, "rejected")}>Reject</button>
                  </div>
                )}

                {status === "accepted" && (
                  <div>
                    <button onClick={() => handleStatusChange(req.id || req._id, "completed")}>Mark as Completed</button>
                  </div>
                )}
              </div>
            ))}
          </section>
        );
      })}
    </div>
  );
};

export default MyServices;

/*

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Card, Button, Spinner, Alert, Row, Col } from "react-bootstrap";

// const MyServices = () => {
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

// const worker = JSON.parse(localStorage.getItem("worker"));
// const workerId = worker?._id;

//   useEffect(() => {
//     axios
//       .get(`http://localhost:4000/worker-requests/${workerId}`)
//       .then((res) => {
//         setRequests(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError("Failed to load service requests.");
//         setLoading(false);
//       });
//   }, []);

//   const handleStatusChange = async (requestId, newStatus) => {
//     try {
//       await axios.patch(`http://localhost:4000/worker-requests/${requestId}`, {
//         status: newStatus,
//       });
//       setRequests((prev) =>
//         prev.map((req) =>
//           req._id === requestId ? { ...req, status: newStatus } : req
//         )
//       );
//     } catch {
//       alert("Something went wrong while updating status.");
//     }
//   };

//   const pendingRequests = requests.filter((r) => r.status === "pending");
//   const completedRequests = requests.filter((r) => r.status === "completed");

//   if (loading) return <Spinner animation="border" />;
//   if (error) return <Alert variant="danger">{error}</Alert>;

//   return (
//     <div className="container my-4">
//       <h2 className="mb-3">📝 New Service Requests</h2>
//       <Row>
//         {pendingRequests.length === 0 && <p>No new requests.</p>}
//         {pendingRequests.map((req) => (
//           <Col md={6} lg={4} key={req._id} className="mb-3">
//             <Card>
//               <Card.Body>
//                 <Card.Title>{req.serviceName}</Card.Title>
//                 <Card.Subtitle className="mb-2 text-muted">
//                   Requested by: {req.userName}
//                 </Card.Subtitle>
//                 <Card.Text>{req.notes || "No additional notes."}</Card.Text>
//                 <div className="d-flex justify-content-between">
//                   <Button
//                     variant="success"
//                     onClick={() => handleStatusChange(req._id, "completed")}
//                   >
//                     Accept
//                   </Button>
//                   <Button
//                     variant="danger"
//                     onClick={() => handleStatusChange(req._id, "rejected")}
//                   >
//                     Reject
//                   </Button>
//                 </div>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>

//       <hr className="my-4" />

//       <h2 className="mb-3">✅ Completed Requests</h2>
//       <Row>
//         {completedRequests.length === 0 && <p>No completed services yet.</p>}
//         {completedRequests.map((req) => (
//           <Col md={6} lg={4} key={req._id} className="mb-3">
//             <Card bg="light">
//               <Card.Body>
//                 <Card.Title>{req.serviceName}</Card.Title>
//                 <Card.Subtitle className="mb-2 text-muted">
//                   Client: {req.userName}
//                 </Card.Subtitle>
//                 <Card.Text>✅ Completed</Card.Text>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//     </div>
//   );
// };

// export default MyServices;
import React, { useEffect, useState } from "react";
import { Card, Button, Spinner, Alert, Row, Col } from "react-bootstrap";

const MyServices = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // بيانات وهمية (تجريبية)
  const dummyData = [
    {
      _id: 1,
      serviceName: "Carpenter",
      userName: "Layla saadat",
      firstday : "15/5/2025",
      Lastday : "1/6/2025",
      notes: "Children's bedroom",
      Location:"Tabarbour",
      price: "500 JD",
      phone_number: "0797011655",
      status: "pending",
    },
    {
      _id: 2,
      serviceName: "Carpenter",
      userName: "Ahmad jaber",
      firstday : "20/5/2025",
      Lastday : "30/5/2025",
      notes: "Study desk",
      Location:"Tabarbour",
      price: "70 JD",
      phone_number: "0795651995",
      status: "pending",
    },
    {
      _id: 3,
      serviceName: "Carpenter",
      userName: "Sara mousa",
      firstday : "1/4/2025",
      Lastday : "1/5/2025",
      notes: "Children's bedroom",
      price: "665 JD",
      Location:"Tabarbour",
      phone_number: "0799999999",
      status: "completed",
    },  {
      _id: 4,
      serviceName: "Carpenter",
      userName: "Ayham zataymeh",
      firstday : "25/3/2025",
      Lastday : "30/3/2025",
      notes: "2 table",
      price: "200 JD",
      Location:"Tabarbour",
      phone_number: "0785956231",
      status: "completed",
    },
  ];

  useEffect(() => {
    // محاكاة تحميل البيانات
    setTimeout(() => {
      setRequests(dummyData);
      setLoading(false);
    }, 1000);
  }, []);

  const handleStatusChange = (requestId, newStatus) => {
    setRequests((prev) =>
      prev.map((req) =>
        req._id === requestId ? { ...req, status: newStatus } : req
      )
    );
  };

  const pendingRequests = requests.filter((r) => r.status === "pending");
  const completedRequests = requests.filter((r) => r.status === "completed");

  if (loading) return <Spinner animation="border" />;
  
  return (
    <div className="container my-4">
      <h2 className="mb-3">📝 New Service Requests</h2>
      <Row>
        {pendingRequests.length === 0 && <p>No new requests.</p>}
        {pendingRequests.map((req) => (
          <Col md={6} lg={4} key={req._id} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>{req.serviceName}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Requested by: {req.userName}
                </Card.Subtitle>
                <Card.Text>Service :{req.notes || "No additional notes."}</Card.Text>
                <Card.Text>First Day     :{req.firstday}</Card.Text>
                <Card.Text>Last  Day     :{req.Lastday}</Card.Text>
                <Card.Text>Location     :{req.Location}</Card.Text>
                <Card.Text>Price    :{req.price}</Card.Text>
                <Card.Text>Phone Number :{req.phone_number}</Card.Text>
                <div className="d-flex justify-content-between">
                  <Button
                    variant="success"
                    onClick={() => handleStatusChange(req._id, "completed")}
                  >
                    Accept
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleStatusChange(req._id, "rejected")}
                  >
                    Reject
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <hr className="my-4" />

      <h2 className="mb-3">✅ Completed Requests</h2>
      <Row>
        {completedRequests.length === 0 && <p>No completed services yet.</p>}
        {completedRequests.map((req) => (
          <Col md={6} lg={4} key={req._id} className="mb-3">
            <Card bg="light">
              <Card.Body>
                <Card.Title>{req.serviceName}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Client: {req.userName}
                </Card.Subtitle>
                <Card.Text>✅ Completed</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default MyServices;

*/