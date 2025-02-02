import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./Logins.css";

function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
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
  });
  const [error, setError] = useState("");

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
        formData.name &&
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
      return formData.birthDate && formData.gender && formData.userType;
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      console.log("Form submitted:", formData);
    } else {
      setError("Please fill in all fields correctly before submitting.");
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Registration - Step {step}</h2>
      <div className="form-box">
        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}

          {step === 1 && (
            <>
              <div className="form-group">
                <input type="text" name="name" placeholder="First Name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <input type="text" name="nationalID" placeholder="National ID" value={formData.nationalID} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <input type="email" name="email" placeholder="email@example.com" value={formData.email} onChange={handleChange} required />
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
                  <option value="Amman">Amman</option>
                  <option value="Zarqa">Zarqa</option>
                  <option value="Irbid">Irbid</option>
                  <option value="Ajloun">Ajloun</option>
                  <option value="Jerash">Jerash</option>
                  <option value="Mafraq">Mafraq</option>
                  <option value="Balqa">Balqa</option>
                  <option value="Madaba">Madaba</option>
                  <option value="Karak">Karak</option>
                  <option value="Tafilah">Tafilah</option>
                  <option value="Ma'an">Ma'an</option>
                  <option value="Aqaba">Aqaba</option>
                </select>
              </div>
              <div className="form-group1">
                PhoneNumber:
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
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
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
      <label>Gender    :</label>
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
      <div className="radio-group">
        <label className="radio-label">
          <input
            type="radio"
            name="userType"
            value="User"
            checked={formData.userType === "User"}
            onChange={handleChange}
            required
          />
          <span>User</span>
        </label>
        <label className="radio-label">
          <input
            type="radio"
            name="userType"
            value="Service provider"
            checked={formData.userType === "Service provider"}
            onChange={handleChange}
            required
          />
          <span>Service provider</span>
        </label>
      </div>
    </div>
    <div className="button-group">
      <button className="prev-btn" type="button" onClick={prevStep}>Previous</button>
      <button className="submit-btn" type="submit">Submit</button>
    </div>
  </>
)}

        </form>
      </div>
    </div>
  );
}

export default MultiStepForm;