import React from 'react';
import StartingDashboard from '../../StartingDashboard'; // Adjust the import path as needed
import './index.css'; // CSS file for InstituteRoute

const InstituteRoute = () => {
  return (
    <div className='institute-route-container'>
      <div className='dashboard-wrapper'>
        <StartingDashboard />
      </div>
      <div className='right-side-content'>
        {/* Right side content goes here */}
        <h2>InstituteRoute</h2>
        <p>This is the right side content of the InstituteRoute.</p>
      </div>
    </div>
  );
}

export default InstituteRoute;
