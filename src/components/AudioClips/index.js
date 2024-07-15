import React, { useState, useEffect } from 'react';
import './index.css';
import { FaPlus } from 'react-icons/fa';
import { AiTwotoneEdit } from 'react-icons/ai';
import { MdDeleteOutline } from 'react-icons/md';
import axios from 'axios';
import Sidebar from '../Sidebar';

const AudioClips = () => {
  const [audioClips, setAudioClips] = useState([]);
  const [formData, setFormData] = useState({
    voiceName: '',
    voiceId: '',
    description: '',
    audioFile: null,
    audioFileUrl: null,
  });
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchAudioClips();
  }, []);

  const fetchAudioClips = async () => {
    try {
      const response = await axios.get('https://admissionplusbackend.vercel.app/audioclips');
      console.log('Fetched audio clips:', response.data.result);
      setAudioClips(response.data.result);
    } catch (error) {
      console.error('Error fetching audio clips:', error);
    }
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
    setIsEditMode(false);
    setFormData({ voiceName: '', voiceId: '', description: '', audioFile: null, audioFileUrl: null });
  };

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'audioFile') {
      handleFileChange(e); // Handle audio file separately
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const getUrl = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('https://admissionplusbackend.vercel.app/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Uploaded file URL:', response.data.data.Location);
      return response.data.data.Location;
    } catch (error) {
      alert("File Upload Failed");
      console.error('Error uploading file:', error.response ? error.response.data : error.message);
      return null;
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const audioFileUrl = await getUrl(file);
    console.log('Audio file URL:', audioFileUrl);
    setFormData((prev) => ({
      ...prev,
      audioFile: file,
      audioFileUrl: audioFileUrl
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let audioFileUrl = formData.audioFileUrl;

    if (formData.audioFile instanceof File && !audioFileUrl) {
      audioFileUrl = await getUrl(formData.audioFile);
    }

    const formDataToSend = {
      voiceName: formData.voiceName,
      voiceId: formData.voiceId,
      description: formData.description,
      audioFileUrl: audioFileUrl,
    };

    try {
      if (isEditMode) {
        await updateAudioClip(editId, formDataToSend);
      } else {
        await addAudioClip(formDataToSend);
      }
    } catch (error) {
      console.error('Error submitting audio clip:', error);
    }
  };

  const updateAudioClip = async (editId, formDataToSend) => {
    try {
      const response = await axios.put(`https://admissionplusbackend.vercel.app/audioclips/${editId}`, formDataToSend);
      console.log('Updated audio clip:', response.data);
      fetchAudioClips(); // Refresh the list after successful update
      togglePopup(); // Close the popup after successful update
    } catch (error) {
      console.error('Error updating audio clip:', error);
    }
  };

  const addAudioClip = async (formDataToSend) => {
    try {
      const response = await axios.post('https://admissionplusbackend.vercel.app/audioclips', formDataToSend);
      console.log('Added audio clip:', response.data);
      fetchAudioClips(); // Refresh the list after successful addition
      togglePopup(); // Close the popup after successful addition
    } catch (error) {
      console.error('Error adding audio clip:', error);
    }
  };

  const handleEdit = (id) => {
    const clip = audioClips.find((clip) => clip._id === id);
    if (clip) {
      setFormData({
        voiceName: clip.voiceName,
        voiceId: clip.voiceId,
        description: clip.description,
        audioFile: null,
        audioFileUrl: clip.audioFileUrl,
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
      await axios.delete(`https://admissionplusbackend.vercel.app/audioclips/${deleteId}`);
      fetchAudioClips(); // Refresh the list after successful deletion
      setShowDeleteConfirmation(false); // Close the delete confirmation dialog
    } catch (error) {
      console.error('Error deleting audio clip:', error);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  return (
    <div className="audioclips-container">
      <Sidebar />
      <div className="audioclips-top-container">
        <h1 className="audioclips-heading">Voice(IVR) &gt; AudioClips</h1>
        <div className="audioclips-heading-container">
          <button className="audioclips-add-button" onClick={togglePopup}>
            Add <FaPlus className="audioclips-plus-logo" />
          </button>
        </div>
      </div>

      {isPopupOpen && (
        <div className="audioclips-popup-overlay">
          <div className="audioclips-popup-form-container">
            <form className="audioclips-form" onSubmit={handleFormSubmit}>
              <h2 className="audioclips-form-heading">{isEditMode ? 'Edit Audio Clip' : 'Add New Audio Clip'}</h2>
              <label className="audioclips-form-label">
                Voice Name:
                <input
                  className="audioclips-form-input"
                  type="text"
                  name="voiceName"
                  value={formData.voiceName}
                  onChange={handleFormChange}
                  placeholder="Enter Voice Name"
                  required
                />
              </label>
              <label className="audioclips-form-label">
                Voice ID:
                <input
                  className="audioclips-form-input"
                  type="text"
                  name="voiceId"
                  value={formData.voiceId}
                  onChange={handleFormChange}
                  placeholder="Enter Voice ID"
                  required
                />
              </label>
              <label className="audioclips-form-label">
                Upload Audio:
                <input
                  className="audioclips-form-input"
                  type="file"
                  name="audioFile"
                  accept="audio/*"
                  onChange={handleFormChange}
                  required={!isEditMode}
                />
              </label>
              <label className="audioclips-form-label">
                Description:
                <textarea
                  className="audioclips-form-textarea"
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  placeholder="Enter Description"
                  required
                ></textarea>
              </label>
              <div className="audioclips-form-buttons">
                <button className="audioclips-form-cancel-button" type="button" onClick={togglePopup}>
                  Cancel
                </button>
                <button className="audioclips-form-submit-button" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDeleteConfirmation && (
        <div className="audioclips-delete-popup-overlay">
          <div className="audioclips-delete-popup">
            <p>Are you sure you want to delete it?</p>
            <div className="audioclips-delete-buttons">
              <button className="audioclips-delete-no" onClick={handleCancelDelete}>
                No
              </button>
              <button className="audioclips-delete-yes" onClick={handleDelete}>
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      {audioClips.length > 0 && (
        <table className="audioclips-table">
          <thead>
            <tr className="audioclips-th-tr">
              <th className="audioclips-th">Sr No.</th>
              <th className="audioclips-th">Voice Name</th>
              <th className="audioclips-th">Voice ID</th>
              <th className="audioclips-th">Uploaded Voice</th>
              <th className="audioclips-th">Description</th>
              <th className="audioclips-th">Action</th>
            </tr>
          </thead>
          <tbody>
            {audioClips.map((clip, index) => (
              <tr key={clip._id} className="audioclips-tr">
                <td className="audioclips-td">{index + 1}</td>
                <td className="audioclips-td">{clip.voiceName}</td>
                <td className="audioclips-td">{clip.voiceId}</td>
                <td className="audioclips-td audioclips-audio-music">
                  <audio controls className="audioclips-audio">
                    <source src={clip.audioFileUrl} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </td>
                <td className="audioclips-td">{clip.description}</td>
                <td className="audioclips-td">
                  <div className="audioclips-actions">
                    <button
                      className="audioclips-edit-button"
                      onClick={() => handleEdit(clip._id)}
                    >
                      <AiTwotoneEdit />
                    </button>
                    <button
                      className="audioclips-action-button audioclips-delete-button"
                      onClick={() => handleDeleteConfirmation(clip._id)}
                    >
                      <MdDeleteOutline />
                    </button>
                  </div>
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
