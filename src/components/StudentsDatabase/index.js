/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { FaPlus, FaTimes } from 'react-icons/fa'; // Add FaPlus and FaTimes imports
import {Link} from "react-router-dom"
import Sidebar from '../Sidebar';
import "./index.css"


const StudentsDatabase = () => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editGroupId, setEditGroupId] = useState(null);
  const [groupData, setGroupData] = useState([
    { id: 1, groupName: 'Admins', totalUsers: 5, category: 'Management' },
    { id: 2, groupName: 'Editors', totalUsers: 12, category: 'Content' },
    { id: 3, groupName: 'Users', totalUsers: 45, category: 'General' },
    { id: 4, groupName: 'Guests', totalUsers: 30, category: 'Temporary' },
  ]);
  const [formData, setFormData] = useState({ groupName: '', category: '' });
  const [deleteGroupId, setDeleteGroupId] = useState(null);

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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formData.groupName && formData.category) {
      if (isEditing) {
        setGroupData((prevData) =>
          prevData.map((group) =>
            group.id === editGroupId
              ? { ...group, groupName: formData.groupName, category: formData.category }
              : group
          )
        );
      } else {
        const newGroup = {
          id: groupData.length + 1,
          groupName: formData.groupName,
          totalUsers: 0,
          category: formData.category,
        };
        setGroupData([...groupData, newGroup]);
      }
      handleCloseClick();
    }
  };

  const handleDelete = (id) => {
    setDeleteGroupId(id);
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = () => {
    setGroupData(groupData.filter(group => group.id !== deleteGroupId));
    setShowDeleteConfirmation(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  const handleEditClick = (id) => {
    const group = groupData.find(group => group.id === id);
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
      <Sidebar/>
      <div className='students-top-content'>
        <h1 className='students-heading'>Students &gt; Database</h1>
        <div className='students-add-button-container'>
          <button className='students-add-button' onClick={handleAddClick}>
            Add <FaPlus className='student-plus' />
          </button>
        </div>
      </div>
      <div className='students-group-details'>
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
            {groupData.map((item) => (
              <tr key={item.id} className="group-row">
                <td className="group-cell">{item.id}</td>
                <Link to = {`/studentsdatabase/groupname/${item.groupName}`}><td className="group-cell">{item.groupName}</td></Link>
                <td className="group-cell">{item.totalUsers}</td>
                <td className="group-cell">{item.category}</td>
                <td className="group-cell">
                  <CiEdit
                    className="group-icon group-icon-edit"
                    onClick={() => handleEditClick(item.id)}
                  />
                  <MdDeleteOutline
                    className="group-icon group-icon-delete"
                    onClick={() => handleDelete(item.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

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
}

export default StudentsDatabase;
