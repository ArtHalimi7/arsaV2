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

  // Keep the existing transform values
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", isMobile ? "-65%" : "-36%"]
  );

  // Additional animations for decorative elements
  const blueprintOpacity = useTransform(scrollYProgress, [0, 0.3], [0.3, 0]);
  const decorLeft = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const decorRight = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const decorTop = useTransform(scrollYProgress, [0, 1], ["-5%", "-15%"]);
  const decorBottom = useTransform(scrollYProgress, [0, 1], ["5%", "15%"]);
  
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
      scale: 1.05,
      y: -20,
      boxShadow: "0 30px 60px rgba(0,0,0,0.3)",
      transition: { 
        type: "spring", 
        stiffness: 300,
        damping: 20 
      }
    },
    inactive: { 
      scale: 0.95,
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
    <section 
      ref={targetRef} 
      className="relative h-[300vh] bg-gradient-to-b from-blue-800 via-blue-900 to-blue-950"
    >
      {/* Blueprint pattern background decorative element */}
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
      
      {/* Top drywall lines decoration */}
      <motion.div 
        className="absolute top-0 left-0 right-0 h-16 md:h-24 pointer-events-none z-10"
        style={{ y: decorTop }}
      >
        <svg width="100%" height="100%" viewBox="0 0 1000 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,50 Q250,80 500,50 T1000,50" 
                stroke="#3b82f6" fill="none" strokeWidth="2" opacity="0.3" />
          <path d="M0,20 Q250,50 500,20 T1000,20" 
                stroke="#3b82f6" fill="none" strokeWidth="1" opacity="0.2" />
        </svg>
      </motion.div>
      
      {/* Left decorative element - T-profile */}
      <motion.div 
        className="absolute left-0 top-1/4 w-16 md:w-24 h-80 pointer-events-none opacity-30"
        style={{ x: decorLeft }}
      >
        <svg viewBox="0 0 100 300" xmlns="http://www.w3.org/2000/svg">
          <path d="M30,0 V300 M10,80 H50" stroke="#2563eb" strokeWidth="2" fill="none" />
          <path d="M30,150 H70" stroke="#2563eb" strokeWidth="2" fill="none" />
          <path d="M30,220 H50" stroke="#2563eb" strokeWidth="2" fill="none" />
          <circle cx="30" cy="80" r="4" fill="#2563eb" opacity="0.6" />
          <circle cx="30" cy="150" r="4" fill="#2563eb" opacity="0.6" />
          <circle cx="30" cy="220" r="4" fill="#2563eb" opacity="0.6" />
        </svg>
      </motion.div>
      
      {/* Right decorative element - CD profile */}
      <motion.div 
        className="absolute right-0 top-1/3 w-16 md:w-24 h-80 pointer-events-none opacity-30"
        style={{ x: decorRight }}
      >
        <svg viewBox="0 0 100 300" xmlns="http://www.w3.org/2000/svg">
          <path d="M20,30 H80 M20,60 H80 M20,90 H80 M20,120 H80 M20,150 H80 M20,180 H80 M20,210 H80 M20,240 H80 M20,270 H80"
               stroke="#2563eb" strokeWidth="1" fill="none" opacity="0.6" />
          <path d="M30,0 V300 M70,0 V300" stroke="#2563eb" strokeWidth="2" fill="none" />
          <path d="M20,30 C25,30 25,60 20,60 M80,30 C75,30 75,60 80,60" 
                stroke="#2563eb" strokeWidth="1.5" fill="none" />
          <path d="M20,90 C25,90 25,120 20,120 M80,90 C75,90 75,120 80,120" 
                stroke="#2563eb" strokeWidth="1.5" fill="none" />
          <path d="M20,150 C25,150 25,180 20,180 M80,150 C75,150 75,180 80,180" 
                stroke="#2563eb" strokeWidth="1.5" fill="none" />
          <path d="M20,210 C25,210 25,240 20,240 M80,210 C75,210 75,240 80,240" 
                stroke="#2563eb" strokeWidth="1.5" fill="none" />
        </svg>
      </motion.div>
      
      {/* Bottom decorative element - drywall panel outline */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-16 md:h-24 pointer-events-none opacity-40"
        style={{ y: decorBottom }}
      >
        <svg width="100%" height="100%" viewBox="0 0 1000 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,0 H1000" stroke="#3b82f6" strokeWidth="2" />
          <path d="M200,0 V30 M400,0 V30 M600,0 V30 M800,0 V30" 
                stroke="#3b82f6" strokeWidth="1.5" />
          <circle cx="200" cy="30" r="3" fill="#3b82f6" />
          <circle cx="400" cy="30" r="3" fill="#3b82f6" />
          <circle cx="600" cy="30" r="3" fill="#3b82f6" />
          <circle cx="800" cy="30" r="3" fill="#3b82f6" />
        </svg>
      </motion.div>
      
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        {/* Floating particles decoration */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-20"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, Math.random() * 30 - 15],
                opacity: [0.2, 0.4, 0.2],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          ))}
        </div>
        
        {/* Title with improved styling and decoration */}
        <div className="absolute top-8 md:top-20 left-0 right-0 text-center mx-auto px-4">
          <motion.div
            className="inline-block relative"
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h1 
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white relative z-10"
            >
              Unsere Leistungen
            </motion.h1>
            {/* Decorative underline */}
            <motion.div
              className="absolute -bottom-2 left-0 h-1 bg-blue-400"
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              transition={{ delay: 0.3, duration: 0.8 }}
            />
            {/* Decorative elements around title */}
            <svg className="absolute -left-8 -top-8 w-16 h-16 opacity-20" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path d="M20,0 V40 H60" stroke="#3b82f6" strokeWidth="2" fill="none" />
            </svg>
            <svg className="absolute -right-8 -top-8 w-16 h-16 opacity-20" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path d="M80,0 V40 H40" stroke="#3b82f6" strokeWidth="2" fill="none" />
            </svg>
          </motion.div>
        </div>
        
        <motion.div style={{ x }} className="flex gap-4 md:gap-6 lg:gap-8 pl-4 md:pl-6 lg:pl-8">
          {services.map((service, index) => (
            <AnimatePresence key={index}>
              <motion.div
                custom={index}
                initial="hidden"
                whileInView="visible"
                animate={index === activeIndex ? "active" : "inactive"}
                variants={cardVariants}
                viewport={{ once: false, margin: "-20%" }}
                className="relative flex-shrink-0 w-[260px] h-[380px] md:w-[500px] md:h-[450px] lg:w-[700px] lg:h-[500px] overflow-hidden rounded-xl md:rounded-2xl transform-gpu"
                whileHover={{ 
                  scale: 1.03, 
                  transition: { duration: 0.2 } 
                }}
              >
                {/* Decorative corners */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-300 opacity-70 z-20"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-blue-300 opacity-70 z-20"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-blue-300 opacity-70 z-20"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-300 opacity-70 z-20"></div>
                
                {/* Background image with parallax effect */}
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
                  
                  {/* Subtle grid overlay for active card */}
                  {index === activeIndex && (
                    <motion.div 
                      className="absolute inset-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.1 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <pattern id={`grid-${index}`} patternUnits="userSpaceOnUse" width="20" height="20">
                          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#3b82f6" strokeWidth="0.5"/>
                        </pattern>
                        <rect width="100%" height="100%" fill={`url(#grid-${index})`} />
                      </svg>
                    </motion.div>
                  )}
                </motion.div>
                
                <div className="relative z-10 p-5 md:p-8 lg:p-12 flex flex-col justify-between h-full">
                  <div>
                    <motion.h2
                      custom={0.1}
                      variants={contentVariants}
                      className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-2 md:mb-4"
                    >
                      {service.title}
                    </motion.h2>
                    
                    <motion.p
                      custom={0.3}
                      variants={contentVariants}
                      className="text-base md:text-xl lg:text-2xl text-blue-200 mb-2 md:mb-3"
                    >
                      {service.description}
                    </motion.p>
                    
                    <motion.p
                      custom={0.5}
                      variants={contentVariants}
                      className="text-sm md:text-base lg:text-lg text-gray-300"
                    >
                      {service.details}
                    </motion.p>
                  </div>
                  
                  {/* Improved active card indicator */}
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ 
                      width: index === activeIndex ? "100%" : "0%",
                      opacity: index === activeIndex ? 1 : 0
                    }}
                    transition={{ duration: 0.8 }}
                    className="h-1 bg-blue-300 absolute bottom-0 left-0"
                  />
                  
                  {/* Dot indicators for active card */}
                  {index === activeIndex && (
                    <div className="absolute bottom-4 right-4 flex space-x-1">
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
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HorizontalScrollSection;