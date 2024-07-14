import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaPlus } from 'react-icons/fa';
import { AiTwotoneEdit } from 'react-icons/ai';
import Sidebar from '../Sidebar';
import { MdDeleteOutline } from 'react-icons/md';
import './index.css';

const MarketingData = () => {
  useParams();

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [marketingItem, setMarketingItem] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    group: ''
  });

  const fetchMarketingItem = useCallback(async () => {
    try {
      const response = await axios.get("https://admissionplusbackend.vercel.app/marketingdata");
      setMarketingItem(response.data.result);
    } catch (err) {
      console.error(`Error fetching marketing item: ${err}`);
      setMarketingItem([]); // Set marketingItem to empty array on error
    }
  }, []);

  useEffect(() => {
    fetchMarketingItem();
  }, [fetchMarketingItem]);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
    setIsEditMode(false);
    setFormData({ name: '', number: '', group: '' });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const newItem = {
      name: formData.name,
      number: formData.number,
      group: formData.group
    };
    try {
      if (isEditMode) {
        await axios.put(`https://admissionplusbackend.vercel.app/marketingdata/${editId}`, newItem);
      } else {
        await axios.post('https://admissionplusbackend.vercel.app/marketingdata', newItem);
      }
      fetchMarketingItem();
    } catch (err) {
      console.error(`Error ${isEditMode ? 'updating' : 'adding'} marketing item: ${err}`);
    }
    setFormData({ name: '', number: '', group: '' });
    setIsPopupOpen(false);
    setIsEditMode(false);
    setEditId(null);
  };

  const handleEdit = (item) => {
    setFormData({
      name: item.name,
      number: item.number,
      group: item.group
    });
    setIsPopupOpen(true);
    setIsEditMode(true);
    setEditId(item._id);
  };

  const handleDeleteConfirmation = (id) => {
    setDeleteId(id);
    setShowDeleteConfirmation(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://admissionplusbackend.vercel.app/marketingdata/${deleteId}`);
      fetchMarketingItem();
    } catch (err) {
      console.error(`Error deleting marketing item: ${err}`);
    }
    setShowDeleteConfirmation(false);
    setDeleteId(null);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
    setDeleteId(null);
  };

  return (
    <div className='marketingdata-container'>
      <Sidebar />
      <div className='marketingdata-top-container'>
        <h1 className='marketingdata-heading'>Marketing Campaign</h1>
        <div className='marketingdata-heading-container'>
          <p>No. of Entries: {marketingItem.length}</p>
          <button className='marketingdata-add-button' onClick={togglePopup}>
            Add <FaPlus className='marketingdata-plus-logo' />
          </button>
        </div>
      </div>

      {isPopupOpen && (
        <div className='marketingdata-popup-overlay'>
          <div className='marketingdata-popup-form-container'>
            <form className='marketingdata-form' onSubmit={handleFormSubmit}>
              <h2 className='marketingdata-form-heading'>{isEditMode ? 'Edit Data' : 'Add New Data'}</h2>
              <label className='marketingdata-form-label'>
                Name:
                <input
                  className='marketingdata-form-input'
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleFormChange}
                  placeholder='Enter Name'
                  required
                />
              </label>
              <label className='marketingdata-form-label'>
                Number:
                <input
                  className='marketingdata-form-input'
                  type='text'
                  name='number'
                  value={formData.number}
                  onChange={handleFormChange}
                  placeholder='Enter Number'
                  required
                />
              </label>
              <label className='marketingdata-form-label'>
                Group:
                <input
                  className='marketingdata-form-input'
                  type='text'
                  name='group'
                  value={formData.group}
                  onChange={handleFormChange}
                  placeholder='Enter Group'
                  required
                />
              </label>
              <div className='marketingdata-form-buttons'>
                <button className='marketingdata-form-cancel-button' type='button' onClick={togglePopup}>Cancel</button>
                <button className='marketingdata-form-submit-button' type='submit'>Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDeleteConfirmation && (
        <div className='marketingdata-delete-popup-overlay'>
          <div className='marketingdata-delete-popup'>
            <p>Are you sure you want to delete this entry?</p>
            <div className='marketingdata-delete-buttons'>
              <button className='marketingdata-delete-no' onClick={handleCancelDelete}>No</button>
              <button className='marketingdata-delete-yes' onClick={handleDelete}>Yes</button>
            </div>
          </div>
        </div>
      )}

      {marketingItem.length > 0 && (
        <table className='marketingdata-table'>
          <thead>
            <tr>
              <th className='marketingdata-th'>S.No</th>
              <th className='marketingdata-th'>Name</th>
              <th className='marketingdata-th'>Number</th>
              <th className='marketingdata-th'>Group</th>
              <th className='marketingdata-th'>Action</th>
            </tr>
          </thead>
          <tbody>
            {marketingItem.map((item, index) => (
              <tr key={item._id} className='marketingdata-tr'>
                <td className='marketingdata-td'>{index + 1}</td>
                <td className='marketingdata-td'>{item.name}</td>
                <td className='marketingdata-td'>{item.number}</td>
                <td className='marketingdata-td'>{item.group}</td>
                <td className='marketingdata-td'>
                  <button className='marketingdata-edit-button' onClick={() => handleEdit(item)}><AiTwotoneEdit /></button>
                  <button className='marketingdata-delete-button' onClick={() => handleDeleteConfirmation(item._id)}><MdDeleteOutline /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MarketingData;
