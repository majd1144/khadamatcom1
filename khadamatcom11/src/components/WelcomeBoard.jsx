export default function WelcomeBoard({ theme }) {
    const isLight = theme === 'light'; // تحديد ما إذا كان الثيم فاتحًا
  
    return (
      <div
        className="container_welcome"
        style={{
          backgroundColor: isLight ? '#2673d0' : '#333', // لون خلفية ثابت لكل ثيم
          backgroundImage: isLight
            ? 'linear-gradient(to bottom right, #2673d0 , #cddef2)' // تدرج الألوان في الثيم الفاتح
            : 'linear-gradient(to bottom right, #3c3838,rgb(96, 88, 88))', // تدرج الألوان في الثيم المظلم
               width: '75%',
               margin: '0 auto',
               marginTop:'50px',
        }}
      >
        <h1>Scale your professional <br /> workforce with{" "}
          <span style={{ fontFamily: "'Playwrite IN', serif" }}>Freelancers</span>
        </h1>
        <br /><br /><br />
        <div className="search-bar_wel">
          <input type="text" placeholder="Search for any service..." />
          <button className="fa fa-search" type="submit"></button>
        </div>
  
    
      </div>
    );
  }
// import React from "react";
// import { useParams } from "react-router-dom";
// import { servicesCards } from "../data"; // استيراد بيانات الخدمات

// const WorkerProfile = () => {
//   const { workerId } = useParams(); // جلب المعرف من الرابط
//   const worker = servicesCards.find((w) => w.id === parseInt(workerId)); // البحث عن العامل

//   if (!worker) {
//     return <h2>العامل غير موجود</h2>;
//   }

//   return (
//     <div style={{ padding: "20px", textAlign: "center" }}>
//       <h2>{worker.title}</h2>
//       <img
//         src={worker.image}
//         alt={worker.title}
//         style={{ width: "150px", borderRadius: "50%" }}
//       />
//       <h3>الخدمة: {worker.title}</h3>
//       <h4>التقييم: {worker.rating} ⭐</h4>
//       <h4>السعر: {worker.price}</h4>
//       <h4>المواعيد المتاحة: {worker.availability}</h4>
//       <h4>التعليقات:</h4>
//       <ul>
//         {worker.reviews.map((review, index) => (
//           <li key={index}>{review}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default WorkerProfile;
