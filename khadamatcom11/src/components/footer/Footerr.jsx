
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import './Footer.css'; 
import logo_m from '../../asset/MainLogoL.png';

import logo_dark_for from '../../asset/mainLogoD.png';

export default function FooteRr({theme}) {
    return (
        <div className="footer">
            <div className="container text-center">
            <footer>
  <img src={theme === 'light' ? logo_m : logo_dark_for} alt="Footer Logo" className="footer-logo" />

</footer>
                <p>We Are Social</p>
                <div className="social-icons d-flex justify-content-center">
                    <a href="https://web.facebook.com/" className="btn btn-primary btn-circle mx-2">
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="https://www.instagram.com/" className="btn btn-primary btn-circle mx-2">
                        <i className="fab fa-instagram"></i>
                    </a>
                    <a href="/" className="btn btn-secondary btn-circle mx-2">
                        <i className="fas fa-home"></i>
                    </a>
                    <a href="https://www.linkedin.com/" className="btn btn-primary btn-circle mx-2">
                        <i className="fab fa-linkedin"></i>
                    </a>
                </div>
                <p className="copyright">&copy;2024 <span>Kasper</span> All Rights Reserved</p>
            </div>
        </div>
    );
}
