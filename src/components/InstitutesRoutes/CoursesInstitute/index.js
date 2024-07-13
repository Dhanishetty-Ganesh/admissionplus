import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../Sidebar';
import './index.css';

const CoursesInstitute = () => {
  return (
    <div>
      <Sidebar />
      <div className='students-top-content'>
        <h1 className='students-heading'>Institute &gt; Courses</h1>
        </div>
      <h1 className='courses-heading'>Courses</h1>
      <div className='courses-container'>
          <Link to="https://mscit.mkcl.org/course-details/medium"  className='course-details-container' target="_blank" rel="noopener noreferrer">
            <div className='card-face front'>
              <h1 className='main-heading-course'>MS-CIT</h1>
              <p className='para-course'>Maharashtra State Certificate in Information Technology</p>
            </div>
          <div className='card-face back'>
            <p className='back-side-text'>MS-CIT: An IT Course that has transformed millions of learners into Smart Users..!!</p>
          </div>
          </Link>
      
          <Link to="https://klic.mkcl.org/klic-courses"  className='course-details-container' target="_blank" rel="noopener noreferrer">
            <div className='card-face front'>
              <img src="https://res.cloudinary.com/dvwnbhpcy/image/upload/v1720519389/logo_klic-removebg-preview_q8kv1y.png" alt="courses-logo" className='course-logo' />
            </div>
          
          <div className='card-face back'>
            <p className='back-side-text'>KLiC Courses : Learn Role-based career skills and be an expert!</p>
          </div>
          </Link>
        
      </div>
    </div>
  );
}

export default CoursesInstitute;
