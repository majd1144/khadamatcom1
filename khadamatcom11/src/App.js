import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React ,{useState} from "react"
import './App.css';
import HomePage from './components/HomePage.jsx';
import Services from "./components/Services.jsx"
import Join from "./components/Join.jsx";
import Signin from "./components/Signin.jsx";

export default function App() {
   const [theme, setTheme] = useState('light');
  return (
    <Router>
    <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ServicesCard" element={<Services />} />
          <Route path="/Signin" element={<Signin />} />
          <Route path="/Join" element={<Join />} />
        </Routes>
    </div>
    </Router>
  );
}