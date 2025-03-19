import React ,{useState}from "react";
// import "./ValidationForm.css"; // ✅ استدعاء ملف الـ CSS (سننشئه لاحقًا)
// const formStyle = {
//     maxWidth: "800px", // زيادة الحجم
//   margin: "100px auto", // توسيط الفورم عموديًا وأفقيًا
//   padding: "30px", // إضافة padding أكبر
//   background: "#f8f9fa",
//   borderRadius: "10px",
//   boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
//   };
const formStyle = {
    position: "fixed",      // جعل الفورم ثابتًا في الصفحة
    top: "50%",             // جعل الفورم في منتصف الصفحة عموديًا
    left: "50%",            // جعل الفورم في منتصف الصفحة أفقيًا
    transform: "translate(-50%, -50%)",  // تحريك الفورم ليظهر في المنتصف بدقة
    maxWidth: "800px",      // الحد الأقصى لعرض الفورم
    padding: "30px",        // إضافة padding أكبر
    background: "#f8f9fa",  // اللون الخلفي
    borderRadius: "10px",   // الزوايا المنحنية
    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)", // الظل
    zIndex: 9999,           // التأكد من أن الفورم يظهر فوق باقي المحتوى
    width: "80%",           // عرض الفورم
  };
  
export default function Booknow() {
    const [showForm, setShowForm] = useState(false);  // إضافة حالة لـ showForm

    const handleSubmit = (e) => {
      e.preventDefault();
      // هنا يمكن إضافة دالة إرسال البيانات إلى السيرفر أو إظهار رسالة تأكيد
      alert("تم إرسال النموذج!");
    };
  
    const handleBookNowClick = () => {
      setShowForm(true);  // تعيين الحالة لعرض النموذج
    };
  return (
    <form style={formStyle} className="row g-3 needs-validation" onSubmit={handleSubmit} noValidate>
      {/* اسم الشخص */}
      <div className="col-md-6 position-relative">
        <label htmlFor="personName" className="form-label">Full Name</label>
        <input type="text" className="form-control" id="personName" required />
        <div className="invalid-tooltip">Please provide your full name.</div>
      </div>
      
      {/* الوظيفة التي طلبها */}
      <div className="col-md-6 position-relative">
        <label htmlFor="jobRequested" className="form-label">Job Requested</label>
        <input type="text" className="form-control" id="jobRequested" required />
        <div className="invalid-tooltip">Please provide the job you requested.</div>
      </div>
      
      {/* الوقت */}
      <div className="col-md-6 position-relative">
        <label htmlFor="timeRequested" className="form-label">Time</label>
        <input type="time" className="form-control" id="timeRequested" required />
        <div className="invalid-tooltip">Please select the time.</div>
      </div>
      
      {/* اليوم */}
      <div className="col-md-6 position-relative">
        <label htmlFor="dayRequested" className="form-label">Day</label>
        <input type="date" className="form-control" id="dayRequested" required />
        <div className="invalid-tooltip">Please provide the date.</div>
      </div>
      
      {/* الموقع */}
      <div className="col-md-6 position-relative">
        <label htmlFor="location" className="form-label">Location</label>
        <input type="text" className="form-control" id="location" required />
        <div className="invalid-tooltip">Please provide a valid location.</div>
      </div>
      
      {/* السعر */}
      <div className="col-md-6 position-relative">
        <label htmlFor="price" className="form-label">Price</label>
        <input type="number" className="form-control" id="price" required />
        <div className="invalid-tooltip">Please provide a valid price.</div>
      </div>
      
      {/* رقم الهاتف للتواصل */}
      <div className="col-md-6 position-relative">
        <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
        <input type="tel" className="form-control" id="phoneNumber" required />
        <div className="invalid-tooltip">Please provide a valid phone number.</div>
      </div>
      
      {/* رقم المتصل */}
      <div className="col-md-6 position-relative">
        <label htmlFor="contactNumber" className="form-label">Contact Number</label>
        <input type="tel" className="form-control" id="contactNumber" required />
        <div className="invalid-tooltip">Please provide a contact number.</div>
      </div>
      
      {/* زر الإرسال */}
      <div className="col-12">
        <button className="btn btn-primary" type="submit">Submit form</button>
      </div>
    </form>
  );
}

