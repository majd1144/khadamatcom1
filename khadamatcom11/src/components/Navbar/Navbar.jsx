import './Navbar.css';
import logo_m from '../../asset/majd.jpg';
import logo_light from '../../asset/dark.png';
import logo_dark from'../../asset/light.png';
import search_icon_dark from  '../../asset/darks.png';
import search_icon_light from '../../asset/lights.png';

const Navbar = ({ theme, setTheme }) => {
  const toggle_mode = () => {
   

    if (theme === 'light') {
      setTheme('dark'); // تغيير الحالة إلى dark
      setColor(false);
    } else {
      setTheme('light'); // تغيير الحالة إلى light
      setColor(true);
    // document.getElementById('services').style.backgroundColor = 'rgba(109, 166, 234, 0.73)';

   
    }

    function setColor(isLight) {
      document.body.style.backgroundColor =isLight ?  '#ffff' : '#808080'; // خلفية زرقاء في الوضع المضيء
      document.querySelector('.navbar').style.backgroundColor = isLight ?  '#ffff' 
      : '#3c3838';
      document.querySelector('.search-box').style.backgroundColor =isLight ? 
      'rgba(109, 166, 234, 0.73)'
       : '#808080'; // لون مربع البحث داكن
    
      const services = document.querySelectorAll('.servicesCards li');
      services.forEach(service=>{
       service.style.backgroundColor =isLight?  'rgba(109, 166, 234, 0.73)' : '#ffff';
      });
    
      }
   

};
  return (
    <div className='navbar'>
      <img src={logo_m} alt="" className='logo1'/>
      <ul>
        <li>Home</li>
        <li>Services</li>
        <li>Sign in</li>
        <li>Join</li>
      </ul>
      <div className='search-box'>
        <input type="text" placeholder='Search' />
        <img src={theme === 'light' ? search_icon_light : search_icon_dark} alt="" className='logo'/>
      </div>
      <img onClick={() => { toggle_mode() }} src={theme === 'light' ? logo_light : logo_dark } alt="" className='logo'/>

    </div>
  );
};

export default Navbar;
