import React, { useState } from 'react';
import { FaPlus} from 'react-icons/fa';
import { FaLocationDot } from "react-icons/fa6";
import './index.css'; 
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [businesses, setBusinesses] = useState([]);
  const [formData, setFormData] = useState({
    logo: '',
    name: '',
    mobile: '',
    role: '',
    email: '',
    location: '',
    city: '',
    district: '',
    pincode: ''
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      logo: URL.createObjectURL(file)
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setBusinesses((prevBusinesses) => [...prevBusinesses, formData]);
    setIsFormVisible(false);
    setFormData({
      logo: '',
      name: '',
      mobile: '',
      role: '',
      email: '',
      location: '',
      city: '',
      district: '',
      pincode: ''
    });
  };

  const handleFormClose = () => {
    setIsFormVisible(false);
  };

  return (
    <div className='dashboard-container'>
      <div className='dashboard-top-section'>
        <h1 className='dashboard-top-right-text'>AdmissionPlus</h1>
        <h1 className='dashboard-top-left-text'>Help</h1>
      </div>
      <div className='bottom-containers'>
        <div className='left-section'>
          <h1 className='left-side-button'>Institute</h1>
          <h1 className='left-side-button'>Plans</h1>
          <h1 className='left-side-button'>Sale</h1>
          <h1 className='left-side-button'>Account</h1>
          <h1 className='left-side-button'>Settings</h1>
        </div>
        <div className='right-section'>
          <ul className='business-list-items-container'>
            {businesses.map((business, index) => (
              <li className='business-list-item' key={index}>
                {business.logo && <img src={business.logo} alt="logo" className='business-logo'/>}
                <div>
                  <p className='business-name'>{business.name}</p>
                  <p className='business-mobile-no'>{business.mobile}</p>
                </div>
                <div>  
                  <p className='business-role'>{business.role}</p>
                  <p className='business-email'>{business.email}</p>
                </div>
                <p className='business-location'><FaLocationDot className='location-logo'/>{business.location}</p>
                <Link className='business-login-button' to = "/institutecontainer">Login</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {isFormVisible && (
        <div className='popup-form'>
          <form onSubmit={handleFormSubmit}>
            <label className='form-label'>
              <span>Upload Your Logo</span>
              <input
                type="file"
                name="logo"
                onChange={handleFileChange}
                className='form-input'
              />
            </label>
            <label className='form-label'>
              <span>Institute Name</span>
              <input
                type="text"
                name="name"
                placeholder="Institute Name"
                value={formData.name}
                onChange={handleFormChange}
                className='form-input'
                required
              />
            </label>
            <label className='form-label'>
              <span>Mobile Number</span>
              <input
                type="text"
                name="mobile"
                placeholder="Mobile Number"
                value={formData.mobile}
                onChange={handleFormChange}
                className='form-input'
                required
              />
            </label>
            <label className='form-label'>
              <span>Admin Name</span>
              <input
                type="text"
                name="role"
                placeholder="Admin Name"
                value={formData.role}
                onChange={handleFormChange}
                className='form-input'
                required
              />
            </label>
            <label className='form-label'>
              <span>Gmail</span>
              <input
                type="email"
                name="email"
                placeholder="Gmail"
                value={formData.email}
                onChange={handleFormChange}
                className='form-input'
                required
              />
            </label>
            <label className='form-label'>
              <span>Address</span>
              <input
                type="text"
                name="location"
                placeholder="Address"
                value={formData.location}
                onChange={handleFormChange}
                className='form-input'
                required
              />
            </label>
            <label className='form-label'>
              <span>City</span>
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleFormChange}
                className='form-input'
                required
              />
            </label>
            <label className='form-label'>
              <span>District</span>
              <input
                type="text"
                name="district"
                placeholder="District"
                value={formData.district}
                onChange={handleFormChange}
                className='form-input'
                required
              />
            </label>
            <label className='form-label'>
              <span>Pincode</span>
              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                value={formData.pincode}
                onChange={handleFormChange}
                className='form-input'
                required
              />
            </label>
            <label className='form-label'>
              <span>Courses Available</span>
              <input
                type="text"
                name="Courses Available"
                placeholder="Courses Available"
                className='form-input'
                required
              />
            </label>
            <div className='form-buttons'>
              <button type="button" onClick={handleFormClose} className='form-button form-button-close'>Close</button>
              <button type="submit" className='form-button form-button-submit'>Submit</button>
            </div>
          </form>
        </div>
      )}
      <button className='floating-button' onClick={() => setIsFormVisible(true)}>
        <FaPlus />
      </button>
    </div>
  );
};

export default DashboardPage;
