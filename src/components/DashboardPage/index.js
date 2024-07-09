
import {FaUniversity, FaBullhorn, FaChartLine, FaFileInvoiceDollar, FaQuestionCircle, FaCog, FaSignOutAlt } from 'react-icons/fa';
import './index.css'; 
import { Link, useLocation } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";


const DashboardPage = () => {
  const location = useLocation();
  const profilename = location.state?.name || '';

  return (

    <div className='dashboard-container'>
      <div className='dashboard-top-section'>
        <h1 className='dashboard-top-right-text'>AdmissionPlus</h1>
        <div>
          <h1 className='dashboard-top-left-text'><p className='dashboard-email'>{profilename} <FaUserCircle className='user-logo-dashboard'/></p></h1>
        </div>
      </div>
      <div className='bottom-containers'>
        <div className='left-section'>
          <Link to="/institutedashboard" className='left-side-button'><FaUniversity className='icon' /> Institute</Link>
          <Link to="/plandashboard" className='left-side-button'><FaFileInvoiceDollar className='icon' /> Plans</Link>
          <Link to="/marketingdashboard" className='left-side-button'><FaBullhorn className='icon' /> Marketing</Link>
          <Link to="/saledashboard" className='left-side-button'><FaChartLine className='icon' /> Sale</Link>
          <div className='bottom-buttons'>
            <Link to="/helpdashboard" className='left-side-button'><FaQuestionCircle className='icon' /> Help</Link>
            <Link to="/settingsdashboard" className='left-side-button'><FaCog className='icon' /> Settings</Link>
            <Link to="/logout" className='left-side-button'><FaSignOutAlt className='icon' /> Logout</Link>
          </div>
        </div>
        
    </div>
    </div>
  );
};

export default DashboardPage;
