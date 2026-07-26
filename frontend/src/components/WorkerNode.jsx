import React from 'react';
import { motion } from 'framer-motion';

const getStatusColor = (status) => {
  switch (status) {
    case 'idle':
      return '#4b5563'; // Gray
    case 'processing':
      return '#3b82f6'; // Blue
    case 'success':
      return '#10b981'; // Green
    case 'error':
      return '#ef4444'; // Red
    default:
      return '#4b5563';
  }
};

const WorkerNode = ({ worker }) => {
  const isError = worker.status === 'error';
  const isProcessing = worker.status === 'processing';

  return (
    <motion.div
      layout
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: 1,
        opacity: 1,
        backgroundColor: getStatusColor(worker.status),
        boxShadow: isProcessing
          ? '0 0 15px 5px rgba(59, 130, 246, 0.5)'
          : isError
          ? '0 0 15px 5px rgba(239, 68, 68, 0.5)'
          : '0 0 0px 0px rgba(0,0,0,0)',
        x: isError ? [0, -5, 5, -5, 5, 0] : 0
      }}
      transition={{
        duration: 0.3,
        x: { duration: 0.4 } // Shake animation duration
      }}
      className="worker-node"
    />
  );
};

export default React.memo(WorkerNode);
