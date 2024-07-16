import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaPlus } from 'react-icons/fa';
import { AiTwotoneEdit } from 'react-icons/ai';
import Sidebar from '../Sidebar';
import { MdDeleteOutline } from 'react-icons/md';
import './index.css'; // Import your CSS file

const StudentsDatabaseGroupName = () => {
  const { groupname } = useParams();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [studentsItems, setStudentsItems] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    email: '',
    details: '',
  });

  useEffect(() => {
    // Fetch all students on component mount
    axios.get('https://admissionplusbackend.vercel.app/studentsdbgroupname')
      .then(response => {
        setStudentsItems(response.data.result);
      })
      .catch(error => {
        console.error('Error fetching students:', error);
      });
  }, []);

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
    console.log("Form submitted");  // Debugging line
    const newItem = {
      datetime: new Date().toISOString().replace('T', ' ').slice(0, 16),
      name: formData.name,
      number: formData.number,
      email: formData.email,
      details: formData.details,
    };

    if (isEditMode) {
      console.log("Editing item with ID:", editId);  // Debugging line
      axios.put(`https://admissionplusbackend.vercel.app/studentsdbgroupname/${editId}`, newItem)
        .then(response => {
          console.log("Update response:", response.data);  // Debugging line
          setStudentsItems(studentsItems.map(item => item._id === editId ? response.data.result : item));
          resetForm();
        })
        .catch(error => {
          console.error('Error updating student:', error);
        });
    } else {
      console.log("Adding new item");  // Debugging line
      axios.post('https://admissionplusbackend.vercel.app/studentsdbgroupname', newItem)
        .then(response => {
          console.log("Add response:", response.data);  // Debugging line
          setStudentsItems([...studentsItems, response.data.result]);
          resetForm();
        })
        .catch(error => {
          console.error('Error adding student:', error);
        });
    }
  };

  const resetForm = () => {
    setFormData({ name: '', number: '', email: '', details: '' });
    setIsPopupOpen(false);
    setIsEditMode(false);
    setEditId(null);
  };

  const handleEdit = (id) => {
    const item = studentsItems.find(item => item._id === id);
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
    axios.delete(`https://admissionplusbackend.vercel.app/studentsdbgroupname/${deleteId}`)
      .then(() => {
        setStudentsItems(studentsItems.filter(item => item._id !== deleteId));
        setShowDeleteConfirmation(false);
        setDeleteId(null);
      })
      .catch(error => {
        console.error('Error deleting student:', error);
      });
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
                Number:
                <input
                  className='studentsdatabasegroupname-form-input'
                  type='text'
                  name='number'
                  value={formData.number}
                  onChange={handleFormChange}
                  placeholder='Enter Number'
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
                <input
                  className='studentsdatabasegroupname-form-input'
                  type='text'
                  name='details'
                  value={formData.details}
                  onChange={handleFormChange}
                  placeholder='Enter Details'
                  required
                />
              </label>
              <div className='studentsdatabasegroupname-popup-buttons'>
                
                <button className='studentsdatabasegroupname-popup-cancel' type='button' onClick={togglePopup}>
                  Cancel
                </button>
                <button className='studentsdatabasegroupname-popup-submit' type='submit'>
                  {isEditMode ? 'Save' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDeleteConfirmation && (
        <div className='studentsdatabasegroupname-popup-overlay'>
          <div className='studentsdatabasegroupname-delete-confirmation'>
            <p>Are you sure you want to delete this student?</p>
            <div className='studentsdatabasegroupname-delete-buttons'>
              <button className='studentsdatabasegroupname-delete-yes' onClick={handleDelete}>
                Yes
              </button>
              <button className='studentsdatabasegroupname-delete-no' onClick={handleCancelDelete}>
                No
              </button>
            </div>
          </div>
        </div>
      )}

<table className='studentsdatabasegroupname-table'>
  <thead>
    <tr className='studentsdatabasegroupname-tr'>
      <th className='studentsdatabasegroupname-th'>Date/Time</th>
      <th className='studentsdatabasegroupname-th'>Name</th>
      <th className='studentsdatabasegroupname-th'>Number</th>
      <th className='studentsdatabasegroupname-th'>Email</th>
      <th className='studentsdatabasegroupname-th'>Details</th>
      <th className='studentsdatabasegroupname-th'>Actions</th>
    </tr>
  </thead>
  <tbody>
    {studentsItems.map((item) => (
      <tr className='studentsdatabasegroupname-tr' key={item._id}>
        <td className='studentsdatabasegroupname-td'>{item.datetime}</td>
        <td className='studentsdatabasegroupname-td'>{item.name}</td>
        <td className='studentsdatabasegroupname-td'>{item.number}</td>
        <td className='studentsdatabasegroupname-td'>{item.email}</td>
        <td className='studentsdatabasegroupname-td'>{item.details}</td>
        <td className='studentsdatabasegroupname-td'>
          <button
            className='studentsdatabasegroupname-edit-button'
            onClick={() => handleEdit(item._id)}
          >
            <AiTwotoneEdit />
          </button>
          <button
            className='studentsdatabasegroupname-delete-button'
            onClick={() => handleDeleteConfirmation(item._id)}
          >
            <MdDeleteOutline />
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  );
};

export default StudentsDatabaseGroupName;
