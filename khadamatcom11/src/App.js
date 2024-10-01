import logo from './logo.svg';
import './App.css';
import WelcomeBoard from './components/WelcomeBoard';
import Services from './components/Services';
import NavBar from './components/NavBar';
function App() {
  return (
    <div className="App">
      <div className='component'>  
        <NavBar/>
     <WelcomeBoard />
     <Services />
     </div>
     
    </div>
  );
}

export default App;
