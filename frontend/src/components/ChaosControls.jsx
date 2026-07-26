import React from 'react';

const ChaosControls = ({ spawnWorkers, simulateSpike, killRandom }) => {
  return (
    <div className="chaos-controls glass-panel">
      <h3>Chaos Engineering</h3>
      <p className="subtitle">Simulate real-world massive scale events</p>
      
      <div className="btn-group">
        <button className="btn cyber-btn primary" onClick={() => spawnWorkers(1000)}>
          <span className="btn-glitch">Deploy 1k Nodes</span>
        </button>
        <button className="btn cyber-btn primary" onClick={() => spawnWorkers(5000)}>
          <span className="btn-glitch">Deploy 5k Nodes</span>
        </button>
      </div>
      
      <div className="btn-group">
        <button className="btn cyber-btn warning" onClick={() => simulateSpike()}>
          <span className="btn-glitch">Simulate DDoS Spike</span>
        </button>
        <button className="btn cyber-btn danger" onClick={() => killRandom(1000)}>
          <span className="btn-glitch">Kill 1000 Nodes</span>
        </button>
      </div>
    </div>
  );
};

export default ChaosControls;
