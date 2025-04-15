import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import beforeImg from '../assets/images/before1.png';
import afterImg from '../assets/images/after1.png';
import beforeImg2 from '../assets/images/before2.png';
import afterImg2 from '../assets/images/after2.png';
import gipser from '../assets/images/gipser.jpg';
import umbau from '../assets/images/umbau.jpg';
import maler from '../assets/images/maler.jpeg';
import renovation from '../assets/images/renovation.jpg';
import bathroom from '../assets/images/bathroom2.jpg';
import kitchen from '../assets/images/kitchen.jpg';
import floor from '../assets/images/floor.jpg'; 

// Brick Animation Component from Hero.jsx
const AnimatedBrick = ({ x, y, delay }) => {
  const controls = useAnimationControls();
  const [isHovered, setIsHovered] = React.useState(false);
  
  // Add slight random variations to make bricks look imperfect
  const height = 50 + (Math.random() * 4 - 2);
  const width = 100 + (Math.random() * 6 - 3);
  const roughness = 2; // Increased roughness for more texture
  
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
  }, [controls, delay]);

  return (
    <motion.path
      d={path}
      stroke="currentColor"
      strokeWidth="2.5" 
      fill={isHovered ? "currentColor" : "none"}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={controls}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`${isHovered ? 'text-blue-500/40' : 'text-blue-300/20'} transition-colors duration-300`}
    />
  );
};

const BrickWallDecoration = () => {
  const bricks = [];
  const rows = 5;  // Fewer rows to match the original pattern
  const cols = 4;  // Fewer columns to match the original pattern

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      // Add slight random positioning for more natural look
      const jitter = Math.random() * 4 - 2;
      const x = (j * 100) + (i % 2 ? 50 : 0) + jitter;
      const y = i * 60 + (Math.random() * 4 - 2);
      
      // Calculate delay based on position
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
    <div className="absolute bottom-36 right-0 w-96 h-96 translate-x-20 translate-y-32 z-0">
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-blue-500"
        >
          {bricks}
        </motion.g>
      </svg>
    </div>
  );
};

// Add before/after slider implementation
const BeforeAfterSlider = ({ beforeImage, afterImage, title }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef(null);

  // Update container width when component mounts or window resizes
  useEffect(() => {
    const updateContainerWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateContainerWidth();
    window.addEventListener('resize', updateContainerWidth);
    return () => window.removeEventListener('resize', updateContainerWidth);
  }, []);

  // Handle mouse and touch events for slider
  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseMove = (e) => {
    if (!isDragging || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const newPosition = (x / rect.width) * 100;
    setSliderPosition(Math.min(Math.max(newPosition, 0), 100));
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const newPosition = (x / rect.width) * 100;
    setSliderPosition(Math.min(Math.max(newPosition, 0), 100));
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: false, margin: "-100px" }}
      className="relative overflow-hidden shadow-xl mt-16 mb-16 max-w-5xl mx-auto" // Changed from max-w-7xl to max-w-5xl
    >
      {title && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 bg-white/80 backdrop-blur-sm py-2 px-6 rounded-full shadow-lg">
          <h4 className="text-lg font-medium text-blue-900">{title}</h4>
        </div>
      )}
      <div 
        ref={containerRef}
        className="relative h-[70vh] select-none"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
        onTouchMove={handleTouchMove}
      >
        {/* After image (full width) */}
        <div className="absolute inset-0 z-10">
          <img 
            src={afterImage}
            alt="After"
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Before image (clipped by slider) */}
        <div 
          className="absolute inset-0 z-20 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <img 
            src={beforeImage}
            alt="Before"
            className="absolute top-0 left-0 h-full object-cover"
            style={{ 
              width: containerWidth ? `${containerWidth}px` : '100%',
              maxWidth: 'none'
            }}
          />
        </div>              
        {/* Slider control */}
        <div 
          className="absolute top-0 bottom-0 z-30 w-0.5 bg-white shadow-lg cursor-ew-resize"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 left-1/2 w-12 h-12 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 shadow-lg flex items-center justify-center border-2 border-blue-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
        
        {/* Labels */}
        <div className="absolute top-4 left-4 z-40 bg-black/70 text-white py-1 px-3 rounded-full text-sm font-medium">
          Vorher
        </div>
        <div className="absolute top-4 right-4 z-40 bg-black/70 text-white py-1 px-3 rounded-full text-sm font-medium">
          Nachher
        </div>
      </div>
    </motion.div>
  );
};

const Services = () => {
  // Add scroll to top effect when component mounts
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);
  
  // Updated image variants - removed container staggering approach
  const imageVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.97 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };
  
  return (
    <div className="relative bg-gradient-to-b from-blue-50/30 to-white">
      
      {/* Enhanced blue crack in wall - top left */}
      <div className="absolute top-0 left-0 w-80 h-80 opacity-30 -translate-x-12 -translate-y-12 z-0">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path 
            d="M200,0 L160,45 L170,60 L155,75 L170,90 L150,110 L160,120 L145,135 L150,160 L135,170 L140,190 L120,200" 
            fill="none" 
            stroke="#2563eb" 
            strokeWidth="1.2" 
            strokeLinecap="round" 
          />
          <path 
            d="M170,60 L188,72" 
            fill="none" 
            stroke="#2563eb" 
            strokeWidth="1" 
            strokeLinecap="round" 
          />
          <path 
            d="M155,75 L140,70" 
            fill="none" 
            stroke="#2563eb" 
            strokeWidth="1" 
            strokeLinecap="round" 
          />
          <path 
            d="M150,110 L135,100" 
            fill="none" 
            stroke="#2563eb" 
            strokeWidth="0.8" 
            strokeLinecap="round" 
          />
        </svg>
      </div>
      
      {/* Using the Hero-style brick wall in the bottom right */}
      <BrickWallDecoration />
      
      {/* Subtle grid pattern overlay - represents drywall panels */}
      <div className="absolute inset-0 opacity-5 z-0">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="drywall" patternUnits="userSpaceOnUse" width="100" height="100">
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#000" strokeWidth="1"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#drywall)" />
        </svg>
      </div>
      
      {/* Blueprint decorative elements */}
      <div className="absolute top-40 left-10 w-60 h-60 rounded-full bg-blue-100/20 blur-3xl z-0"></div>
      <div className="absolute bottom-60 right-10 w-80 h-80 rounded-full bg-blue-200/30 blur-3xl z-0"></div>
      
      {/* Decorative blueprint symbols */}
      <svg className="absolute top-1/4 left-0 w-16 h-16 text-blue-300/20 z-0" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1" />
        <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="1" />
        <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="1" />
      </svg>
      
      <svg className="absolute bottom-1/3 right-0 w-24 h-24 text-blue-300/20 z-0" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="20" width="60" height="60" stroke="currentColor" strokeWidth="1" />
        <line x1="20" y1="20" x2="80" y2="80" stroke="currentColor" strokeWidth="1" />
        <line x1="80" y1="20" x2="20" y2="80" stroke="currentColor" strokeWidth="1" />
      </svg>
      
      {/* Compass blueprint decoration */}
      <svg className="absolute top-3/4 left-1/4 w-32 h-32 text-blue-400/10 z-0" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="1" />
        <line x1="50" y1="2" x2="50" y2="98" stroke="currentColor" strokeWidth="1" />
        <line x1="2" y1="50" x2="98" y2="50" stroke="currentColor" strokeWidth="1" />
        <line x1="25" y1="25" x2="75" y2="75" stroke="currentColor" strokeWidth="1" />
        <line x1="75" y1="25" x2="25" y2="75" stroke="currentColor" strokeWidth="1" />
      </svg>

      {/* Main content */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Enhanced title with decorative elements like in BeforeAfterGallery */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: false, margin: "-100px" }}
          className="text-center mt-16"
        >
          <motion.div
            className="inline-block relative"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: false, margin: "-100px" }}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-blue-900 mb-4 relative z-10"
            >
              Unsere Projektgalerie
            </motion.h2>
            
            {/* Animated underline */}
            <motion.div
              className="absolute bottom-4 left-0 right-0 h-2 bg-blue-400/60"
              initial={{ width: 0, left: '50%' }}
              whileInView={{ width: '100%', left: '0%' }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: false, margin: "-100px" }}
            />
            
            {/* Left corner decoration */}
            <svg className="absolute -left-8 -top-8 w-16 h-16 opacity-30" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path d="M20,0 V40 H60" stroke="#2563eb" strokeWidth="2" fill="none" />
            </svg>
            
            {/* Right corner decoration */}
            <svg className="absolute -right-8 -top-8 w-16 h-16 opacity-30" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path d="M80,0 V40 H40" stroke="#2563eb" strokeWidth="2" fill="none" />
            </svg>
            
            {/* Left bottom corner decoration */}
            <svg className="absolute -left-6 bottom-0 w-12 h-12 opacity-30" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,80 H40 V40" stroke="#2563eb" strokeWidth="2" fill="none" />
            </svg>
            
            {/* Right bottom corner decoration */}
            <svg className="absolute -right-6 bottom-0 w-12 h-12 opacity-30" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path d="M100,80 H60 V40" stroke="#2563eb" strokeWidth="2" fill="none" />
            </svg>
          </motion.div>
          
          <motion.p 
            className="text-lg text-blue-800/70 max-w-3xl mx-auto mt-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            viewport={{ once: false, margin: "-100px" }}
          >
            Entdecken Sie unsere abgeschlossenen Renovierungsprojekte
          </motion.p>
          
          {/* Decorative element below text */}
          <motion.div 
            className="mt-8 opacity-30 mx-auto w-64 h-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 0.3, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            viewport={{ once: false, margin: "-100px" }}
          >
            <svg width="100%" height="100%" viewBox="0 0 200 10" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,5 H200" stroke="#2563eb" strokeWidth="1" />
              <path d="M50,1 V9 M100,1 V9 M150,1 V9" stroke="#2563eb" strokeWidth="1.5" />
              <circle cx="50" cy="5" r="2" fill="#2563eb" />
              <circle cx="100" cy="5" r="2" fill="#2563eb" />
              <circle cx="150" cy="5" r="2" fill="#2563eb" />
            </svg>
          </motion.div>
        </motion.div>
        
        {/* Modified gallery - removed variants and whileInView from container */}
        <div className="flex flex-col space-y-6 max-w-7xl mx-auto">
          {/* 1. Gipsergeschäft - Modified to animate on scroll */}
          <motion.div 
            className="w-full mt-6 h-80 overflow-hidden group relative"
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            <motion.img 
              src={gipser}
              alt="Gipsergeschäft" 
              className="w-full h-full object-cover transition-transform duration-700"
              whileHover={{ scale: 1.05 }}
              initial={{ scale: 1.03 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-xl font-semibold">Gipsergeschäft</h3>
                <p className="text-sm mt-1">Professionelle Gipserarbeiten</p>
              </div>
            </div>
          </motion.div>
          
          {/* 2. Umbauarbeiten - Modified to animate on scroll */}
          <motion.div 
            className="w-full h-80 overflow-hidden group relative"
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            <motion.img 
              src={umbau} 
              alt="Umbauarbeiten" 
              className="w-full h-full object-cover transition-transform duration-700"
              whileHover={{ scale: 1.05 }}
              initial={{ scale: 1.03 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-xl font-semibold">Umbauarbeiten</h3>
                <p className="text-sm mt-1">Komplette Raumgestaltung</p>
              </div>
            </div>
          </motion.div>
          
          {/* 3. Malergeschäft */}
          <motion.div 
            className="w-full h-80 overflow-hidden group relative"
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            <motion.img 
              src={maler} 
              alt="Malergeschäft" 
              className="w-full h-full object-cover transition-transform duration-700"
              whileHover={{ scale: 1.05 }}
              initial={{ scale: 1.03 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-xl font-semibold">Malergeschäft</h3>
                <p className="text-sm mt-1">Hochwertige Malerarbeiten</p>
              </div>
            </div>
          </motion.div>
          
          {/* 4. Renovierung */}
          <motion.div 
            className="w-full h-80 overflow-hidden group relative"
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            <motion.img 
              src={renovation} 
              alt="Renovierung" 
              className="w-full h-full object-cover transition-transform duration-700"
              whileHover={{ scale: 1.05 }}
              initial={{ scale: 1.03 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-xl font-semibold">Renovierung</h3>
                <p className="text-sm mt-1">Komplette Raumsanierung</p>
              </div>
            </div>
          </motion.div>
          
          {/* 5. Bathroom renovation */}
          <motion.div 
            className="w-full md:h-[600px] h-80 overflow-hidden group relative"
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            <motion.img 
              src={bathroom} 
              alt="Badezimmer Umbau" 
              className="w-full h-full object-cover transition-transform duration-700"
              whileHover={{ scale: 1.05 }}
              initial={{ scale: 1.03 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-xl font-semibold">Badezimmer Umbau</h3>
                <p className="text-sm mt-1">Moderne Badgestaltung</p>
              </div>
            </div>
          </motion.div>
          
          {/* 6. Kitchen renovation */}
          <motion.div 
            className="w-full h-80 overflow-hidden group relative"
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            <motion.img 
              src={kitchen} 
              alt="Küche Renovation" 
              className="w-full h-full object-cover transition-transform duration-700"
              whileHover={{ scale: 1.05 }}
              initial={{ scale: 1.03 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-xl font-semibold">Küche Renovation</h3>
                <p className="text-sm mt-1">Funktionale Küchengestaltung</p>
              </div>
            </div>
          </motion.div>
          
          {/* 7. Building exterior */}
          <motion.div 
            className="w-full h-80 overflow-hidden group relative"
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            <motion.img 
              src="https://content.presspage.com/uploads/1207/1920_502678-502680-renovactive-1280x600.jpg?10000" 
              alt="Gebäuderenovierung" 
              className="w-full h-full object-cover transition-transform duration-700"
              whileHover={{ scale: 1.05 }}
              initial={{ scale: 1.03 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-xl font-semibold">Gebäuderenovierung</h3>
                <p className="text-sm mt-1">Komplette Fassadenarbeiten</p>
              </div>
            </div>
          </motion.div>
          
          {/* 8. Flooring work */}
          <motion.div 
            className="w-full md:h-[550px] overflow-hidden group relative"
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            <motion.img 
              src={floor}
              alt="Bodenbelag" 
              className="w-full h-full object-cover transition-transform duration-700"
              whileHover={{ scale: 1.05 }}
              initial={{ scale: 1.03 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-xl font-semibold">Bodenbelag</h3>
                <p className="text-sm mt-1">Hochwertige Bodenverlegung</p>
              </div>
            </div>
          </motion.div>

          {/* For desktop layout - hidden on mobile, shown on md screens and above */}
          <div className="hidden md:block">
            <style jsx>{`
              @media (min-width: 768px) {
                .flex.flex-col {
                  display: grid;
                  grid-template-columns: repeat(3, 1fr);
                  gap: 1.5rem;
                }
                .flex.flex-col > div:nth-child(1) { grid-column: span 2; }
                .flex.flex-col > div:nth-child(4) { grid-column: span 2; }
                .flex.flex-col > div:nth-child(5) { grid-column: span 3; }
                .flex.flex-col > div:nth-child(7) { grid-column: span 2; }
                .flex.flex-col > div:nth-child(8) { grid-column: span 2; }
              }
            `}</style>
          </div>
        </div>
        
        {/* Add section title for the before/after slider */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: false, margin: "-100px" }}
          className="text-center mt-10"
        >
          <motion.h3
            className="text-3xl font-bold text-blue-900 inline-block relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: false, margin: "-100px" }}
          >
            Vorher / Nachher Vergleich
            <motion.div
              className="absolute -bottom-2 left-0 right-0 h-1 bg-blue-400/60"
              initial={{ width: 0, left: '50%' }}
              whileInView={{ width: '100%', left: '0%' }}
              transition={{ delay: 0.5, duration: 0.8 }}
              viewport={{ once: false, margin: "-100px" }}
            />
          </motion.h3>
          <motion.p
            className="text-lg text-blue-800/70 max-w-2xl mx-auto mt-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: false, margin: "-100px" }}
          >
            Sehen Sie die beeindruckende Transformation unserer Renovierungsarbeiten
          </motion.p>
        </motion.div>
        
        {/* Add the before/after slider component */}
        <BeforeAfterSlider beforeImage={beforeImg} afterImage={afterImg} />
        <BeforeAfterSlider beforeImage={beforeImg2} afterImage={afterImg2} />
      </div>
    </div>
  );
};

export default Services;