import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import "./Logins.css";

export default function Join({ theme }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    nationalId: "",
    birthDate: "",
    gender: "",
    user: "",
    location: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("The password and confirmation password do not match.");
      return;
    }
    console.log("Submitted Data:", formData);
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-sm-12 col-xs-12">
            <h1 className="h">Welcome to khadamatkom</h1>
            <p className="para">
            At Khidmatkom, we provide the solutions you need with reliability
              and security, ensuring high-quality services that meet all your
              needs. Our goal is to make it easy to access services that offer
              peace of mind, affordable prices, and a swift, exceptional
              experience.            </p>
          </div>
          <div className="col-md-4"></div>
          <div className="col-md-4 col-sm-12 col-xs-12">
            <div className="box">
              <form onSubmit={handleSubmit} className="user-form mt-5">
                <label>
                  Name:
                  <input
                    type="text"
                    name="username"
                    className="form-control"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label>
                  Email:
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label>
                  Password:
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label>
                  Confirm Password:
                  <input
                    type="password"
                    name="confirmPassword"
                    className="form-control"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label>
                  Phone Number:
                  <input
                    type="tel"
                    name="phone"
                    className="form-control"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label>
                  National ID:
                  <input
                    type="text"
                    name="nationalId"
                    className="form-control"
                    value={formData.nationalId}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label>
                  Birth Date:
                  <input
                    type="date"
                    name="birthDate"
                    className="form-control"
                    value={formData.birthDate}
                    onChange={handleChange}
                    required
                  />
                </label>

                <div className="label-group">
  <label>Gender   :</label>
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


                <div className="label-group">
  <label>User Type:</label>
  <div className="radio-group">
    <label className="radio-label">
      <input
        type="radio"
        name="user"
        value="User"
        checked={formData.user === "User"}
        onChange={handleChange}
        required
      />
      <span>User</span>
    </label>
    <label className="radio-label">
      <input
        type="radio"
        name="user"
        value="Service provider"
        checked={formData.user === "Service provider"}
        onChange={handleChange}
        required
      />
      <span>Service provider</span>
    </label>
  </div>
</div>


                <label>
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
                </label>

                <button type="submit">Submit</button>
                <div className="Signin-link">
                  <p>Do you have an account?<Link to="/Signin">sign in</Link></p>
                  
                  </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
