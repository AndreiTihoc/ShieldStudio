import React, { useEffect, useState } from 'react';
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
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

const DashboardPage: React.FC = () => {
  const [breachData, setBreachData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const email = localStorage.getItem('userEmail');
        setEmail(email || '');
        console.log('Email passed to Dashboard:', email); // Log the email
        if (email) {
          const response = await axios.get(`https://api.xposedornot.com/v1/breach-analytics?email=${email}`);
          let data = response.data;

          if (!data || !data.BreachMetrics || Object.keys(data.BreachMetrics).length === 0) {
            navigate('/safe');
          } else {
            setBreachData(data);
          }
        }
      } catch (error) {
        setError('Error fetching breach data');
        console.error('Error fetching breach data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const industryData = breachData.BreachMetrics.industry[0].map(([label, value]: [string, number]) => ({ label, value }));
  const passwordStrengthData = breachData.BreachMetrics.passwords_strength[0];
  const riskData = breachData.BreachMetrics.risk[0];
  const yearwiseDetails = breachData.BreachMetrics.yearwise_details[0];

  const industryChartData = {
    labels: industryData.map((item: any) => item.label),
    datasets: [
      {
        label: 'Breaches by Industry',
        data: industryData.map((item: any) => item.value),
        backgroundColor: 'rgba(0, 255, 255, 0.5)',
        borderColor: 'rgba(0, 255, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const passwordStrengthChartData = {
    labels: ['EasyToCrack', 'PlainText', 'StrongHash', 'Unknown'],
    datasets: [
      {
        label: 'Password Strength',
        data: [
          passwordStrengthData.EasyToCrack,
          passwordStrengthData.PlainText,
          passwordStrengthData.StrongHash,
          passwordStrengthData.Unknown,
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const yearwiseChartData = {
    labels: Object.keys(yearwiseDetails),
    datasets: [
      {
        label: 'Breaches by Year',
        data: Object.values(yearwiseDetails),
        backgroundColor: 'rgba(0, 255, 255, 0.5)',
        borderColor: 'rgba(0, 255, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const normalizeRiskScore = (score: number) => (score / 10) * 100;
  const riskScore = normalizeRiskScore(riskData.risk_score);

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

  return (
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-cyan-400">Welcome, {email}</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white/5 p-6 rounded-xl border border-white/10">
            <h2 className="text-xl font-bold text-white mb-4">Risk Level</h2>
            <p className="text-2xl font-bold text-white">{riskData.risk_label}</p>
            <p className="text-white/60 text-sm">Risk Score: {riskScore}</p>
            <p className="text-white/60 text-sm">{getRiskMessage(riskScore)}</p>
          </div>
          <div className="bg-white/5 p-6 rounded-xl border border-white/10">
            <h2 className="text-xl font-bold text-white mb-4">Password Strength</h2>
            <Doughnut data={passwordStrengthChartData} />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white/5 p-6 rounded-xl border border-white/10">
            <h2 className="text-xl font-bold text-white mb-4">Breaches by Industry</h2>
            <Bar data={industryChartData} />
          </div>
          <div className="bg-white/5 p-6 rounded-xl border border-white/10">
            <h2 className="text-xl font-bold text-white mb-4">Breaches by Year</h2>
            <Line data={yearwiseChartData} />
          </div>
        </div>
      </div>
  );
};

export default DashboardPage;