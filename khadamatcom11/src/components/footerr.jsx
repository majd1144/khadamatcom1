
import '@fortawesome/fontawesome-free/css/all.min.css'; // استيراد Font Awesome
import './Footer.css'; 
import logo_m from '../asset/majd.png';
import logo_dark_for from '../asset/logodark.png';

export default function FooteRr({theme}) {
    return (
        <div className="footer">
            <div className="container text-center">
            <footer>
  <img src={theme === 'light' ? logo_m : logo_dark_for} alt="Footer Logo" className="footer-logo" />

</footer>
                <p>We Are Social</p>
                <div className="social-icons d-flex justify-content-center">
                    <a href="#" className="btn btn-primary btn-circle mx-2">
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" className="btn btn-info btn-circle mx-2">
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#" className="btn btn-secondary btn-circle mx-2">
                        <i className="fas fa-home"></i>
                    </a>
                    <a href="#" className="btn btn-primary btn-circle mx-2">
                        <i className="fab fa-linkedin"></i>
                    </a>
                </div>
                <p className="copyright">&copy;2024 <span>Kasper</span> All Rights Reserved</p>
            </div>
        </div>
    );
}
