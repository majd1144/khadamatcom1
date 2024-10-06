import './Navbar.css';
import logo_m from '../../asset/majd.jpg';
import logo_light from '../../asset/dark.png';
import logo_dark from '../../asset/light.png';
import search_icon_dark from '../../asset/darks.png';
import search_icon_light from '../../asset/lights.png';
import { useEffect } from 'react'; // استيراد useEffect من React
import Services from '../Services';

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
    document.querySelector('.navbar').style.backgroundColor = isLight ? '#ffff' : '#3c3838'; // خلفية شريط التنقل
    document.querySelector('.search-box').style.backgroundColor = isLight 
      ? 'rgba(109, 166, 234, 0.73)' 
      : '#808080'; // خلفية مربع البحث

    const services = document.querySelectorAll('.servicesCards li'); // خلفية عناصر الخدمات
    services.forEach(service => {
      service.style.backgroundColor = isLight ? 'rgba(109, 166, 234, 0.73)' : '#ffff';
    });
  }, [theme]); // إعادة تشغيل useEffect عند تغيير theme

  return (
    <div className='navbar'>
      <img src={logo_m} alt="" className='logo1'/>
      
      <div className="midnav">
        <a className={theme === 'light' ? "active" : ""} href="#home">Home</a>
        <a href="#about">Services</a>
        <a href="#contact">Sign in</a>
        <a href="#contact">Join</a>
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
