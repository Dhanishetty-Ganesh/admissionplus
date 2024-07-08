import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa6';
import { AiTwotoneEdit } from 'react-icons/ai';
import Sidebar from '../Sidebar';
import { MdDeleteOutline } from 'react-icons/md';
import './index.css'; // Ensure you have corresponding CSS

const StudentsDatabaseGroupName = () => {
  const { groupname } = useParams();

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [studentsItems, setStudentsItems] = useState([
    { id: 1, datetime: '2023-07-01 14:30', name: 'John', number: '1234567890', email: 'john@example.com', details: 'Sample details' },
    { id: 2, datetime: '2023-07-02 10:15', name: 'Rakesh', number: '9876543210', email: 'rakesh@example.com', details: 'Another sample detail' },
    { id: 3, datetime: '2023-07-02 10:15', name: 'Soumith', number: '9052953095', email: 'soumith123@example.com', details: 'Another detail' },
  ]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    email: '',
    details: '',
  });

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
    setIsEditMode(false);
    setFormData({ name: '', number: '', email: '', details: '' });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      id: isEditMode ? editId : studentsItems.length + 1,
      datetime: new Date().toISOString().replace('T', ' ').slice(0, 16), // Current date and time
      name: formData.name,
      number: formData.number,
      email: formData.email,
      details: formData.details,
    };
    if (isEditMode) {
      setStudentsItems(studentsItems.map(item => item.id === editId ? newItem : item));
    } else {
      setStudentsItems([...studentsItems, newItem]);
    }
    setFormData({ name: '', number: '', email: '', details: '' });
    setIsPopupOpen(false);
    setIsEditMode(false);
    setEditId(null);
  };

  const handleEdit = (id) => {
    const item = studentsItems.find(item => item.id === id);
    if (item) {
      setFormData({
        name: item.name,
        number: item.number,
        email: item.email,
        details: item.details,
      });
      setIsPopupOpen(true);
      setIsEditMode(true);
      setEditId(id);
    }
  };

  const handleDeleteConfirmation = (id) => {
    setDeleteId(id);
    setShowDeleteConfirmation(true);
  };

  const handleDelete = () => {
    setStudentsItems(studentsItems.filter(item => item.id !== deleteId));
    setShowDeleteConfirmation(false);
    setDeleteId(null);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
    setDeleteId(null);
  };

  return (
    <div className='studentsdatabasegroupname-container'>
      <Sidebar/>
      <div className='studentsdatabasegroupname-top-container'>
        <h1 className='studentsdatabasegroupname-heading'>{groupname}</h1>
        <div className='studentsdatabasegroupname-heading-container'>
          <p>No.of Students : {studentsItems.length}</p>
          <button className='studentsdatabasegroupname-add-button' onClick={togglePopup}>
            Add <FaPlus className='studentsdatabasegroupname-plus-logo' />
          </button>
        </div>
      </div>

      {isPopupOpen && (
        <div className='studentsdatabasegroupname-popup-overlay'>
          <div className='studentsdatabasegroupname-popup-form-container'>
            <form className='studentsdatabasegroupname-form' onSubmit={handleFormSubmit}>
              <h2 className='studentsdatabasegroupname-form-heading'>{isEditMode ? 'Edit Data' : 'Add New Data'}</h2>
              <label className='studentsdatabasegroupname-form-label'>
                Name:
                <input
                  className='studentsdatabasegroupname-form-input'
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleFormChange}
                  placeholder='Enter Name'
                  required
                />
              </label>
              <label className='studentsdatabasegroupname-form-label'>
                Mobile Number:
                <input
                  className='studentsdatabasegroupname-form-input'
                  type='text'
                  name='number'
                  value={formData.number}
                  onChange={handleFormChange}
                  placeholder='Enter Mobile Number'
                  required
                />
              </label>
              <label className='studentsdatabasegroupname-form-label'>
                Email:
                <input
                  className='studentsdatabasegroupname-form-input'
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleFormChange}
                  placeholder='Enter Email'
                  required
                />
              </label>
              <label className='studentsdatabasegroupname-form-label'>
                Details:
                <textarea
                  className='studentsdatabasegroupname-form-textarea'
                  name='details'
                  value={formData.details}
                  onChange={handleFormChange}
                  placeholder='Enter Details'
                  required
                />
              </label>
              <div className='studentsdatabasegroupname-form-buttons'>
                <button className='studentsdatabasegroupname-form-cancel-button' type='button' onClick={togglePopup}>Cancel</button>
                <button className='studentsdatabasegroupname-form-submit-button' type='submit'>Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDeleteConfirmation && (
        <div className='studentsdatabasegroupname-delete-popup-overlay'>
          <div className='studentsdatabasegroupname-delete-popup'>
            <p>Are you sure you want to delete it?</p>
            <div className='studentsdatabasegroupname-delete-buttons'>
              <button className='studentsdatabasegroupname-delete-no' onClick={handleCancelDelete}>No</button>
              <button className='studentsdatabasegroupname-delete-yes' onClick={handleDelete}>Yes</button>
            </div>
          </div>
        </div>
      )}

      {studentsItems.length > 0 && (
        <table className='studentsdatabasegroupname-table'>
          <thead>
            <tr>
              <th className='studentsdatabasegroupname-th'>S.No</th>
              <th className='studentsdatabasegroupname-th'>Date & Time</th>
              <th className='studentsdatabasegroupname-th'>Name</th>
              <th className='studentsdatabasegroupname-th'>Mobile Number</th>
              <th className='studentsdatabasegroupname-th'>Email</th>
              <th className='studentsdatabasegroupname-th'>Details</th>
              <th className='studentsdatabasegroupname-th'>Action</th>
            </tr>
          </thead>
          <tbody>
            {studentsItems.map((item, index) => (
              <tr key={item.id} className='studentsdatabasegroupname-tr'>
                <td className='studentsdatabasegroupname-td'>{index + 1}</td>
                <td className='studentsdatabasegroupname-td'>{item.datetime}</td>
                <td className='studentsdatabasegroupname-td'>{item.name}</td>
                <td className='studentsdatabasegroupname-td'>{item.number}</td>
                <td className='studentsdatabasegroupname-td'>{item.email}</td>
                <td className='studentsdatabasegroupname-td'>{item.details}</td>
                <td className='studentsdatabasegroupname-td'>
                  <button className='studentsdatabasegroupname-edit-button' onClick={() => handleEdit(item.id)}><AiTwotoneEdit /></button>
                  <button className='studentsdatabasegroupname-delete-button' onClick={() => handleDeleteConfirmation(item.id)}><MdDeleteOutline /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StudentsDatabaseGroupName;
