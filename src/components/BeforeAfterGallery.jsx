import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Update the projects array at the top of the file
const projects = [
  {
    id: 1,
    title: "Gipsergeschäft",
    description: "Professionelle Gipserarbeiten für ein perfektes Finish",
    img: "https://www.gclproducts.co.uk/blog/wp-content/uploads/sites/10/2021/12/Top-10-great-facts-about-plastering-scaled.jpeg"
  },
  {
    id: 2,
    title: "Umbauarbeiten",
    description: "Komplette Raumgestaltung und Renovierung",
    img: "https://mobiliar.rokka.io/dynamic/noop/5bd64e6b686a24deb61ddd9a5ac3099ba80b7ce3/teppich-entfernen-umbau-wohnzimmer.jpg"
  },
  {
    id: 3,
    title: "Malerarbeiten",
    description: "Präzise Farbgestaltung für Ihre Räume",
    img: "https://www.imbachmaler.ch/files/images/header/imbach-maler-team.jpg"
  },
  {
    id: 4,
    title: "Bodenarbeiten",
    description: "Professionelle Verlegung verschiedener Bodenbeläge",
    img: "https://www.infina.at/fileadmin/content/Ratgeber/renovierung_sanierung_modernisierung.jpg"
  },
  {
    id: 5,
    title: "Badezimmer Renovation",
    description: "Moderne Badezimmer nach Ihren Wünschen",
    img: "https://www.badtraum24.de/blog/wp-content/uploads/sites/2/2024/02/Luxry_Bathroom_2-scaled.jpg"
  }
];

const BeforeAfterGallery = () => {
  const navigate = useNavigate();

  const handleViewMoreClick = () => {
    navigate('/projekte');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white relative">
      {/* Change flex to flex-col on mobile */}
      <div className="flex flex-col lg:flex-row">
        {/* Left section - modify for mobile */}
        <div className="w-full lg:w-[40%] min-h-screen lg:h-screen lg:sticky top-0 
            flex items-center px-6 lg:px-12 py-12 lg:py-0">
          <div className="max-w-xl space-y-8 w-full relative z-50">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              {/* Decorative element */}
              <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-1 h-24 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full" />
              
              <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
                Unsere Projektgalerie
              </h2>
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-2 bg-blue-400/60"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 0.3, duration: 0.8 }}
              />
            </motion.div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-blue-800/70 leading-relaxed"
            >
              Entdecken Sie unsere abgeschlossenen Renovierungsprojekte und lassen Sie sich von unserer Handwerkskunst überzeugen.
            </motion.p>

            {/* Added features section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-semibold text-blue-800">Unsere Expertise:</h3>
              <ul className="space-y-3">
                {[
                  "Professionelle Renovierungsarbeiten",
                  "Qualitativ hochwertige Materialien",
                  "Erfahrenes Fachpersonal",
                  "Termintreue Ausführung",
                  "Maßgeschneiderte Lösungen"
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="flex items-center space-x-3 text-blue-700/80"
                  >
                    <svg 
                      className="w-5 h-5 text-blue-500" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                      />
                    </svg>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Enhanced call-to-action button */}
            <motion.button 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="mt-8 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg 
                        shadow-lg transition-all duration-300 transform hover:scale-105 
                        flex items-center space-x-3 group relative overflow-hidden z-50 pointer-events-auto"
              onClick={handleViewMoreClick}
            >
              <span className="relative z-50 font-semibold">Mehr Projekte entdecken</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 transform group-hover:translate-x-1 transition-transform relative z-50" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
              <div className="absolute inset-0 bg-blue-500 transform -skew-x-12 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 z-40" />
            </motion.button>

            {/* Decorative dots */}
            <div className="absolute bottom-8 left-12 flex space-x-2">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.4 + i * 0.1 }}
                  className="w-2 h-2 rounded-full bg-blue-400/60"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right section - images */}
        <div className="w-full lg:w-[60%] py-12 lg:py-24 px-4 lg:px-8">
          <div className="space-y-16 max-w-3xl mx-auto"> {/* Changed from max-w-xl to max-w-3xl */}
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.2 }}
                viewport={{ margin: "-100px" }}
                className="relative group"
              >
                {/* Border decoration with animation */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ margin: "-100px" }}
                  className="absolute -top-3 -left-3 w-full h-full border-2 border-blue-300/30"
                ></motion.div>

                <div className="relative">
                  {/* Image container with stagger animation */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ margin: "-100px" }}
                    className="aspect-[16/9] w-full relative z-10 max-h-[400px]"
                  >
                    <img 
                      src={project.img}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                  </motion.div>

                  {/* Animated corner decorations */}
                  {[
                    { top: 0, left: 0, borderT: true, borderL: true },
                    { top: 0, right: 0, borderT: true, borderR: true },
                    { bottom: 0, left: 0, borderB: true, borderL: true },
                    { bottom: 0, right: 0, borderB: true, borderR: true }
                  ].map((corner, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.5 + (i * 0.1) }}
                      viewport={{ once: true }}
                      className={`absolute w-6 h-6 ${Object.entries(corner)
                        .filter(([key]) => key !== 'borderT' && key !== 'borderL' && key !== 'borderR' && key !== 'borderB')
                        .map(([key, value]) => `${key}-${value}`).join(' ')}`}
                    >
                      <div className={`absolute ${corner.borderT ? 'top-0' : 'bottom-0'} ${corner.borderL ? 'left-0' : 'right-0'} w-full h-[2px] bg-blue-300`}></div>
                      <div className={`absolute ${corner.borderT ? 'top-0' : 'bottom-0'} ${corner.borderL ? 'left-0' : 'right-0'} w-[2px] h-full bg-blue-300`}></div>
                    </motion.div>
                  ))}

                  {/* Animated text overlay */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 z-20"
                  >
                    <motion.h3 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      viewport={{ once: true }}
                      className="text-lg font-bold text-white mb-1 group-hover:text-blue-200 transition-colors"
                    >
                      {project.title}
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      viewport={{ once: true }}
                      className="text-white/80 text-sm group-hover:text-white/90 transition-colors"
                    >
                      {project.description}
                    </motion.p>
                  </motion.div>
                </div>

                {/* Animated decorative elements */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  viewport={{ once: true }}
                  className="absolute -bottom-3 -right-3 w-16 h-16 bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors"
                ></motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Hide decorative elements on mobile */}
      <div className="hidden lg:block absolute top-0 left-0 w-80 h-80 opacity-30 -translate-x-12 -translate-y-12 z-0">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path 
            d="M200,0 L160,45 L170,60 L155,75 L170,90 L150,110 L160,120 L145,135 L150,160 L135,170 L140,190 L120,200" 
            fill="none" 
            stroke="#2563eb" 
            strokeWidth="1.2" 
            strokeLinecap="round" 
          />
          <path 
            d="M170,60 L188,72" 
            fill="none" 
            stroke="#2563eb" 
            strokeWidth="1" 
            strokeLinecap="round" 
          />
          <path 
            d="M155,75 L140,70" 
            fill="none" 
            stroke="#2563eb" 
            strokeWidth="1" 
            strokeLinecap="round" 
          />
          <path 
            d="M150,110 L135,100" 
            fill="none" 
            stroke="#2563eb" 
            strokeWidth="0.8" 
            strokeLinecap="round" 
          />
        </svg>
      </div>
      
      {/* Subtle grid pattern overlay - represents drywall panels */}
      <div className="hidden lg:block absolute inset-0 opacity-5 z-0 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="drywall" patternUnits="userSpaceOnUse" width="100" height="100">
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#000" strokeWidth="1"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#drywall)" />
        </svg>
      </div>
    </div>
  );
};

export default BeforeAfterGallery;