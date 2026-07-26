import { useState, useEffect, useCallback } from 'react';
import { Socket } from 'phoenix';

export const useSimulationSocket = () => {
  const [metrics, setMetrics] = useState({
    stats: { total: 0, processing: 0, idle: 0, error: 0 },
    rps: 0
  });
  
  const [rpsHistory, setRpsHistory] = useState(Array(20).fill(0));
  const [logs, setLogs] = useState([]);
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    // Connect to Phoenix Socket
    const socket = new Socket("ws://localhost:4000/socket");
    socket.connect();

    const channel = socket.channel("simulation:lobby", {});
    
    channel.join()
      .receive("ok", resp => {
        console.log("Joined successfully", resp);
        addLog("SYSTEM ONLINE: Connected to Elixir BEAM Node.");
      })
      .receive("error", resp => {
        console.log("Unable to join", resp);
        addLog("CRITICAL: Failed to connect to cluster.", "error");
      });

    // Listen for metrics updates
    channel.on("metrics_update", payload => {
      setMetrics(prev => {
        if (prev.rps !== payload.rps) {
          setRpsHistory(history => {
            const newHistory = [...history, payload.rps];
            if (newHistory.length > 20) newHistory.shift();
            return newHistory;
          });
        }
        return payload;
      });
    });

    setChannel(channel);

    return () => {
      channel.leave();
      socket.disconnect();
    };
  }, []);

  const addLog = (msg, type = "info") => {
    setLogs(prev => [...prev, { id: Date.now(), msg, type }]);
  };

  const spawnWorkers = useCallback((count) => {
    if (channel) {
      channel.push("spawn_workers", { count });
      addLog(`[CMD] Bootstrapping ${count} isolated processes.`);
    }
  }, [channel]);

  const simulateSpike = useCallback(() => {
    if (channel) {
      channel.push("simulate_spike", {});
      addLog(`[WARN] Network traffic spike detected. Initiating load balancing.`);
    }
  }, [channel]);

  const killRandom = useCallback((count) => {
    if (channel) {
      channel.push("kill_random", { count });
      addLog(`[CRITICAL] Kernel Panic in ${count} nodes.`);
    }
  }, [channel]);
  
  const purgeCluster = useCallback(() => {
    if (channel) {
      channel.push("purge_cluster", {});
      addLog(`[FATAL] SYSTEM PURGE INITIATED. Destroying all processes.`);
    }
  }, [channel]);

  return { metrics, rpsHistory, logs, spawnWorkers, simulateSpike, killRandom, purgeCluster };
};
