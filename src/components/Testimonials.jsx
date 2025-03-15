import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutline } from '@heroicons/react/24/outline';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const testimonialData = [
  {
    id: 1,
    name: "Markus Schmidt",
    role: "Hausbesitzer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    rating: 5,
    text: "Die Renovierung unseres Wohnzimmers wurde perfekt ausgeführt. Das Team war professionell, sauber und hat alle Zeitpläne eingehalten. Die Qualität der Arbeit übertraf unsere Erwartungen."
  },
  {
    id: 2,
    name: "Laura Müller",
    role: "Geschäftsinhaberin",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    rating: 5,
    text: "Als wir unsere Praxisräume renovieren ließen, war ARSA die beste Wahl. Die Arbeit wurde schnell und mit größter Sorgfalt ausgeführt. Meine Kunden sind begeistert von der neuen Atmosphäre."
  },
  {
    id: 3,
    name: "Thomas Becker",
    role: "Architekt",
    image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=398&q=80",
    rating: 4,
    text: "Als Architekt lege ich großen Wert auf präzise Ausführung. Das Team von ARSA hat bei der Umsetzung meines Projekts höchste Professionalität bewiesen. Besonders beeindruckend war die Detailarbeit an den Akustikdecken."
  },
  {
    id: 4,
    name: "Sabine Wagner",
    role: "Innenarchitektin",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=461&q=80",
    rating: 5,
    text: "Ich arbeite regelmäßig mit ARSA zusammen und bin jedes Mal begeistert. Die handwerkliche Qualität und die Fähigkeit, auch komplexe Designideen umzusetzen, sind herausragend."
  },
  {
    id: 5,
    name: "Michael Keller",
    role: "Bauunternehmer",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    rating: 5,
    text: "Die Zusammenarbeit mit ARSA bei mehreren Großprojekten war stets reibungslos und professionell. Die Termintreue und die Qualität der Arbeit sind erstklassig."
  }
];

const StarRating = ({ rating }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        i < rating ? (
          <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
        ) : (
          <StarOutline key={i} className="w-5 h-5 text-yellow-400" />
        )
      ))}
    </div>
  );
};

// Animations variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1.0]
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1.0]
    }
  },
  hover: {
    y: -10,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: {
      duration: 0.3
    }
  }
};

const quoteVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.3,
      duration: 0.5,
      ease: "backOut"
    }
  }
};

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const testimonialCount = testimonialData.length;

  // For desktop view - carousel navigation
  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + testimonialCount) % testimonialCount);
  };

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % testimonialCount);
  };

  // Calculate which testimonials to show in the desktop carousel
  const getVisibleTestimonials = () => {
    const result = [];
    for (let i = 0; i < 3; i++) {
      const index = (activeIndex + i) % testimonialCount;
      result.push(testimonialData[index]);
    }
    return result;
  };

  return (
    <section className="relative py-24 overflow-hidden bg-white">
      {/* Decorative Elements - similar to other components */}
      
      <div className="absolute bottom-40 right-0 w-96 h-96 opacity-20 translate-x-20 translate-y-20 z-0">
        <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <rect x="0" y="50" width="75" height="38" fill="none" stroke="#1e40af" strokeWidth="2" />
          <rect x="85" y="55" width="65" height="33" fill="none" stroke="#1e40af" strokeWidth="2" />
          <rect x="160" y="48" width="85" height="40" fill="none" stroke="#1e40af" strokeWidth="2" />
          <rect x="255" y="52" width="60" height="36" fill="none" stroke="#1e40af" strokeWidth="2" />
          <rect x="325" y="48" width="70" height="40" fill="none" stroke="#1e40af" strokeWidth="2" />
          <rect x="15" y="98" width="90" height="35" fill="none" stroke="#1e40af" strokeWidth="2" />
          <rect x="115" y="95" width="65" height="38" fill="none" stroke="#1e40af" strokeWidth="2" />
        </svg>
      </div>
      
      <div className="absolute inset-0 opacity-5 z-0">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="testimonial-grid" patternUnits="userSpaceOnUse" width="100" height="100">
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#000" strokeWidth="1"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#testimonial-grid)" />
        </svg>
      </div>
      
      <div className="absolute top-40 left-10 w-60 h-60 rounded-full bg-blue-100/20 blur-3xl z-0"></div>
      <div className="absolute bottom-60 right-10 w-80 h-80 rounded-full bg-blue-200/30 blur-3xl z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Title Section */}
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
              Kundenstimmen
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
            
            <svg className="absolute -left-6 bottom-0 w-12 h-12 opacity-30" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,80 H40 V40" stroke="#2563eb" strokeWidth="2" fill="none" />
            </svg>
            
            <svg className="absolute -right-6 bottom-0 w-12 h-12 opacity-30" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path d="M100,80 H60 V40" stroke="#2563eb" strokeWidth="2" fill="none" />
            </svg>
          </motion.div>
          
          <motion.p 
            className="text-lg text-blue-800/70 max-w-3xl mx-auto mt-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            viewport={{ once: false, margin: "-100px" }}
          >
            Was unsere Kunden über unsere Arbeit sagen
          </motion.p>
        </motion.div>

        {/* Desktop Carousel - Hidden on mobile */}
        <div className="hidden md:block mb-12">
          <div className="relative">
            {/* Navigation buttons */}
            <div className="absolute -left-16 top-1/2 -translate-y-1/2 z-20">
              <motion.button
                onClick={handlePrev}
                className="bg-white/80 backdrop-blur-sm text-blue-600 rounded-full p-2 shadow-lg border border-blue-100 hover:bg-blue-50 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeftIcon className="h-8 w-8" />
              </motion.button>
            </div>
            <div className="absolute -right-16 top-1/2 -translate-y-1/2 z-20">
              <motion.button
                onClick={handleNext}
                className="bg-white/80 backdrop-blur-sm text-blue-600 rounded-full p-2 shadow-lg border border-blue-100 hover:bg-blue-50 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRightIcon className="h-8 w-8" />
              </motion.button>
            </div>
            
            {/* Testimonials container */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-100px" }}
              className="flex justify-center gap-6"
              key={activeIndex} // Force re-render on index change
              custom={direction}
              animate={{
                transition: {
                  staggerChildren: 0.1
                }
              }}
            >
              {getVisibleTestimonials().map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  variants={cardVariants}
                  whileHover="hover"
                  className="bg-white/90 backdrop-blur-sm p-6 md:p-8 rounded-xl border border-blue-200 shadow-xl w-full max-w-sm relative"
                  custom={index}
                  animate={{
                    x: [direction * 100, 0],
                    opacity: [0, 1],
                    transition: {
                      duration: 0.4,
                      delay: index * 0.1
                    }
                  }}
                >
                  {/* Decorative corners - like other components */}
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-blue-300/50 rounded-tl z-0"></div>
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-blue-300/50 rounded-tr z-0"></div>
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-blue-300/50 rounded-bl z-0"></div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-blue-300/50 rounded-br z-0"></div>
                  
                  {/* Quote icon */}
                  <motion.div 
                    variants={quoteVariants}
                    className="absolute -top-5 -left-5 bg-blue-100 rounded-full p-3"
                  >
                    <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5 3.871 3.871 0 01-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5 3.871 3.871 0 01-2.748-1.179z" />
                    </svg>
                  </motion.div>
                  
                  {/* Rating */}
                  <div className="mb-4">
                    <StarRating rating={testimonial.rating} />
                  </div>
                  
                  {/* Testimonial text */}
                  <p className="text-blue-900/80 mb-6 italic">
                    "{testimonial.text}"
                  </p>
                  
                  {/* Author info */}
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-blue-200">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-900">{testimonial.name}</h4>
                      <p className="text-blue-600 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  
                  {/* Blue circle decoration */}
                  <div className="absolute -bottom-10 -right-10 w-24 h-24 rounded-full bg-blue-400/10 z-0"></div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          {/* Pagination dots */}
          <div className="flex justify-center mt-8 gap-2">
            {testimonialData.map((_, index) => (
              <motion.button
                key={index}
                className={`w-2.5 h-2.5 rounded-full ${index === activeIndex ? 'bg-blue-500' : 'bg-blue-200'}`}
                onClick={() => setActiveIndex(index)}
                whileHover={{ scale: 1.5 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
              />
            ))}
          </div>
        </div>
        
        {/* Mobile Testimonials - Stack layout for mobile only */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-50px" }}
          className="md:hidden space-y-8"
        >
          {testimonialData.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-white/90 backdrop-blur-sm p-6 rounded-xl border border-blue-200 shadow-lg relative"
            >
              {/* Decorative corners */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-blue-300/50 rounded-tl z-0"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-blue-300/50 rounded-tr z-0"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-blue-300/50 rounded-bl z-0"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-blue-300/50 rounded-br z-0"></div>
              
              {/* Quote icon - Small version for mobile */}
              <div className="absolute -top-3 -left-3 bg-blue-100 rounded-full p-2">
                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5 3.871 3.871 0 01-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5 3.871 3.871 0 01-2.748-1.179z" />
                </svg>
              </div>
              
              {/* Rating */}
              <div className="mb-3">
                <StarRating rating={testimonial.rating} />
              </div>
              
              {/* Testimonial text */}
              <p className="text-blue-900/80 mb-4 text-sm italic">
                "{testimonial.text}"
              </p>
              
              {/* Author info */}
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full overflow-hidden mr-3 border-2 border-blue-200">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900 text-sm">{testimonial.name}</h4>
                  <p className="text-blue-600 text-xs">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* CTA section - matches the one in About.jsx */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, margin: "-100px" }}
          className="max-w-4xl mx-auto text-center py-12 px-4 mt-16 border-t border-blue-100"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-blue-900 mb-4">Überzeugen Sie sich selbst</h3>
          <p className="text-lg text-blue-700/80 mb-8 max-w-2xl mx-auto">
            Kontaktieren Sie uns für ein persönliches Beratungsgespräch und ein unverbindliches Angebot.
          </p>
          <motion.a 
            href="/kontakt"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-700 transition-colors flex items-center mx-auto inline-flex"
          >
            <span>Jetzt anfragen</span>
            <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;