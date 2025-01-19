import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { AlertTriangle, Shield, Lock, AlertCircle } from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend);

const ThreatsPage: React.FC = () => {
  const threatDistribution = {
    labels: ['Malware', 'Phishing', 'DDoS', 'Data Breach'],
    datasets: [
      {
        data: [35, 25, 20, 20],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
        ],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: 'rgba(255, 255, 255, 0.7)',
        },
      },
    },
  };

  const recentThreats = [
    {
      id: 1,
      type: 'Malware',
      severity: 'High',
      source: '192.168.1.105',
      timestamp: '2024-02-28 14:23',
      status: 'Blocked',
    },
    {
      id: 2,
      type: 'Phishing',
      severity: 'Medium',
      source: 'email@suspicious.com',
      timestamp: '2024-02-28 13:45',
      status: 'Detected',
    },
    {
      id: 3,
      type: 'DDoS',
      severity: 'Critical',
      source: 'Multiple',
      timestamp: '2024-02-28 12:30',
      status: 'Mitigated',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white/5 p-6 rounded-xl border border-white/10">
          <h2 className="text-xl font-bold text-white mb-6">Recent Threats</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-white/60 border-b border-white/10">
                  <th className="pb-3 text-left">Type</th>
                  <th className="pb-3 text-left">Severity</th>
                  <th className="pb-3 text-left">Source</th>
                  <th className="pb-3 text-left">Time</th>
                  <th className="pb-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentThreats.map((threat) => (
                  <tr key={threat.id} className="border-b border-white/5">
                    <td className="py-4">{threat.type}</td>
                    <td className="py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          threat.severity === 'Critical'
                            ? 'bg-red-500/20 text-red-400'
                            : threat.severity === 'High'
                            ? 'bg-orange-500/20 text-orange-400'
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}
                      >
                        {threat.severity}
                      </span>
                    </td>
                    <td className="py-4 font-mono text-sm">{threat.source}</td>
                    <td className="py-4 text-white/60">{threat.timestamp}</td>
                    <td className="py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          threat.status === 'Blocked'
                            ? 'bg-green-500/20 text-green-400'
                            : threat.status === 'Detected'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-blue-500/20 text-blue-400'
                        }`}
                      >
                        {threat.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <h2 className="text-xl font-bold text-white mb-4">Threat Distribution</h2>
          <div className="h-[300px]">
            <Doughnut data={threatDistribution} options={chartOptions} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: AlertTriangle, label: 'Total Threats', value: '1,234', trend: '+12%' },
          { icon: Shield, label: 'Blocked', value: '1,089', trend: '88%' },
          { icon: Lock, label: 'Quarantined', value: '145', trend: '12%' },
          { icon: AlertCircle, label: 'Critical', value: '23', trend: '-5%' },
        ].map(({ icon: Icon, label, value, trend }) => (
          <div
            key={label}
            className="bg-white/5 p-6 rounded-xl border border-white/10 hover:border-cyan-400/50 transition-colors duration-300"
          >
            <div className="flex justify-between items-start">
              <div>
                <Icon className="w-8 h-8 text-cyan-400 mb-2" />
                <p className="text-white/60 text-sm">{label}</p>
                <p className="text-2xl font-bold text-white">{value}</p>
              </div>
              <span
                className={`text-sm ${
                  trend.startsWith('+') ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {trend}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThreatsPage;