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
import defaultphoto from '../../asset/person.png'
import ProfileU from '../WorkerProfile.jsx'
import "../ServicesCards.jsx";
import { servicesCards } from "../../data.js";
import '../ServicesDetalis.css'


const Navbar = ({ theme, setTheme }) => {

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
    

    const [user, setUser] = useState(null);
    useEffect(() => {
      axios.get("http://localhost:4000/users/loggedin_user", { withCredentials: true })
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => {
          console.error("Error fetching user:", err);
        });
    }, []);
    const handleLogout = async () => {
      try {
        const res = await fetch("http://localhost:4000/logout", {
          method: "POST",
          credentials: "include", 
        });
        if (res.ok) {
          alert("You have Loged out Sucessfully!")
          window.location.href = "/login";
        } else {
          console.error("Logout failed");
        }
      } catch (error) {
        console.error("Logout error", error);
      }
    };
    

  return (
    
    <nav className="navbar navbar-expand-lg navbarx wd-100">
      <div className="container-fluid px-4"> {/* Full-width container with padding */}
                <Link onClick={(e) => {
                                    e.preventDefault(); 
                                    window.location.href = "/"; // إعادة تحميل الصفحة بالكامل
                                 }}>
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
              <a href="/" 
                 onClick={(e) => {
                                    e.preventDefault(); 
                                    window.location.href = "/";   
                                 }}
                 className="nav-link"
               >
                Home
              </a>
              </li>


              <li className="nav-item dropdown">
  <Link
    to="/ServBtn"
    state={{ services: servicesCards }}
    className="nav-link dropdown-toggle"
    role="button"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
    Services
  </Link>

  <ul className="dropdown-menu text-dark" aria-labelledby="navbarDropdown">
    <li>
      <Link className="dropdown-item text-dark" to="/services-in/5">Teacher</Link>
    </li>
    <li>
      <Link className="dropdown-item text-dark" to="/services-in/4">Wall Painter</Link>
    </li>
    <li>
      <Link className="dropdown-item text-dark" to="/services-in/3">Babysitter</Link>
    </li>
    <li><hr className="dropdown-divider text-dark" /></li>
    <li>
      <Link className="dropdown-item text-dark" to="/ServBtn">More Services..</Link>
    </li>
  </ul>
</li>

              {/* <li className="nav-item">
                 <a href="#about-us" className="nav-link">About us</a>
              </li>
               <li className="nav-item">
                 <a href="#Help" className="nav-link ">Help</a>
              </li> */}
              <li className="nav-item">
              <a href="/" 
                 onClick={(e) => {
                                    e.preventDefault();
                                    window.location.href = "/#about-us"; // go to the homepage then about us
                                 }}
                className="nav-link"
               >
                About us
               </a>
              </li>

              <li className="nav-item">
                <a href="/" 
                    onClick={(e) => {
                                      e.preventDefault();
                                       window.location.href = "/#Help"; // // go to the homepage then Help
                                    }}
                                      className="nav-link"
                  >
                    Help
                </a>
              </li>
          </ul>
          {user ? (
          <div className="dropdown">
          <button className="btn btn-outline-secondary userButton" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
            <div className="d-flex align-items-center">
              <span className="me-2">{user.name}</span>
              <img
                src={user.picture ? `/Storage/userpicture/${user.picture}` : defaultphoto}
                alt="User"
                className="rounded-circle"
                width="40"
                height="40"
              />
            </div>
          </button>
          <ul className="dropdown-menu " aria-labelledby="dropdownMenuButton">
          <li><Link to="/profile" className="dropdown-item">Profile</Link></li>    
          <li><Link to="/accountsetting" className="dropdown-item">Account Setting</Link></li>
            <li><button className="dropdown-item">My Services</button></li>
            <li><button className="dropdown-item">My Requests</button></li>
            <li><button className="dropdown-item">Notifications</button></li>
            <li><button onClick={handleLogout} className="dropdown-item">Logout</button></li>

          </ul>
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
