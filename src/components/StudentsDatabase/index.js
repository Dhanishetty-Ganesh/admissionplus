import React, { useState, useEffect } from 'react';
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { FaPlus, FaTimes } from 'react-icons/fa';
import { Link } from "react-router-dom";
import axios from 'axios';
import Sidebar from '../Sidebar';
import "./index.css";

const InstituteDatabase = () => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editInstituteId, setEditInstituteId] = useState(null);
  const [instituteData, setInstituteData] = useState([]);
  const [formData, setFormData] = useState({ studentData: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deleteInstituteId, setDeleteInstituteId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const instituteResponse = await axios.get('https://admissionplusbackend.vercel.app/institutes');
        const institutes = instituteResponse.data.result;

        setInstituteData(institutes);
      } catch (error) {
        console.error('Error loading institutes:', error);
        setError('Failed to load institutes. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddClick = () => {
    setShowPopup(true);
    setIsEditing(false);
    setFormData({ studentData: '' });
  };

  const handleCloseClick = () => {
    setShowPopup(false);
    setFormData({ studentData: '' });
    setIsEditing(false);
    setEditInstituteId(null);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isEditing && editInstituteId) {
        // Add student data to an existing institute
        const response = await axios.put(`https://admissionplusbackend.vercel.app/institutes/${editInstituteId}/students`, formData);
        const updatedInstitute = response.data.result;
        setInstituteData(instituteData.map(item => item._id === editInstituteId ? updatedInstitute : item));
      } else {
        // Create a new institute
        const response = await axios.post('https://admissionplusbackend.vercel.app/institutes', formData);
        const newInstitute = response.data.result;
        setInstituteData([...instituteData, newInstitute]);
      }
    } catch (error) {
      console.error('Error saving institute:', error);
      setError('Failed to save institute. Please try again.');
    } finally {
      setLoading(false);
      handleCloseClick();
    }
  };

  const handleDelete = async (id) => {
    setDeleteInstituteId(id);
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`https://admissionplusbackend.vercel.app/institutes/${deleteInstituteId}`);
      setInstituteData(instituteData.filter(item => item._id !== deleteInstituteId));
    } catch (error) {
      console.error('Error deleting institute:', error);
      setError('Failed to delete institute. Please try again.');
    } finally {
      setLoading(false);
      setShowDeleteConfirmation(false);
      setDeleteInstituteId(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
    setDeleteInstituteId(null);
  };

  const handleEditClick = (id) => {
    const institute = instituteData.find(institute => institute._id === id);
    if (institute) {
      setFormData({ studentData: '' }); // Reset the form data for editing student data
      setShowPopup(true);
      setIsEditing(true);
      setEditInstituteId(id);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  return (
    <div className='database-content'>
      <Sidebar />
      <div className='students-top-content'>
        <h1 className='students-heading'>Institute &gt; Database</h1>
        <div className='students-add-button-container'>
          <button className='students-add-button' onClick={handleAddClick}>
            Add <FaPlus className='student-plus' />
          </button>
        </div>
      </div>
      <div className='students-group-details'>
        {loading && <p>Loading...</p>}
        {error && <p className='error-message'>{error}</p>}
        {!loading && !error && (
          <table className="group-table">
            <thead>
              <tr>
                <th className="group-header">S.No</th>
                <th className="group-header students-database-link">Institute Name</th>
                <th className="group-header">Total Users</th>
                <th className="group-header">Course Category</th>
                <th className="group-header">Action</th>
              </tr>
            </thead>
            <tbody>
              {instituteData.map((item, index) => (
                <tr key={item._id} className="group-row">
                  <td className="group-cell">{index + 1}</td>
                  <td className="group-cell">
                    <Link to={`/institute/${item._id}`}>
                      {item.instituteName}
                    </Link>
                  </td>
                  <td className="group-cell">{item.studentdatabase ? item.studentdatabase.length : 0}</td>
                  <td className="group-cell">{item.category}</td>
                  <td className="group-cell">
                    <CiEdit
                      className="group-icon group-icon-edit"
                      onClick={() => handleEditClick(item._id)}
                    />
                    <MdDeleteOutline
                      className="group-icon group-icon-delete"
                      onClick={() => handleDelete(item._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {showDeleteConfirmation && (
          <div className="delete-confirmation-popup">
            <p className="delete-confirmation-text">Are you sure you want to delete this institute?</p>
            <div className="delete-confirmation-buttons">
              <button className="delete-confirmation-button delete-confirmation-button-no" onClick={handleCancelDelete}>No</button>
              <button className="delete-confirmation-button" onClick={handleConfirmDelete}>Yes</button>
            </div>
          </div>
        )}

        {showPopup && (
          <div className='group-popup-overlay'>
            <div className='group-popup-content'>
              <button className='group-close-button' onClick={handleCloseClick}>
                <FaTimes />
              </button>
              <h2>{isEditing ? 'Edit Institute' : 'Add Institute'}</h2>
              <form onSubmit={handleFormSubmit} className='group-popup-form'>
                <label className='group-label'>
                  Student Data:
                  <input
                    type='text'
                    name='studentData'
                    value={formData.studentData}
                    onChange={handleInputChange}
                    placeholder='Enter student data'
                    className='group-input'
                    required
                  />
                </label>
                <div className='group-submit-button-container'>
                  <button type='submit' className='group-submit-button'>Submit</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstituteDatabase;
