import React, { useState } from 'react';
import "./index.css";
import { FaPlus} from 'react-icons/fa6';
import { AiTwotoneEdit } from 'react-icons/ai';
import { MdDeleteOutline } from "react-icons/md";
import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar';


const Marketing = () => {
  const [data, setData] = useState([
    { id: 1, dateTime: '2024-07-05 12:00 PM', name: 'Campaign 1', category: 'Social Media' },
    { id: 2, dateTime: '2024-07-06 09:30 AM', name: 'Campaign 2', category: 'Email' },
    { id: 3, dateTime: '2024-07-07 03:45 PM', name: 'Campaign 3', category: 'SEO' },
    { id: 4, dateTime: '2024-07-08 11:15 AM', name: 'Campaign 4', category: 'Content Marketing' },
    { id: 5, dateTime: '2024-07-09 05:00 PM', name: 'Campaign 5', category: 'PPC' },
  ]);
  
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);
  const [formData, setFormData] = useState({ name: '', category: '' });
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
    setFormData({ name: '', category: '' });
    setIsEditMode(false);
  };

  const toggleDeletePopup = (id) => {
    setIsDeletePopupOpen(!isDeletePopupOpen);
    setDeleteId(id);
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
    const newEntry = {
      id: isEditMode ? currentEditId : data.length + 1,
      dateTime: isEditMode ? data.find(item => item.id === currentEditId).dateTime : new Date().toLocaleString(),
      name: formData.name,
      category: formData.category,
    };
    if (isEditMode) {
      setData(data.map(item => item.id === currentEditId ? newEntry : item));
    } else {
      setData([...data, newEntry]);
    }
    togglePopup();
  };

  const handleEdit = (id) => {
    const entryToEdit = data.find(item => item.id === id);
    setFormData({ name: entryToEdit.name, category: entryToEdit.category });
    setIsEditMode(true);
    setCurrentEditId(id);
    setIsPopupOpen(true);
  };

  const handleDelete = () => {
    setData(data.filter(item => item.id !== deleteId));
    toggleDeletePopup();
  };

  return (
    <div className='marketingmain-content'>
      <Sidebar/>
      <div className='marketingmain-top-container'>
        <h1 className='marketingmain-heading'>Voice(IVR) &gt; Marketing</h1>
        <div className='marketingmain-heading-container'>
          <button className='marketingmain-add-button' onClick={togglePopup}>
              Add <FaPlus className='marketingmain-plus-logo' />
          </button>
        </div>
      </div>

      {isPopupOpen && (
        <div className='marketingmain-popup-overlay'>
          <div className='marketingmain-popup-form-container'>
            <form className='marketingmain-form' onSubmit={handleFormSubmit}>
              <h2 className='marketingmain-form-heading'>{isEditMode ? 'Edit Marketing' : 'Add New Marketing'}</h2>
              <label className='marketingmain-form-label'>
                Marketing Name:
                <input
                  className='marketingmain-form-input'
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleFormChange}
                  placeholder='Enter Marketing Name'
                  required
                />
              </label>
              <label className='marketingmain-form-label'>
                Category:
                <input
                  className='marketingmain-form-input'
                  type='text'
                  name='category'
                  value={formData.category}
                  onChange={handleFormChange}
                  placeholder='Enter Category'
                  required
                />
              </label>
              <div className='marketingmain-form-buttons'>
                <button className='marketingmain-form-cancel-button' type='button' onClick={togglePopup}>Cancel</button>
                <button className='marketingmain-form-submit-button' type='submit'>{isEditMode ? 'Update' : 'Submit'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

{isDeletePopupOpen && (
    <div className='marketingmain-popup-overlay'>
        <div className='marketingmain-delete-popup'>
            <h2>Are you sure you want to delete?</h2>
            <div className='marketingmain-delete-buttons'>
                <button className='marketingmain-form-cancel-button' type='button' onClick={toggleDeletePopup}>No</button>
                <button className='marketingmain-form-submit-button' type='button' onClick={handleDelete}>Yes</button>
            </div>
        </div>
    </div>
)}

      <table className='marketingmain-table'>
        <thead>
          <tr>
            <th className='marketingmain-th'>S.No</th>
            <th className='marketingmain-th'>Date & Time</th>
            <th className='marketingmain-th'>Marketing Name</th>
            <th className='marketingmain-th'>Category</th>
            <th className='marketingmain-th'>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id} className='marketingmain-tr'>
              <td className='marketingmain-td'>{index + 1}</td>
              <td className='marketingmain-td'>{item.dateTime}</td>
              <Link to = {`/marketing/${item.name}`} className='marketing-link-element'><td className='marketingmain-td marketing-linked-item'>{item.name}</td></Link> 
              <td className='marketingmain-td'>{item.category}</td>
      <td className='marketingmain-td'>
                <button className='marketingmain-edit-button' onClick={() => handleEdit(item.id)}><AiTwotoneEdit /></button>
                <button className='marketingmain-delete-button' onClick={() => toggleDeletePopup(item.id)}><MdDeleteOutline /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Marketing;
