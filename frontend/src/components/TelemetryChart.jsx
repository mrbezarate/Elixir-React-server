import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const TelemetryChart = ({ data }) => {
  // Format data for recharts
  const chartData = data.map((rps, i) => ({
    time: i,
    rps: rps
  }));

  return (
    <div className="hud-panel telemetry-chart">
      <div className="panel-header">
        <span className="bracket">[</span>
        TELEMETRY :: NETWORK_LOAD
        <span className="bracket">]</span>
      </div>
      <div className="chart-container" style={{ width: '100%', height: 200 }}>
        <ResponsiveContainer>
          <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
            <XAxis dataKey="time" hide={true} />
            <YAxis stroke="#555" fontSize={10} tickFormatter={(val) => val > 1000 ? (val/1000).toFixed(1)+'k' : val} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#000', border: '1px solid #FF5E00', borderRadius: 0, color: '#FF5E00', fontFamily: 'JetBrains Mono' }}
              itemStyle={{ color: '#fff' }}
              labelStyle={{ display: 'none' }}
            />
            <Line 
              type="stepAfter" 
              dataKey="rps" 
              stroke="#FF5E00" 
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TelemetryChart;
