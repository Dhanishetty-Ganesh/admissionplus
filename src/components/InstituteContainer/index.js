import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../Sidebar';
import './index.css';

const InstituteContainer = () => {
  const { id } = useParams();
  const [institute, setInstitute] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInstitute = async () => {
      try {
        const response = await axios.get(`https://admissionplusbackend.vercel.app/institutes/${id}`);
        if (response.data && response.data.result) {
          setInstitute(response.data.result);
        } else {
          setInstitute(null); // Ensure to set to null if no institute is found
        }
      } catch (err) {
        console.error('Error fetching institute data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchInstitute();
  }, [id]);

  if (loading) {
    return <div className="loader-container"><div className="loader"></div></div>;
  }

  if (!institute) {
    return <p>Loading.........

    </p>;
  }

  return (
    <div>
      <Sidebar />
      <div className='info-details-container'>
        <img src={institute.logo || "default-logo-url.jpg"} alt="institute-logo" className='info-logo-style' />
        <p className='info-welcome'>Welcome to</p>
        <h1 className='info-institute-name'>{institute.name}</h1>
        <p className='info-location'>{institute.location}</p>
      </div>
    </div>
  );
};

export default InstituteContainer;
