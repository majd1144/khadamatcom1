import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import "./Logins.css";

export default function Signin({ theme }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Email:", email);
    console.log("Password:", password);
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
              <div className="signin-container">
              <form onSubmit={handleSubmit} className="signin-form mt-5">
              <h2>Login</h2>
              <label>
        Email        
           <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

                <label>
            Password       
           <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
                <button type="submit">Submit</button>

                <p className="signup-link">
                  Don't have an account?
                  <Link to="/Join">signup</Link>
                 </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

        
      
