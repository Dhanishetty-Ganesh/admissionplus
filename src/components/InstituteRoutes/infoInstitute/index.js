import React from 'react'
import { IoMdDownload } from 'react-icons/io';
import QRCode from 'qrcode.react';
import Sidebar from '../../Sidebar';
import "./index.css"

const InfoInstitute = () => {

const handleDownload = (url, filename) => {
const link = document.createElement('a');
link.href = url;
link.download = filename;
link.click();
};



return (
<div className='institute-details-container'>
<Sidebar/>
<div className='institute-info-container'>
<div className='institute-details-card'>
<h1 className='institute-details-heading'>Institute Details</h1>
<img src="https://res.cloudinary.com/dvwnbhpcy/image/upload/v1720009868/WhatsApp_Image_2024-07-03_at_17.00.39_c1fce357_bqx6mt.jpg" alt="institute-logo" className='institute-logo-style' />
<p><span className='name-style'>Institute Name: </span>Pragati Institute of Computer</p>
<p><span className='name-style'>Admin Name: </span>Baban Magdum</p>
<p><span className='name-style'>Contact: </span>098206 18601</p>
<p><span className='name-style'>Gmail: </span>pragatiinstitute@gmail.com</p>
<p><span className='name-style'>Address: </span>Plot No. 20, Sector 17, near Visava CHS.Ltd, Airoli, Navi Mumbai, Maharashtra 400708
</p>
</div>
<div className='institute-qr-container'>
<p className='qr-code-heading'>Pragathi Institute of Computer</p>
<QRCode value={`${window.location.origin}/form`} className='qr-code-style' />
<p>Scan the QR Code</p>
<IoMdDownload
className='download-symbol'
onClick={() => handleDownload('https://res.cloudinary.com/dvwnbhpcy/image/upload/v1720009834/Copy_of_QR_code1_lnumex.jpg')}
/>
</div>
    
</div>
</div>
)
}

export default InfoInstitute