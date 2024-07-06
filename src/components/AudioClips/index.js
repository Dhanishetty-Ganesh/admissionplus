import React, { useState } from 'react';
import "./index.css";
import { FaPlus } from "react-icons/fa6";
import { AiTwotoneEdit } from "react-icons/ai";
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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formData.audioFile) {
      const audioElement = document.createElement('audio');
      audioElement.src = URL.createObjectURL(formData.audioFile);
      audioElement.onloadedmetadata = () => {
        const newClip = {
          id: isEditMode ? editId : audioClips.length + 1,
          date: new Date().toLocaleString(),
          voiceName: formData.voiceName,
          voiceId: formData.voiceId,
          audioFile: formData.audioFile,
          duration: audioElement.duration,
          description: formData.description,
        };
        if (isEditMode) {
          setAudioClips(audioClips.map(clip => clip.id === editId ? newClip : clip));
        } else {
          setAudioClips([...audioClips, newClip]);
        }
        setFormData({ voiceName: '', voiceId: '', description: '', audioFile: null });
        setIsPopupOpen(false);
        setIsEditMode(false);
        setEditId(null);
      };
    }
  };

  const handleEdit = (id) => {
    const clip = audioClips.find(clip => clip.id === id);
    if (clip) {
      setFormData({
        voiceName: clip.voiceName,
        voiceId: clip.voiceId,
        description: clip.description,
        audioFile: clip.audioFile,
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
    setAudioClips(audioClips.filter(clip => clip.id !== deleteId));
    setShowDeleteConfirmation(false);
    setDeleteId(null);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
    setDeleteId(null);
  };

  return (
    <div className='audioclips-container'>
      <div className='audioclips-top-container'>
        <h1 className='audioclips-heading'>Audio Clips</h1>
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
              <tr key={clip.id} className='audioclips-tr'>
                <td className='audioclips-td'>{index + 1}</td>
                <td className='audioclips-td'>{clip.date}</td>
                <td className='audioclips-td'>{clip.voiceName}</td>
                <td className='audioclips-td'>{clip.voiceId}</td>
                <td className='audioclips-td audioclips-audio-music'>
                  <audio controls className='audioclips-audio'>
                    <source src={URL.createObjectURL(clip.audioFile)} type={clip.audioFile.type} />
                    Your browser does not support the audio element.
                  </audio>
                </td>
                <td className='audioclips-td'>{clip.duration.toFixed(2)} seconds</td>
                <td className='audioclips-td'>{clip.description}</td>
                <td className='audioclips-td'>
                  <button className='audioclips-edit-button' onClick={() => handleEdit(clip.id)}><AiTwotoneEdit /></button>
                  <button className='audioclips-delete-button' onClick={() => handleDeleteConfirmation(clip.id)}><MdDeleteOutline /></button>
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
