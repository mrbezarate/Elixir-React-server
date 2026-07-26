import React, { useState, useEffect } from 'react';
import { useSimulationSocket } from '../hooks/useSimulationSocket';
import TelemetryChart from './TelemetryChart';
import DiagnosticConsole from './DiagnosticConsole';
import SupervisionTree from './SupervisionTree';
import SystemControls from './SystemControls';

const Dashboard = () => {
  const { metrics, rpsHistory, logs, spawnWorkers, simulateSpike, killRandom, purgeCluster } = useSimulationSocket();
  const [activeEvent, setActiveEvent] = useState(null);
  const [isAutoScaler, setIsAutoScaler] = useState(false);

  const [lastScaleTime, setLastScaleTime] = useState(0);

  // Auto Scaler AI Simulation with Cooldown
  useEffect(() => {
    const now = Date.now();
    if (isAutoScaler && metrics.rps > 200 && metrics.stats.idle < 1000 && (now - lastScaleTime > 5000)) {
      spawnWorkers(2000);
      setActiveEvent('AUTO_SCALE_UP');
      setLastScaleTime(now);
      setTimeout(() => setActiveEvent(null), 3000);
    }
  }, [isAutoScaler, metrics.rps, metrics.stats.idle, spawnWorkers, lastScaleTime]);

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
  
  const handlePurge = () => {
    setActiveEvent('PURGE');
    purgeCluster();
    setTimeout(() => setActiveEvent(null), 4000);
  };
  
  const handleHotUpgrade = () => {
    setActiveEvent('UPGRADE');
    // Does not send anything to backend, it's just visual for the portfolio
    setTimeout(() => setActiveEvent(null), 8000);
  };
  
  const handleNetSplit = () => {
    setActiveEvent('SPLIT');
    setTimeout(() => setActiveEvent(null), 8000);
  };

  return (
    <div className={`v4-hud ${activeEvent === 'PURGE' ? 'purge-shake' : ''}`}>
      <div className="hud-grid-bg"></div>
      
      {/* Decals */}
      <div className="decal top-left">SCX-99</div>
      <div className="decal top-right">
        <div className="barcode">|| | ||| | || |</div>
        <div>AUTH: GRANTED</div>
      </div>
      <div className="decal bottom-left">SYS_MEMORY: OK<br/>NET_UPLINK: ACTIVE</div>
      <div className="decal bottom-right">v2.0.45-PRO</div>

      <header className="hud-header">
        <div className="hud-title">ELIXIR::FAULT_TOLERANCE_ENGINE</div>
        <div className="hud-status">
          {activeEvent === 'PURGE' ? <span style={{color: 'red'}}>SYS.OFFLINE</span> : 'SYS.ONLINE'} 
          <span className="blink-block">_</span>
        </div>
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
            purgeCluster={handlePurge}
            hotUpgrade={handleHotUpgrade}
            netSplit={handleNetSplit}
            isAutoScaler={isAutoScaler}
            toggleAutoScaler={() => setIsAutoScaler(!isAutoScaler)}
          />
        </div>
      </div>
      
      <div className="hud-footer">
        <div className="footer-left">NODE: ERT-4000 [US-EAST-1]</div>
        <div className="footer-right">PROTOCOL: WEBSOCKET v2.0.0</div>
      </div>
      
      {/* Global VFX Layer for Purge */}
      {activeEvent === 'PURGE' && <div className="global-purge-laser"></div>}
    </div>
  );
};

export default Dashboard;
