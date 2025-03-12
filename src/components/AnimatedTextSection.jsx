import React from 'react';
import { motion } from 'framer-motion';

const AnimatedTextSection = () => {
  return (
    <section className="relative h-[50vh] w-full bg-white text-blue-900 overflow-hidden">
      <div className="absolute inset-0 flex flex-col justify-center">
        {/* Large Background Text */}
        <div className="relative flex whitespace-nowrap">
          <motion.div
            initial={{ x: '0%' }}
            animate={{ x: '-100%' }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="whitespace-nowrap text-[180px] font-bold text-blue-100 flex-shrink-0"
            >
            ARSA GIPSER QUALITÄT&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </motion.div>
          <motion.div
            initial={{ x: '0%' }}
            animate={{ x: '-100%' }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="whitespace-nowrap text-[180px] font-bold text-blue-100 flex-shrink-0"
          >
            ARSA GIPSER QUALITÄT&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </motion.div>
        </div>
        
        {/* Main Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="max-w-5xl mx-auto text-center"
            >
              <p className="text-2xl md:text-5xl text-blue-800 leading-relaxed">
                Als führendes Unternehmen im Trockenbau mit <span className="text-5xl md:text-5xl font-bold text-blue-600">20+ Jahren</span> Expertise 
                und über <span className="text-5xl md:text-5xl font-bold text-blue-600">500+ erfolgreichen Projekten</span> setzen 
                wir neue Maßstäbe für Qualität und Präzision
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnimatedTextSection;