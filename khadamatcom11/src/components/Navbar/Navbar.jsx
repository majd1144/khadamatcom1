import React, { useEffect , useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Navbar.css';
import "../ServBtn.jsx";
import logo_m from '../../asset/MainLogoL.png';// main logo light
import logo_light from '../../asset/dark.png';
import logo_dark from '../../asset/light.png';
import logo_dark_for_main from '../../asset/mainLogoD.png'; // main logo Dark
import translateLogo from '../../asset/translate.png'
import "../ServicesCards.jsx";
import { servicesCards } from "../../data.js";
import '../ServicesDetalis.css'


const Navbar = ({ theme, setTheme }) => {

  const [user, setUser] = useState(null); // تخزين بيانات المستخدم

  const toggle_mode = () => {setTheme(theme === 'light' ? 'dark' : 'light');};

  useEffect(() => {
    const isLight = theme === 'light';
    document.body.style.backgroundColor = isLight ? '#ffff' : '#808080';

    const navbar = document.querySelector('.navbar');
    if (navbar) navbar.style.backgroundColor = isLight ? '#ffff' : '#3c3838';

    const buttonMore = document.querySelector('.button-more');
    if (buttonMore) buttonMore.style.color = isLight ? 'rgba(109, 166, 234, 0.73)' : '#3c3838';

    const elements = document.querySelectorAll('.midnav a');
    elements.forEach((element) => 
      {
      element.addEventListener('mouseenter', () => {
      element.style.backgroundColor = isLight ? 'rgba(109, 166, 234, 0.73)' : '#808080';});
      element.addEventListener('mouseleave', () => { element.style.backgroundColor = ''; });
      element.addEventListener('mouseleave', () => {element.style.backgroundColor = '';});
      });
   
    elements.forEach((element) => { element.style.color = isLight ? 'black' : 'white'; });
    
    const footer = document.querySelector('.footer');
    if (footer) footer.style.backgroundColor = isLight ? 'rgba(109, 166, 234, 0.73)' : '#3c3838'; }, [theme]);
    
     // جلب بيانات المستخدم عند تحميل الصفحة
  useEffect(() => {
    axios.get('http://localhost:4000/api/user/1') // استبدل "1" بالـ ID الحقيقي
      .then(response => {
        setUser(response.data); // تخزين بيانات المستخدم
      })
      .catch(error => console.error('Error fetching user:', error));
  }, []);


  return (
    
    <nav className="navbar navbar-expand-lg navbarx wd-100">
      <div className="container-fluid px-4"> {/* Full-width container with padding */}
                <Link to="/">
                       <img src={theme === 'light' ? logo_m : logo_dark_for_main} alt="logo" className="logo1" />
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

              <li className="nav-item dropdown">
                <Link
                    to="/ServBtn"
                    state={{ services: servicesCards }}
                     className="nav-link dropdown-toggle"
                >
                    Services
  
                   <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                   <li><a className="dropdown-item" href="/services-in/5">Teacher</a></li>
                   <li><a className="dropdown-item" href="/services-in/4">Wall Painter</a></li>
                    <li><a className="dropdown-item" href="/services-in/3">Babysitter</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" href="/ServBtn">More Services..</a></li>
                    </ul>
                </Link>
              </li>

              <li className="nav-item">
                 <a href="#about-us" className="nav-link">About us</a>
              </li>
               <li className="nav-item">
                 <a href="#Help" className="nav-link ">Help</a>
              </li>
           </ul>

              {/* <div className="d-flex justify-content-end LoginAndJoin">
                <ul className="list-unstyled d-flex">
                    <li className="me-4">
                       <Link to="/Login" className="nav-link ">Log in</Link>
                     </li>
                    <li className="me-3">
                       <Link to="/Join" className="nav-link">Join</Link>
                    </li>
                </ul> */}
                 {/* ✅ عرض صورة واسم المستخدم إذا كان مسجل الدخول */}
          {user ? (
            <div className="d-flex align-items-center">
              <span className="me-2">{user.name}</span>
              <img
                src={user.profile_image || "https://via.placeholder.com/40"}
                alt="User"
                className="rounded-circle"
                width="40"
                height="40"
              />
            </div>
          ) : (
            <div className="d-flex justify-content-end LoginAndJoin">
              <ul className="list-unstyled d-flex">
                <li className="me-4">
                  <Link to="/Login" className="nav-link">Log in</Link>
                </li>
                <li className="me-3">
                  <Link to="/Join" className="nav-link">Join</Link>
                </li>
              </ul>
            </div>
          )}

              </div>

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
    
    </nav>
  );
};

export default Navbar;
