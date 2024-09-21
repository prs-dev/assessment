import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import fuelData from './response.json'; 

const App = () => {
  const chartData = fuelData.map((item) => ({
    timestamp: new Date(item.timestamp).toLocaleTimeString(),
    fuelLevel: item.fuel_level,
    speed: item.speed
  }));

  console.log(chartData)

  const CustomizedAxisTick = ({ x, y, payload }) => {
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">
          {payload.value}
        </text>
      </g>
    );
  };

  return (
    <div>
      <h1>Task-1</h1>
      <ResponsiveContainer width="100%" height={500}>
        <LineChart width={500} height={800} data={chartData} margin={{ top: 20, right: 30, left: 50, bottom: 70 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" label={{ value: "Timestamp", position: "insideBottom", offset: -60 }} interval={15} tick={CustomizedAxisTick} />
          <YAxis interval={0} dataKey="fuelLevel" label={{
            value: "Fuel Level",
            angle: -90,
            position: "insideLeft",
            offset: 10
          }} />
          <Tooltip />
          <Line type="monotone" dataKey="fuelLevel" stroke="#b67109" activeDot={{ r: 8 }} dot={false} />
          <Line type="monotone" dataKey="speed" stroke="#2da822" activeDot={{ r: 8 }} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default App;
