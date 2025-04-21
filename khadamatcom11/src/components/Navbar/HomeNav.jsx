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
import '../ServicesDetalis.css';
import personImg from '../../asset/person.png'



const HomeNav = ({ theme, setTheme }) => {

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
                                    window.location.href = "/"; // إعادة تحميل الصفحة بالكامل
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
                >
                    Services
  
                   <ul className="dropdown-menu text-dark" aria-labelledby="navbarDropdown">
                   <li><a className="dropdown-item text-dark" href="/services-in/5">Teacher</a></li>
                   <li><a className="dropdown-item text-dark" href="/services-in/4">Wall Painter</a></li>
                    <li><a className="dropdown-item text-dark" href="/services-in/3">Babysitter</a></li>
                    <li><hr className="dropdown-divider text-dark" /></li>
                    <li><a className="dropdown-item text-dark" href="/ServBtn">More Services..</a></li>
                    </ul>
                </Link>
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
          
              </div>
              <button type="button">Logout</button>
              <img src={personImg} alt="" width={50} />        

        </div>
    
    </nav>
  );
};

export default HomeNav;
