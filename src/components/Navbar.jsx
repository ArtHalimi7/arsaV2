import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

  return (
    <>
      {/* Main Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between h-24 rounded-2xl bg-gradient-to-r from-white/10 via-blue-100/10 to-white/10 backdrop-blur-lg border border-blue-200/20 shadow-lg px-6 relative">
            {/* Subtle inner glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/5 to-transparent"></div>
            
            {/* Logo with background decoration */}
            <div className="relative">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute inset-0 -m-2 bg-blue-500/20 backdrop-blur-sm rounded-full"
              />
              <Link to="/" className="relative flex items-center">
                <img 
                  src={logo} 
                  alt="ARSA Logo" 
                  className="h-16 w-auto relative z-10"
                />
              </Link>
            </div>

            {/* Menu Button */}
            <button
              onClick={() => setIsOpen(true)}
              className="p-3 rounded-xl bg-white/20 hover:bg-white/30 transition-colors duration-300 relative"
              aria-label="Open menu"
            >
              <svg
                className="h-10 w-10 text-blue-600"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </nav>

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

            {/* Updated Sidebar */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 20 }}
              className="fixed top-0 right-0 h-full w-full max-w-md md:max-w-xl lg:max-w-2xl bg-gradient-to-br from-blue-900 to-blue-800 z-50 shadow-2xl border-l border-white/20"
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