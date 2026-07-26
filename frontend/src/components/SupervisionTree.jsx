import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';

const SupervisionTree = ({ metrics }) => {
  const { stats } = metrics;
  
  // We represent 500 nodes visually to show density without lagging the browser.
  const TOTAL_VISUAL_NODES = 400;
  
  // Calculate how many nodes should be in each state visually
  const activeVisualCount = stats.total > 0 ? Math.floor((stats.idle + stats.processing) / stats.total * TOTAL_VISUAL_NODES) : 0;
  const failedVisualCount = stats.total > 0 ? Math.floor((stats.error) / stats.total * TOTAL_VISUAL_NODES) : 0;
  
  // Just in case of edge cases, cap the total
  const safeFailed = Math.min(failedVisualCount, TOTAL_VISUAL_NODES);
  
  // Create an array of node states: 0 = idle, 1 = processing, 2 = failed
  // For the sci-fi HUD: processing is brighter, failed is red/dark, idle is dim orange.
  const nodes = useMemo(() => {
    let arr = [];
    const processingVisualCount = stats.total > 0 ? Math.floor((stats.processing) / stats.total * TOTAL_VISUAL_NODES) : 0;
    
    for (let i = 0; i < TOTAL_VISUAL_NODES; i++) {
      if (i < safeFailed) {
        arr.push('failed');
      } else if (i < safeFailed + processingVisualCount) {
        arr.push('processing');
      } else if (i < activeVisualCount + safeFailed) {
        arr.push('idle');
      } else {
        arr.push('empty');
      }
    }
    
    // Shuffle the array to make failures look random across the cluster
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [stats.total, stats.idle, stats.processing, stats.error, activeVisualCount, safeFailed]);

  return (
    <div className="hud-panel supervision-tree">
      <div className="panel-header">
        <span className="bracket">[</span>
        BEAM :: SUPERVISION_TREE
        <span className="bracket">]</span>
      </div>
      
      <div className="tree-visual">
        <div className="tree-top">
          <div className="tree-node root">
            <span className="node-label">ROOT_SUP</span>
          </div>
          <div className="tree-line vertical"></div>
          <div className="tree-node branch">
            <span className="node-label">WORKER_POOL</span>
          </div>
          <div className="tree-line vertical"></div>
        </div>
        
        <div className="worker-grid">
          {nodes.map((state, i) => (
            <motion.div 
              key={i}
              initial={false}
              animate={{ 
                backgroundColor: 
                  state === 'failed' ? '#FF0000' : 
                  state === 'processing' ? '#FFFFFF' : 
                  state === 'idle' ? '#FF5E00' : '#111111',
                opacity: state === 'failed' ? [1, 0, 1] : 1
              }}
              transition={state === 'failed' ? { duration: 0.2, repeat: 3 } : { duration: 0.3 }}
              className={`worker-dot ${state}`}
            />
          ))}
        </div>
        
        <div className="tree-footer">
          <div className="legend-item"><span className="worker-dot idle"></span> IDLE</div>
          <div className="legend-item"><span className="worker-dot processing"></span> PROC</div>
          <div className="legend-item"><span className="worker-dot failed"></span> ERR</div>
        </div>
      </div>
    </div>
  );
};

export default SupervisionTree;
