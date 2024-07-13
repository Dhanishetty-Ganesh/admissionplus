import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import GoogleLoginPage from './components/GoogleLoginPage';
import DashboardPage from './components/DashboardPage';
import CreditsPage from './components/CreditsPage';
import PlansRoute from './components/DashboardRoutes/PlansRoute';
import MarketingData from './components/MarketingData';
import Marketing from './components/Marketing';
import AudioClips from './components/AudioClips';
import StudentsDatabaseGroupName from './components/StudentsDatabaseGroupName';
import StudentsDatabase from './components/StudentsDatabase';
import InstituteContainer from './components/InstituteContainer';
import MarketingDashboard from './components/DashboardRoutes/MarketingDashboard';
import SaleDashboard from './components/DashboardRoutes/SaleDashboard';
import HelpDashboard from './components/DashboardRoutes/HelpDashboard';
import SettingsDashboard from './components/DashboardRoutes/SettingsDashboard';
import CoursesInstitute from './components/InstitutesRoutes/CoursesInstitute';
import RegistrationStudents from './components/RegistrationStudents';
import InstituteRoute from './components/DashboardRoutes/InstituteRoute'; // Corrected path
import InfoInstitute from './components/InstitutesRoutes/InfoInstitute';
import QRCodeForm from './components/InstitutesRoutes/QRCodeForm';
import './App.css';

const AppContent = () => {
  const location = useLocation();

  // Determine if the sidebar should be shown and fixed
  const fixedSidebarPaths = [
    '/students', '/credits', '/marketing', '/institutecontainer', 
    '/audioclips', '/marketing/:marketingname', '/studentsdatabase/groupname/:groupname'
  ];
  const fixedSidebar = fixedSidebarPaths.some(path => location.pathname.includes(path));
  const showSidebar = !['/dashboardpage', '/'].includes(location.pathname);
  const showTopSection = !['/dashboardpage', '/'].includes(location.pathname);

  return (
    <div className={`app-container ${fixedSidebar ? 'fixed-sidebar' : ''}`}>
      <div className={`main-content ${showTopSection ? 'with-top-section' : 'no-top-section'} ${fixedSidebar ? 'shrinked' : ''} ${showSidebar ? 'with-sidebar' : ''}`}>
        <Routes>
          <Route path="/" element={<GoogleLoginPage />} />
          <Route path="/dashboardpage" element={<DashboardPage />} />
          <Route path="/credits/:id" element={<CreditsPage />} />
          <Route path="/audioclips/:id" element={<AudioClips />} />
          <Route path="/marketing/:id" element={<Marketing />} />
          <Route path="/students/:id" element={<StudentsDatabase />} />
          <Route path="/studentsdatabase/groupname/:groupname/:id" element={<StudentsDatabaseGroupName />} />
          <Route path="/marketing/:marketingname/:id" element={<MarketingData />} />
          <Route path="/institutecontainer/:id" element={<InstituteContainer />} />
          <Route path="/plandashboard" element={<PlansRoute />} />
          <Route path="/institutedashboard" element={<InstituteRoute />} />
          <Route path="/marketingdashboard" element={<MarketingDashboard />} />
          <Route path="/saledashboard" element={<SaleDashboard />} />
          <Route path="/helpdashboard" element={<HelpDashboard />} />
          <Route path="/settingsdashboard" element={<SettingsDashboard />} />
          <Route path="/infoinstitute/:id" element={<InfoInstitute />} />
          <Route path="/coursesinstitute/:id" element={<CoursesInstitute />} />
          <Route path="/registrationstudents/:id" element={<RegistrationStudents />} />
          <Route path="/form" element={<QRCodeForm />} />
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
