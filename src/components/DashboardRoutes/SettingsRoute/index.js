import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardPage from '../../DashboardPage';
import { FaTrash } from "react-icons/fa";
import './index.css';

const SettingsRoute = () => {
  const [institutes, setInstitutes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInstitutes = async () => {
      try {
        const response = await axios.get('https://admissionplusbackend.vercel.app/institutes');
        if (response.data && Array.isArray(response.data.result)) {
          setInstitutes(response.data.result);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (err) {
        console.error('Error fetching institutes:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchInstitutes();
  }, []);

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      const response = await axios.delete(`https://admissionplusbackend.vercel.app/institutes/${id}`);
      if (response.data.success) {
        setInstitutes((prevInstitutes) => prevInstitutes.filter(institute => institute._id !== id));
      } else {
        console.error('Error deleting institute:', response.data.failure);
      }
    } catch (err) {
      console.error('Error deleting institute:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='settings-route-container'>
      <DashboardPage />
      <div className='delete-institutes-card'>
        <h1 className='delete-institutes-heading'>Delete Institutes</h1>
        {loading ? (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        ) : (
          <table className='institutes-table'>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Institute Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {institutes.map((institute, index) => (
                <tr key={institute._id}>
                  <td>{index + 1}</td>
                  <td>{institute.name}</td>
                  <td>
                    <button
                      className='delete-button'
                      onClick={() => handleDelete(institute._id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default SettingsRoute;
