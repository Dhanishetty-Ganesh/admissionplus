import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import GoogleLoginPage from './components/GoogleLoginPage';
import DashboardPage from './components/DashboardPage';
import CreditsPage from './components/CreditsPage';
import PlansRoute from './components/DashboardRoutes/PlansRoute';
import MarketingData from './components/MarketingData';
import Marketing from './components/Marketing';
import AudioClips from './components/AudioClips';
import InstituteRoute from './components/DashboardRoutes/InsituteRoute';
import InstituteContainer from './components/InstituteContainer';
import StudentsDatabaseGroupName from './components/StudentsDatabaseGroupName';
import StudentsDatabase from './components/StudentsDatabase';
import MarketingDashboard from './components/DashboardRoutes/MarketingDashboard';
import SaleDashboard from './components/DashboardRoutes/SaleDashboard';
import HelpDashboard from './components/DashboardRoutes/HelpDashboard';
import SettingsDashboard from './components/DashboardRoutes/SettingsDashboard';
import './App.css';

const AppContent = () => {
  const location = useLocation();

  // Determine if the sidebar should be shown and fixed
  const fixedSidebar = ['/students', '/credits', '/marketing', '/institutecontainer', '/audioclips', '/marketing/:marketingname', '/studentsdatabase/groupname/:groupname'].includes(location.pathname);
  const showSidebar = !['/dashboardpage', '/'].includes(location.pathname);
  const showTopSection = !['/dashboardpage', '/'].includes(location.pathname);

  return (
    <div className={`app-container ${fixedSidebar ? 'fixed-sidebar' : ''}`}>
    
      <div className={`main-content ${showTopSection ? 'with-top-section' : 'no-top-section'} ${fixedSidebar ? 'shrinked' : ''} ${showSidebar ? 'with-sidebar' : ''}`}>
        <Routes>
          <Route exact path="/" element={<GoogleLoginPage />} />
          {/* <Route exact path="/dashboardpage" element={<DashboardPage />} /> */}
          <Route exact path="/credits" element={<CreditsPage />} />
          <Route exact path="/audioclips" element={<AudioClips />} />
          <Route exact path="/marketing" element={<Marketing />} />
          <Route exact path="/students" element={<StudentsDatabase />} />
          <Route exact path="/studentsdatabase/groupname/:groupname" element={<StudentsDatabaseGroupName />} />
          <Route exact path="/marketing/:marketingname" element={<MarketingData />} />
          <Route exact path="/institutecontainer" element={<InstituteContainer />} />
          <Route exact path="/plandashboard" element={<PlansRoute />} />
          <Route exact path="/institutedashboard" element={<InstituteRoute />} />
          <Route exact path="/marketingdashboard" element={<MarketingDashboard />} />
          <Route exact path="/saledashboard" element={<SaleDashboard />} />
          <Route exact path="/helpdashboard" element={<HelpDashboard />} />
          <Route exact path="/settingsdashboard" element={<SettingsDashboard />} />
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
