import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Navbar.css';
import logo_m from '../../asset/majd.png';
import logo_light from '../../asset/dark.png';
import logo_dark from '../../asset/light.png';
import logo_dark_for from '../../asset/logodark.png';
import translateLogo from '../../asset/translate.png'
// import search_icon_dark from '../../asset/darks.png';
// import search_icon_light from '../../asset/lights.png';
import { useNavigate, useLocation } from "react-router-dom";


const Navbar = ({ theme, setTheme }) => {
  const navigate = useNavigate();
  const location = useLocation();
 
  
  const toggle_mode = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    const isLight = theme === 'light';
    document.body.style.backgroundColor = isLight ? '#ffff' : '#808080';

    const navbar = document.querySelector('.navbar');
    if (navbar) navbar.style.backgroundColor = isLight ? '#ffff' : '#3c3838';

    // const searchBox = document.querySelector('.search-box');
    // if (searchBox) searchBox.style.backgroundColor = isLight ? 'rgba(109, 166, 234, 0.73)' : '#808080';

    const buttonMore = document.querySelector('.button-more');
    if (buttonMore) buttonMore.style.color = isLight ? 'rgba(109, 166, 234, 0.73)' : '#3c3838';

    
    const elements = document.querySelectorAll('.midnav a');
    elements.forEach((element) => {
      element.addEventListener('mouseenter', () => {
        element.style.backgroundColor = isLight ? 'rgba(109, 166, 234, 0.73)' : '#808080';
      });
      element.addEventListener('mouseleave', () => {
        element.style.backgroundColor = '';
      });
      element.addEventListener('mouseleave', () => {
        element.style.backgroundColor = '';
      });
    });
   
    elements.forEach((element) => {
      element.style.color = isLight ? 'black' : 'white'; // تغيير اللون بناءً على الوضع
    });
    const footer = document.querySelector('.footer');
    if (footer) footer.style.backgroundColor = isLight ? 'rgba(109, 166, 234, 0.73)' : '#3c3838';

  }, [theme]);

  const scrollToServices = () => {
    
    const handleScroll = () => {
      setTimeout(() => {
        const servicesSection = document.getElementById("services-section");
        if (servicesSection) {
          servicesSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 100); // تأخير بسيط حتى يتم تحميل الصفحة
    };
  
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(handleScroll, 500); // تأخير لضمان تحميل الصفحة بالكامل
    } else {
      handleScroll();
    }
};

  return (
    <nav className="navbar navbar-expand-lg navbarx wd-100">
      <div className="container-fluid px-4"> {/* Full-width container with padding */}
      <Link to="/">
          <img src={theme === 'light' ? logo_m : logo_dark_for} alt="logo" className="logo1" />
          </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse " id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 midnav">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
                  <a href="#services-section" className="nav-link" onClick={(e) => {
             e.preventDefault();
              scrollToServices();
                   }}>
             Services
              </a> 
               </li>
               <li className="nav-item">
              <Link to="/" className="nav-link">About us</Link>
            </li>
            <li className="nav-item">
              <Link to="/" className="nav-link ">Help</Link>
            </li>
           </ul>

           <div className="d-flex justify-content-end LoginAndJoin">
  <ul className="list-unstyled d-flex">
    <li className="me-4">
      <Link to="/Login" className="nav-link ">Log in</Link>
    </li>
    <li className="me-3">
      <Link to="/Join" className="nav-link">Join</Link>
    </li>
  </ul>
</div>


         

          {/* <div className="d-flex align-items-center search-box">
            <input type="text" placeholder="Search"  />
            <img
              src={theme === 'light' ? search_icon_light : search_icon_dark}
              alt="search icon"
              className="searchlogo"
            />
          </div> */}

          <img
            onClick={toggle_mode}
            src={theme === 'light' ? logo_light : logo_dark}
            alt="toggle theme"
            className="modelogo  "
            style={{ cursor: 'pointer' }}
          />

          <img
          src={translateLogo}
          className="modelogo ms-3 "
          alt="Translate"
          />
        </div>
      </div>
    </nav>
    
  );
};

export default Navbar;
