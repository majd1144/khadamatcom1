import React, { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import ServicesCards from './ServicesCards';
import "./ServicesDetalis.css";

const FilterBar = ({ onFilterChange }) => {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const [service, setService] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const handleFilter = () => {
    onFilterChange({ search, region, service, priceRange });
  };

  return (
    <div className="p-3 bg-white rounded shadow-sm mx-auto text-center ">
  <div className="d-flex flex-wrap gap-2 mt-2 justify-content-center">
        <InputGroup className="w-auto">
          <Form.Control
            type="text"
            placeholder="Search for a service"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button variant="outline-secondary" onClick={handleFilter}>
            <FaSearch />
          </Button>
        </InputGroup>
        <Form.Select className="w-auto" value={region} onChange={(e) => setRegion(e.target.value)}>
          <option value="">Select Region</option>
          <option value="Amman">Amman</option>
          <option value="Zarqa">Zarqa</option>
          <option value="Irbid">Irbid</option>
          <option value="Madaba">Madaba</option>
          <option value="Karak">Karak</option>
          <option value="Salt">Salt</option>
          <option value="Jerash">Jerash</option>
          <option value="Mafraq">Mafraq</option>
          <option value="Aqaba">Aqaba</option>
          <option value="Ma'an">Ma'an</option>
          <option value="Tafilah">Tafilah</option>
          <option value="Balqa">Balqa</option>
          <option value="Ajloun">Ajloun</option>
        </Form.Select>
        <Form.Select className="w-auto" value={service} onChange={(e) => setService(e.target.value)}>
          <option value="">Select Service</option>
          <option value="All">All</option>
          <option value="House Maid">House Maid</option>
          <option value="Painter">Painter</option>
          <option value="Babysitter">Babysitter</option>
          <option value="Wall Painter">Wall Painter</option>
          <option value="Teacher">Teacher</option>
          <option value="Graphic Designer">Graphic Designer</option>
          <option value="Blacksmith">Blacksmith</option>
          <option value="Carpenter">Carpenter</option>
          <option value="Photographer">Photographer</option>
          <option value="Part Time Worker">Part Time Worker</option>
          <option value="Electrician">Electrician</option>
        </Form.Select>
        <Form.Control
          type="text"
          className="w-auto"
          placeholder="Price Range (min-max)"
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
        />
        <Button variant="primary" onClick={handleFilter}>
          Search
        </Button>
      </div>
    </div>
  
  );
};

// مكون عرض الخدمات والفلترة
export default function ServBtn({ theme }) {
  const location = useLocation();
  const services = location.state?.services || []; // تجنب الأخطاء إذا لم يتم تمرير بيانات
  const [filteredServices, setFilteredServices] = useState(services);
  
  // فلترة الخدمات بناءً على الفلاتر المختارة
  const handleFilterChange = ({ search, region, service, priceRange }) => {
    let filtered = services;

    if (search) {
      filtered = filtered.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));
    }
    if (region) {
      filtered = filtered.filter(s => s.region === region);
    }
    if (service && service !== "All") {
      filtered = filtered.filter(s => s.service === service);
    }
    if (priceRange) {
      const [min, max] = priceRange.split('-').map(Number);
      filtered = filtered.filter(s => s.price >= min && s.price <= max);
    }

    setFilteredServices(filtered);
  };

  return (
    <div>
       <div
    className="container_welcome"
    style={{
      background: 'linear-gradient(to bottom right, #2673d0 , #cddef2)' ,
      width: '80%',
      margin: '0 auto',
      marginTop: '50px',
    }}
    
  >
    
    <br></br>
    <h1>
      <span style={{ fontFamily: "'Playwrite IN', serif" }}>Connect with the right expert for the job!</span>
    
    </h1>
    <br /><br /><br />
    <div >
    <FilterBar onFilterChange={handleFilterChange} />
    </div>
    </div>

      <br></br>
      <ServicesCards services={filteredServices} /> {/* عرض الخدمات المُفلترة */}
    </div>
  );
}
