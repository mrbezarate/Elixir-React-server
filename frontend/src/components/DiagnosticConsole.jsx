import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DiagnosticConsole = ({ logs, errorCount }) => {
  const scrollRef = useRef(null);
  const [consoleLogs, setConsoleLogs] = useState([]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [consoleLogs]);

  useEffect(() => {
    // Generate specialized technical logs based on incoming logs and errors
    const lastLog = logs[logs.length - 1];
    if (!lastLog) return;

    let techMessage = '';
    let type = 'info';

    if (lastLog.message.includes('[CRITICAL]')) {
      type = 'critical';
      techMessage = `[FAULT_TOLERANCE] SEVERE FAULT DETECTED: Kernel panic in Node Pool. Supervisor activating 'Let It Crash' protocol. Isolating memory fault...`;
    } else if (lastLog.message.includes('[WARN]')) {
      type = 'warn';
      techMessage = `[SUPERVISOR] Detected process crashes. Restarting via one_for_one policy...`;
    } else if (lastLog.message.includes('[CMD]')) {
      type = 'cmd';
      techMessage = `[ACTOR_MODEL] Spawning lightweight isolated processes in Erlang VM. No shared memory locking required.`;
    } else {
      type = 'sys';
      techMessage = `[SYS] ${lastLog.message}`;
    }

    const newLog = {
      id: Date.now() + Math.random(),
      time: new Date().toISOString().substring(11, 19),
      message: techMessage,
      type
    };

    setConsoleLogs(prev => {
      const updated = [...prev, newLog];
      if (updated.length > 30) updated.shift();
      return updated;
    });

  }, [logs]);

  return (
    <div className="hud-panel diagnostic-console">
      <div className="panel-header">
        <span className="bracket">[</span>
        SYS_LOG :: BEAM_VM
        <span className="bracket">]</span>
      </div>
      <div className="console-body" ref={scrollRef}>
        <AnimatePresence>
          {consoleLogs.map((log) => (
            <motion.div 
              key={log.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`log-line ${log.type}`}
            >
              <span className="log-time">{log.time}</span>
              <span className="log-msg">{log.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DiagnosticConsole;
