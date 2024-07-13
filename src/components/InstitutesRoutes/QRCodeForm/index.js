import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './index.css';

const QRCodeForm = () => {
  const { id } = useParams();
  const [institute, setInstitute] = useState(null);
  const [date, setDate] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState('');
  const [showThankYouPopup, setShowThankYouPopup] = useState(false);

  useEffect(() => {
    const fetchInstitute = async () => {
      try {
        const response = await axios.get(`https://admissionplusbackend.vercel.app/institutes/${id}`);
        if (response.data && response.data.result) {
          setInstitute(response.data.result);
        }
      } catch (err) {
        console.error('Error fetching institute data:', err);
      }
    };

    fetchInstitute();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://admissionplusbackend.vercel.app/form', {
        date,
        name,
        mobile,
        email,
        course,
      });
      if (response.status === 201) {
        setShowThankYouPopup(true);
        // Clear form fields after successful submission
        setDate('');
        setName('');
        setMobile('');
        setEmail('');
        setCourse('');
        setTimeout(() => setShowThankYouPopup(false), 3000); // Hide popup after 3 seconds
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
    }
  };

  if (!institute) {
    return <p>Loading...</p>;
  }

  return (
    <div className="qrform-container">
      <div className="qr-institute-info">
        <img src={institute.logo || 'default-logo-url.jpg'} alt="institute-logo" className="qr-institute-logo" />
        <h1 className="qr-institute-name">{institute.name}</h1>
      </div>
      <h1 className="qrform-heading">Students Registration</h1>
      <form onSubmit={handleSubmit} className="qrform-form">
        <label className="qrform-label">
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="qrform-input"
            placeholder="Select date"
          />
        </label>
        <label className="qrform-label">
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="qrform-input"
            placeholder="Enter your name"
          />
        </label>
        <label className="qrform-label">
          Mobile Number:
          <input
            type="tel"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
            className="qrform-input"
            placeholder="Enter your mobile number"
          />
        </label>
        <label className="qrform-label">
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="qrform-input"
            placeholder="Enter your email"
          />
        </label>
        <label className="qrform-label">
          Course Required:
          <input
            type="text"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            required
            className="qrform-input"
            placeholder="Enter the course required"
          />
        </label>
        <button type="submit" className="qrform-submit">Submit</button>
      </form>
      <div className="qrform-powered">Powered by Admission Plus</div>
      {showThankYouPopup && (
        <div className="thankyou-popup">
          Thank you for doing registration!
        </div>
      )}
    </div>
  );
};

export default QRCodeForm;
