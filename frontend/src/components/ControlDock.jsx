import React from 'react';
import { Play, Zap, Skull } from 'lucide-react';

const ControlDock = ({ spawnWorkers, simulateSpike, killRandom }) => {
  return (
    <div className="control-dock">
      <div className="dock-container">
        
        <button className="dock-item deploy" onClick={() => spawnWorkers(5000)}>
          <div className="dock-icon"><Play size={24} /></div>
          <span className="dock-label">Deploy 5k Nodes</span>
        </button>

        <div className="dock-separator"></div>

        <button className="dock-item spike" onClick={() => simulateSpike()}>
          <div className="dock-icon"><Zap size={24} /></div>
          <span className="dock-label">DDoS Spike</span>
        </button>

        <div className="dock-separator"></div>

        <button className="dock-item kill" onClick={() => killRandom(1000)}>
          <div className="dock-icon"><Skull size={24} /></div>
          <span className="dock-label">Kill 1000 Nodes</span>
        </button>
      </div>
    </div>
  );
};

export default ControlDock;
