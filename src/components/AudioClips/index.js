import React, { useState, useEffect } from 'react';
import "./index.css";
import { FaPlus } from "react-icons/fa6";
import { AiTwotoneEdit } from "react-icons/ai";
import Sidebar from '../Sidebar';
import { MdDeleteOutline } from "react-icons/md";

const AudioClips = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [audioClips, setAudioClips] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [formData, setFormData] = useState({
    voiceName: '',
    voiceId: '',
    description: '',
    audioFile: null,
  });

  // Fetch audio clips from backend on component mount
  useEffect(() => {
    fetchAudioClips();
  }, []);

  const fetchAudioClips = async () => {
    try {
      const response = await fetch('http://localhost:3001/audioclips'); // Replace with your backend URL
      if (!response.ok) {
        throw new Error('Failed to fetch audio clips');
      }
      const data = await response.json();
      setAudioClips(data.result);
    } catch (error) {
      console.error('Error fetching audio clips:', error);
    }
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
    setIsEditMode(false);
    setFormData({ voiceName: '', voiceId: '', description: '', audioFile: null });
  };

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('voiceName', formData.voiceName);
    formDataToSend.append('voiceId', formData.voiceId);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('audioFile', formData.audioFile);

    try {
      let response;
      if (isEditMode) {
        response = await fetch(`http://localhost:3001/audioclips/${editId}`, {
          method: 'PUT',
          body: formDataToSend,
        });
      } else {
        response = await fetch('http://localhost:3001/audioclips', {
          method: 'POST',
          body: formDataToSend,
        });
      }
      if (!response.ok) {
        throw new Error('Failed to submit audio clip');
      }
      await response.json();
      fetchAudioClips(); // Refresh audio clips after submission
      setFormData({ voiceName: '', voiceId: '', description: '', audioFile: null });
      setIsPopupOpen(false);
      setIsEditMode(false);
      setEditId(null);
    } catch (error) {
      console.error('Error submitting audio clip:', error);
    }
  };

  const handleEdit = (id) => {
    const clip = audioClips.find(clip => clip._id === id);
    if (clip) {
      setFormData({
        voiceName: clip.voiceName,
        voiceId: clip.voiceId,
        description: clip.description,
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

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3001/audioclips/${deleteId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete audio clip');
      }
      fetchAudioClips(); // Refresh audio clips after deletion
      setShowDeleteConfirmation(false);
      setDeleteId(null);
    } catch (error) {
      console.error('Error deleting audio clip:', error);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
    setDeleteId(null);
  };

  return (
    <div className='audioclips-container'>
      <Sidebar />
      <div className='audioclips-top-container'>
        <h1 className='audioclips-heading'>Voice(IVR) &gt; AudioClips</h1>
        <div className='audioclips-heading-container'>
          <button className='audioclips-add-button' onClick={togglePopup}>
            Add <FaPlus className='audioclips-plus-logo' />
          </button>
        </div>
      </div>

      {isPopupOpen && (
        <div className='audioclips-popup-overlay'>
          <div className='audioclips-popup-form-container'>
            <form className='audioclips-form' onSubmit={handleFormSubmit}>
              <h2 className='audioclips-form-heading'>{isEditMode ? 'Edit Audio Clip' : 'Add New Audio Clip'}</h2>
              <label className='audioclips-form-label'>
                Voice Name:
                <input
                  className='audioclips-form-input'
                  type='text'
                  name='voiceName'
                  value={formData.voiceName}
                  onChange={handleFormChange}
                  placeholder='Enter Voice Name'
                  required
                />
              </label>
              <label className='audioclips-form-label'>
                Voice ID:
                <input
                  className='audioclips-form-input'
                  type='text'
                  name='voiceId'
                  value={formData.voiceId}
                  onChange={handleFormChange}
                  placeholder='Enter Voice ID'
                  required
                />
              </label>
              <label className='audioclips-form-label'>
                Upload Audio:
                <input
                  className='audioclips-form-input'
                  type='file'
                  name='audioFile'
                  accept='audio/*'
                  onChange={handleFormChange}
                  required
                />
              </label>
              <label className='audioclips-form-label'>
                Description:
                <textarea
                  className='audioclips-form-textarea'
                  name='description'
                  value={formData.description}
                  onChange={handleFormChange}
                  placeholder='Enter Description'
                  required
                ></textarea>
              </label>
              <div className='audioclips-form-buttons'>
                <button className='audioclips-form-cancel-button' type='button' onClick={togglePopup}>Cancel</button>
                <button className='audioclips-form-submit-button' type='submit'>Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDeleteConfirmation && (
        <div className='audioclips-delete-popup-overlay'>
          <div className='audioclips-delete-popup'>
            <p>Are you sure you want to delete it?</p>
            <div className='audioclips-delete-buttons'>
              <button className='audioclips-delete-no' onClick={handleCancelDelete}>No</button>
              <button className='audioclips-delete-yes' onClick={handleDelete}>Yes</button>
            </div>
          </div>
        </div>
      )}

      {audioClips.length > 0 && (
        <table className='audioclips-table'>
          <thead>
            <tr>
              <th className='audioclips-th'>S.No</th>
              <th className='audioclips-th'>Updated Date</th>
              <th className='audioclips-th'>Voice Name</th>
              <th className='audioclips-th'>Voice ID</th>
              <th className='audioclips-th'>Uploaded Voice</th>
              <th className='audioclips-th'>Duration</th>
              <th className='audioclips-th'>Description</th>
              <th className='audioclips-th'>Action</th>
            </tr>
          </thead>
          <tbody>
            {audioClips.map((clip, index) => (
              <tr key={clip._id} className='audioclips-tr'>
                <td className='audioclips-td'>{index + 1}</td>
                <td className='audioclips-td'>{clip.date}</td>
                <td className='audioclips-td'>{clip.voiceName}</td>
                <td className='audioclips-td'>{clip.voiceId}</td>
                <td className='audioclips-td audioclips-audio-music'>
                  <audio controls className='audioclips-audio'>
                    <source src={`http://localhost:3001/${clip.audioFile}`} type={clip.audioFile.type} />
                    Your browser does not support the audio element.
                  </audio>
                </td>
                <td className='audioclips-td'>{clip.duration.toFixed(2)} seconds</td>
                <td className='audioclips-td'>{clip.description}</td>
                <td className='audioclips-td'>
                  <button className='audioclips-edit-button' onClick={() => handleEdit(clip._id)}><AiTwotoneEdit /></button>
                  <button className='audioclips-delete-button' onClick={() => handleDeleteConfirmation(clip._id)}><MdDeleteOutline /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AudioClips;
