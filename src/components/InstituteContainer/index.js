import React from 'react'
import Sidebar from '../Sidebar'
import "./index.css"

const InstitueContainer = () => {
  return (
    <div>  <Sidebar/>
    <div className='info-details-container'>
    <img src="https://res.cloudinary.com/dvwnbhpcy/image/upload/v1720009868/WhatsApp_Image_2024-07-03_at_17.00.39_c1fce357_bqx6mt.jpg" alt="institute-logo" className='info-logo-style' />
    <p className='info-welcome'>Welcome to</p>
    <h1 className='info-institute-name'>Pragathi Institute of Computers</h1>
    </div>
    </div>
  )
}

export default InstitueContainer