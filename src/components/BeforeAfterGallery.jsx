import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import beforeImg from '../assets/images/before1.png';
import afterImg from '../assets/images/after1.png';
import { useNavigate } from 'react-router-dom';

// Example project data - replace with your actual project images
const projects = [
  {
    id: 1,
    title: 'Moderne Wohnzimmerrenovierung',
    description: 'Komplette Trockenbau-Renovation mit integrierter Beleuchtung',
    beforeImg: beforeImg, // Using local image
    afterImg: afterImg, // Using local image
  },
];

const BeforeAfterGallery = () => {
  const navigate = useNavigate();
  const [activeProject, setActiveProject] = useState(0);
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

  // Also update container width when active project changes
  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
  }, [activeProject]);

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

  const handleViewMoreClick = () => {
    navigate('/projekte');
  };

  return (
    <div className="py-24 px-4 relative bg-gradient-to-b from-blue-50 to-white overflow-hidden">
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
      
      {/* Refined cartoon-style blue brick wall pattern - bottom right */}
      <div className="absolute bottom-[-40px] right-0 w-96 h-96 opacity-30 translate-x-20 translate-y-20 z-0">
        <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          
          {/* Row 2 - offset for natural look */}
          <rect x="0" y="50" width="75" height="38" fill="none" stroke="#1e40af" strokeWidth="2" />
          <rect x="85" y="55" width="65" height="33" fill="none" stroke="#1e40af" strokeWidth="2" />
          <rect x="160" y="48" width="85" height="40" fill="none" stroke="#1e40af" strokeWidth="2" />
          <rect x="255" y="52" width="60" height="36" fill="none" stroke="#1e40af" strokeWidth="2" />
          <rect x="325" y="48" width="70" height="40" fill="none" stroke="#1e40af" strokeWidth="2" />
          
          {/* Row 3 - more natural variation */}
          <rect x="15" y="98" width="90" height="35" fill="none" stroke="#1e40af" strokeWidth="2" />
          <rect x="115" y="95" width="65" height="38" fill="none" stroke="#1e40af" strokeWidth="2" />
          <rect x="190" y="100" width="75" height="33" fill="none" stroke="#1e40af" strokeWidth="2" />
          <rect x="275" y="96" width="55" height="37" fill="none" stroke="#1e40af" strokeWidth="2" />
          
          {/* Row 4 - varied heights and positions */}
          <rect x="5" y="143" width="70" height="35" fill="none" stroke="#1e40af" strokeWidth="2" />
          <rect x="85" y="148" width="80" height="30" fill="none" stroke="#1e40af" strokeWidth="2" />
          <rect x="175" y="140" width="60" height="38" fill="none" stroke="#1e40af" strokeWidth="2" />
          <rect x="245" y="145" width="85" height="33" fill="none" stroke="#1e40af" strokeWidth="2" />
          <rect x="340" y="142" width="55" height="36" fill="none" stroke="#1e40af" strokeWidth="2" />
          
          {/* Row 5 - natural variation */}
          <rect x="20" y="188" width="85" height="37" fill="none" stroke="#1e40af" strokeWidth="2" />
          <rect x="115" y="190" width="65" height="35" fill="none" stroke="#1e40af" strokeWidth="2" />
          <rect x="190" y="185" width="70" height="40" fill="none" stroke="#1e40af" strokeWidth="2" />
          <rect x="270" y="192" width="55" height="33" fill="none" stroke="#1e40af" strokeWidth="2" />
          <rect x="335" y="187" width="65" height="38" fill="none" stroke="#1e40af" strokeWidth="2" />
        </svg>
      </div>
      
      {/* Subtle grid pattern overlay - represents drywall panels */}
      <div className="absolute inset-0 opacity-5 z-0">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="drywall" patternUnits="userSpaceOnUse" width="100" height="100">
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#000" strokeWidth="1"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#drywall)" />
        </svg>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced title with decorative elements like in HorizontalScrollSection */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-block relative"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-blue-900 mb-4 relative z-10"
            >
              Unsere Projektgalerie
            </motion.h2>
            
            {/* Adjusted animated underline - moved up, thicker, lighter color */}
            <motion.div
              className="absolute bottom-4 left-0 right-0 h-2 bg-blue-400/60"
              initial={{ width: 0, left: '50%' }}
              whileInView={{ width: '100%', left: '0%' }}
              transition={{ delay: 0.3, duration: 0.8 }}
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
          >
            Sehen Sie die Transformation unserer Projekte vor und nach der Fertigstellung
          </motion.p>
          
          {/* Decorative element below text */}
          <motion.div 
            className="mt-8 opacity-30 mx-auto w-64 h-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 0.3, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
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

        {/* Before/After Slider - BOTTOM SECTION */}
        {projects[activeProject] && (
          <motion.div 
            key={activeProject}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative rounded-2xl overflow-hidden border-2 border-blue-100 shadow-xl mt-12"
          >
            <div 
              ref={containerRef}
              className="relative h-[80vh] select-none" 
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
                  src={projects[activeProject].afterImg}
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
                  src={projects[activeProject].beforeImg}
                  alt="Before"
                  className="absolute top-0 left-0 h-full object-cover"
                  style={{ 
                    width: containerWidth ? `${containerWidth}px` : '100%',
                    maxWidth: 'none'
                  }}
                />
              </div>              
              {/* Slider control - cartoon blue style */}
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
        )}
        
        {/* Add the View More button after the slider */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center mt-10 mb-4"
        >
          <button 
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg 
                       shadow-lg transition-all duration-300 transform hover:scale-105 
                       flex items-center space-x-2 group border border-blue-400"
            onClick={handleViewMoreClick}
          >
            <span className="font-medium text-lg">Mehr anzeigen</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default BeforeAfterGallery;