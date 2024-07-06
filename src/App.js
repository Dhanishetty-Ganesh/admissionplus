import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import GoogleLoginPage from './components/GoogleLoginPage';
import DashboardPage from './components/DashboardPage';
import CreditsPage from './components/CreditsPage';
import MarketingData from './components/MarketingData'; // Import MarketingData component
import Marketing from './components/Marketing';
import AudioClips from './components/AudioClips';
import InstituteContainer from './components/InstituteContainer';
import StudentsDatabaseGroupName from './components/StudentsDatabaseGroupName';
import StudentsDatabase from './components/StudentsDatabase';
import Sidebar from './components/Sidebar';
import './App.css';

const AppContent = () => {
  const location = useLocation();

  // Determine if the sidebar should be shown and fixed
  const fixedSidebar = ['/students', '/credits', '/marketing', '/institutecontainer', '/audioclips', '/marketing/:marketingname','studentsdatabase/groupname/:groupname'].includes(location.pathname);
  const showSidebar = !['/dashboardpage', '/'].includes(location.pathname);
  const showTopSection = !['/dashboardpage', '/'].includes(location.pathname);

  return (
    <div className={`app-container ${fixedSidebar ? 'fixed-sidebar' : ''}`}>
      {showTopSection && (
        <div className="institute-top-section">
          <h1 className='institute-top-right-text'>Pragati Institute of Computer</h1>
          <h1 className='institute-top-left-text'>Help</h1>
        </div>
      )}
      {showSidebar && <Sidebar />}
      <div className={`main-content ${showTopSection ? 'with-top-section' : 'no-top-section'} ${fixedSidebar ? 'shrinked' : ''} ${showSidebar ? 'with-sidebar' : ''}`}>
        <Routes>
          <Route path="/" element={<GoogleLoginPage />} />
          <Route path="/dashboardpage" element={<DashboardPage />} />
          <Route path="/credits" element={<CreditsPage />} />
          <Route path="/audioclips" element={<AudioClips />} />
          <Route path="/marketing" element={<Marketing />} />
          <Route path="/students" element={<StudentsDatabase />} />
          <Route path="/studentsdatabase/groupname/:groupname" element={<StudentsDatabaseGroupName />} />
          <Route path="/marketing/:marketingname" element={<MarketingData />} /> {/* Ensure MarketingData route */}
          <Route path="/institutecontainer" element={<InstituteContainer />} />
        </Routes>
      </div>
    </div>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
