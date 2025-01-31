import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Navbar.css';
import logo_m from '../../asset/majd.png';
import logo_light from '../../asset/dark.png';
import logo_dark from '../../asset/light.png';
import logo_dark_for from '../../asset/logodark.png';
import search_icon_dark from '../../asset/darks.png';
import search_icon_light from '../../asset/lights.png';

const Navbar = ({ theme, setTheme }) => {
  const toggle_mode = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    const isLight = theme === 'light';
    document.body.style.backgroundColor = isLight ? '#ffff' : '#808080';

    const navbar = document.querySelector('.navbar');
    if (navbar) navbar.style.backgroundColor = isLight ? '#ffff' : '#3c3838';

    const searchBox = document.querySelector('.search-box');
    if (searchBox) searchBox.style.backgroundColor = isLight ? 'rgba(109, 166, 234, 0.73)' : '#808080';

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
    });
    
    const footer = document.querySelector('.footer');
    if (footer) footer.style.backgroundColor = isLight ? 'rgba(109, 166, 234, 0.73)' : '#3c3838';

  }, [theme]);
// دالة التمرير إلى قسم الخدمات
const scrollToServices = () => {
  const servicesSection = document.getElementById("services-section");
  if (servicesSection) {
    servicesSection.scrollIntoView({ behavior: 'smooth' });
  }
};

  return (
    <nav className="navbar navbar-expand-lg navbarx wd-100">
      <div className="container-fluid px-4"> {/* Full-width container with padding */}
       
          <img src={theme === 'light' ? logo_m : logo_dark_for} alt="logo" className="logo1" />

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

        <div className="collapse navbar-collapse midnav" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className={`nav-link ${theme === 'light' ? 'active' : ''}`}>
              <button  className="nav-link" >
               Home
              </button>
              </Link>
            </li>
            { <li className="nav-item">
              <Link to="#" className="nav-link">
              <button onClick={scrollToServices} className="nav-link" >
              Services
              </button>
                
              </Link>
            </li> }
            {/* /<li className="nav-item">
  <button onClick={scrollToServices} className="nav-link">
    Services
  </button>
</li> */}

            <li className="nav-item">
              <Link to="/Signin" className="nav-link">
              <button  className="nav-link" >
              Sign in
              </button>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/Join" className="nav-link">
              <button  className="nav-link" >
              Join
              </button>
              </Link>
            </li>
          </ul>

          <div className="d-flex align-items-center search-box">
            <input type="text" placeholder="Search"  />
            <img
              src={theme === 'light' ? search_icon_light : search_icon_dark}
              alt="search icon"
              className="searchlogo"
            />
          </div>

          <img
            onClick={toggle_mode}
            src={theme === 'light' ? logo_light : logo_dark}
            alt="toggle theme"
            className="modelogo ms-3"
            style={{ cursor: 'pointer' }}
          />
        </div>
      </div>
    </nav>
    
  );
};

export default Navbar;
