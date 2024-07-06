import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import './index.css';
import { useNavigate } from 'react-router-dom';


const GoogleLoginPage = () => {
  const navigate = useNavigate()
  const onSuccess = (credentialResponse) => {
    navigate("/dashboardpage")
  };

  const onError = () => {
    console.error('Login Failed');
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
      <div className='google-login-page-main-container'>
        <h1 className='google-login-page-main-heading'>
          Welcome to AdmissionPlus Dashboard
        </h1>
        <GoogleLogin
          onSuccess={onSuccess}
          onError={onError}
          className='google-login-page-button'
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginPage;
