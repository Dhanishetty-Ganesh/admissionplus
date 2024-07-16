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
      const groups = response.data.result;

      // Fetch total users for each group
      const updatedGroups = await Promise.all(groups.map(async (group) => {
        try {
          const usersResponse = await axios.get(`https://admissionplusbackend.vercel.app/marketingdatagroupname/${group.groupName}/totalUsers`);
          return { ...group, totalUsers: usersResponse.data.totalUsers || 0 };
        } catch (error) {
          console.error(`Error fetching total users for group ${group._id}:`, error);
          return { ...group, totalUsers: 0 };
        }
      }));

      setGroupData(updatedGroups);
    } catch (error) {
      console.error('Error loading groups:', error);
      setError('Failed to load groups. Please refresh the page or try again later.');
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
          console.log("Editing item with ID:", editGroupId); // Debugging line
          const response = await axios.put(`https://admissionplusbackend.vercel.app/studentsdbgroupname/${editGroupId}`, formData);
          console.log("Update response:", response.data); // Debugging line
          setGroupData(groupData.map(item => item._id === editGroupId ? response.data.result : item));
        } else {
          console.log("Adding new item"); // Debugging line
          const response = await axios.post('https://admissionplusbackend.vercel.app/studentsdbgroupname', formData);
          console.log("Add response:", response.data); // Debugging line
          setGroupData([...groupData, response.data.result]);
        }
        fetchGroups();
      } catch (error) {
        console.error('Error saving group:', error);
        setError('Failed to save group. Please try again.');
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
                    <Link to={`/studentsdatabase/${item.groupName}`}>
                      {item.groupName}
                    </Link>
                  </td>
                  <td className="group-cell">{item.totalUsers !== 'N/A' ? item.totalUsers : 0}</td>
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
