import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import GoogleLoginPage from './components/GoogleLoginPage';
import DashboardPage from './components/DashboardPage';
import CreditsPage from './components/CreditsPage';
import MarketingData from './components/MarketingData';
import Marketing from './components/Marketing';
import AudioClips from './components/AudioClips';
import InstituteRoute from './components/DashboardRoutes/InsituteRoute';
import InstituteContainer from './components/InstituteContainer';
import StudentsDatabaseGroupName from './components/StudentsDatabaseGroupName';
import StudentsDatabase from './components/StudentsDatabase';
import Sidebar from './components/Sidebar';
import './App.css';

const AppContent = () => {
  const location = useLocation();

  // Determine if the sidebar should be shown and fixed
  const fixedSidebar = ['/students', '/credits', '/marketing', '/institutecontainer', '/audioclips', '/marketing/:marketingname', '/studentsdatabase/groupname/:groupname'].includes(location.pathname);
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
          <Route exact path="/" element={<GoogleLoginPage />} />
          <Route exact path="/dashboardpage" element={<DashboardPage />} />
          <Route exact path="/credits" element={<CreditsPage />} />
          <Route exact path="/audioclips" element={<AudioClips />} />
          <Route exact path="/marketing" element={<Marketing />} />
          <Route exact path="/students" element={<StudentsDatabase />} />
          <Route exact path="/studentsdatabase/groupname/:groupname" element={<StudentsDatabaseGroupName />} />
          <Route exact path="/marketing/:marketingname" element={<MarketingData />} />
          <Route exact path="/institutecontainer" element={<InstituteContainer />} />
          <Route exact path="/random" element={<InstituteRoute />} />
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
