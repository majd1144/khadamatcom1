
// import logoF from '../asset/footerrr.png';
import '@fortawesome/fontawesome-free/css/all.min.css'; // استيراد Font Awesome
import './Footer.css'; 

export default function FooteRr() {
    return (
        <div className="footer">
            <div className="container text-center">
            <footer>
  <img class="footer-logo" alt="Footer Logo" />
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
