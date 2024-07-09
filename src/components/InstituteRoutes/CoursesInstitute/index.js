import React from 'react'
import Sidebar from '../../Sidebar'
import "./index.css"

const CoursesInstitute = () => {
  return (
    <div>
        <Sidebar/>
        <h1 className='courses-heading'>Courses</h1> 
        <div className='courses-container'>
          <div className='course-detais-container'>
            <h1 className='main-heading-course'>MS-CIT</h1>
            <p className='para-course'>Maharashtra State Certificate in Information Technology</p>
          </div>
          <div className='course-detais-container'>
            <img src = "https://res.cloudinary.com/dvwnbhpcy/image/upload/v1720519389/logo_klic-removebg-preview_q8kv1y.png" alt = "courses-logo" className='course-logo'/>
          </div>
        </div>
        </div>
  )
}

export default CoursesInstitute