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
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        {/* Title with improved positioning */}
        <motion.h1 
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-white absolute top-8 md:top-20 left-0 right-0 text-center mx-auto px-4"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Unsere Leistungen
        </motion.h1>
        
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
                  
                  {/* Indicator showing when a card is active */}
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ 
                      width: index === activeIndex ? "100%" : "0%",
                      opacity: index === activeIndex ? 1 : 0
                    }}
                    transition={{ duration: 0.8 }}
                    className="h-1 bg-blue-300 absolute bottom-0 left-0"
                  />
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