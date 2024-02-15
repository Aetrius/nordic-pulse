import React, { useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import moment from 'moment';
import './Monitor.css';

// Define CustomTooltip outside the HealthMonitor component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`Time: ${label}`}</p>
        {payload.map((item, index) => (
          <p key={index} className="value" style={{ color: item.color, fill: item.color }}>
            {`${item.name}: ${item.value}`}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

function HealthMonitor({ pingResults }) {
  // Check if pingResults is defined and not empty
  if (!pingResults || pingResults.length === 0) {
    return <div>Loading...</div>; // or handle the loading state as appropriate
  }

  const chartData = pingResults.map(result => ({
    timestamp: moment(result.timestamp).format('mm:ss'),
    packetSuccess: { value: result.packetSuccess, color: '#8884d8' },
    packetLoss: { value: result.packetLoss, color: '#FF0000' },
    rtt: { value: result.rtt, color: '#82ca9d' },
  }));

  // Calculate the interval dynamically based on the length of data
  const interval = Math.ceil(chartData.length / 10); // Adjust the divisor as needed

  useEffect(() => {
    // Perform actions when pingResults prop changes
    //console.log('pingResults updated:', pingResults);
    //console.log('chartData:', chartData);
  }, [pingResults]);

  return (
    // <div id="HealthMonitor">
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="timestamp" interval={interval} tick={false} />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line type="monotone" dataKey="packetSuccess.value" stroke="#8884d8" name="Packet Success" dot={false} />
          <Line type="monotone" dataKey="packetLoss.value" stroke="#FF0000" name="Packet Loss" dot={false} />
          <Line type="monotone" dataKey="rtt.value" stroke="#82ca9d" name="Round Trip Max" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    // </div>
  );
}

export default HealthMonitor;
