import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';

const menuItems = [
  { title: 'Home', href: '/' },
  { title: 'Leistungen', href: '/services' },
  { title: 'Über Uns', href: '/about' },
  { title: 'Projekte', href: '/projects' },
  { title: 'Kontakt', href: '/contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  const { scrollY } = useScroll();
  
  // Use Framer Motion's useMotionValueEvent to detect scroll direction
  useMotionValueEvent(scrollY, "change", (latest) => {
    // Check if we're scrolling up or down
    const currentScrollY = latest;
    const scrollingDown = currentScrollY > lastScrollY;
    const scrollDifference = Math.abs(currentScrollY - lastScrollY);
    
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
        className="fixed top-0 left-0 right-0 z-50 px-4 py-4"
        initial={{ y: 0 }}
        animate={{ y: visible ? 0 : -120 }}
        transition={{ 
          duration: 0.3,
          ease: "easeInOut"
        }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="flex items-center justify-between h-24 rounded-2xl bg-gradient-to-r from-white/10 via-blue-100/20 to-white/10 backdrop-blur-lg border border-double border-blue-300 shadow-lg px-6 relative overflow-hidden"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 animate-gradient-x"></div>
            
            {/* Floating particles effect */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-blue-400/10"
                  animate={{
                    x: [0, 100, 0],
                    y: [0, -50, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    delay: i * 0.8,
                    ease: "linear",
                  }}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                />
              ))}
            </div>

            {/* Logo with hover effect */}
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link to="/" className="relative flex items-center">
                <img 
                  src={logo} 
                  alt="ARSA Logo" 
                  className="h-20 w-auto relative z-10 drop-shadow-lg"
                />
              </Link>
            </motion.div>

            {/* Menu Button with improved hover effect */}
            <motion.button
              onClick={() => setIsOpen(true)}
              className="p-3 rounded-xl bg-gradient-to-r from-blue-500/10 to-blue-600/10 hover:from-blue-500/20 hover:to-blue-600/20 transition-all duration-300 relative group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Open menu"
            >
              <svg
                className="h-10 w-10 text-blue-600 transition-transform duration-300 group-hover:rotate-90"
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
          </motion.div>
        </div>
      </motion.nav>

      {/* Sidebar Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/30 z-50 backdrop-blur-md"
            />

            {/* Updated Sidebar with narrower mobile width */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 20 }}
              className="fixed top-0 right-0 h-full w-4/5 sm:w-full sm:max-w-md md:max-w-xl lg:max-w-2xl bg-gradient-to-br from-blue-900 to-blue-800 z-50 border-l border-white/20"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-8 right-8 p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors duration-300"
              >
                <svg
                  className="h-8 w-8 text-white"
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

              {/* Menu Items */}
              <div className="pt-32 px-12 flex flex-col items-end">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="w-full text-right"
                  >
                    <Link
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className="block py-6 text-4xl lg:text-5xl font-semibold text-white hover:text-blue-200 transition-colors"
                    >
                      {item.title}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Decorative elements for sidebar */}
              <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-blue-950 to-transparent pointer-events-none"></div>
              <div className="absolute top-24 left-24 w-40 h-40 rounded-full border-2 border-white/10"></div>
              <div className="absolute bottom-24 right-24 w-32 h-32 rounded-full border-2 border-white/10"></div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;