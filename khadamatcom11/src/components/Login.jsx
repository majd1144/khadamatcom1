import React, { useState } from "react";
import { Link , useNavigate } from "react-router-dom"; 
import "./Logins.css";

export default function Signin({ theme }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State to store error messages
  const navigate = useNavigate(); // Hook to navigate after successful login


  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Email:", email);
    console.log("Password:", password);

    try {
      const response = await fetch("https://73e6-188-247-73-78.ngrok-free.app/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Login successful, redirect to homepage or dashboard
        console.log("Login successful", data.message);
        navigate("/"); // Adjust this based on your route
      } else {
        // Handle errors (incorrect password, user not found)
        //setErrorMessage(data.message || "An error occurred. Please try again." );
        console.log("Login failed:", data.message);
        alert(data.message);
      }
    } catch (error) {
      console.error("Error: Error during login", error);
      setErrorMessage("An error occurred while logging in.");
    }
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
                       experience.  
                    </p>
            </div>

            <div className="col-md-4"></div>

           <div className="col-md-4 col-sm-12 col-xs-12">
              <div className="signin-container">
              <form onSubmit={handleSubmit} className="signin-form mt-5">
              <h2>Login</h2>
              <label>       
              <input
              type="email"
              placeholder="Email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required/>
              </label>

                <label>       
             <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
           />
           </label>
                <button type="submit">Submit</button>
                <p className="signup-link">
                 Forgot your password? <Link to="/reset-password">Reset it here</Link>
                </p>
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

        
      
