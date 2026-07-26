import React from 'react';
import WorkerNode from './WorkerNode';

const WorkerGrid = ({ workers }) => {
  const workerList = Object.values(workers).sort((a, b) => a.id - b.id);

  return (
    <div className="worker-grid-container">
      <div className="worker-grid">
        {workerList.map(worker => (
          <WorkerNode key={worker.id} worker={worker} />
        ))}
      </div>
    </div>
  );
};

export default WorkerGrid;
