import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HoloTooltip = ({ eventType }) => {
  if (!eventType) return null;

  return (
    <motion.div 
      className="holo-tooltip"
      initial={{ opacity: 0, scale: 0.8, x: 20 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.8, x: -20 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      <div className="holo-line"></div>
      <div className="holo-content">
        {eventType === 'DDOS' && (
          <>
            <div className="holo-title warn">DDOS SPAM DETECTED</div>
            <div className="holo-desc">BEAM Scheduler is distributing millions of messages asynchronously. <b>No locks. No blocking.</b></div>
          </>
        )}
        {eventType === 'KILL' && (
          <>
            <div className="holo-title alert">KERNEL PANIC INJECTED</div>
            <div className="holo-desc">1000 processes terminated. <b>Failure is isolated.</b> Neighboring memory is untouched. Supervisor is respawning processes instantly.</div>
          </>
        )}
        {eventType === 'PURGE' && (
          <>
            <div className="holo-title alert">SYSTEM PURGE</div>
            <div className="holo-desc">All nodes terminated. <b>Grid wiped clean.</b></div>
          </>
        )}
        {eventType === 'UPGRADE' && (
          <>
            <div className="holo-title upgrade-text">HOT CODE SWAPPING</div>
            <div className="holo-desc">Injecting v2.0 bytecode into Erlang VM. Processes updating state on the fly. <b>Zero Downtime.</b> Notice RPS remains stable.</div>
          </>
        )}
        {eventType === 'SPLIT' && (
          <>
            <div className="holo-title warn">NETWORK PARTITION</div>
            <div className="holo-desc">Datacenter link severed. <b>Split-Brain scenario.</b> Nodes entering degraded state but continuing to process local queues.</div>
          </>
        )}
        {eventType === 'AUTO_SCALE_UP' && (
          <>
            <div className="holo-title upgrade-text">AI AUTO-SCALER</div>
            <div className="holo-desc">High load detected. Automatically bootstrapping 2000 new nodes to balance traffic.</div>
          </>
        )}
      </div>
    </motion.div>
  );
};

const SupervisionTree = ({ metrics, activeEvent }) => {
  const { stats, rps } = metrics;
  
  const TOTAL_VISUAL_NODES = 400;
  
  const activeVisualCount = stats.total > 0 ? Math.floor((stats.idle + stats.processing) / stats.total * TOTAL_VISUAL_NODES) : 0;
  const failedVisualCount = stats.total > 0 ? Math.floor((stats.error) / stats.total * TOTAL_VISUAL_NODES) : 0;
  const safeFailed = Math.min(failedVisualCount, TOTAL_VISUAL_NODES);
  
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
    
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [stats.total, stats.idle, stats.processing, stats.error, activeVisualCount, safeFailed]);

  // Determine state for Upgrade and Split VFX
  const [upgradedNodes, setUpgradedNodes] = useState([]);
  
  useEffect(() => {
    if (activeEvent === 'UPGRADE') {
      let wave = [];
      const interval = setInterval(() => {
        if (wave.length >= TOTAL_VISUAL_NODES) {
          clearInterval(interval);
        } else {
          for(let i=0; i<10; i++) wave.push(wave.length);
          setUpgradedNodes([...wave]);
        }
      }, 50);
      return () => { clearInterval(interval); }
    } else if (activeEvent === 'PURGE') {
      setUpgradedNodes([]);
    }
  }, [activeEvent]);

  return (
    <div className={`hud-panel supervision-tree ${activeEvent === 'SPLIT' ? 'split-screen-effect' : ''}`}>
      <div className="panel-header">
        <span className="bracket">[</span>
        BEAM :: SUPERVISION_TREE
        <span className="bracket">]</span>
      </div>
      
      {activeEvent === 'SPLIT' && <div className="split-crack"></div>}
      
      <div className="tree-visual">
        <AnimatePresence>
          <HoloTooltip eventType={activeEvent} />
        </AnimatePresence>

        <div className="tree-top">
          <div className={`tree-node root ${activeEvent === 'KILL' ? 'flashing-orange' : ''}`}>
            <span className="node-label">ROOT_SUP</span>
          </div>
          <div className="tree-line vertical"></div>
          
          <div className="tree-branches">
            <div className="tree-line horizontal"></div>
            <div className="branch-nodes">
              <div className={`tree-node branch ${activeEvent === 'KILL' ? 'flashing-orange' : ''}`}>POOL_A</div>
              <div className={`tree-node branch ${activeEvent === 'DDOS' ? 'flashing-white' : ''}`}>POOL_B</div>
              <div className={`tree-node branch ${activeEvent === 'KILL' ? 'flashing-orange' : ''}`}>POOL_C</div>
            </div>
            {activeEvent === 'KILL' && <div className="supervisor-laser-overlay"></div>}
          </div>
        </div>
        
        <div className="worker-grid-container">
          {rps > 100 && (
            <div className="message-particles-layer">
              {Array.from({ length: activeEvent === 'DDOS' ? 30 : 5 }).map((_, i) => (
                <div key={i} className="particle" style={{
                  left: `${Math.random() * 100}%`,
                  animationDuration: `${0.2 + Math.random() * 0.5}s`,
                  animationDelay: `${Math.random()}s`
                }}></div>
              ))}
            </div>
          )}

          <div className={`worker-grid ${activeEvent === 'PURGE' ? 'wiped' : ''}`}>
            {nodes.map((state, i) => {
              const isUpgraded = upgradedNodes.includes(i);
              const isSplitDisconnected = activeEvent === 'SPLIT' && i % 2 === 0;
              
              let finalState = state;
              if (isSplitDisconnected && state !== 'empty') finalState = 'disconnected';
              else if (isUpgraded && state !== 'empty') finalState = 'upgraded';

              return (
                <div key={i} className="worker-wrapper">
                  {state === 'failed' && <div className="explosion-vfx"></div>}
                  {state === 'idle' && activeEvent === 'KILL' && <div className="respawn-vfx"></div>}
                  <div className={`worker-dot ${finalState}`}></div>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="tree-footer">
          <div className="legend-item"><span className="worker-dot idle"></span> IDLE</div>
          <div className="legend-item"><span className="worker-dot processing"></span> MSG_PROC</div>
          <div className="legend-item"><span className="worker-dot upgraded"></span> v2.0</div>
          <div className="legend-item"><span className="worker-dot disconnected"></span> NET_DOWN</div>
        </div>
      </div>
    </div>
  );
};

export default SupervisionTree;
