import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
 import React ,{useState} from "react"
import './App.css';
import HomePage from './components/HomePage.jsx';
import Join from "./components/Join.jsx";
import Signin from "./components/Signin.jsx";
import ServicesIn from './components/ServicesIn.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Footerr from './components/footerr.jsx'

export default function App() {
    const [theme, setTheme] = useState('light');
  return (
    <Router>
      <Navbar  theme={theme} setTheme={setTheme}/>
    <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ServicesIn" element={<ServicesIn/>} />
          <Route path="/Signin" element={<Signin />} />
          <Route path="/Join" element={<Join />} />
       
        </Routes>
    </div>
    <Footerr theme={theme} setTheme={setTheme}/>
    </Router>
  );
}