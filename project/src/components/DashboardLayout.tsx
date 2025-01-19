import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const DashboardLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-black">
      <Navbar />
      <main className="flex-1 ml-20 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;