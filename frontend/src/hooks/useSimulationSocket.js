import { useState, useEffect, useCallback } from 'react';
import { Socket } from 'phoenix';

export const useSimulationSocket = () => {
  const [socket, setSocket] = useState(null);
  const [channel, setChannel] = useState(null);
  const [metrics, setMetrics] = useState({
    stats: { idle: 0, processing: 0, success: 0, error: 0, total: 0 },
    rps: 0,
    timestamp: Date.now()
  });
  
  // Keep a history of RPS for the graph
  const [rpsHistory, setRpsHistory] = useState([]);
  const [logs, setLogs] = useState([]);

  const addLog = useCallback((message) => {
    setLogs(prev => {
      const newLogs = [...prev, { time: new Date().toLocaleTimeString(), message }];
      if (newLogs.length > 50) newLogs.shift();
      return newLogs;
    });
  }, []);

  useEffect(() => {
    const phxSocket = new Socket('ws://localhost:4000/socket');
    phxSocket.connect();

    const phxChannel = phxSocket.channel('simulation', {});

    phxChannel.join()
      .receive('ok', (resp) => {
        addLog(`System Connected. Active Workers: ${resp.active_workers}`);
      });

    phxChannel.on('metrics_update', (payload) => {
      setMetrics(payload);
      
      setRpsHistory(prev => {
        const newHistory = [...prev, payload.rps];
        if (newHistory.length > 30) newHistory.shift();
        return newHistory;
      });
      
      if (payload.stats.error > 0 && Math.random() > 0.8) {
         addLog(`[WARN] Cluster node errors detected: ${payload.stats.error}`);
      }
    });

    setSocket(phxSocket);
    setChannel(phxChannel);

    return () => {
      phxChannel.leave();
      phxSocket.disconnect();
    };
  }, [addLog]);

  const spawnWorkers = useCallback((count) => {
    if (channel) {
      channel.push('spawn_workers', { count });
      addLog(`[CMD] Spawning ${count} new worker nodes...`);
    }
  }, [channel, addLog]);

  const simulateSpike = useCallback(() => {
    if (channel) {
      channel.push('simulate_spike', {});
      addLog(`[CMD] Simulating massive load spike across cluster...`);
    }
  }, [channel, addLog]);

  const killRandom = useCallback((count) => {
    if (channel) {
      channel.push('kill_random', { count });
      addLog(`[CRITICAL] Chaos Monkey: Killed ${count} nodes.`);
    }
  }, [channel, addLog]);

  return {
    metrics,
    rpsHistory,
    logs,
    spawnWorkers,
    simulateSpike,
    killRandom
  };
};
