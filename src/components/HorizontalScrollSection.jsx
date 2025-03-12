import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

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
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.0&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Spachtelarbeiten",
    description: "Perfekte Oberflächengestaltung",
    details: "Glatte Wände und makellose Oberflächen sind unsere Spezialität. Mit präziser Handarbeit und hochwertigen Materialien erreichen wir optimale Ergebnisse.",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.0&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Akustikbau",
    description: "Optimale Raumakustik für jeden Bereich",
    details: "Innovative Akustiklösungen für Büros, Konferenzräume und Wohnbereiche. Wir optimieren die Raumakustik für maximalen Komfort.",
    image: "https://images.unsplash.com/photo-1616591174726-737d24c61a2a?ixlib=rb-4.0.0&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Brandschutz",
    description: "Sichere & normgerechte Brandschutzsysteme",
    details: "Zertifizierte Brandschutzsysteme nach aktuellen Normen. Wir garantieren höchste Sicherheitsstandards für Ihr Gebäude.",
    image: "https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?ixlib=rb-4.0.0&auto=format&fit=crop&w=800&q=80"
  }
];

const HorizontalScrollSection = () => {
  const targetRef = useRef(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", isMobile ? "-65%" : "-51%"]
  );

  return (
    <section 
      ref={targetRef} 
      className="relative h-[300vh] bg-gradient-to-b from-blue-800 via-blue-900 to-blue-950"
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-4 md:gap-8 lg:gap-12 pl-4 md:pl-8 lg:pl-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ 
                opacity: 0, 
                x: 200, // Start from right
                y: 50 // Start from below
              }}
              whileInView={{ 
                opacity: 1, 
                x: 0,
                y: 0
              }}
              transition={{ 
                duration: 0.8,
                delay: index * 0.2, // Stagger the animations
                type: "spring",
                stiffness: 100
              }}
              viewport={{ once: true, margin: "-20%" }} // Trigger animation when card is 20% in view
              className="relative flex-shrink-0 w-[280px] h-[400px] md:w-[600px] md:h-[500px] lg:w-[900px] lg:h-[600px] overflow-hidden rounded-xl md:rounded-2xl"
            >
              <div
                className="absolute inset-0 bg-cover bg-center z-0"
                style={{ backgroundImage: `url(${service.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80" />
              </div>
              <div className="relative z-10 p-6 md:p-12 lg:p-16 flex flex-col justify-between h-full">
                <div>
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-3xl md:text-5xl lg:text-8xl font-bold text-white mb-4 md:mb-6"
                  >
                    {service.title}
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-lg md:text-2xl lg:text-3xl text-blue-200 mb-2 md:mb-4"
                  >
                    {service.description}
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-sm md:text-lg lg:text-xl text-gray-300"
                  >
                    {service.details}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HorizontalScrollSection;