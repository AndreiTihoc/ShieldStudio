import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Doughnut, Bar, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const SafePage: React.FC = () => {
  const email = localStorage.getItem('userEmail') || '';

  const riskScore = 0;

  const getRiskMessage = (score: number) => {
    if (score < 25) {
      return "Low score - Your risk level is minimal, but always stay alert.";
    } else if (score < 50) {
      return "Moderate score - Some risk detected, consider improving your security measures.";
    } else if (score < 75) {
      return "Medium score - You should take precaution and evaluate your security practices.";
    } else {
      return "High score - Immediate action is required to protect your data.";
    }
  };

  const noDataChartData = {
    labels: ['No data'],
    datasets: [
      {
        label: 'No data',
        data: [1],
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-lg text-gray-600">Welcome, {email}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 shadow-md p-6 rounded-lg">
          <h2 className="text-xl font-bold text-white mb-4">Risk Level</h2>
          <p className="text-2xl font-bold text-blue-500 neon-text">Low</p>
          <p className="text-gray-400 text-sm">Risk Score: {riskScore}</p>
          <p className="text-gray-400 text-sm">{getRiskMessage(riskScore)}</p>
        </div>
        <div className="bg-gray-800 shadow-md p-6 rounded-lg">
          <h2 className="text-xl font-bold text-white mb-4">Password Strength</h2>
          <Doughnut data={noDataChartData} />
        </div>
        <div className="bg-gray-800 shadow-md p-6 rounded-lg col-span-2">
          <p className="text-xl font-semibold text-blue-500 mb-4">Your email does not appear in any database records. You are safe!</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 shadow-md p-6 rounded-lg">
          <h2 className="text-xl font-bold text-white mb-4">Breaches by Industry</h2>
          <Bar data={noDataChartData} />
        </div>
        <div className="bg-gray-800 shadow-md p-6 rounded-lg">
          <h2 className="text-xl font-bold text-white mb-4">Breaches by Year</h2>
          <Line data={noDataChartData} />
        </div>
      </div>
    </div>
  );
};

export default SafePage;