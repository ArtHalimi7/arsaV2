import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logostroke.png';

const menuItems = [
  { title: 'Über Uns', href: '/about' },
  { title: 'Projekte', href: '/projekte' },
  { title: 'Kontakt', href: '/kontakt' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const { scrollY } = useScroll();
  
  // Use Framer Motion's useMotionValueEvent to detect scroll direction and position
  useMotionValueEvent(scrollY, "change", (latest) => {
    // Check if we're scrolling up or down
    const currentScrollY = latest;
    const scrollingDown = currentScrollY > lastScrollY;
    const scrollDifference = Math.abs(currentScrollY - lastScrollY);
    
    // Set scrolled state for background transparency effect
    setIsScrolled(currentScrollY > 50);
    
    // Only trigger hide/show when scroll amount is significant
    if (scrollDifference > 10) {
      setVisible(!scrollingDown || currentScrollY < 50);
      setLastScrollY(currentScrollY);
    }
  });

  return (
    <>
      {/* Main Navbar */}
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ y: 0 }}
        animate={{ y: visible ? 0 : -130 }} // Adjusted value to match new height
        transition={{ 
          duration: 0.3,
          ease: "easeInOut"
        }}
      >
        <motion.div 
          className="w-full shadow-lg backdrop-blur-sm relative overflow-hidden"
          initial={{ 
            height: '100px',
            backgroundColor: 'rgba(30, 64, 175, 0)' // Initially transparent
          }}
          animate={{ 
            height: '100px',
            backgroundColor: isScrolled ? 'rgba(30, 64, 175, 0.95)' : 'rgba(30, 64, 175, 0)',
            boxShadow: isScrolled ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' : 'none'
          }}
          transition={{ duration: 0.3 }}
          style={{
            borderBottom: !isScrolled ? '1px solid rgba(255, 255, 255, 0.3)' : 'none'
          }}
        >
          {/* Blueprint texture overlay - visible only when scrolled */}
          <motion.div 
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: isScrolled ? 0.1 : 0 }}
          >
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <pattern id="blueprint-grid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#ffffff" strokeWidth="0.5"/>
              </pattern>
              <rect width="100%" height="100%" fill="url(#blueprint-grid)" />
            </svg>
          </motion.div>
          
          {/* Larger blueprint elements - visible only when scrolled */}
          <motion.div 
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: isScrolled ? 0.05 : 0 }}
          >
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <pattern id="blueprint-large" x="0" y="0" width="100" height="80" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="40" r="2" fill="none" stroke="#ffffff" strokeWidth="0.5"/>
                <circle cx="80" cy="40" r="2" fill="none" stroke="#ffffff" strokeWidth="0.5"/>
                <path d="M 0 20 L 100 20" stroke="#ffffff" strokeWidth="0.5" strokeDasharray="5,5"/>
                <path d="M 0 60 L 100 60" stroke="#ffffff" strokeWidth="0.5" strokeDasharray="5,5"/>
              </pattern>
              <rect width="100%" height="100%" fill="url(#blueprint-large)" />
            </svg>
          </motion.div>
          
          {/* Bottom border line - only visible when transparent */}
          <motion.div 
            className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-white/0 via-white/30 to-white/0"
            initial={{ opacity: 0 }}
            animate={{ opacity: isScrolled ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          />
          
          <div className="max-w-full mx-auto px-6 lg:px-12 h-full relative z-10">
            <div className="flex items-center justify-between h-full">
              {/* Logo with hover effect - adjusted for larger navbar */}
              <motion.div 
                className="relative p-2"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Link to="/" className="relative flex items-center">
                  <img 
                    src={logo} 
                    alt="ARSA Logo" 
                    className="h-24 w-auto relative z-10 drop-shadow-lg" // Increased logo size
                  />
                </Link>
              </motion.div>
              
              {/* Desktop Navigation Links with enhanced hover effects */}
              <div className="hidden md:flex items-center space-x-12">
                {menuItems.map((item) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0.9 }}
                    whileHover={{ 
                      scale: 1.1,
                      opacity: 1
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className="relative pb-1" // Added padding for underline space
                  >
                    <Link
                      to={item.href}
                      className="text-white text-2xl font-medium relative group overflow-hidden" // Increased font size
                    >
                      <span className="relative z-10 drop-shadow-lg">{item.title}</span>
                      
                      {/* Primary animated underline */}
                      <motion.div
                        className="absolute bottom-0 left-0 w-full h-[4px] bg-white shadow-glow" // Thicker underline with glow
                        initial={{ scaleX: 0, originX: 0 }}
                        whileHover={{ scaleX: 1, originX: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      />
                      
                      {/* Secondary animated underline for glow effect */}
                      <motion.div
                        className="absolute bottom-0 left-0 w-full h-[2px] bg-white/60 blur-[1px]" // Blurred underline for glow
                        initial={{ scaleX: 0, originX: 0, opacity: 0 }}
                        whileHover={{ scaleX: 1.1, originX: 0, opacity: 1 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                      />
                      
                      <motion.div 
                        className="absolute inset-0 bg-blue-500 rounded-md -z-10"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileHover={{ opacity: 0.4, scale: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Menu Button - Mobile */}
              <motion.button
                onClick={() => setIsOpen(true)}
                className="md:hidden flex justify-center items-center w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Open menu"
              >
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.nav>

      {/* Mobile Sidebar Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm md:hidden"
            />

            {/* Mobile Sidebar */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 20 }}
              className="fixed top-0 right-0 h-full w-4/5 bg-gradient-to-b from-blue-600 to-blue-800 z-50 shadow-2xl md:hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/20 hover:bg-white/30"
              >
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>

              {/* Menu Items for Mobile */}
              <div className="pt-24 px-8 flex flex-col">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="mb-4"
                  >
                    <Link
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className="block py-4 text-xl font-medium text-white hover:text-blue-200 transition-colors border-b border-blue-500/30"
                    >
                      {item.title}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;