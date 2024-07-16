import React, { useState, useEffect } from 'react';
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { FaPlus, FaTimes } from 'react-icons/fa';
import { Link } from "react-router-dom";
import axios from 'axios';
import Sidebar from '../Sidebar';
import "./index.css";

const StudentsDatabase = () => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editGroupId, setEditGroupId] = useState(null);
  const [groupData, setGroupData] = useState([]);
  const [formData, setFormData] = useState({ groupName: '', category: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deleteGroupId, setDeleteGroupId] = useState(null);

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://admissionplusbackend.vercel.app/groups');
      setGroupData(response.data.result);
    } catch (error) {
      console.error('Error fetching groups:', error);
      setError('Failed to fetch groups. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddClick = () => {
    setShowPopup(true);
    setIsEditing(false);
    setFormData({ groupName: '', category: '' });
  };

  const handleCloseClick = () => {
    setShowPopup(false);
    setFormData({ groupName: '', category: '' });
    setIsEditing(false);
    setEditGroupId(null);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    if (formData.groupName && formData.category) {
      try {
        if (isEditing) {
          await axios.put(`https://admissionplusbackend.vercel.app/groups/${editGroupId}`, formData);
        } else {
          await axios.post('https://admissionplusbackend.vercel.app/groups', formData);
        }
        fetchGroups();
      } catch (error) {
        console.error('Error submitting form:', error);
        setError('Failed to submit form. Please try again.');
      } finally {
        setLoading(false);
        handleCloseClick();
      }
    }
  };

  const handleDelete = (id) => {
    setDeleteGroupId(id);
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`https://admissionplusbackend.vercel.app/groups/${deleteGroupId}`);
      fetchGroups();
    } catch (error) {
      console.error('Error deleting group:', error);
      setError('Failed to delete group. Please try again.');
    } finally {
      setLoading(false);
      setShowDeleteConfirmation(false);
      setDeleteGroupId(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
    setDeleteGroupId(null);
  };

  const handleEditClick = (id) => {
    const group = groupData.find(group => group._id === id);
    if (group) {
      setFormData({ groupName: group.groupName, category: group.category });
      setShowPopup(true);
      setIsEditing(true);
      setEditGroupId(id);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className='database-content'>
      <Sidebar />
      <div className='students-top-content'>
        <h1 className='students-heading'>Students &gt; Database</h1>
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
                <th className="group-header students-database-link">Group Name</th>
                <th className="group-header">Total Users</th>
                <th className="group-header">Course Category</th>
                <th className="group-header">Action</th>
              </tr>
            </thead>
            <tbody>
              {groupData.map((item, index) => (
                <tr key={item._id} className="group-row">
                  <td className="group-cell">{index + 1}</td>
                  <td className="group-cell">
                    <Link to={`/studentsdatabase/groupname/${item.groupName}`}>
                      {item.groupName}
                    </Link>
                  </td>
                  <td className="group-cell">{item.totalUsers}</td>
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
            <p className="delete-confirmation-text">Are you sure you want to delete this group?</p>
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
              <h2>{isEditing ? 'Edit Group' : 'Add Group'}</h2>
              <form onSubmit={handleFormSubmit} className='group-popup-form'>
                <label className='group-label'>
                  Group Name:
                  <input
                    type='text'
                    name='groupName'
                    value={formData.groupName}
                    onChange={handleInputChange}
                    placeholder='Enter group name'
                    className='group-input'
                    required
                  />
                </label>
                <label className='group-label'>
                  Course Category:
                  <input
                    type='text'
                    name='category'
                    value={formData.category}
                    onChange={handleInputChange}
                    placeholder='Enter Course category'
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

export default StudentsDatabase;
