import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
 import React ,{useState} from "react"
import './App.css';
import HomePage from './components/HomePage.jsx';
import Join from "./components/loginAndjoin/Join.jsx";
import Login from "./components/loginAndjoin/Login.jsx";
import ServicesIn from './components/ServicesIn.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Footerr from './components/footer/Footerr.jsx'
import ServiceDetails from './components/cards/ServiceDetails.jsx';
import ServBtn from './components/cards/ServBtn.jsx';
import Profile from './components/workerAndUser/Profile.jsx';
import ServicesWorkers from "./components/cards/ServicesWorkers.jsx" 
import AccountSetting from './components/dropdownProfile/AccountSetting.jsx'
import MyServices from './components/myServices/MyServices.jsx';
import RequestedServices from './components/RequestedServices/RequestedServices.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import WorkerProfile from './components/workerAndUser/WorkerProfile.jsx';
import Booknow from './components/cards/Booknow.jsx';
// admin importtttt
import AdminRoutes from './routes/AdminRoutes.jsx';
export default function App() {
    const [theme, setTheme] = useState('light');
  return (
    
    <Router>
      <Navbar  theme={theme} setTheme={setTheme}/>
    <div className="App">
        <Routes>
          {/* <Route path="/" element={<HomePage />} /> */}
          <Route path="/" element={<HomePage theme={theme} />} />  {/* تم تمرير theme إلى HomePage */}
          <Route path="/ServicesIn" element={<ServicesIn/>} />
          <Route path="/services-in/:servicecategory" element={<ServiceDetails />} />  {/* تمرير الـ ID هنا */}
          <Route path="/ServBtn"  element={<ServBtn theme={theme} />} />
          <Route path="/worker/:id" element={<WorkerProfile />} /> إضافة هذا المسار
          <Route path="/booknow" element={<Booknow />} />
          <Route path="/profile" element={<Profile />} /> 
          <Route path="/accountSetting" element={<AccountSetting />} /> 
   
          {/* <Route path="/" element={<Services />} /> */}
          <Route path="/MyServices" element={<MyServices/>}/>
          <Route path="/RequestedServices" element={<RequestedServices />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Join" element={<Join />} />
          <Route path="/services-in/:servicecategory" element={<ServicesWorkers />} />
          {/* <Route path="/worker/:id" element={<WorkerProfile />} /> */}
        </Routes>
        
            <AdminRoutes />

    </div>
    
    <Footerr theme={theme} setTheme={setTheme}/>
    </Router>
  );        
}