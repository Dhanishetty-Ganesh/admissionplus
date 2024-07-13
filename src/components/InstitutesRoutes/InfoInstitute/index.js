import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IoMdDownload } from 'react-icons/io';
import QRCode from 'qrcode.react';
import Sidebar from '../../Sidebar';
import axios from 'axios';
import './index.css';

const InfoInstitute = () => {
  const { id } = useParams();
  const [institute, setInstitute] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInstitute = async () => {
      try {
        const response = await axios.get(`https://admissionplusbackend.vercel.app/institutes/${id}`);
        if (response.data && response.data.result) {
          setInstitute(response.data.result);
        }
      } catch (err) {
        console.error('Error fetching institute data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchInstitute();
  }, [id]);

  const handleDownload = (url, filename) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
  };

  if (loading) {
    return (
      <div className="institute-details-container">
        <Sidebar />
        <div className="institute-info-container">
          <div className="loader-container info-loader-cont">
            <div className="loader"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!institute) {
    return <p>Error: Institute not found</p>;
  }

  return (
    <div className='institute-details-container'>
      <Sidebar />
      <div className='institute-info-container'>
        <div className='institute-details-card'>
          <h1 className='institute-details-heading'>Institute Details</h1>
          <img src={institute.logo || 'default-logo-url.jpg'} alt="institute-logo" className='institute-logo-style' />
          <p><span className='name-style'>Institute Name: </span>{institute.name}</p>
          <p><span className='name-style'>Admin Name: </span>{institute.role}</p>
          <p><span className='name-style'>Contact: </span>{institute.mobile}</p>
          <p><span className='name-style'>Gmail: </span>{institute.email}</p>
          <p><span className='name-style'>Address: </span>{institute.location}</p>
        </div>
        <div className='institute-qr-container'>
          <p className='qr-code-heading'>{institute.name}</p>
          <QRCode value={`https://admissionplus.vercel.app/form/${id}`} className='qr-code-style' />
          <p>Scan the QR Code</p>
          <IoMdDownload
            className='download-symbol'
            onClick={() => handleDownload('https://res.cloudinary.com/dvwnbhpcy/image/upload/v1720009834/Copy_of_QR_code1_lnumex.jpg', 'QRCode.jpg')}
          />
        </div>
      </div>
    </div>
  );
};

export default InfoInstitute;
