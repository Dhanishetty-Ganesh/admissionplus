import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { FaPlus } from 'react-icons/fa';
import { AiTwotoneEdit } from 'react-icons/ai';
import Sidebar from '../Sidebar';
import { MdDeleteOutline } from 'react-icons/md';
import { IoClose } from "react-icons/io5";
import './index.css';

const MarketingData = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [marketingItem, setMarketingItem] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    group: '',
    libraryGroup: '' // Added for the group from library
  });
  const [voiceClips, setVoiceClips] = useState([]);
  const [selectedVoiceClip, setSelectedVoiceClip] = useState(null);
  const [groupOptions, setGroupOptions] = useState([]);
  const [groupEntries, setGroupEntries] = useState([]); // New state for group entries
  const audioRef = useRef(null);

  const fetchMarketingItem = useCallback(async () => {
    try {
      const response = await axios.get("https://admissionplusbackend.vercel.app/marketingdata");
      setMarketingItem(response.data.result);
    } catch (err) {
      console.error(`Error fetching marketing item: ${err}`);
      setMarketingItem([]); // Set marketingItem to empty array on error
    }
  }, []);

  const fetchVoiceClips = useCallback(async () => {
    try {
      const response = await axios.get("https://admissionplusbackend.vercel.app/audioclips");
      setVoiceClips(response.data.result); // Assuming the response directly contains voice clips
    } catch (err) {
      console.error(`Error fetching voice clips: ${err}`);
      setVoiceClips([]); // Set voiceClips to empty array on error
    }
  }, []);

  const fetchGroupOptions = useCallback(async () => {
    try {
      const response = await axios.get('https://admissionplusbackend.vercel.app/studentsdbgroupname');
      setGroupOptions(response.data.result); // Assuming the response directly contains group names
    } catch (err) {
      console.error(`Error fetching group options: ${err}`);
      setGroupOptions([]); // Set groupOptions to empty array on error
    }
  }, []);

  useEffect(() => {
    fetchMarketingItem();
    fetchVoiceClips();
    fetchGroupOptions();
  }, [fetchMarketingItem, fetchVoiceClips, fetchGroupOptions]);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
    setIsEditMode(false);
    setFormData({ name: '', number: '', group: '', libraryGroup: '' });
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
      group: formData.group || formData.libraryGroup // Prioritize group if provided, otherwise use libraryGroup
    };
    try {
      if (isEditMode) {
        await axios.put(`https://admissionplusbackend.vercel.app/marketingdata/${editId}`, newItem);
        const updatedItems = marketingItem.map(item => (item._id === editId ? newItem : item));
        setMarketingItem(updatedItems);
      } else {
        await axios.post('https://admissionplusbackend.vercel.app/marketingdata', newItem);
        setMarketingItem([...marketingItem, newItem]);
      }
    } catch (err) {
      console.error(`Error ${isEditMode ? 'updating' : 'adding'} marketing item: ${err}`);
    }
    setFormData({ name: '', number: '', group: '', libraryGroup: '' });
    setIsPopupOpen(false);
    setIsEditMode(false);
    setEditId(null);
  };

  const handleEdit = (item) => {
    setFormData({
      name: item.name,
      number: item.number,
      group: item.group,
      libraryGroup: '' // Clear library group on edit
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
      const updatedItems = marketingItem.filter(item => item._id !== deleteId);
      setMarketingItem(updatedItems);
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

  const handleVoiceClipSelect = (event) => {
    const selectedClipId = event.target.value;
    const clip = voiceClips.find(clip => clip._id === selectedClipId);
    setSelectedVoiceClip(clip);
  };
  const handleAddGroup = () => {
    const newGroupEntry = {
      name: formData.name,
      number: formData.number,
      group: formData.libraryGroup
    };
  
    // Perform validation or checks as needed before adding
    if (formData.name && formData.number && formData.libraryGroup) {
      setGroupEntries([...groupEntries, newGroupEntry]);
  
      // Clear the form fields after adding
      setFormData({ name: '', number: '', group: '', libraryGroup: '' });
    } else {
      console.error("Please fill in all fields before adding.");
      // Optionally, you can display an error message or handle validation differently
    }
  };
  
  

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
    }
  }, [selectedVoiceClip]);

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
      <div className='voice-message-containers-flex'>
        <div className='voicemessagecontainer'>
          <h1 className='voice-message-heading'>Voice Message</h1>
          <select
            name="voiceLibrary"
            id="voiceLibrary"
            className="voice-library-select"
            onChange={handleVoiceClipSelect}
            value={selectedVoiceClip ? selectedVoiceClip._id : ""}
          >
            <option value="">Select Voice Clip</option>
            {voiceClips.map((clip) => (
              <option key={clip._id} value={clip._id}>
                {clip.voiceName}
              </option>
            ))}
          </select>
        </div>

        {selectedVoiceClip && (
          <div className="audio-player-container">
            <audio controls ref={audioRef}>
              <source src={selectedVoiceClip.audioFileUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
      </div>

      {isPopupOpen && (
        <div className='marketingdata-popup-overlay'>
          <div className='marketingdata-popup-form-container'>
            <div className='close-mark-container'>
              <IoClose className='close-mark' onClick={togglePopup}/>
            </div>
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
                />
              </label>
              <div className='marketingdata-form-buttons'>
                <button className='marketingdata-form-submit-button' type='submit'>Submit</button>
              </div>

              <div className='addagroup-container'>
                <h1 className='add-a-group-heading'>Add a Group</h1>
                <select
                  name="libraryGroup"
                  className="group-library-select"
                  onChange={handleFormChange}
                  value={formData.libraryGroup}
                >
                  <option value="">Choose from Library</option>
                  {groupOptions.map((group) => (
                    <option key={group._id} value={group.name}>
                      {group.name}
                    </option>
                  ))}
                </select>
                <button className='add-group-button' onClick={handleAddGroup}>Add Group</button>
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
            {/* Display added group entries */}
            {groupEntries.map((entry, index) => (
              <tr key={index} className='marketingdata-tr'>
                <td className='marketingdata-td'>{marketingItem.length + index + 1}</td>
                <td className='marketingdata-td'>{entry.name}</td>
                <td className='marketingdata-td'>{entry.number}</td>
                <td className='marketingdata-td'>{entry.group}</td>
                <td className='marketingdata-td'>
                  {/* You can add actions for these entries if needed */}
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
