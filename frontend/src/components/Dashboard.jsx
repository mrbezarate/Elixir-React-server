import React, { useState, useEffect } from 'react';
import { useSimulationSocket } from '../hooks/useSimulationSocket';
import TelemetryChart from './TelemetryChart';
import DiagnosticConsole from './DiagnosticConsole';
import SupervisionTree from './SupervisionTree';
import SystemControls from './SystemControls';

const Dashboard = () => {
  const { metrics, rpsHistory, logs, spawnWorkers, simulateSpike, killRandom } = useSimulationSocket();
  const [activeEvent, setActiveEvent] = useState(null);

  const handleSimulateSpike = () => {
    setActiveEvent('DDOS');
    simulateSpike();
    setTimeout(() => setActiveEvent(null), 5000);
  };

  const handleKillRandom = (count) => {
    setActiveEvent('KILL');
    killRandom(count);
    setTimeout(() => setActiveEvent(null), 5000);
  };

  return (
    <div className="v4-hud">
      <div className="hud-grid-bg"></div>
      
      {/* Decals */}
      <div className="decal top-left">SCX-99</div>
      <div className="decal top-right">
        <div className="barcode">|| | ||| | || |</div>
        <div>AUTH: GRANTED</div>
      </div>
      <div className="decal bottom-left">SYS_MEMORY: OK<br/>NET_UPLINK: ACTIVE</div>
      <div className="decal bottom-right">v2.0.44</div>

      <header className="hud-header">
        <div className="hud-title">ELIXIR::FAULT_TOLERANCE_ENGINE</div>
        <div className="hud-status">SYS.ONLINE <span className="blink-block">_</span></div>
      </header>

      <div className="hud-layout">
        <div className="hud-col left-col">
          <TelemetryChart data={rpsHistory} />
          <DiagnosticConsole logs={logs} errorCount={metrics.stats.error} />
        </div>
        
        <div className="hud-col center-col">
          <SupervisionTree metrics={metrics} activeEvent={activeEvent} />
        </div>
        
        <div className="hud-col right-col">
          <SystemControls 
            metrics={metrics}
            spawnWorkers={spawnWorkers}
            simulateSpike={handleSimulateSpike}
            killRandom={() => handleKillRandom(1000)}
          />
        </div>
      </div>
      
      <div className="hud-footer">
        <div className="footer-left">NODE: ERT-4000</div>
        <div className="footer-right">PROTOCOL: WEBSOCKET v2.0.0</div>
      </div>
    </div>
  );
};

export default Dashboard;
