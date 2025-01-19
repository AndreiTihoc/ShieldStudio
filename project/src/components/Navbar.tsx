import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Shield, AlertTriangle, Wifi, Bot } from 'lucide-react';

const Navbar: React.FC = () => {
  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Overview' },
    { path: '/threats', icon: AlertTriangle, label: 'Recommendations' },
    { path: '/network', icon: Wifi, label: 'Network' },
    { path: '/bot', icon: Bot, label: 'ChatBot' }, // Added Bot link
  ];

  return (
    <nav className="fixed left-0 top-0 h-screen w-20 bg-black border-r border-white/10 flex flex-col items-center py-8">
      <Shield className="w-12 h-12 text-white mb-12" />
      <div className="flex flex-col gap-8">
        {navItems.map(({ path, icon: Icon, label }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `relative group p-3 rounded-xl transition-all duration-300 ${
                isActive
                  ? 'text-cyan-400 shadow-[0_0_15px_rgba(0,255,255,0.3)]'
                  : 'text-white/60 hover:text-white'
              }`
            }
          >
            <Icon className="w-6 h-6" />
            <span className="absolute left-20 bg-black border border-white/10 px-2 py-1 rounded-md text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              {label}
            </span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;