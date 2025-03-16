import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);

    const listener = (event) => setMatches(event.matches);
    media.addEventListener('change', listener);

    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
};

const services = [
  {
    title: "Trockenbau",
    description: "Professionelle Wandsysteme & Deckenverkleidungen",
    details: "Modernste Techniken für perfekte Raumgestaltung. Vom Metallständerwerk bis zur fertigen Wand – wir schaffen Räume nach Ihren Vorstellungen.",
    image: "https://trockenbau-muc.de/wp-content/uploads/2024/11/Wandkonstruktion-Trockenbau-mit-Schiebertuer-1024x576.jpg"
  },
  {
    title: "Spachtelarbeiten",
    description: "Perfekte Oberflächengestaltung",
    details: "Glatte Wände und makellose Oberflächen sind unsere Spezialität. Mit präziser Handarbeit und hochwertigen Materialien erreichen wir optimale Ergebnisse.",
    image: "https://www.trockenbau-ivkovic.de/images/3003/0/0/spachtelarbeiten.jpg"
  },
  {
    title: "Akustikbau",
    description: "Optimale Raumakustik für jeden Bereich",
    details: "Innovative Akustiklösungen für Büros, Konferenzräume und Wohnbereiche. Wir optimieren die Raumakustik für maximalen Komfort.",
    image: "https://akustikbau-mack.de/wp-content/uploads/2018/04/Mack-Banner.jpg"
  },
  {
    title: "Brandschutz",
    description: "Sichere & normgerechte Brandschutzsysteme",
    details: "Zertifizierte Brandschutzsysteme nach aktuellen Normen. Wir garantieren höchste Sicherheitsstandards für Ihr Gebäude.",
    image: "https://www.heinrich-schmid.com/fileadmin/user_upload/leistung-brandschutz-brandschutz-im-trockenbau-intro.jpg"
  }
];


const HorizontalScrollSection = () => {
  const targetRef = useRef(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [activeIndex, setActiveIndex] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // Transform value - different for mobile and desktop
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "-72%"]
  );

  // Additional animations for decorative elements
  const blueprintOpacity = useTransform(scrollYProgress, [0, 0.3], [0.3, 0]);
  const decorLeft = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const decorRight = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const decorTop = useTransform(scrollYProgress, [0, 1], ["-5%", "-15%"]);
  const decorBottom = useTransform(scrollYProgress, [0, 1], ["5%", "15%"]);
  const toolRotation = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const paintSplashScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);
  const lineProgress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const draftingScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1]);
  
  // Use scrollYProgress to determine active card
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((progress) => {
      // Calculate which card should be active based on scroll progress
      const newIndex = Math.min(
        services.length - 1, 
        Math.floor(progress * services.length * 1.5)
      );
      setActiveIndex(newIndex);
    });
    
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Card variants for animations
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 100,
      rotateX: 15
    },
    visible: index => ({ 
      opacity: 1, 
      scale: 1,
      y: 0,
      rotateX: 0,
      transition: { 
        type: "spring", 
        stiffness: 100,
        damping: 15,
        delay: index * 0.1,
        duration: 0.8
      }
    }),
    active: { 
      scale: 1,
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 300,
        damping: 20 
      }
    },
    inactive: { 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 300,
        damping: 20 
      }
    }
  };

  // Content animation variants
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: delay => ({
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.5, 
        delay 
      }
    })
  };

  return (
    <>
      {/* Mobile component - ONLY visible on mobile */}
      {isMobile && (
        <MobileServicesSection 
          services={services} 
          activeIndex={activeIndex}
          contentVariants={contentVariants}
          cardVariants={cardVariants}
        />
      )}
      
      {/* Desktop component - ONLY visible on desktop */}
      {!isMobile && (
        <DesktopServicesSection 
          services={services}
          activeIndex={activeIndex}
          contentVariants={contentVariants}
          cardVariants={cardVariants}
          targetRef={targetRef}
          decoratives={{
            blueprintOpacity,
            decorLeft,
            decorRight,
            decorTop,
            decorBottom,
            toolRotation,         // Add these new decorative animations
            paintSplashScale,
            lineProgress,
            draftingScale
          }}
          x={x}
          scrollYProgress={scrollYProgress}  // Add this line
        />
      )}
    </>
  );
};

// Mobile-specific component with proper height and spacing
const MobileServicesSection = ({ services, activeIndex, contentVariants, cardVariants }) => {
  return (
    <section className="relative h-[250vh] bg-gradient-to-b from-blue-800 via-blue-900 to-blue-950">
      {/* Blueprint pattern background */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="mobile-blueprint" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <rect width="100" height="100" fill="none" />
            <path d="M 0,20 H 100 M 0,40 H 100 M 0,60 H 100 M 0,80 H 100 M 20,0 V 100 M 40,0 V 100 M 60,0 V 100 M 80,0 V 100" 
                  stroke="#2563eb" strokeWidth="0.5" opacity="0.2" />
            <path d="M 0,0 H 100 M 0,100 H 100 M 0,0 V 100 M 100,0 V 100" 
                  stroke="#2563eb" strokeWidth="1" opacity="0.3" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#mobile-blueprint)" />
        </svg>
      </div>
      
      {/* Title section */}
      <div className="sticky bg-gradient-to-b from-blue-900 to-blue-900/80 z-10">
        <motion.div
          className="inline-block relative mx-auto text-center w-full"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-white relative z-10 mt-8">
            Unsere Leistungen
          </h1>
          <motion.div
            className="absolute -bottom-2 left-1/4 right-1/4 h-1 bg-blue-400"
            initial={{ width: "0%" }}
            whileInView={{ width: "50%" }}
            transition={{ delay: 0.3, duration: 0.8 }}
          />
        </motion.div>
      </div>
      
      {/* Mobile cards layout with fixed height cards */}
      <div className="flex flex-col items-center mt-[60px] px-4 pb-[150px]">
        {services.map((service, index) => (
          <motion.div
            key={index}
            custom={index}
            initial="hidden"
            whileInView="visible"
            animate={index === activeIndex ? "active" : "inactive"}
            variants={cardVariants}
            viewport={{ once: false, margin: "-20%" }}
            className="relative w-full h-[400px] mb-12 overflow-hidden rounded-xl transform-gpu"
            whileHover={{ 
              scale: 1.03, 
              transition: { duration: 0.2 } 
            }}
          >
            {/* Decorative corners */}
            <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-blue-300 opacity-70 z-20"></div>
            <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-blue-300 opacity-70 z-20"></div>
            <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-blue-300 opacity-70 z-20"></div>
            <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-blue-300 opacity-70 z-20"></div>
            
            {/* Background image */}
            <motion.div
              className="absolute inset-0 bg-cover bg-center z-0"
              style={{ 
                backgroundImage: `url(${service.image})`,
                backgroundSize: "110% 110%",
                backgroundPosition: "center"
              }}
              animate={{
                backgroundSize: index === activeIndex ? "105% 105%" : "110% 110%",
                backgroundPosition: index === activeIndex ? "center" : "center"
              }}
              transition={{ duration: 3, ease: "easeOut" }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80" />
              
              {/* Grid overlay for active card */}
              {index === activeIndex && (
                <motion.div 
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <pattern id={`mobile-grid-${index}`} patternUnits="userSpaceOnUse" width="20" height="20">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#3b82f6" strokeWidth="0.5"/>
                    </pattern>
                    <rect width="100%" height="100%" fill={`url(#mobile-grid-${index})`} />
                  </svg>
                </motion.div>
              )}
            </motion.div>
            
            {/* Content area with guaranteed visibility */}
            <div className="relative z-10 p-8 flex flex-col justify-between h-full">
              <div>
                <motion.h2
                  custom={0.1}
                  variants={contentVariants}
                  className="text-3xl font-bold text-white mb-4"
                >
                  {service.title}
                </motion.h2>
                
                <motion.p
                  custom={0.3}
                  variants={contentVariants}
                  className="text-xl text-blue-200 mb-5"
                >
                  {service.description}
                </motion.p>
                
                <motion.p
                  custom={0.5}
                  variants={contentVariants}
                  className="text-lg text-gray-300"
                >
                  {service.details}
                </motion.p>
              </div>
              
              {/* Progress bar indicator */}
              <motion.div
                initial={{ width: "0%" }}
                animate={{ 
                  width: index === activeIndex ? "100%" : "0%",
                  opacity: index === activeIndex ? 1 : 0
                }}
                transition={{ duration: 0.8 }}
                className="h-1.5 bg-blue-300 absolute bottom-0 left-0"
              />
              
              {/* Dot indicators */}
              {index === activeIndex && (
                <div className="absolute bottom-6 right-6 flex space-x-2">
                  {services.map((_, i) => (
                    <motion.div 
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className={`w-3 h-3 rounded-full ${i === index ? 'bg-blue-300' : 'bg-blue-900'}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// Desktop-specific component (your existing section with horizontal scrolling)
const DesktopServicesSection = ({ services, activeIndex, contentVariants, cardVariants, targetRef, decoratives, x, scrollYProgress }) => {
  const { 
    blueprintOpacity, 
    decorLeft, 
    decorRight, 
    decorTop, 
    decorBottom,
    toolRotation,         // Add these new decorative animations
    paintSplashScale,
    lineProgress,
    draftingScale
  } = decoratives;
  
  return (
    <section 
      ref={targetRef} 
      className="relative h-[300vh] bg-gradient-to-b from-blue-800 via-blue-900 to-blue-950"
    >
      {/* Blueprint background and other existing decorative elements */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: blueprintOpacity }}
      >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="blueprint" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <rect width="100" height="100" fill="none" />
            <path d="M 0,20 H 100 M 0,40 H 100 M 0,60 H 100 M 0,80 H 100 M 20,0 V 100 M 40,0 V 100 M 60,0 V 100 M 80,0 V 100" 
                  stroke="#2563eb" strokeWidth="0.5" opacity="0.2" />
            <path d="M 0,0 H 100 M 0,100 H 100 M 0,0 V 100 M 100,0 V 100" 
                  stroke="#2563eb" strokeWidth="1" opacity="0.3" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#blueprint)" />
        </svg>
      </motion.div>
    
      {/* Sticky container for main content */}
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        {/* Title section */}
        <div className="absolute top-12 left-0 right-0 text-center mx-auto px-4">
          <motion.div
            className="inline-block relative"
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h1 
              className="text-4xl lg:text-5xl font-bold text-white relative z-10"
            >
              Unsere Leistungen
            </motion.h1>
            <motion.div
              className="absolute -bottom-2 left-0 h-1 bg-blue-400"
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              transition={{ delay: 0.3, duration: 0.8 }}
            />
            <svg className="absolute -left-8 -top-8 w-16 h-16 opacity-20" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path d="M20,0 V40 H60" stroke="#3b82f6" strokeWidth="2" fill="none" />
            </svg>
            <svg className="absolute -right-8 -top-8 w-16 h-16 opacity-20" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path d="M80,0 V40 H40" stroke="#3b82f6" strokeWidth="2" fill="none" />
            </svg>
          </motion.div>
        </div>
        
        {/* Horizontal scrolling cards */}
        <motion.div style={{ x }} className="flex gap-24 pl-6 lg:pl-8"> {/* Increased gap from 6/8 to 24 */}
          {services.map((service, index) => (
            <AnimatePresence key={index}>
              <motion.div
                custom={index}
                initial="hidden"
                whileInView="visible"
                animate={index === activeIndex ? "active" : "inactive"}
                variants={cardVariants}
                viewport={{ once: false, margin: "-20%" }}
                className="relative flex-shrink-0 w-[1500px] h-[500px] overflow-hidden transform-gpu flex gap-16" // Increased gap, removed hover
              >
                {/* Content area - Left side */}
                <div className="relative z-10 w-[600px] py-12 flex flex-col justify-between">
                  <div className="h-full flex flex-col justify-between">
                    <div className="space-y-10"> {/* Increased spacing */}
                      <motion.h2
                        custom={0.1}
                        variants={contentVariants}
                        className="text-5xl font-bold text-white" // Reduced from 6xl
                      >
                        {service.title}
                      </motion.h2>
                      
                      <motion.p
                        custom={0.3}
                        variants={contentVariants}
                        className="text-2xl text-blue-200" // Reduced from 3xl
                      >
                        {service.description}
                      </motion.p>
                      
                      <motion.p
                        custom={0.5}
                        variants={contentVariants}
                        className="text-lg text-gray-300 leading-relaxed" // Reduced from xl
                      >
                        {service.details}
                      </motion.p>

                      <motion.div
                        custom={0.7}
                        variants={contentVariants}
                        className="space-y-6"
                      >
                        <p className="text-gray-400 text-base leading-relaxed"> {/* Reduced from lg */}
                          Unsere professionelle Ausführung garantiert höchste Qualität und Langlebigkeit. 
                          Wir verwenden ausschließlich hochwertige Materialien und arbeiten nach den neuesten 
                          technischen Standards.
                        </p>
                      </motion.div>
                    </div>

                    {/* Progress indicators remain the same */}
                    <div className="pt-8">
                      <motion.div
                        initial={{ width: "0%" }}
                        animate={{ 
                          width: index === activeIndex ? "100%" : "0%",
                          opacity: index === activeIndex ? 1 : 0
                        }}
                        transition={{ duration: 0.8 }}
                        className="h-1.5 bg-blue-300 mb-4"
                      />
                      
                      <div className="flex justify-between items-center">
                        <span className="text-blue-300 text-sm">{`0${index + 1} / 0${services.length}`}</span>
                        <div className="flex space-x-2">
                          {services.map((_, i) => (
                            <motion.div 
                              key={i}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: i * 0.1 }}
                              className={`w-2 h-2 rounded-full ${i === index ? 'bg-blue-300' : 'bg-blue-900'}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Image area remains the same */}
                <div className="relative flex-1">
                  <motion.div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ 
                      backgroundImage: `url(${service.image})`,
                      backgroundSize: "130% 130%", // Larger image size
                      backgroundPosition: "center"
                    }}
                    animate={{
                      backgroundSize: index === activeIndex ? "120% 120%" : "130% 130%", // Larger image size
                      backgroundPosition: index === activeIndex ? "center" : "center"
                    }}
                    transition={{ duration: 3, ease: "easeOut" }}
                  >
                    {/* Decorative corners */}
                    <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-blue-300 opacity-70"></div>
                    <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-blue-300 opacity-70"></div>
                    <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-blue-300 opacity-70"></div>
                    <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-blue-300 opacity-70"></div>
                    
                    {/* Grid overlay for active card */}
                    {index === activeIndex && (
                      <motion.div 
                        className="absolute inset-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                      >
                        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                          <pattern id={`desktop-grid-${index}`} patternUnits="userSpaceOnUse" width="20" height="20">
                            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#3b82f6" strokeWidth="0.5"/>
                          </pattern>
                          <rect width="100%" height="100%" fill={`url(#desktop-grid-${index})`} />
                        </svg>
                      </motion.div>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          ))}
        </motion.div>
      </div>

      {/* Decorative elements container */}
      <div className="sticky top-0 h-screen">
        {/* Your existing sticky content remains here */}
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          {/* ... existing content ... */}
        </div>

        {/* Decorative bottom elements - Changed from fixed to absolute */}
        <motion.div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10">
          {/* Construction tools silhouette */}
          <motion.div 
            className="absolute bottom-8 left-8"
            style={{ rotate: toolRotation }}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
              <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeDasharray="1 3"/>
              <path d="M12 8v8M8 12h8" strokeLinecap="round"/>
            </svg>
          </motion.div>

          {/* Paint splash effect */}
          <motion.div 
            className="absolute bottom-12 right-12"
            style={{ scale: paintSplashScale }}
          >
            <svg width="80" height="80" viewBox="0 0 24 24" fill="#3b82f6" opacity="0.2">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
            </svg>
          </motion.div>

          {/* Progress line */}
          <motion.div 
            className="absolute bottom-0 left-0 h-1 bg-blue-400"
            style={{ width: lineProgress }}
          />

          {/* Technical measurement indicators */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-between px-8 text-blue-400 text-sm opacity-30">
            <span>0.00</span>
            <span>|</span>
            <span>|</span>
            <span>|</span>
            <span>100.00</span>
          </div>
        </motion.div>

        {/* Additional floating elements - Changed from fixed to absolute */}
        <motion.div 
          className="absolute top-1/2 right-8 transform -translate-y-1/2 opacity-20"
          style={{ scale: draftingScale }}
        >
          <svg width="40" height="120" viewBox="0 0 40 120" fill="none">
            <path d="M20 0v120M10 20h20M10 60h20M10 100h20" stroke="#3b82f6" strokeWidth="1"/>
            <circle cx="20" cy="60" r="5" stroke="#3b82f6" strokeWidth="1"/>
          </svg>
        </motion.div>

        {/* Blueprint grid overlay - Changed from fixed to absolute */}
        <div className="absolute inset-0 pointer-events-none opacity-5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <pattern id="smallGrid" width="8" height="8" patternUnits="userSpaceOnUse">
              <path d="M 8 0 L 0 0 0 8" fill="none" stroke="#3b82f6" strokeWidth="0.5"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#smallGrid)"/>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default HorizontalScrollSection;