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
            className="whitespace-nowrap text-[180px] font-bold text-blue-100/40 flex-shrink-0"
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
            className="whitespace-nowrap text-[180px] font-bold text-blue-100/40 flex-shrink-0"
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
              <p className="text-2xl md:text-5xl text-blue-900 leading-relaxed">
                Als führendes Unternehmen im Trockenbau mit <span className="text-5xl md:text-5xl font-bold text-blue-600">20+ Jahren</span> Expertise 
                und über <span className="text-5xl md:text-5xl font-bold text-blue-600">500+ erfolgreichen Projekten</span> setzen 
                wir neue Maßstäbe für Qualität und Präzision
              </p>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Add subtle blue grid pattern for visual interest */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="subtle-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#3074e4" strokeWidth="0.5"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#subtle-grid)" />
        </svg>
      </div>
    </section>
  );
};

export default AnimatedTextSection;