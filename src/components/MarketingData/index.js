import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa6';
import { AiTwotoneEdit } from 'react-icons/ai';
import Sidebar from '../Sidebar';
import { MdDeleteOutline } from 'react-icons/md';
import './index.css'; // Ensure you have corresponding CSS

const MarketingData = () => {
  const { marketingname } = useParams();

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [marketingItems, setMarketingItems] = useState([
    { id: 1, name: 'Ramesh', number: '83958593', group: 'Group A' },
    { id: 2, name: 'Siddharth', number: '987439500', group: 'Group B' },
  ]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    group: '',
  });
  const [selectedIds, setSelectedIds] = useState([]);

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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      id: isEditMode ? editId : marketingItems.length + 1,
      name: formData.name,
      number: formData.number,
      group: formData.group,
    };
    if (isEditMode) {
      setMarketingItems(marketingItems.map(item => item.id === editId ? newItem : item));
    } else {
      setMarketingItems([...marketingItems, newItem]);
    }
    setFormData({ name: '', number: '', group: '' });
    setIsPopupOpen(false);
    setIsEditMode(false);
    setEditId(null);
  };

  const handleEdit = (id) => {
    const item = marketingItems.find(item => item.id === id);
    if (item) {
      setFormData({
        name: item.name,
        number: item.number,
        group: item.group,
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
    setMarketingItems(marketingItems.filter(item => item.id !== deleteId));
    setShowDeleteConfirmation(false);
    setDeleteId(null);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
    setDeleteId(null);
  };

  const handleCheckboxChange = (id) => {
    setSelectedIds(prevSelected => 
      prevSelected.includes(id) 
        ? prevSelected.filter(selectedId => selectedId !== id)
        : [...prevSelected, id]
    );
  };

  return (
    <div className='marketingdata-container'>
      <Sidebar/>
      <div className='marketingdata-top-container'>
        <h1 className='marketingdata-heading'>{marketingname}</h1>
        <div className='marketingdata-heading-container'>
          <p>No.of Students : {marketingItems.length}</p>
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
            <p>Are you sure you want to delete it?</p>
            <div className='marketingdata-delete-buttons'>
              <button className='marketingdata-delete-no' onClick={handleCancelDelete}>No</button>
              <button className='marketingdata-delete-yes' onClick={handleDelete}>Yes</button>
            </div>
          </div>
        </div>
      )}

      {marketingItems.length > 0 && (
        <table className='marketingdata-table'>
          <thead>
            <tr>
              <th className='marketingdata-th'>S.No</th>
              <th className='marketingdata-th'>Name</th>
              <th className='marketingdata-th'>Number</th>
              <th className='marketingdata-th'>Group</th>
              <th className='marketingdata-th'>Select</th>
              <th className='marketingdata-th'>Action</th>
            </tr>
          </thead>
          <tbody>
            {marketingItems.map((item, index) => (
              <tr key={item.id} className='marketingdata-tr'>
                <td className='marketingdata-td'>{index + 1}</td>
                <td className='marketingdata-td'>{item.name}</td>
                <td className='marketingdata-td'>{item.number}</td>
                <td className='marketingdata-td'>{item.group}</td>
                <td className='marketingdata-td'>
                  <input 
                    type='checkbox' 
                    checked={selectedIds.includes(item.id)}
                    onChange={() => handleCheckboxChange(item.id)}
                  />
                </td>
                <td className='marketingdata-td'>
                  <button className='marketingdata-edit-button' onClick={() => handleEdit(item.id)}><AiTwotoneEdit /></button>
                  <button className='marketingdata-delete-button' onClick={() => handleDeleteConfirmation(item.id)}><MdDeleteOutline /></button>
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
