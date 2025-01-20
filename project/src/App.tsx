import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import StartupPage from './components/StartupPage';
import DashboardLayout from './components/DashboardLayout';
import DashboardPage from './pages/DashboardPage';
import ThreatsPage from './pages/ThreatsPage';
import NetworkPage from './pages/NetworkPage';
import BotPage from './pages/BotPage';
import SafePage from './pages/SafePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartupPage />} />
        <Route path="/" element={<DashboardLayout />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="threats" element={<ThreatsPage />} />
          <Route path="network" element={<NetworkPage />} />
          <Route path="bot" element={<BotPage />} />
          <Route path="safe" element={<SafePage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;