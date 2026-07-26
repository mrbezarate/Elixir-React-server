import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MetricsPanel = ({ metrics, rpsHistory }) => {
  const { stats, rps } = metrics;

  return (
    <div className="metrics-panel glass-panel">
      <h3>System Metrics</h3>
      
      <div className="metric-row">
        <div className="metric-box total">
          <span className="label">Total Nodes</span>
          <span className="value">{stats.total.toLocaleString()}</span>
        </div>
        <div className="metric-box rps">
          <span className="label">Req / Sec</span>
          <AnimatePresence mode="popLayout">
            <motion.span 
              key={rps}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="value neon-text"
            >
              {rps.toLocaleString()}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-item idle">
          <span className="label">Idle</span>
          <span className="value">{stats.idle.toLocaleString()}</span>
        </div>
        <div className="stat-item processing">
          <span className="label">Processing</span>
          <span className="value">{stats.processing.toLocaleString()}</span>
        </div>
        <div className="stat-item success">
          <span className="label">Success</span>
          <span className="value">{stats.success.toLocaleString()}</span>
        </div>
        <div className="stat-item error">
          <span className="label">Error / Crashed</span>
          <span className="value">{stats.error.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default MetricsPanel;
