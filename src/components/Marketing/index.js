import React, { useState, useEffect } from 'react';
import './index.css';
import { FaPlus } from 'react-icons/fa';
import { AiTwotoneEdit } from 'react-icons/ai';
import { MdDeleteOutline } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../Sidebar';

const Marketing = () => {
  const [data, setData] = useState([]);
  const { id } = useParams(); // Assuming you have an ID parameter from the route
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);
  const [formData, setFormData] = useState({ name: '', category: '' });
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [headersVisible, setHeadersVisible] = useState(false); // State for showing headers
  const [isLoading, setIsLoading] = useState(true); // State for loading indicator

  console.log(id);

  useEffect(() => {
    fetchMarketingCampaigns();
  }, []);

  const fetchMarketingCampaigns = async () => {
    try {
      const response = await axios.get(`https://admissionplusbackend.vercel.app/institutes/${id}/marketing`);
      setData(response.data);
      setIsLoading(false); // Set isLoading to false after data is fetched
      setHeadersVisible(true); // Show headers after data is fetched
    } catch (error) {
      console.error('Error fetching marketing campaigns:', error.message);
    }
  };

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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const currentDate = new Date(); // Get current date and time
      const formattedDate = currentDate.toISOString(); // Convert to ISO string format

      const dataToSubmit = {
        ...formData,
        dateTime: formattedDate, // Include the current date and time
      };

      let response;
      if (isEditMode) {
        response = await axios.put(`https://admissionplusbackend.vercel.app/institutes/${id}/marketing/${currentEditId}`, dataToSubmit);
        const updatedData = data.map(item => item._id === currentEditId ? { ...item, name: dataToSubmit.name, category: dataToSubmit.category } : item);
        setData(updatedData);
      } else {
        response = await axios.post(`https://admissionplusbackend.vercel.app/institutes/${id}/marketing`, dataToSubmit);
        setData([...data, response.data.newData]);
      }

      togglePopup();
    } catch (error) {
      console.error('Error submitting form:', error.message);
    }
  };

  const handleEdit = (id) => {
    const entryToEdit = data.find(item => item._id === id);
    setFormData({ name: entryToEdit.name, category: entryToEdit.category });
    setIsEditMode(true);
    setCurrentEditId(id);
    setIsPopupOpen(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://admissionplusbackend.vercel.app/institutes/${id}/marketing/${deleteId}`);
      setData(data.filter(item => item._id !== deleteId));
      toggleDeletePopup();
    } catch (error) {
      console.error('Error deleting campaign:', error.message);
    }
  };

  return (
    <div className='marketing-main-content'>
      <Sidebar />
      <div className='marketing-main-top-container'>
        {headersVisible && (
          <h1 className='marketing-main-heading'>Voice(IVR) &gt; Marketing</h1>
        )}
        <div className='marketing-main-heading-container'>
          <button className='marketing-main-add-button' onClick={togglePopup}>
            Add <FaPlus className='marketing-main-plus-logo' />
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className='loading-spinner-container'>
          <div className='loading-spinner'></div>
        </div>
      ) : (
        <>
          {isPopupOpen && (
            <div className='marketing-main-popup-overlay'>
              <div className='marketing-main-popup-form-container'>
                <form className='marketing-main-form' onSubmit={handleFormSubmit}>
                  <h2 className='marketing-main-form-heading'>{isEditMode ? 'Edit Marketing' : 'Add New Marketing'}</h2>
                  <label className='marketing-main-form-label'>
                    Marketing Name:
                    <input
                      className='marketing-main-form-input'
                      type='text'
                      name='name'
                      value={formData.name}
                      onChange={handleFormChange}
                      placeholder='Enter Marketing Name'
                      required
                    />
                  </label>
                  <label className='marketing-main-form-label'>
                    Category:
                    <input
                      className='marketing-main-form-input'
                      type='text'
                      name='category'
                      value={formData.category}
                      onChange={handleFormChange}
                      placeholder='Enter Category'
                      required
                    />
                  </label>
                  <div className='marketing-main-form-buttons'>
                    <button className='marketing-main-form-cancel-button' type='button' onClick={togglePopup}>Cancel</button>
                    <button className='marketing-main-form-submit-button' type='submit'>{isEditMode ? 'Update' : 'Submit'}</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {isDeletePopupOpen && (
            <div className='marketing-main-popup-overlay'>
              <div className='marketing-main-delete-popup'>
                <h2>Are you sure you want to delete?</h2>
                <div className='marketing-main-delete-buttons'>
                  <button className='marketing-main-form-cancel-button' type='button' onClick={toggleDeletePopup}>No</button>
                  <button className='marketing-main-form-submit-button' type='button' onClick={handleDelete}>Yes</button>
                </div>
              </div>
            </div>
          )}

          {headersVisible && (
            <table className='marketing-main-table'>
              <thead>
                <tr>
                  <th className='marketing-main-th'>S.No</th>
                  <th className='marketing-main-th'>Date & Time</th>
                  <th className='marketing-main-th'>Marketing Name</th>
                  <th className='marketing-main-th'>Category</th>
                  <th className='marketing-main-th'>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={item._id} className='marketing-main-tr'>
                    <td className='marketing-main-td'>{index + 1}</td>
                    <td className='marketing-main-td'>{new Date(item.dateTime).toLocaleString()}</td>
                    <td className='marketing-main-td marketing-linked-item'>
                      <Link to={`/marketing/${item._id}/${encodeURIComponent(item.name)}`} className='marketing-link-element'>{item.name}</Link>
                    </td>
                    <td className='marketing-main-td'>{item.category}</td>
                    <td className='marketing-main-td'>
                      <button className='marketing-main-edit-button' onClick={() => handleEdit(item._id)}><AiTwotoneEdit /></button>
                      <button className='marketing-main-delete-button' onClick={() => toggleDeletePopup(item._id)}><MdDeleteOutline /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
}

export default Marketing;
