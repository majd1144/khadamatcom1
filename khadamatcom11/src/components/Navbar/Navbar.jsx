import './Navbar.css';
import logo_m from '../../asset/majd.jpg';
import logo_light from '../../asset/dark.png';
import logo_dark from '../../asset/light.png';
import logo_dark_for from '../../asset/logodark.png';
import search_icon_dark from '../../asset/darks.png';
import search_icon_light from '../../asset/lights.png';
import { useEffect } from 'react'; // استيراد useEffect من React
import { Link } from 'react-router-dom';

const Navbar = ({ theme, setTheme }) => {

  // دالة التبديل بين الوضع المضيء والداكن
  const toggle_mode = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  // استخدام useEffect لتحديث ألوان الصفحة عند تغيير الثيم
  useEffect(() => {
    // تحديث الألوان بناءً على الوضع
    const isLight = theme === 'light';

    document.body.style.backgroundColor = isLight ? '#ffff' : '#808080'; // خلفية الصفحة
    document.querySelector('.navbarx').style.backgroundColor = isLight ? '#ffff' : '#3c3838'; // خلفية شريط التنقل
    document.querySelector('.search-box').style.backgroundColor = isLight 
      ? 'rgba(109, 166, 234, 0.73)' 
      : '#808080'; // خلفية مربع البحث
      const buttonMore = document.querySelector('.button-more');

     buttonMore.style.color = isLight 
    ? 'rgba(109, 166, 234, 0.73)'  // لون إذا كان isLight = true
    : '#3c3838';  // لون إذا كان isLight = false
      // عشان يغير اللون حسب المود للعنصر لما اتفاعل معه 
      const elements = document.querySelectorAll('.midnav a');
      elements.forEach((element) => {
        element.addEventListener('mouseenter', () => {
          element.style.backgroundColor = isLight ? 'rgba(109, 166, 234, 0.73)' : '#808080';
        });
      
        element.addEventListener('mouseleave', () => {
          element.style.backgroundColor = '';
        });
      });
    const services = document.querySelectorAll('.servicesCards li'); // خلفية عناصر الخدمات
    services.forEach(service => {
      service.style.backgroundColor = isLight ? 'rgba(109, 166, 234, 0.73)' : '#ffff';
    });
  }, [theme]); // إعادة تشغيل useEffect عند تغيير theme

  return (
    <div className='navbarx'>
      <img src={theme === 'light' ? logo_m : logo_dark_for} alt="" className='logo1'/>

      <div className="midnav">
        <ul>
          <li>
          <Link to ="/"className={theme === 'light' ? "active" : ""} >Home</Link>
          </li>
          <li>
          <Link to="ServicesCard">Services</Link>
          </li>
          <li>
          <Link to="Signin">Sign in</Link>
          </li>
          <li>
          <Link to="Join">Join</Link>
          </li>
        
        </ul>
      </div>

      <div className='search-box'>
        <input type="text" placeholder='Search' />
        <img src={theme === 'light' ? search_icon_light : search_icon_dark} alt="" className='searchlogo'/>
      </div>

      <img 
        onClick={toggle_mode} 
        src={theme === 'light' ? logo_light : logo_dark} 
        alt="toggle theme" 
        className='modelogo'
        style={{ cursor: 'pointer' }} // إضافة مؤشر ليوضح أن الصورة قابلة للنقر
      />
    </div>
  );
};

export default Navbar;