import logo from './logo.svg';
import './App.css';
import WelcomeBoard from './components/WelcomeBoard';
import Services from './components/Services';
import NavBar from './components/NavBar';
import { servicesCards } from './data.js'; // تأكد من عدم الحاجة لاستيراد "./data.js" مجددًا

function App() {
  return (
    <div className="App">
      <div className='component'>  
        <NavBar/>
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
