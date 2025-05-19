// const Dashboard = () => <h2>Admin Dashboard</h2>;
// export default Dashboard;
// import React from "react";

// const Dashboard = () => {
//   // بيانات افتراضية للتوضيح
//   const usersCount = 150;
//   const workersCount = 45;
//   const bookingsCount = 120;
//   const reportsCount = 8;

//   const boxStyle = {
//     backgroundColor: "rgba(109, 166, 234, 0.73)",
//     color: "white",
//     padding: "20px",
//     borderRadius: "8px",
//     flex: 1,
//     margin: "10px",
//     textAlign: "center",
//   };

//   const containerStyle = {
//     display: "flex",
//     justifyContent: "space-around",
//     marginTop: "20px",
//   };

//   return (
//     <div>
//       <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Admin Dashboard</h2>
//       <div style={containerStyle}>
//         <div style={boxStyle}>
//           <h3>Users</h3>
//           <p style={{ fontSize: "24px", fontWeight: "bold" }}>{usersCount}</p>
//         </div>
//         <div style={boxStyle}>
//           <h3>Workers</h3>
//           <p style={{ fontSize: "24px", fontWeight: "bold" }}>{workersCount}</p>
//         </div>
//         <div style={boxStyle}>
//           <h3>Bookings</h3>
//           <p style={{ fontSize: "24px", fontWeight: "bold" }}>{bookingsCount}</p>
//         </div>
//         <div style={boxStyle}>
//           <h3>Reports</h3>
//           <p style={{ fontSize: "24px", fontWeight: "bold" }}>{reportsCount}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [usersCount, setUsersCount] = useState(0);
  const [workersCount, setWorkersCount] = useState(0);
  const [reviewsCount, setReviewsCount] = useState(0);

  useEffect(() => {
  // جلب عدد المستخدمين
  axios
    .get("http://localhost:4000/users")
    .then((res) => {
      setUsersCount(Array.isArray(res.data) ? res.data.length : 0);
    })
    .catch((err) => console.error("Error fetching users:", err));

  // جلب عدد العمال
  axios
    .get("http://localhost:4000/workers")
    .then((res) => {
      setWorkersCount(Array.isArray(res.data) ? res.data.length : 0);
    })
    .catch((err) => console.error("Error fetching workers:", err));

  // جلب عدد كل التقييمات دفعة وحدة
  axios
    .get("http://localhost:4000/reviews/count/all")
    .then((res) => {
      setReviewsCount(res.data.count || 0);
    })
    .catch((err) => console.error("Error fetching total reviews count:", err));
}, []);


  const boxStyle = {
    backgroundColor: "rgba(109, 166, 234, 0.73)",
    color: "white",
    padding: "20px",
    borderRadius: "8px",
    flex: 1,
    margin: "10px",
    textAlign: "center",
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "20px",
    flexWrap: "wrap",
  };

  return (
    <div>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Admin Dashboard</h2>
      <div style={containerStyle}>
        <div style={boxStyle}>
          <h3>Users</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>{usersCount}</p>
        </div>
        <div style={boxStyle}>
          <h3>Workers</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>{workersCount}</p>
        </div>
        <div style={boxStyle}>
          <h3>Reviews</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>{reviewsCount}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
