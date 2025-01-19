import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { fetchEmailBreaches } from '../fetchEmailBreaches.js'; // Adjust the import path as needed

const StartupPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    try {
      await fetchEmailBreaches(email);
    } catch (error) {
      setError('Error fetching email breaches');
      console.error('Error fetching email breaches:', error);
    } finally {
      localStorage.setItem('userEmail', email);
      navigate('/dashboard');
    }
  };

  return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col items-center">
            <Shield className="w-20 h-20 text-white animate-pulse" />
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-white">
              ShieldStudio
            </h1>
            <p className="mt-2 text-sm text-gray-400">
              Advanced Threat Detection & Analysis
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="relative">
              <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  className="w-full px-4 py-3 bg-transparent border-2 border-white/20 rounded-lg
                         text-white placeholder-white/50 focus:border-cyan-400 focus:ring-1
                         focus:ring-cyan-400 transition-all duration-300 outline-none
                         shadow-[0_0_15px_rgba(0,255,255,0.1)]
                         hover:shadow-[0_0_20px_rgba(0,255,255,0.2)]"
                  placeholder="Enter your email"
              />
              {error && (
                  <p className="absolute -bottom-6 left-0 text-red-500 text-sm">
                    {error}
                  </p>
              )}
            </div>

            <button
                type="submit"
                className="w-full py-3 px-4 border-2 border-white/20 rounded-lg
                     text-white font-medium transition-all duration-300
                     hover:bg-white/5 hover:border-cyan-400
                     hover:shadow-[0_0_30px_rgba(0,255,255,0.3)]
                     focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2
                     focus:ring-offset-black"
            >
              Enter Dashboard
            </button>
          </form>

          <div className="text-center">
            <p className="text-xs text-gray-500">
              Protected by advanced encryption. Your data stays private.
            </p>
          </div>
        </div>
      </div>
  );
};

export default StartupPage;