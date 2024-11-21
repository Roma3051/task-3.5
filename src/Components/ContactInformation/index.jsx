import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

function ContactInformation() {
  const navigate = useNavigate();

  const [contactData, setContactData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'phone' && !/^\d*$/.test(value)) {
      return; 
    }

    setContactData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      localStorage.setItem('contactData', JSON.stringify(contactData));
      navigate('/shipmentInformation');
    } else {
      alert('Please fill in all required fields.');
    }
  };

  const isFormValid = () => {
    return contactData.firstname && contactData.lastname && contactData.email && contactData.phone;
  };

  const handleLinkClick = (e, path) => {
    if (!isFormValid() && path === '/shipmentInformation') {
      e.preventDefault();
      alert('Please fill in all required fields.');
    }
  };

  return (
    <div>
      <nav className='title-nav'>
        <h1>OfficeChairs</h1>
        <Link to="/cart">Cart</Link>
      </nav>
      <nav className='link'>
        <ul>
          <li><Link to="/cart">Cart</Link></li>
          <li>
            <NavLink 
              to="/contactInformation" 
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Contact Information
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/shipmentInformation"
              onClick={(e) => handleLinkClick(e, "/shipmentInformation")}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Shipment Information
            </NavLink>
          </li>
        </ul>
      </nav>
      <h5 className='contact-inf'>Contact Information</h5>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstname">First name*</label>
          <input 
            type="text" 
            id="firstname" 
            name="firstname" 
            placeholder="Enter your first name" 
            value={contactData.firstname} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div>
          <label htmlFor="lastname">Last name*</label>
          <input 
            type="text" 
            id="lastname" 
            name="lastname" 
            placeholder="Enter your last name" 
            value={contactData.lastname} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div>
          <label htmlFor="email">Email*</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            placeholder="Enter your email" 
            value={contactData.email} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div>
          <label htmlFor="phone">Phone*</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Enter your phone"
            value={contactData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <button className='submit' type='submit'>Next step</button>
      </form>
    </div>
  );
}

export default ContactInformation;
