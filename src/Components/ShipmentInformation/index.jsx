import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function ShipmentInformation() {
  const navigate = useNavigate();
  const location = useLocation();

  const [shipmentData, setShipmentData] = useState({
    address: '',
    apartment: '',
    city: '',
    country: '',
    state: '',
    zip: ''
  });

  const countries = [
    { name: 'United States', states: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia'] },
    { name: 'Canada', states: ['Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador', 'Nova Scotia', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan'] },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "zip" && !/^\d*$/.test(value)) {
      return;
    }

    setShipmentData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (shipmentData.address && shipmentData.city && shipmentData.country && shipmentData.state && shipmentData.zip) {
      localStorage.setItem('shipmentData', JSON.stringify(shipmentData));
      navigate('/confirmation');
    } else {
      alert('Please fill in all required fields.');
    }
  };

  const selectedCountry = countries.find(country => country.name === shipmentData.country);
  const states = selectedCountry ? selectedCountry.states : [];

  useEffect(() => {
    const menuLinks = document.querySelectorAll('.link a');

    menuLinks.forEach((link) => {
      if (link.getAttribute('href') === location.pathname) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }, [location.pathname]);

  return (
    <div>
      <nav className='title-nav'>
        <h1>OfficeChairs</h1>
        <Link to="/cart">Cart</Link>
      </nav>
      <nav className='link'>
        <ul>
          <li><Link to="/cart">Cart</Link></li>
          <li><Link to="/contactInformation">Contact Information</Link></li>
          <li><Link to="/shipmentInformation">Shipment Information</Link></li>
        </ul>
      </nav>
      <h5 className='contact-inf'>Shipment Information</h5>
      <form onSubmit={handleSubmit} className='form-shipment'>
        <div>
          <label htmlFor="address">Address (No P. O. Boxes)*</label>
          <input 
            type="text" 
            id="address" 
            name="address" 
            placeholder="Enter your address" 
            value={shipmentData.address} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div>
          <label htmlFor="apartment">Apartment, suite etc. (optional)</label>
          <input 
            type="text" 
            id="apartment" 
            name="apartment" 
            placeholder="Enter your apartment information" 
            value={shipmentData.apartment} 
            onChange={handleChange} 
          />
        </div>
        <div>
          <label htmlFor="city">City*</label>
          <input 
            type="text" 
            id="city" 
            name="city" 
            placeholder="Enter your city" 
            value={shipmentData.city} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className='country-state-zip'>
          <div>
            <label htmlFor="country">Country/Region*</label>
            <select 
              id="country" 
              name="country" 
              value={shipmentData.country} 
              onChange={handleChange} 
              required
            >
              <option value="">Select your country/region</option>
              {countries.map((country, index) => (
                <option key={index} value={country.name}>{country.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="state">State*</label>
            <select 
              id="state" 
              name="state" 
              value={shipmentData.state} 
              onChange={handleChange} 
              required
            >
              <option value="">Select your state</option>
              {states.map((state, index) => (
                <option key={index} value={state}>{state}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="zip">ZIP code*</label>
            <input
              type="text"
              id="zip"
              name="zip"
              placeholder="Enter your ZIP code"
              value={shipmentData.zip}
              onChange={handleChange}
              pattern="\d*"
              required
            />
          </div>
        </div>
        <button className='submit-shipment' type='submit'>Next step</button>
      </form>
    </div>
  );
}

export default ShipmentInformation;
