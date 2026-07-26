import React from 'react';
import { motion } from 'framer-motion';

const SystemControls = ({ metrics, spawnWorkers, simulateSpike, killRandom }) => {
  const { stats, rps } = metrics;
  
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

      <div className="control-grid">
        <button className="hud-btn" onClick={() => spawnWorkers(1000)}>
          <span className="btn-decor">[+]</span> BOOTSTRAP 1K
        </button>
        <button className="hud-btn" onClick={() => spawnWorkers(5000)}>
          <span className="btn-decor">[+]</span> BOOTSTRAP 5K
        </button>
        <button className="hud-btn warn" onClick={() => simulateSpike()}>
          <span className="btn-decor">[/]</span> DDOS INJECT
        </button>
        <button className="hud-btn danger" onClick={() => killRandom(1000)}>
          <span className="btn-decor">[X]</span> SIGKILL 1K
        </button>
      </div>
      
      <div className="info-box">
        <div className="crosshair tr"></div>
        <div className="crosshair bl"></div>
        <p className="info-title">BEAM ACTOR MODEL:</p>
        <p>1. Memory is fully isolated per process.</p>
        <p>2. "Let it crash" philosophy.</p>
        <p>3. Supervisor restarts failed nodes.</p>
      </div>
    </div>
  );
};

export default SystemControls;
