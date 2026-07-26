import React from 'react';
import { motion } from 'framer-motion';

const NetworkGraph = ({ metrics }) => {
  const { processing, total } = metrics.stats;
  
  // Calculate flow speed based on processing percentage
  const flowSpeed = total > 0 ? Math.max(0.2, 2 - (processing / total) * 1.5) : 2;
  const isHighLoad = processing > (total * 0.5) && total > 100;

  return (
    <div className="network-graph">
      <svg width="100%" height="300" viewBox="0 0 800 300" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#ff003c" stopOpacity="0.8" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Base connecting lines */}
        {[50, 150, 250].map((y, i) => (
          <path 
            key={`path-${i}`}
            d={`M 100 150 C 300 150, 500 ${y}, 700 ${y}`} 
            fill="none" 
            stroke="url(#line-gradient)" 
            strokeWidth="2"
            opacity="0.5"
          />
        ))}

        {/* Animated Data Packets */}
        {total > 0 && [50, 150, 250].map((y, i) => (
          Array.from({ length: isHighLoad ? 10 : 3 }).map((_, j) => (
            <motion.circle
              key={`packet-${i}-${j}`}
              r="4"
              fill={isHighLoad ? "#ff003c" : "#00f0ff"}
              filter="url(#glow)"
              animate={{
                offsetDistance: ["0%", "100%"]
              }}
              transition={{
                duration: flowSpeed + Math.random(),
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 2
              }}
              style={{
                offsetPath: `path("M 100 150 C 300 150, 500 ${y}, 700 ${y}")`
              }}
            />
          ))
        ))}

        {/* Nodes */}
        <circle cx="100" cy="150" r="30" fill="#1e293b" stroke="#00f0ff" strokeWidth="3" filter="url(#glow)" />
        <text x="100" y="155" fill="#fff" fontSize="12" textAnchor="middle">Gateway</text>

        {[50, 150, 250].map((y, i) => (
          <g key={`cluster-${i}`}>
            <circle cx="700" cy={y} r="25" fill="#1e293b" stroke={isHighLoad ? "#ff003c" : "#00f0ff"} strokeWidth="3" filter="url(#glow)" />
            <text x="700" y={y + 4} fill="#fff" fontSize="10" textAnchor="middle">Node {i+1}</text>
          </g>
        ))}
      </svg>
    </div>
  );
};

export default NetworkGraph;
