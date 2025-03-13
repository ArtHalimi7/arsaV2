import React from 'react';
import { motion } from 'framer-motion';

const GoogleMapsSection = () => {
  return (
    <div className="relative w-full">
      {/* Title Section with max width container */}
      <div className="max-w-7xl mx-auto px-4 py-12 flex justify-center">
        <div className="relative">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-blue-900 relative z-10 text-center whitespace-nowrap"
          >
            Unser Standort
          </motion.h2>

          {/* Updated underline animation */}
          <motion.div
            className="absolute -bottom-2 left-0 h-2 bg-blue-400/60 rounded-full"
            initial={{ width: 0, x: 0 }}
            whileInView={{ 
              width: '100%',
              transition: {
                duration: 0.8,
                ease: "easeInOut"
              }
            }}
            viewport={{ once: false }}
          />

          {/* Corner decorations */}
          <svg className="absolute -left-8 -top-8 w-16 h-16 opacity-30" viewBox="0 0 100 100">
            <path d="M20,0 V40 H60" stroke="#2563eb" strokeWidth="2" fill="none" />
          </svg>
          <svg className="absolute -right-8 -top-8 w-16 h-16 opacity-30" viewBox="0 0 100 100">
            <path d="M80,0 V40 H40" stroke="#2563eb" strokeWidth="2" fill="none" />
          </svg>
        </div>
      </div>

      {/* Full width Map Container */}
      <div className="w-full h-[500px] relative">
        <iframe
          src="https://maps.google.com/maps?q=Rigiweg%204,%208604%20Volketswil&t=&z=13&ie=UTF8&iwloc=&output=embed"
          className="w-full h-full"
          frameBorder="0"
          allowFullScreen
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default GoogleMapsSection;