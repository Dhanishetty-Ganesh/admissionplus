/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdDeleteOutline } from "react-icons/md";
import Sidebar from '../Sidebar';
import "./index.css";

const RegistrationStudents = () => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [formSubmissions, setFormSubmissions] = useState([]);
  const [deleteSubmissionId, setDeleteSubmissionId] = useState(null);

  useEffect(() => {
    fetchFormSubmissions();
  }, []);

  const fetchFormSubmissions = async () => {
    try {
      const response = await axios.get('https://admissionplusbackend.vercel.app/form');
      setFormSubmissions(response.data.result);
    } catch (error) {
      console.error('Error fetching form submissions:', error);
    }
  };

  const handleDelete = (id) => {
    setDeleteSubmissionId(id);
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`https://admissionplusbackend.vercel.app/form/${deleteSubmissionId}`);
      setFormSubmissions(formSubmissions.filter(submission => submission._id !== deleteSubmissionId));
      setShowDeleteConfirmation(false);
    } catch (error) {
      console.error('Error deleting submission:', error);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  return (
    <div className='database-content'>
      <Sidebar/>
      <div className='students-top-content'>
        <h1 className='students-heading'>Students &gt; Registration</h1>
        </div>
      <div className='students-group-details'>
        {formSubmissions.length > 0 ? (
          <table className="group-table">
            <thead>
              <tr>
                <th className="group-header">Date</th>
                <th className="group-header">Name</th>
                <th className="group-header">Mobile</th>
                <th className="group-header">Email</th>
                <th className="group-header">Course</th>
                <th className="group-header">Action</th>
              </tr>
            </thead>
            <tbody>
              {formSubmissions.map((submission, index) => (
                <tr key={submission._id} className="group-row">
                  <td className="group-cell">{new Date(submission.date).toLocaleDateString()}</td>
                  <td className="group-cell">{submission.name}</td>
                  <td className="group-cell">{submission.mobile}</td>
                  <td className="group-cell">{submission.email}</td>
                  <td className="group-cell">{submission.course}</td>
                  <td className="group-cell">
                    <MdDeleteOutline
                      className="group-icon group-icon-delete"
                      onClick={() => handleDelete(submission._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className='registrations-text'>No registrations have been added yet</p>
        )}

        {showDeleteConfirmation && (
          <div className="delete-confirmation-popup">
            <p className="delete-confirmation-text">Are you sure you want to delete this submission?</p>
            <div className="delete-confirmation-buttons">
              <button className="delete-confirmation-button delete-confirmation-button-no" onClick={handleCancelDelete}>No</button>
              <button className="delete-confirmation-button" onClick={handleConfirmDelete}>Yes</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationStudents;
