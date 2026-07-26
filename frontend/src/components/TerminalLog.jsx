import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TerminalLog = ({ logs }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="terminal-log glass-panel">
      <div className="terminal-header">
        <span>sys_log@elixir_core ~</span>
      </div>
      <div className="terminal-body" ref={scrollRef}>
        <AnimatePresence>
          {logs.map((log, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`log-entry ${log.message.includes('[WARN]') ? 'warn' : log.message.includes('[CRITICAL]') ? 'critical' : ''}`}
            >
              <span className="time">[{log.time}]</span> {log.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TerminalLog;
