import logo from './logo.svg';
import './App.css';
import WelcomeBoard from './components/WelcomeBoard';
import Services from './components/Services';
import NavBar from './components/Navbar/Navbar.jsx';
import { servicesCards } from './data.js'; // تأكد من عدم الحاجة لاستيراد "./data.js" مجددًا
import  { useState } from "react"
function App() { 
  const [theme, setTheme]= useState('light');
  return (
    <div className="App">
      <div className='component'>
        <div className='container'>
        <NavBar  theme={theme} setTheme={setTheme}/>
          </div>
        <WelcomeBoard />
        <p className='p-under-welcomeboard'>Popular services</p>
        <div className='Services'>
          {servicesCards.map((service, index) => (
            <Services key={index} {...service} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
