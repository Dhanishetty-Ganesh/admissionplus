import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronDown, FaChevronUp, FaInfoCircle, FaUniversity, FaPhone, FaCreditCard, FaUser } from 'react-icons/fa';
import './index.css';

const Sidebar = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = (option) => {
    setSelectedOption(selectedOption === option ? null : option);
  };

  return (
    <div className='sidebar'>
       <div className="institute-top-section">
          <h1 className='institute-top-right-text'>Pragati Institute of Computer</h1>
          <h1 className='institute-top-left-text'>Help</h1>
        </div>
      <div className='institute-left-section'>
        {/* Institute Option */}
        <div className='left-options'>
          <div className='left-options-container' onClick={() => toggleDropdown('institute')}>
            <div className='two-options'>
              <FaUniversity className='option-logo' />
              <Link to="/institutecontainer" className='left-options-text'>Institute</Link>
            </div>
            <button className='down-button'>
              {selectedOption === 'institute' ? <FaChevronUp className='down-symbol' /> : <FaChevronDown className='down-symbol' />}
            </button>
          </div>
          {selectedOption === 'institute' && (
            <div className="dropdown-content">
              <Link to="/infoinstitute" className='sidebar-options'>Info</Link>
              <Link to="/coursesinstitute" className='sidebar-options'>Courses</Link>
            </div>
          )}
        </div>

        {/* Students Option */}
        <div className='left-options'>
          <div className='left-options-container' onClick={() => toggleDropdown('students')}>
            <div className='two-options'>
              <FaInfoCircle className='option-logo' />
              <p className='left-options-text'>Students</p>
            </div>
            <button className='down-button'>
              {selectedOption === 'students' ? <FaChevronUp className='down-symbol' /> : <FaChevronDown className='down-symbol' />}
            </button>
          </div>
          {selectedOption === 'students' && (
            <div className="dropdown-content">
              <Link to="/registrationstudents" className='sidebar-options'>Registration</Link>
              <Link to="/students" className='sidebar-options'>Database</Link>
            </div>
          )}
        </div>

        {/* IVR Option */}
        <div className='left-options'>
          <div className='left-options-container ivr-left-option' onClick={() => toggleDropdown('ivr')}>
            <div className='two-options'>
              <FaPhone className='option-logo' />
              <p className='left-options-text'>IVR</p>
            </div>
            <button className='down-button'>
              {selectedOption === 'ivr' ? <FaChevronUp className='down-symbol' /> : <FaChevronDown className='down-symbol' />}
            </button>
          </div>
          {selectedOption === 'ivr' && (
            <div className="dropdown-content">
              <Link to="/audioclips" className='sidebar-options'>Audio Clips</Link>
              <Link to="/marketing" className='sidebar-options'>Marketing</Link>
            </div>
          )}
        </div>

        {/* Credits Option */}
        <div className='left-options'>
          <div className='left-options-container' onClick={() => toggleDropdown('credits')}>
            <div className='two-options'>
              <FaCreditCard className='option-logo' />
              <Link to="/credits" className='left-options-text'>Credits</Link>
            </div>
            <button className='down-button'>
              {selectedOption === 'credits' ? <FaChevronUp className='down-symbol' /> : <FaChevronDown className='down-symbol' />}
            </button>
          </div>
          {selectedOption === 'credits' && (
            <div className="dropdown-content">
              <Link to="/purchase" className='sidebar-options'>Purchase</Link>
              <Link to="/history" className='sidebar-options'>History</Link>
            </div>
          )}
        </div>

        {/* Profile Option */}
        <div className='left-options'>
          <div className='left-options-container' onClick={() => toggleDropdown('profile')}>
            <div className='two-options'>
              <FaUser className='option-logo' />
              <p className='left-options-text'>Profile</p>
            </div>
            <button className='down-button'>
              {selectedOption === 'profile' ? <FaChevronUp className='down-symbol' /> : <FaChevronDown className='down-symbol' />}
            </button>
          </div>
          {selectedOption === 'profile' && (
            <div className="dropdown-content">
              <Link to="/edit" className='sidebar-options'>Edit Details</Link>
              <Link to="/logout" className='sidebar-options'>Logout</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
