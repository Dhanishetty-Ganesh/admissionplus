import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import axios from 'axios';
import DashboardPage from '../../DashboardPage';
import './index.css';

const InstituteRoute = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
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
    coursesAvailable: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://admissionplusbackend.vercel.app/institutes');
        console.log("API Response:", response.data); // Log the entire response

        if (response.data && Array.isArray(response.data.result)) {
          setBusinesses(response.data.result);
        } else if (response.data.failure) {
          console.log("Error message from API:", response.data.failure);
        } else {
          console.log("Unexpected response format:", response.data);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
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

  const getUrl = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      const response = await axios.post('https://admissionplusbackend.vercel.app/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      if (response.status !== 200) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const data = response.data;
      return data.data.Location; // Assuming the S3 URL is in data.Location
    } catch (error) {
      alert("File Upload Failed");
      console.error('Error uploading file:', error.message);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = await getUrl(file);
      console.log(imageUrl);
      setFormData((prev) => ({
        ...prev,
        logo: imageUrl
      }));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('https://admissionplusbackend.vercel.app/institutes', formData);
      if (response.data && response.data.result) {
        setBusinesses((prevBusinesses) => [...prevBusinesses, response.data.result]);
      } else {
        console.log("Unexpected response format:", response.data);
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
        coursesAvailable: '',
      });
    } catch (err) {
      console.error('Error submitting form:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFormClose = () => {
    setIsFormVisible(false);
  };

  return (
    <div className='top-route-container'>
      <DashboardPage />
      <div className='right-section'>
        {loading ? (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        ) : (
          businesses.length === 0 ? (
            <p className="no-institute-text">
              You have not added any institute yet. Click on the below plus button to add the institute.
            </p>
          ) : (
            <ul className='business-list-items-container'>
              {businesses.map((business, index) => (
                <li className='business-list-item' key={index}>
                  {business.logo ? (
                    <img src={business.logo} alt="logo" className='business-logo'/>
                  ) : (
                    <div className='business-logo-placeholder'>No Logo</div>
                  )}
                  <div>
                    <p className='business-name'>{business.name}</p>
                    <p className='business-mobile-no'>{business.mobile}</p>
                  </div>
                  <div>
                    <p className='business-role'>{business.role}</p>
                    <p className='business-email'>{business.email}</p>
                  </div>
                  <p className='business-location'><MdLocationOn className='location-logo' />{business.location}</p>
                  <Link className='business-login-button' to={`/institutecontainer/${business._id}`}>Login</Link>
                </li>
              ))}
            </ul>
          )
        )}
      </div>
      {isFormVisible && (
        <div className='popup-form'>
          <form onSubmit={handleFormSubmit}>
            <label className='form-label'>
              <span>Upload Institute Logo</span>
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
                name="coursesAvailable"
                placeholder="Courses Available"
                value={formData.coursesAvailable}
                onChange={handleFormChange}
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
}

export default InstituteRoute;
