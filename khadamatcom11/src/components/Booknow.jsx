import React from "react";
const formStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "800px",
  padding: "30px",
  background: "#f8f9fa",
  borderRadius: "10px",
  boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
  zIndex: 9999,
  width: "80%",
};

export default function Booknow({ handleCloseForm }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("تم إرسال النموذج!");
  };

  return (
    <div>
      <form
        style={formStyle}
        className="row g-3 needs-validation"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="col-md-6 position-relative">
          <label htmlFor="personName" className="form-label">
            Full Name
          </label>
          <input type="text" className="form-control" id="personName" required />
          <div className="invalid-tooltip">Please provide your full name.</div>
        </div>

        <div className="col-md-6 position-relative">
          <label htmlFor="jobRequested" className="form-label">
            Job Requested
          </label>
          <input type="text" className="form-control" id="jobRequested" required />
          <div className="invalid-tooltip">Please provide the job you requested.</div>
        </div>

        <div className="col-md-6 position-relative">
          <label htmlFor="timeRequested" className="form-label">
            Time
          </label>
          <input type="time" className="form-control" id="timeRequested" required />
          <div className="invalid-tooltip">Please select the time.</div>
        </div>

        <div className="col-md-6 position-relative">
          <label htmlFor="dayRequested" className="form-label">
            Day
          </label>
          <input type="date" className="form-control" id="dayRequested" required />
          <div className="invalid-tooltip">Please provide the date.</div>
        </div>

        <div className="col-md-6 position-relative">
          <label htmlFor="location" className="form-label">
            Location
          </label>
          <input type="text" className="form-control" id="location" required />
          <div className="invalid-tooltip">Please provide a valid location.</div>
        </div>

        <div className="col-md-6 position-relative">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input type="number" className="form-control" id="price" required />
          <div className="invalid-tooltip">Please provide a valid price.</div>
        </div>

        <div className="col-md-6 position-relative">
          <label htmlFor="phoneNumber" className="form-label">
            Phone Number
          </label>
          <input type="tel" className="form-control" id="phoneNumber" required />
          <div className="invalid-tooltip">Please provide a valid phone number.</div>
        </div>

        <div className="col-md-6 position-relative">
          <label htmlFor="contactNumber" className="form-label">
            Contact Number
          </label>
          <input type="tel" className="form-control" id="contactNumber" required />
          <div className="invalid-tooltip">Please provide a contact number.</div>
        </div>

        <div className="col-12">
          <button className="btn btn-primary" type="submit">
            Submit form
          </button>
          <button type="button" className="btn btn-secondary ms-2" onClick={handleCloseForm}>
            Close
          </button>
        </div>
      </form>
    </div>
  );
}
