import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import React, { useState } from "react";
import './App.css';
import HomePage from './components/HomePage.jsx';
import Join from "./components/Join.jsx";
import Signin  from "./components/Login.jsx";
import ServicesIn from './components/ServicesIn.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import HomeNav from './components/Navbar/HomeNav.jsx';
import Footerr from './components/footerr';
import ServiceDetails from './components/ServiceDetails.jsx';
import ServBtn from './components/ServBtn.jsx';
import WorkerProfile from './components/WorkerProfile.jsx';
import Booknow from './components/Booknow.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function AppContent() {
  const [theme, setTheme] = useState('light');
  const location = useLocation(); // ✅ هنا مكان hook الصحيح

  return (
    <>
      {location.pathname === "/" || location.pathname === "/Login" ? (
  <Navbar theme={theme} setTheme={setTheme} />
) : (
  <HomeNav theme={theme} setTheme={setTheme} />
)}

      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage theme={theme} />} />
          <Route path="/ServicesIn" element={<ServicesIn />} />
          <Route path="/services-in/:id" element={<ServiceDetails />} />
          <Route path="/ServBtn" element={<ServBtn theme={theme} />} />
          <Route path="/worker/:id" element={<WorkerProfile />} />
          <Route path="/booknow" element={<Booknow />} />
          <Route path="/Login" element={<Signin />} />
          <Route path="/Join" element={<Join />} />
        </Routes>
      </div>

      <Footerr theme={theme} setTheme={setTheme} />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
