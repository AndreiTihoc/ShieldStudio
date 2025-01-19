import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import { Network, Wifi, Server, Waypoints, Smartphone, Building2, Flag, LandPlot, Goal, MapPin } from 'lucide-react';
import { fetchIPData } from '../fetchIP';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const NetworkPage: React.FC = () => {
  const [devices, setDevices] = useState<any[]>([]);

  useEffect(() => {
    fetchIPData().then(data => {
      const newDevices = [
        { name: 'IP', value: data.query || 'None' },
        { name: 'Country', value: data.country || 'None' },
        { name: 'Region', value: data.regionName || 'None' },
        { name: 'City', value: data.city || 'None' },
        { name: 'ISP', value: data.isp || 'None' },
        { name: 'Organization', value: data.org || 'None' },
        { name: 'Proxy', value: data.proxy || 'None' },
        { name: 'Mobile', value: data.mobile || 'None' },
        { name: 'Latitude', value: data.lat || 'None' },
        { name: 'Longitude', value: data.lon || 'None' }
      ];
      setDevices(newDevices);
    }).catch(error => {
      console.error('Error fetching IP data:', error);
    });
  }, []);

  const getIcon = (name: string) => {
    switch (name) {
      case 'IP':
        return <Wifi className="w-6 h-6 text-cyan-400" />;
      case 'Country':
        return <Flag className="w-6 h-6 text-cyan-400" />;
      case 'Region':
        return <LandPlot className="w-6 h-6 text-cyan-400" />;
      case 'City':
        return <Goal className="w-6 h-6 text-cyan-400" />;
      case 'ISP':
        return <Server className="w-6 h-6 text-cyan-400" />;
      case 'Organization':
        return <Building2 className="w-6 h-6 text-cyan-400" />;
      case 'Proxy':
        return <Waypoints className="w-6 h-6 text-cyan-400" />;
      case 'Mobile':
        return <Smartphone className="w-6 h-6 text-cyan-400" />;
      case 'Latitude':
      case 'Longitude':
        return <MapPin className="w-6 h-6 text-cyan-400" />;
      default:
        return <Network className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
        <div className="w-full max-w-4xl bg-gray-800 p-6 rounded-xl border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">What can others see about you:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {devices.map((device, index) => (
                <div
                    key={index}
                    className="flex items-center p-4 rounded-lg bg-gray-700 border border-gray-600"
                >
                  {getIcon(device.name)}
                  <div className="ml-4">
                    <p className="font-medium text-white">{device.name}</p>
                    <p className="text-sm text-gray-400 font-mono">{device.value}</p>
                  </div>
                </div>
            ))}
          </div>
        </div>
      </div>
  );
};

export default NetworkPage;