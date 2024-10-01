import logo from './logo.svg';
import './App.css';
import WelcomeBoard from './components/WelcomeBoard';
import Services from './components/Services';
import NavBar from './components/NavBar';
import "./data.js";
import { servicesCards } from './data.js';

function App() {
  return (
    <div className="App">
      <div className='component'>  
        <NavBar/>
     <WelcomeBoard />
     <p className='p-under-welcomeboard'>Popular services</p>
     <div className='Services'>
     <Services {...servicesCards[0]}/>
     <Services {...servicesCards[1]}/>
     <Services {...servicesCards[2]}/>
     </div>
    
     </div>
     
    </div>
  );
}

export default App;
