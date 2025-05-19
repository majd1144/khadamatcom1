import React, { useState, useEffect } from "react";
import axios from "axios";

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

const customInputStyle = {
  width: "60%",
};

const customSelectStyle = {
  width: "30%",
  fontSize: "0.9rem",
};

export default function Booknow({ handleCloseForm, selectedWorkerId }) {
  const [user, setUser] = useState(null);

  const [fullName, setFullName] = useState("");
  const [timeRequested, setTimeRequested] = useState("");
  const [dayRequested, setDayRequested] = useState("");
  const [location, setLocation] = useState("");
  const [duration, setDuration] = useState("");
  const [durationUnit, setDurationUnit] = useState("hours");
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:4000/users/loggedin_user", {
          withCredentials: true,
        });
        setUser(res.data);
        setFullName(res.data.name || `${res.data.firstname} ${res.data.lastname}`);
      } catch {
        setError("Failed to load user info");
      }
    };
    fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!dayRequested || !timeRequested || !location || !duration) {
      setError("Please fill in all required fields");
      return;
    }
    if (!selectedWorkerId) {
      setError("Worker is not selected");
      return;
    }

    setError(null);
    setSubmitting(true);

    try {
      const newRequest = {
        userid: user.id,
        workerid: selectedWorkerId,
        servicedate: `${dayRequested}T${timeRequested}:00`,
        status: "pending",
        urgency: false,
        notes: `Duration: ${duration} ${durationUnit}. Location: ${location}.`,
      };

      await axios.post("http://localhost:4000/requests", newRequest, {
        withCredentials: true,
      });

      alert("Request submitted successfully!");
      handleCloseForm();
    } catch {
      setError("Failed to submit request");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <form
        style={formStyle}
        className="row g-3 needs-validation"
        onSubmit={handleSubmit}
        noValidate
      >
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <div className="col-md-12 position-relative">
          <label htmlFor="personName" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            id="personName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            disabled
          />
        </div>

        <div className="col-md-6 position-relative">
          <label htmlFor="timeRequested" className="form-label">
            Time
          </label>
          <input
            type="time"
            className="form-control"
            id="timeRequested"
            value={timeRequested}
            onChange={(e) => setTimeRequested(e.target.value)}
            required
          />
        </div>

        <div className="col-md-6 position-relative">
          <label htmlFor="dayRequested" className="form-label">
            Day
          </label>
          <input
            type="date"
            className="form-control"
            id="dayRequested"
            value={dayRequested}
            onChange={(e) => setDayRequested(e.target.value)}
            required
          />
        </div>

        <div className="col-md-12 position-relative">
          <label htmlFor="location" className="form-label">
            Location
          </label>
          <input
            type="text"
            className="form-control"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        <div className="col-md-6 position-relative">
          <label htmlFor="duration" className="form-label">
            Duration
          </label>
          <div className="d-flex">
            <input
              type="number"
              className="form-control"
              id="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="Enter number"
              style={customInputStyle}
              min="1"
              required
            />
            <select
              className="form-control ms-2"
              id="unit"
              style={customSelectStyle}
              value={durationUnit}
              onChange={(e) => setDurationUnit(e.target.value)}
            >
              <option value="hours">Hours</option>
              <option value="days">Days</option>
            </select>
          </div>
        </div>

        <div className="col-12">
          <button
            className="btn btn-primary"
            type="submit"
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit Request"}
          </button>
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={handleCloseForm}
            disabled={submitting}
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
}



/*import React from "react";

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

const customInputStyle = {
  width: "60%", // Adjust the width for the input field
};

const customSelectStyle = {
  width: "30%", // Smaller width for the select dropdown
  fontSize: "0.9rem", // Adjust the font size to make it look smaller
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
          <input type="number" className="form-control" id="price" required min="0"/>
          <div className="invalid-tooltip">Please provide a valid price.</div>
        </div>

        <div className="col-md-6 position-relative">
          <label htmlFor="phoneNumber" className="form-label">
            Phone Number
          </label>
          <input type="tel" className="form-control" id="phoneNumber" required />
          <div className="invalid-tooltip">Please provide a valid phone number.</div>
        </div>

        {/* Duration input */
      /*}
        
        <div className="col-md-6 position-relative">
          <label htmlFor="duration" className="form-label">
            Duration
          </label>
          <div className="d-flex">
            <input
              type="number"
              className="form-control"
              id="duration"
              required
              placeholder="Enter number"
              style={customInputStyle} // Apply the custom input style
              min="0" // Set the minimum value to 0
            />
            <select
              className="form-control ms-2"
              id="unit"
              style={customSelectStyle} // Apply the custom select style
            >
              <option value="hours">Hours</option>
              <option value="days">Days</option>
            </select>
          </div>
          <div className="invalid-tooltip">Please provide a valid duration.</div>
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
}*/