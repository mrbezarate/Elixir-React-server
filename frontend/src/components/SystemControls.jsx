import React from 'react';
import { motion } from 'framer-motion';

const SystemControls = ({ 
  metrics, spawnWorkers, simulateSpike, killRandom, 
  purgeCluster, hotUpgrade, netSplit, isAutoScaler, toggleAutoScaler 
}) => {
  const { stats } = metrics;
  
  const total = stats.total || 1;
  const loadA = Math.min(100, (stats.processing / total) * 100 + Math.random() * 5);
  const loadB = Math.min(100, (stats.processing / total) * 100 + Math.random() * 10);
  const loadC = Math.min(100, (stats.processing / total) * 100 + Math.random() * 15);

  const memUsage = Math.min(100, 20 + (stats.total / 10000) * 40 + (stats.processing / total) * 20);

  return (
    <div className="hud-panel system-controls">
      <div className="panel-header">
        <span className="bracket">[</span>
        OP_COM :: SYSTEM_MATRIX
        <span className="bracket">]</span>
      </div>
      
      {/* Node Health Matrix */}
      <div className="health-matrix">
        <div className="hm-title">CLUSTER ZONES LOAD</div>
        <div className="hm-row">
          <span className="hm-label">ZONE_A</span>
          <div className="hm-bar-bg">
            <motion.div className="hm-bar-fill" animate={{ width: `${loadA}%` }} transition={{ duration: 0.5 }} />
          </div>
          <span className="hm-val">{loadA.toFixed(1)}%</span>
        </div>
        <div className="hm-row">
          <span className="hm-label">ZONE_B</span>
          <div className="hm-bar-bg">
            <motion.div className="hm-bar-fill" animate={{ width: `${loadB}%` }} transition={{ duration: 0.5 }} />
          </div>
          <span className="hm-val">{loadB.toFixed(1)}%</span>
        </div>
        <div className="hm-row">
          <span className="hm-label">ZONE_C</span>
          <div className="hm-bar-bg">
            <motion.div className="hm-bar-fill" animate={{ width: `${loadC}%` }} transition={{ duration: 0.5 }} />
          </div>
          <span className="hm-val">{loadC.toFixed(1)}%</span>
        </div>
      </div>

      <div className="metrics-big">
        <div className="m-box">
          <div className="m-label">ACTIVE_PROCESSES</div>
          <div className="m-val highlight">{stats.total.toLocaleString()}</div>
        </div>
        <div className="m-box mem-box">
          <div className="m-label">BEAM_MEMORY_ALLOC</div>
          <div className="m-val">{memUsage.toFixed(1)} <span className="unit">GB</span></div>
        </div>
      </div>

      <div className="control-grid scrollable-controls">
        <button className="hud-btn" onClick={() => spawnWorkers(5000)}>
          <span className="btn-decor">[+]</span> BOOTSTRAP 5K
        </button>
        <button className="hud-btn warn" onClick={() => simulateSpike()}>
          <span className="btn-decor">[/]</span> DDOS INJECT
        </button>
        <button className="hud-btn danger" onClick={() => killRandom(1000)}>
          <span className="btn-decor">[X]</span> SIGKILL 1K
        </button>
        
        {/* New V7 Controls */}
        <div className="control-divider">--- ADVANCED OPS ---</div>
        
        <button className={`hud-btn toggle-btn ${isAutoScaler ? 'active' : ''}`} onClick={toggleAutoScaler}>
          <span className="btn-decor">[*]</span> AUTO_SCALER: {isAutoScaler ? 'ON' : 'OFF'}
        </button>
        
        <button className="hud-btn upgrade-btn" onClick={hotUpgrade}>
          <span className="btn-decor">[^]</span> HOT CODE UPGRADE
        </button>
        
        <button className="hud-btn split-btn" onClick={netSplit}>
          <span className="btn-decor">[~]</span> SIMULATE NET-SPLIT
        </button>

        <button className="hud-btn nuke-btn" onClick={purgeCluster}>
          <span className="btn-decor">[!]</span> SYSTEM PURGE
        </button>
      </div>
      
      <div className="info-box">
        <div className="crosshair tr"></div>
        <div className="crosshair bl"></div>
        <p className="info-title">V7 ARCHITECTURE LAB:</p>
        <p>Simulation of Elixir's massive concurrency, hot code swapping, and partition tolerance.</p>
      </div>
    </div>
  );
};

export default SystemControls;
