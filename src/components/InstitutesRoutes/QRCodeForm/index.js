import React, { useState } from 'react';
import axios from 'axios';

const QRCodeForm = () => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [course, setCourse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/form', {
        name,
        mobile,
        course
      });
      if (response.status === 200) {
        alert('Form submitted successfully');
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Mobile Number:
          <input
            type="tel"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          />
        </label>
        <label>
          Course Required:
          <input
            type="text"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default QRCodeForm;
