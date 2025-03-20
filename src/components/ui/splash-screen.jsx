import React from 'react';
import { motion } from 'framer-motion';
import logo from '../../assets/images/logostroke.png';

const SplashScreen = () => {
  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: '-100%' }}
      transition={{ 
        duration: 1.2, // Increased duration
        ease: [0.22, 1, 0.36, 1], // Custom cubic-bezier for smoother feel
        type: "tween" // Ensures consistent motion
      }}
      className="fixed inset-0 z-50"
    >
      <div className="relative h-screen bg-gradient-to-br from-blue-900 to-blue-700 overflow-hidden">
        {/* Blueprint grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <pattern id="blueprint-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ffffff" strokeWidth="0.5"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#blueprint-grid)" />
          </svg>
        </div>

        {/* Animated background text */}
        <div className="absolute inset-0 flex items-center overflow-hidden">
          <motion.div
            initial={{ x: '0%' }}
            animate={{ x: '-100%' }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="whitespace-nowrap text-[180px] font-bold text-white/5"
          >
            ARSA GIPSER QUALITÄT&nbsp;&nbsp;&nbsp;&nbsp;
          </motion.div>
        </div>

        {/* Main content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ 
              scale: 0.8,
              opacity: 0,
              y: -40 // Added vertical movement
            }}
            transition={{ 
              duration: 1,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="mb-8"
          >
            <img 
              src={logo} 
              alt="ARSA Logo" 
              className="h-48 w-auto drop-shadow-2xl"
            />
          </motion.div>

          {/* Animated underline with adjusted exit */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "200px" }}
            exit={{ 
              width: 0,
              transition: { duration: 0.8 }
            }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-1 bg-white shadow-glow mb-8"
          />

          {/* Loading indicator with smoother exit */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ 
              opacity: 0,
              y: -20,
              transition: { duration: 0.8 }
            }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <div className="text-white text-xl mb-4">Willkommen</div>
            <div className="flex items-center space-x-2">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.5, 1]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-3 h-3 rounded-full bg-white"
              />
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.5, 1]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.2
                }}
                className="w-3 h-3 rounded-full bg-white"
              />
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.5, 1]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.4
                }}
                className="w-3 h-3 rounded-full bg-white"
              />
            </div>
          </motion.div>

          {/* Decorative elements with smoother exit */}
          <motion.div
            className="absolute top-20 left-20 w-32 h-32 rounded-full bg-blue-400/20 blur-2xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            exit={{ 
              scale: 0.8,
              opacity: 0,
              transition: { duration: 1 }
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-40 h-40 rounded-full bg-blue-300/20 blur-2xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.6, 0.3],
            }}
            exit={{ 
              scale: 0.8,
              opacity: 0,
              transition: { duration: 1 }
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default SplashScreen;