import React from 'react'
import DashboardPage from '../../DashboardPage'
import "./index.css"

const PlansRoute = () => {
  return (
    <div className='plan-route-container'>
      <DashboardPage/>
      <h1>plan</h1>
      <img src = "https://res.cloudinary.com/dvwnbhpcy/image/upload/v1720459284/images-removebg-preview_ne1yjz.png" alt = "coming soon" className='coming-soon-image'/>
    </div>
  )
}

export default PlansRoute