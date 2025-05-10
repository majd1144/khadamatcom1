// import React from "react";
// import { useParams } from "react-router-dom";
// import { servicesCards } from "../data";
// import { Link } from "react-router-dom";

// const WorkersByService = () => {
//   const { serviceName } = useParams(); // جلب اسم الخدمة من الرابط
//   // تصفية جميع العاملين بناءً على الخدمة المحددة
//   const workersInService = servicesCards.filter(
//     (worker) => worker.title === serviceName
//   );

//   if (workersInService.length === 0) {
//     return <h2>لا يوجد عمال لهذه الخدمة</h2>;
//   }

//   return (
//     <div>
//       <h1>العاملين في خدمة {serviceName}</h1>
//       <div className="services-list">
//         {workersInService.map((worker) => (
//           <div key={worker.id} className="card" style={{ width: "400px" }}>
//             <img
//               className="card-img-top"
//               src={worker.image}
//               alt={worker.title}
//               style={{ width: "100%" }}
//             />
//             <div className="card-body">
//               <h4 className="card-title">{worker.title}</h4>
//               <p>{worker.description}</p>
//               <Link to={`/worker/${worker.id}`} className="btn btn-primary">
//                 See Profile
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default WorkersByService;
