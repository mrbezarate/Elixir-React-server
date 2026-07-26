import React from 'react';
import { motion } from 'framer-motion';

const Background = () => {
  return (
    <div className="bg-container">
      {/* Animated Grid */}
      <div className="bg-grid"></div>

      {/* Deep Glow Orbs */}
      <motion.div 
        className="glow-orb orb-1"
        animate={{
          x: [0, 100, 0, -100, 0],
          y: [0, 50, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div 
        className="glow-orb orb-2"
        animate={{
          x: [0, -100, 0, 100, 0],
          y: [0, -50, 50, 0],
          scale: [1, 1.5, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

export default Background;
