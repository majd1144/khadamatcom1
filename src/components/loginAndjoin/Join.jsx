import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useNavigate } from "react-router-dom"; 
import "./Logins.css";

function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstname: "",
    lastName: "",
    nationalID: "",
    email: "",
    phone: "",
    location: "",
    password: "",
    confirmPassword: "",
    birthDate: "",
    gender: "",
    userType: "",
    services: "",
    bio:null,
    experience:null,
    fee:null,
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "nationalID" && !/^[0-9]*$/.test(value)) return;
    setFormData({ ...formData, [name]: value });
    if (name === "confirmPassword" || name === "password") {
      if (name === "confirmPassword" && formData.password !== value) {
        setError("Passwords do not match.");
      } else {
        setError("");
      }
    }
  };

  const validateStep = () => {
    if (step === 1) {
      return (
        formData.firstname &&
        formData.lastName &&
        formData.nationalID &&
        formData.email &&
        formData.location &&
        formData.phone
      );
    }
    if (step === 2) {
      return (
        formData.password &&
        formData.confirmPassword &&
        formData.password === formData.confirmPassword
      );
    }
    if (step === 3) {
      return formData.birthDate && formData.gender && formData.userType && formData.services;
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep(step + 1);
    } else {
      setError("Please fill in all fields correctly before proceeding.");
    }
  };

  const prevStep = () => {
    if (step === 1) {
      window.history.back(); 
    } else {
      setStep(step - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateStep()) {
      console.log("Form submitted:", formData);
    } else {
      setError("Please fill in all fields correctly before submitting.");
    }

    if (!formData.firstname || !formData.email || !formData.password) {
      alert("Please fill in all required fields!");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/Join", {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    Accept: 'application/json',
  },
  credentials: "include", // 🔥 ADD THIS
  body: JSON.stringify(formData),
});


      const data = await response.json();
      if (response.ok) {
        alert(data.message); // Success message
        navigate("/Login");
      } else {
        alert(data.error); // Error message from the backend
      }
      
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const locations = [
    { id: 1, label: "Amman" },
    { id: 2, label: "Zarqa" },
    { id: 3, label: "Irbid" },
    { id: 4, label: "Ajloun" },
    { id: 5, label: "Jerash" },
    { id: 6, label: "Mafraq" },
    { id: 7, label: "Balqa" },
    { id: 8, label: "Madaba" },
    { id: 9, label: "Karak" },
    { id: 10, label: "Tafilah" },
    { id: 11, label: "Ma'an" },
    { id: 12, label: "Aqaba" },
  ];

  const services = [
    { id: 1, label: "Part Time Worker" },
    { id: 2, label: "Babysitter" },
    { id: 3, label: "Housemaid" },
    { id: 4, label: "Painter" },
    { id: 5, label: "Graphic Desinger" },
    { id: 6, label: "Photographer" },
    { id: 7, label: "Teacher" },
    { id: 8, label: "Blacksmith" },
    { id: 9, label: "Wall Painter" },
    { id: 10, label: "Carpenter" },
    { id: 11, label: "Electrician Technician" },
  ];

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-sm-12 col-xs-12">
            <h1 className="h">Welcome to Khadamatkom</h1>
            <p className="para">
              At Khadmatkom, we provide the solutions you need with reliability
              and security, ensuring high-quality services that meet all your
              needs. Our goal is to make it easy to access services that offer
              peace of mind, affordable prices, and a swift, exceptional
              experience.
            </p>
          </div> 
          <div className="col-md-4"></div>
          <div className="col-md-4 col-sm-12 col-xs-12">
            <div className="form-container">
              <h2 className="form-title">Registration - Step {step}</h2>
              <div className="form-box">
                <form onSubmit={handleSubmit}>
                  {error && <div className="error-message">{error}</div>}

                  {step === 1 && (
                    <>
                      <div className="form-group">
                        <input
                          type="text"
                          name="firstname"
                          className="form-control"
                          placeholder="First Name"
                          value={formData.firstname}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          name="lastName"
                          placeholder="Last Name"
                          className="form-control"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          name="nationalID"
                          className="form-control"
                          placeholder="National ID"
                          value={formData.nationalID}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          placeholder="email@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="form-group1">
                        Location:
                        <select
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          className="form-select"
                          required
                          style={{ marginLeft: "10px", padding: "5px" }}
                        >
                          <option value="" disabled>
                            Select a governorate
                          </option>
                          {locations.map((location) => (
                            <option key={location.id} value={location.label}>
                              {location.label}
                            </option>   
                          ))}
                        </select>
                      </div>
                      <div className="form-group1">
                        Phone Number:
                        <PhoneInput
                          country={"jo"}
                          className="custom-phone-input"
                          value={formData.phone}
                          onChange={(phone) => setFormData({ ...formData, phone })}
                          onlyCountries={["ps", "sa", "eg", "ae", "jo", "qa", "bh", "kw", "om", "dz", "ma", "tn", "lb", "sy", "iq", "ye"]}
                          localization={{ ps: "Palestine" }}
                        />
                      </div>
                      <div className="button-group">
                        <button className="next-btn" type="button" onClick={nextStep}>Next</button>
                      </div>
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <div className="form-group">
                        <input
                          type="password"
                          name="password"
                          placeholder="Password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          name="confirmPassword"
                          placeholder="Confirm Password"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="button-group">
                        <button className="prev-btn" type="button" onClick={prevStep}>Previous</button>
                        <button className="next-btn" type="button" onClick={nextStep}>Next</button>
                      </div>
                    </>
                  )}

                  {step === 3 && (
                    <>
                      <div className="form-group2">
                        <label>Birth Date:</label>
                        <input
                          type="date"
                          name="birthDate"
                          className="control-birth"
                          value={formData.birthDate}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="form-group2">
                        <label>Gender:</label>
                        <div className="radio-group">
                          <label className="radio-label">
                            <input
                              type="radio"
                              name="gender"
                              value="male"
                              checked={formData.gender === "male"}
                              onChange={handleChange}
                              required
                            />
                            <span>Male</span>
                          </label>
                          <label className="radio-label">
                            <input
                              type="radio"
                              name="gender"
                              value="female"
                              checked={formData.gender === "female"}
                              onChange={handleChange}
                              required
                            />
                            <span>Female</span>
                          </label>
                        </div>
                      </div>
                      <div className="form-group2">
                        <label>User Type:</label>
                        <select
                          name="userType"
                          value={formData.userType}
                          onChange={handleChange}
                          required
                          className="form-select"
                        >
                          <option value="">Select Role</option>
                          <option value="client">Client</option>
                          <option value="worker">Worker</option>
                          {/* <option value="admin">Admin</option> */}
                        </select>
                      </div>

                      {/* Show additional fields if "worker" is selected */}
                      {formData.userType === "worker" && (
                        <div className="worker-info">
                          <div className="form-group1">
                            Services:
                            <select
                              name="services"
                              value={formData.services}
                              onChange={handleChange}
                              className="form-select"
                              required
                              style={{ marginLeft: "10px", padding: "5px" }}
                            >
                              <option value="" disabled>
                                Select a service
                              </option>
                              {services.map((service) => (
                                <option key={service.id} value={service.label}>
                                  {service.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      )}

                      <div className="button-group">
                        <button className="prev-btn" type="button" onClick={prevStep}>Previous</button>
                        <button className="submit-btn" type="submit">Submit</button>
                      </div>
                    </>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MultiStepForm;
