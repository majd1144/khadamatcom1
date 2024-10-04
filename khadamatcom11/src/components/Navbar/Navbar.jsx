import './Navbar.css';
import logo_m from '../../asset/majd.jpg';
import logo_light from '../../asset/dark.png';
import logo_dark from '../../asset/light.png';
import search_icon_dark from '../../asset/darks.png';
import search_icon_light from '../../asset/lights.png';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const [theme, setTheme] = useState('light'); // إنشاء حالة للثيم الافتراضي

  // دالة التبديل بين الوضع المضيء والداكن
  const toggle_mode = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // استخدام useEffect لتحديث الألوان عند تغيير الثيم
  useEffect(() => {
    const isLight = theme === 'light';

    // تحديث الخلفية بناءً على الثيم
    document.body.style.backgroundColor = isLight ? '#ffff' : '#808080'; // خلفية الصفحة
    document.querySelector('.navbar').style.backgroundColor = isLight ? '#ffff' : '#3c3838'; // خلفية شريط التنقل
    document.querySelector('.search-box').style.backgroundColor = isLight 
      ? 'rgba(109, 166, 234, 0.73)' 
      : '#808080'; // خلفية مربع البحث

    // تحديث خلفية عناصر الخدمات (إذا وجدت)
    const services = document.querySelectorAll('.servicesCards li');
    services.forEach(service => {
      service.style.backgroundColor = isLight ? 'rgba(109, 166, 234, 0.73)' : '#ffff';
    });
  }, [theme]);

  return (
    <div className='navbar'>
      <img src={logo_m} alt="" className='logo1'/>
      
      <div className="topnav">
        <a className={theme === 'light' ? "active" : ""} href="#home">Home</a>
        <a href="#about">Services</a>
        <a href="#contact">Sign in</a>
        <a href="#contact">Join</a>
      </div>

      <div className='search-box'>
        <input type="text" placeholder='Search' />
        <img src={theme === 'light' ? search_icon_light : search_icon_dark} alt="" className='logo'/>
      </div>

      <img 
        onClick={toggle_mode} 
        src={theme === 'light' ? logo_light : logo_dark} 
        alt="toggle theme" 
        className='logo'
        style={{ cursor: 'pointer' }} // إضافة مؤشر ليوضح أن الصورة قابلة للنقر
      />
    </div>
  );
};

export default Navbar;
