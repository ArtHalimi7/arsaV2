import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimationControls } from 'framer-motion';
import heroRightImage from '../assets/images/heroright.png';

const words = [
  "Trockenbau",
  "Gipsarbeiten",
  "Akustikdecken",
  "Brandschutz"
];

const AnimatedBrick = ({ x, y, delay }) => {
  const controls = useAnimationControls();
  const [isHovered, setIsHovered] = React.useState(false);
  
  // Add slight random variations to make bricks look imperfect
  const height = 50 + (Math.random() * 4 - 2);
  const width = 100 + (Math.random() * 6 - 3);
  const roughness = 2; // Controls how "rough" the brick edges are
  
  // Create slightly irregular brick path
  const path = [
    `M ${x + width} ${y + (Math.random() * roughness - roughness/2)}`,
    `h ${-width}`,
    `c ${-Math.random() * roughness} ${Math.random() * roughness - roughness/2} ${-Math.random() * roughness} ${height/2} 0 ${height}`,
    `h ${width}`,
    `c ${Math.random() * roughness} ${-Math.random() * roughness + roughness/2} ${Math.random() * roughness} ${-height/2} 0 ${-height}`,
  ].join(' ');

  React.useEffect(() => {
    controls.start({
      pathLength: 1,
      opacity: 1,
      transition: { 
        duration: 1.5,
        delay: delay,
        ease: "easeInOut"
      }
    });
  }, []);

  return (
    <motion.path
      d={path}
      stroke="currentColor"
      strokeWidth="1.5"
      fill={isHovered ? "currentColor" : "none"}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={controls}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`${isHovered ? 'text-blue-500/30' : 'text-blue-300'} transition-colors duration-300`}
    />
  );
};

const BrickBackground = () => {
  const bricks = [];
  const rows = 16;
  const cols = 16;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      // Add slight random positioning for more natural look
      const jitter = Math.random() * 4 - 2;
      const x = (j * 120) + (i % 2 ? 60 : 0) + jitter;
      const y = i * 60 + (Math.random() * 4 - 2);
      
      // Calculate delay based on position for right-to-left effect
      const delay = ((cols - j) * 0.1) + (Math.random() * 0.5);
      
      bricks.push(
        <AnimatedBrick 
          key={`brick-${i}-${j}`}
          x={x}
          y={y}
          delay={delay}
        />
      );
    }
  }

  return (
    <div className="absolute inset-0 z-10">
      <div className="relative h-full w-full overflow-hidden">
        
        {/* SVG Container */}
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1800 900"
          preserveAspectRatio="xMidYMid slice"
        >
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {bricks}
          </motion.g>
        </svg>

        {/* Decorative elements */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute top-12 right-12 w-24 h-24 border-2 border-blue-200/30 rounded-full"
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-12 left-12 w-16 h-16 border-2 border-blue-200/30 rounded-full"
        />
      </div>
    </div>
  );
};

const DecorativeImage = () => {
  return (
    <div className="absolute right-[-50px] bottom-0 lg:block w-[350px] sm:w-[400px] md:w-[450px] lg:w-[500px] h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] z-30">
      {/* Construction Worker Image */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="absolute bottom-0 right-0 w-full h-full"
        style={{
          filter: 'drop-shadow(0 0 20px rgba(219,234,254,0.3))'
        }}
      >
        <img
          src={heroRightImage}
          alt="Construction worker with plywood"
          className="w-full h-full object-contain"
        />
      </motion.div>
    </div>
  );
};

const Hero = () => {
  const videoRef = useRef(null);
  const [currentWord, setCurrentWord] = React.useState(0);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }

    // Word flip animation timer
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[100vh] w-full overflow-hidden bg-gradient-to-br from-white to-blue-50">
      <div className="absolute inset-0 z-20 flex flex-col items-center sm:items-start justify-center px-4 sm:px-8 md:px-16 lg:px-24">
        <div className="w-full max-w-[90vw] lg:max-w-[50vw] text-center sm:text-left">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-4 sm:mb-8 w-full"
          >
            <span className="block text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-blue-900">
              Qualität in
            </span>
            <span className="block h-[100px] sm:h-[120px] md:h-[140px] lg:h-[180px]">
              <AnimatePresence mode='wait'>
                <motion.span
                  key={currentWord}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -50, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="block text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold text-blue-600"
                >
                  {words[currentWord]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 sm:mt-12"
          >
            <button className="group relative rounded-lg bg-blue-600 px-7 sm:px-8 py-3.5 sm:py-4 text-xl sm:text-xl md:text-2xl font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-blue-700 hover:shadow-blue-500/25">
              <span className="relative flex items-center gap-2">
                Kontaktieren Sie uns
                <svg 
                  className="h-5 w-5 sm:h-6 sm:w-6 transform transition-transform duration-300 group-hover:translate-x-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M14 5l7 7m0 0l-7 7m7-7H3" 
                  />
                </svg>
              </span>
            </button>
          </motion.div>
        </div>
      </div>
      
      <DecorativeImage />

      <BrickBackground />      
    </section>
  );
};

export default Hero;