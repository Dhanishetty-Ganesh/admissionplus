import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'; // Named import
import './index.css';
import { useNavigate } from 'react-router-dom';

const GoogleLoginPage = () => {
  const navigate = useNavigate();

  const onSuccess = (credentialResponse) => {
    const { credential } = credentialResponse;
    const decodedToken = jwtDecode(credential); // Correct usage
    const name = decodedToken.name; // Extracting the name

    navigate("/institutedashboard", { state: { name } });
  };

  const onError = () => {
    console.error('Login Failed');
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
      <div className='google-login-page-main-container'>
        <img src="https://res.cloudinary.com/dvwnbhpcy/image/upload/v1720281990/AdmissionPlus-Logo-removebg-preview_vex6dq.png" alt="company logo" className='admissionplus-logo'/>
        <h1 className='google-login-page-main-heading'>
          Welcome to AdmissionPlus Dashboard
        </h1>
        <div className='google-login-page-button-container'>
          <GoogleLogin
            onSuccess={onSuccess}
            onError={onError}
          />
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginPage;
