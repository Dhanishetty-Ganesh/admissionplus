import React, { useState, useEffect } from 'react';
import { FaPlus, FaUniversity, FaBullhorn, FaChartLine, FaFileInvoiceDollar, FaQuestionCircle, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { FaLocationDot } from "react-icons/fa6";
import './index.css'; 
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { FaUserCircle } from "react-icons/fa";


const DashboardPage = () => {
  const location = useLocation();
  const profilename = location.state?.name || '';

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
    pincode: '',
  });

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://admissionplusbackend.vercel.app/institutes');
        if (response.data && Array.isArray(response.data.result)) {
          setBusinesses(response.data.result);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };
    fetchData();
  }, []);

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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://admissionplusbackend.vercel.app/institutes', formData);
      if (response.data && response.data.result) {
        setBusinesses((prevBusinesses) => [...prevBusinesses, response.data.result]);
      }
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
        pincode: '',
      });
    } catch (err) {
      console.error('Error submitting form:', err);
    }
  };

  const handleFormClose = () => {
    setIsFormVisible(false);
  };

  return (
    <div className='dashboard-container'>
      <div className='dashboard-top-section'>
        <h1 className='dashboard-top-right-text'>AdmissionPlus</h1>
        <div className='dashboard-email-help'>
          <h1 className='dashboard-top-left-text'><p className='dashboard-email'>{profilename} <FaUserCircle/></p></h1>
        </div>
      </div>
      <div className='bottom-containers'>
        <div className='left-section'>
          <Link to="/dashboardinstitute" className='left-side-button'><FaUniversity className='icon' /> Institute</Link>
          <Link to="/dashboardplan" className='left-side-button'><FaFileInvoiceDollar className='icon' /> Plans</Link>
          <Link to="/dashboardmarketing" className='left-side-button'><FaBullhorn className='icon' /> Marketing</Link>
          <Link to="/dashboardsale" className='left-side-button'><FaChartLine className='icon' /> Sale</Link>
          <div className='bottom-buttons'>
            <Link to="/help" className='left-side-button'><FaQuestionCircle className='icon' /> Help</Link>
            <Link to="/settings" className='left-side-button'><FaCog className='icon' /> Settings</Link>
            <Link to="/logout" className='left-side-button'><FaSignOutAlt className='icon' /> Logout</Link>
          </div>
        </div>
        <div className='right-section'>
          <ul className='business-list-items-container'>
            {businesses.map((business, index) => (
              <li className='business-list-item' key={index}>
                {business.logo && <img src={business.logo} alt="logo" className='business-logo' />}
                <div>
                  <p className='business-name'>{business.name}</p>
                  <p className='business-mobile-no'>{business.mobile}</p>
                </div>
                <div>  
                  <p className='business-role'>{business.role}</p>
                  <p className='business-email'>{business.email}</p>
                </div>
                <p className='business-location'><FaLocationDot className='location-logo' />{business.location}</p>
                <Link className='business-login-button' to="/institutecontainer">Login</Link>
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
