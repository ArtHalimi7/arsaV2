import { useRef } from 'react';
import { motion } from 'framer-motion';

const processes = [
  {
    id: 1,
    title: "Beratung & Planung",
    description: "Im ersten Schritt besprechen wir Ihre Wünsche und Vorstellungen. Unsere Experten beraten Sie zu technischen Möglichkeiten und erstellen ein maßgeschneidertes Konzept.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
  },
  {
    id: 2,
    title: "Angebot & Zeitplanung",
    description: "Sie erhalten ein detailliertes, transparentes Angebot ohne versteckte Kosten. Gemeinsam legen wir einen realistischen Zeitplan fest, der Ihre Bedürfnisse berücksichtigt.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    id: 3,
    title: "Professionelle Umsetzung",
    description: "Unser erfahrenes Team setzt Ihr Projekt mit höchster Präzision um. Wir achten auf sauberes Arbeiten, Termintreue und ständige Kommunikation über den Fortschritt.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  },
  {
    id: 4,
    title: "Qualitätsprüfung",
    description: "Nach Abschluss der Arbeiten führen wir eine gründliche Qualitätskontrolle durch. Wir gehen gemeinsam durch das fertige Projekt und stellen sicher, dass Sie zu 100% zufrieden sind.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  }
];

// First, let's add these variants above the ProcessSection component
const cardVariants = {
  hidden: (index) => ({
    opacity: 0,
    x: index % 2 === 0 ? -100 : 100,
  }),
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const ProcessSection = () => {
  const containerRef = useRef(null);
  
  return (
    <section className="py-24 bg-gradient-to-br from-blue-50 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute bottom-40 left-0 w-96 h-96 opacity-20 -translate-x-20 translate-y-20 z-0">
        <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <circle cx="150" cy="150" r="100" fill="none" stroke="#1e40af" strokeWidth="1" strokeDasharray="5,5" />
          <circle cx="150" cy="150" r="50" fill="none" stroke="#1e40af" strokeWidth="1" />
          <line x1="50" y1="150" x2="250" y2="150" stroke="#1e40af" strokeWidth="1" strokeDasharray="5,5" />
          <line x1="150" y1="50" x2="150" y2="250" stroke="#1e40af" strokeWidth="1" strokeDasharray="5,5" />
        </svg>
      </div>
      
      <div className="absolute top-20 right-0 w-96 h-96 opacity-20 translate-x-20 -translate-y-10 z-0">
        <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <rect x="100" y="50" width="200" height="200" fill="none" stroke="#1e40af" strokeWidth="1" />
          <rect x="125" y="75" width="150" height="150" fill="none" stroke="#1e40af" strokeWidth="1" strokeDasharray="5,5" />
          <circle cx="200" cy="150" r="25" fill="none" stroke="#1e40af" strokeWidth="1" />
        </svg>
      </div>
      
      {/* Blueprint grid background */}
      <div className="absolute inset-0 opacity-5 z-0">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="process-grid" patternUnits="userSpaceOnUse" width="100" height="100">
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#000" strokeWidth="1"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#process-grid)" />
        </svg>
      </div>
      
      <div className="container mx-auto px-4 relative z-10" ref={containerRef}>
        {/* Section Title */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: false, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-block relative"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: false, margin: "-100px" }}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-blue-900 mb-4 relative z-10"
            >
              Unser Arbeitsprozess
            </motion.h2>
            
            {/* Animated underline */}
            <motion.div
              className="absolute bottom-4 left-0 right-0 h-2 bg-blue-400/60"
              initial={{ width: 0, left: '50%' }}
              whileInView={{ width: '100%', left: '0%' }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: false, margin: "-100px" }}
            />
            
            {/* Corner decorations */}
            <svg className="absolute -left-8 -top-8 w-16 h-16 opacity-30" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path d="M20,0 V40 H60" stroke="#2563eb" strokeWidth="2" fill="none" />
            </svg>
            
            <svg className="absolute -right-8 -top-8 w-16 h-16 opacity-30" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path d="M80,0 V40 H40" stroke="#2563eb" strokeWidth="2" fill="none" />
            </svg>
          </motion.div>
          
          <motion.p 
            className="text-lg text-blue-800/70 max-w-2xl mx-auto mt-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            viewport={{ once: false, margin: "-100px" }}
          >
            So setzen wir Ihr Projekt präzise und effizient um
          </motion.p>
        </motion.div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute top-24 left-1/2 transform -translate-x-1/2 w-1 h-[calc(100%-100px)] bg-blue-100 hidden md:block"></div>
          
          <div className="space-y-16 md:space-y-10 relative"> {/* Increased spacing here */}
            {processes.map((process, index) => (
              <motion.div 
                key={process.id}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-100px" }}
                variants={cardVariants}
                className={`md:flex md:items-center md:gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Step circle with number */}
                <div className="hidden md:flex items-center justify-center">
                  <motion.div 
                    className="flex-shrink-0 w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg relative z-20"
                  >
                    {process.id}
                  </motion.div>
                </div>
                
                {/* Content card with enhanced borders */}
                <motion.div 
                  whileHover={{ y: -5 }}
                  className={`bg-white shadow-xl rounded-xl p-6 md:p-8 md:w-[calc(50%-3rem)] relative z-10 flex-grow md:ml-0 border-2 border-blue-100 ${
                    index % 2 === 0 ? 'md:text-left' : 'md:text-right'
                  }`} /* Added border-2 border-blue-100 */
                >
                  {/* Mobile step number */}
                  <div className="flex md:hidden items-center gap-4 mb-4">
                    <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-bold shadow-sm">
                      {process.id}
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-blue-900">{process.title}</h3>
                  </div>
                  
                  {/* Desktop title */}
                  <h3 className="hidden md:block text-xl md:text-2xl font-bold text-blue-900 mb-4">{process.title}</h3>
                  
                  <div className={`flex items-start gap-6 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className={`hidden md:block text-blue-500 ${index % 2 === 0 ? 'order-first' : 'order-last'}`}>
                      {process.icon}
                    </div>
                    
                    <p className="text-blue-800/70">{process.description}</p>
                  </div>
                  
                  {/* Corner decorations */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-blue-200 rounded-tl-md"></div>
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-blue-200 rounded-tr-md"></div>
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-blue-200 rounded-bl-md"></div>
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-blue-200 rounded-br-md"></div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* CTA Button */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: false, margin: "-50px" }}
          className="text-center mt-20"
        >
          <motion.a 
            href="/kontakt"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
          >
            <span>Projekt anfragen</span>
            <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;