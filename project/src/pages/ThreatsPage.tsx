import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getOpenAIResponse } from '../openaiApi';
import { Shield } from 'lucide-react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ThreatsPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBreachData = async () => {
      setLoading(true);
      setError(null);
      const storedEmail = localStorage.getItem('userEmail');
      setEmail(storedEmail || '');
      console.log('Email passed to ThreatsPage:', storedEmail); // Log the email
      if (storedEmail) {
        try {
          const breachResponse = await axios.get(`https://api.xposedornot.com/v1/breach-analytics?email=${storedEmail}`);
          const { passwords_strength, risk, xposed_data } = breachResponse.data.BreachMetrics;
          
          // Fetch AI response
          const aiResponse = await getOpenAIResponse(`Based on the following data: passwords_strength: ${JSON.stringify(passwords_strength)}, risk: ${JSON.stringify(risk)}, xposed_data: ${JSON.stringify(xposed_data)}, provide a single conclusion with the absolutely relevant security recommendations.`);
          
          setResponse(aiResponse);
        } catch (error) {
          console.error('Error fetching breach data:', error);
          setError('Error fetching breach data. Please try again later.');
        }
      } else {
        setError('No email found. Please log in again.');
      }
      setLoading(false);
    };

    fetchBreachData();
  }, []);

  const formatResponse = (text: string) => {
    const boldRegex = /\*\*(.*?)\*\*/g;
    const parts = text.split(boldRegex);
    return parts.map((part, index) => 
      index % 2 === 1 ? <span key={index} className="font-bold text-cyan-400">{part}</span> : part
    );
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-white mb-8">Security Recommendations</h1>
      <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-8">
        <div className="p-4 bg-cyan-600">
          <div className="flex items-center space-x-2">
            <Shield className="h-6 w-6 text-white" />
            <h2 className="text-xl font-semibold text-white">Shield Assistant Recommendations</h2>
          </div>
        </div>
        <div className="p-4 bg-gray-900 text-white">
          {loading ? (
            <div className="flex justify-center items-center">
              <div className="loader"></div>
              <span className="ml-2">Fetching recommendations...</span>
            </div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : response ? (
            <div>
              <h3 className="text-2xl font-bold mb-4">Recommendations</h3>
              <pre className="bg-gray-800 p-4 rounded text-cyan-400 font-mono whitespace-pre-wrap">{formatResponse(response)}</pre>
            </div>
          ) : (
            <div>No data available.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ThreatsPage;