import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, Database, Globe, Activity } from 'lucide-react';

const ArchitectureView = ({ metrics }) => {
  const { stats, rps } = metrics;
  
  // Detect Crash / Healing
  const [glitch, setGlitch] = useState(false);
  const [healingMessage, setHealingMessage] = useState(null);
  
  // Previous error count to detect spikes in errors (Crash)
  const [prevError, setPrevError] = useState(0);

  useEffect(() => {
    if (stats.error > prevError + 100) {
      // Big crash detected
      setGlitch(true);
      setTimeout(() => setGlitch(false), 800);
      
      const crashedCount = stats.error - prevError;
      setTimeout(() => {
        setHealingMessage(`Supervisor Healed ${crashedCount} Nodes`);
        setTimeout(() => setHealingMessage(null), 3000);
      }, 1000);
    }
    setPrevError(stats.error);
  }, [stats.error, prevError]);

  const loadPercentage = stats.total > 0 ? (stats.processing / stats.total) : 0;
  const isHighLoad = loadPercentage > 0.5;

  return (
    <div className="architecture-container">
      {/* Connection Lines (SVG) */}
      <svg className="arch-connections" viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00f0ff" stopOpacity="0" />
            <stop offset="50%" stopColor={isHighLoad ? "#ff003c" : "#00f0ff"} stopOpacity="1" />
            <stop offset="100%" stopColor="#00f0ff" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Gateway to Cluster */}
        <path id="path1" d="M 150 250 L 500 250" className="wire" />
        
        {/* Cluster to DB */}
        <path id="path2" d="M 500 250 L 850 250" className="wire" />

        {/* Data Packets flowing */}
        {rps > 0 && Array.from({ length: Math.min(20, Math.max(3, Math.floor(rps / 100))) }).map((_, i) => (
          <motion.circle
            key={`packet-1-${i}`}
            r={isHighLoad ? 6 : 4}
            fill={isHighLoad ? "#ff003c" : "#00f0ff"}
            className="data-packet"
            animate={{ offsetDistance: ["0%", "100%"] }}
            transition={{
              duration: isHighLoad ? 0.3 : 1.5,
              repeat: Infinity,
              ease: "linear",
              delay: (i * 0.1)
            }}
            style={{ offsetPath: `path("M 150 250 L 500 250")` }}
          />
        ))}

        {/* Internal DB packets */}
        {rps > 0 && Array.from({ length: 5 }).map((_, i) => (
          <motion.circle
            key={`packet-2-${i}`}
            r="3"
            fill="#39ff14"
            className="data-packet"
            animate={{ offsetDistance: ["0%", "100%"] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
              delay: (i * 0.4)
            }}
            style={{ offsetPath: `path("M 500 250 L 850 250")` }}
          />
        ))}
      </svg>

      {/* Nodes */}
      <div className="arch-nodes">
        {/* Gateway */}
        <div className="arch-block gateway">
          <div className="block-icon"><Globe size={32} /></div>
          <div className="block-title">Ingress Gateway</div>
          <div className="block-metrics">
            <span className="rps-counter">{rps.toLocaleString()}</span> req/s
          </div>
        </div>

        {/* Elixir Cluster */}
        <motion.div 
          className={`arch-block cluster ${glitch ? 'glitch-active' : ''} ${isHighLoad ? 'high-load' : ''}`}
          animate={glitch ? { x: [-10, 10, -10, 10, 0], filter: ["hue-rotate(0deg)", "hue-rotate(90deg)", "hue-rotate(0deg)"] } : {}}
          transition={{ duration: 0.4 }}
        >
          <AnimatePresence>
            {healingMessage && (
              <motion.div 
                className="healing-toast"
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: -40, scale: 1 }}
                exit={{ opacity: 0, y: -60, scale: 0.8 }}
              >
                {healingMessage}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="block-icon"><Activity size={40} /></div>
          <div className="block-title">Elixir Supervisor Cluster</div>
          <div className="cluster-grid">
            <div className="c-stat"><span>Active:</span> <span className="val cyan">{stats.total.toLocaleString()}</span></div>
            <div className="c-stat"><span>Processing:</span> <span className="val orange">{stats.processing.toLocaleString()}</span></div>
            <div className="c-stat"><span>Failed:</span> <span className="val red">{stats.error.toLocaleString()}</span></div>
          </div>
        </motion.div>

        {/* Database */}
        <div className="arch-block database">
          <div className="block-icon"><Database size={32} /></div>
          <div className="block-title">PostgreSQL Master</div>
          <div className="db-status">
            <span className="status-dot healthy"></span> Connected
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchitectureView;
