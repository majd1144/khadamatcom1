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
