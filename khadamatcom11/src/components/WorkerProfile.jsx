// import React from "react";
import { useParams } from "react-router-dom";
import { servicesCards } from "../data";
const WorkerProfile = () => {
    const { id } = useParams(); // جلب الـ ID من الرابط
    const worker = servicesCards.find((w) => w.id === parseInt(id)); // البحث عن العامل باستخدام الـ ID
  
  if (!worker) {
    return <h2>العامل غير موجود</h2>;
  }

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>{worker.title}</h2> {/* هنا نعرض العنوان وليس workerName */}
      <img
        src={worker.image}
        alt={worker.title} // استخدمنا title بدلاً من workerName
        style={{ width: "150px", borderRadius: "50%" }}
      />
      <h3>The service: {worker.title}</h3>
      {/* تأكد من أن لديك خصائص التقييم والسعر والمراجعات في البيانات */}
      <h4>Rating: {worker.rating} ⭐</h4> {/* استخدم بيانات حقيقية إن كانت متوفرة */}
      <h4>Price: {worker.price} $</h4> {/* قم بإضافة بيانات السعر في بيانات الخدمة إذا كانت موجودة */}
      <h4>Appointments available: {worker.availability}</h4> {/* كما في المثال، قم بإضافة مواعيد متاحة إذا كانت موجودة */}
      <br />
      <h4>comments:</h4>
      <ul>
        <li>{worker.reviews}</li>
        {/* <li>مناسب جدًا للعمل، أنصح به.</li> */}
      </ul>
    </div>
  );
};

export default WorkerProfile;
