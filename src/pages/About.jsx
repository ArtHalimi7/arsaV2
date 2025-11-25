import React, { useEffect } from 'react';
import setMeta from '../lib/seo';
import { motion } from 'framer-motion';
import teamImg from '../assets/images/team.png';
import teammember1 from '../assets/images/arsa.jpeg';
import teammember2 from '../assets/images/teammember2.png';
import teammember3 from '../assets/images/teammember3.png';

const About = () => {
  // Add scroll to top effect when component mounts
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setMeta({
      title: 'ARSA Gipser — Über uns',
      description: 'Erfahren Sie mehr über ARSA Gipser: Unser Team, unsere Werte und unsere 15+ Jahre Erfahrung in Trockenbau und Renovation in der Schweiz.',
      url: 'https://arsagipser.ch/about'
    });
  }, []);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };
  
  const valuesData = [
    {
      icon: "🏗️",
      title: "Qualität",
      description: "Wir verwenden nur hochwertige Materialien und setzen auf präzise Handwerkskunst."
    },
    {
      icon: "⏱️",
      title: "Zuverlässigkeit",
      description: "Termintreue und transparente Kommunikation stehen bei uns an erster Stelle."
    },
    {
      icon: "💡",
      title: "Innovation",
      description: "Wir bilden uns kontinuierlich weiter und setzen auf moderne Techniken und Materialien."
    },
    {
      icon: "🤝",
      title: "Kundenzufriedenheit",
      description: "Ihre Zufriedenheit ist unser oberstes Ziel – wir gehen auf Ihre individuellen Wünsche ein."
    }
  ];
  
  const experienceData = [
    { number: "15+", text: "Jahre Erfahrung" },
    { number: "500+", text: "Abgeschlossene Projekte" },
    { number: "350+", text: "Zufriedene Kunden" },
    { number: "25+", text: "Spezialisierte Mitarbeiter" }
  ];

  return (
    <div className="relative bg-gradient-to-b from-blue-50/30 to-white overflow-hidden py-24">
      {/* Decorative Elements - Similar to Projects.jsx */}
      <div className="absolute top-0 left-0 w-80 h-80 opacity-30 -translate-x-12 -translate-y-12 z-0">
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
        </svg>
      </div>
      
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
          <pattern id="drywall" patternUnits="userSpaceOnUse" width="100" height="100">
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#000" strokeWidth="1"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#drywall)" />
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
          className="text-center mb-20"
        >
          <motion.div
            className="inline-block relative"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: false, margin: "-100px" }}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-blue-900 mb-4 mt-10 relative z-10"
            >
              Über uns
            </motion.h2>
            
            {/* Animated underline */}
            <motion.div
              className="absolute bottom-4 left: 0 right: 0 h-2 bg-blue-400/60"
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
            Lernen Sie unser Team und unsere Geschichte kennen
          </motion.p>
        </motion.div>

        {/* Company Story Section */}
        <div className="max-w-6xl mx-auto mb-24">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div 
              className="w-full md:w-1/2"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-100px" }}
            >
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-full h-full border-2 border-blue-300/30 rounded-xl"></div>
                <img 
                  src={teamImg} 
                  alt="Unser Team" 
                  className="object-cover rounded-xl shadow-xl relative z-10"
                />
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-500/10 rounded-xl z-0"></div>
              </div>
            </motion.div>
            
            <motion.div 
              className="w-full md:w-1/2"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-100px" }}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-blue-900 mb-4">Unsere Geschichte</h3>
              <div className="w-20 h-1 bg-blue-500 mb-6"></div>
              <p className="text-gray-700 mb-4">
                Seit über 15 Jahren sind wir ein führendes Unternehmen im Bereich Trockenbau, Renovierung und Innenausbau in der Region. Unser Familienbetrieb wurde 2008 gegründet und hat sich seitdem durch Qualität, Zuverlässigkeit und handwerkliches Können einen Namen gemacht.
              </p>
              <p className="text-gray-700 mb-6">
                Was als kleines Unternehmen begann, ist heute ein etablierter Betrieb mit über 25 spezialisierten Mitarbeitern. Unser Ziel ist es, Ihren Wohn- und Arbeitsraum genau nach Ihren Vorstellungen zu gestalten – funktional, ästhetisch und langlebig.
              </p>
              <blockquote className="italic text-blue-800 border-l-4 border-blue-400 pl-4 py-2 mb-6">
                "Wir schaffen nicht nur Wände und Decken, wir schaffen Räume zum Leben."
              </blockquote>
              <p className="text-gray-700">
                Mit fundiertem Fachwissen und einem Auge für Details verwandeln wir Ihre Ideen in Realität. Dabei setzen wir auf moderne Materialien und innovative Techniken, ohne dabei die traditionelle Handwerkskunst zu vernachlässigen.
              </p>
            </motion.div>
          </div>
        </div>
        
        {/* Experience Stats Section - White Background with Blue Text */}
        <section className="relative hidden md:block h-[50vh] w-full bg-transparent overflow-hidden">
          {/* Make sure we go full width by removing any container constraints */}
          <div className="absolute inset-0">
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
                ERFAHRUNG QUALITÄT ERFOLG&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
                ERFAHRUNG QUALITÄT ERFOLG&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </motion.div>
            </div>
          </div>
          
          {/* Content Overlay - Perfectly Centered */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: false, margin: "-100px" }}
                className="text-center mb-12"
              >
                <h3 className="text-3xl md:text-4xl font-bold text-blue-900 mb-3">Unsere Erfolge</h3>
                <div className="w-24 h-1 bg-blue-500 mx-auto mb-6"></div>
              </motion.div>

              {/* Grid with count-up animation for numbers - Centered Text */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-6xl mx-auto px-4 mt-[100px] md:mt-[190px]">
                {experienceData.map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: false, margin: "-100px" }}
                    className="text-center flex flex-col items-center justify-center p-3 md:p-4"
                  >
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ 
                        duration: 0.8, 
                        delay: 0.2 + (index * 0.1),
                        ease: [0.34, 1.56, 0.64, 1] // Spring-like animation
                      }}
                      viewport={{ once: false, margin: "-100px" }}
                      className="mb-1 md:mb-2 text-center"
                    >
                      <motion.p
                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-600 inline-block"
                        initial={{ opacity: 0.3 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ 
                          duration: 1.8,
                          delay: 0.4 + (index * 0.2)
                        }}
                      >
                        {item.number}
                      </motion.p>
                    </motion.div>
                    <p className="text-base md:text-lg text-blue-800/80 font-medium">{item.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Meet the Team Section - Redesigned */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: false, margin: "-100px" }}
          className="max-w-6xl mx-auto mb-24"
        >
          <div className="text-center mb-12">
            <motion.h3 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: false, margin: "-100px" }}
              className="text-3xl font-bold text-blue-900 mb-4"
            >
              Unser Team
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: false, margin: "-100px" }}
              className="text-lg text-blue-800/70 max-w-3xl mx-auto"
            >
              Die Experten, die Ihre Vision zum Leben erwecken
            </motion.p>
          </div>
          
          <div className="flex flex-col gap-16">
            {/* Team Member 1 */}
            <div className="flex flex-col md:flex-row items-center gap-12">
              <motion.div 
                className="w-full md:w-2/5"
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-100px" }}
              >
                <div className="relative max-w-sm mx-auto md:mx-0">
                  <div className="absolute -top-3 -left-3 w-full h-full border-2 border-blue-300/30 rounded-full"></div>
                  <div className="rounded-full overflow-hidden shadow-xl relative z-10" style={{ aspectRatio: "1/1" }}>
                    <img 
                      src={teammember1} 
                      alt="Martin Weber" 
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div className="absolute -bottom-3 -right-3 w-20 h-20 bg-blue-500/10 rounded-full z-0"></div>
                </div>
              </motion.div>
              
              <motion.div 
                className="w-full md:w-3/5"
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-100px" }}
              >
                <h3 className="text-2xl md:text-3xl font-bold text-blue-900 mb-3">Arsim Redzepi</h3>
                <h4 className="text-lg text-blue-600 mb-4">Geschäftsführer</h4>
                <div className="w-20 h-1 bg-blue-500 mb-6"></div>
                <p className="text-gray-700 mb-4">
                  Mit über 20 Jahren Erfahrung in der Baubranche leitet Martin unser Unternehmen seit der Gründung. Seine Vision von handwerklicher Exzellenz und Kundenzufriedenheit prägt unsere Unternehmenskultur bis heute.
                </p>
                <p className="text-gray-700">
                  Nach seiner Ausbildung zum Stuckateur und dem erfolgreichen Abschluss als Meister im Trockenbau gründete er 2008 unseren Betrieb und entwickelte ihn kontinuierlich weiter.
                </p>
              </motion.div>
            </div>
            
            {/* Team Member 2 */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-12">
              <motion.div 
                className="w-full md:w-2/5"
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-100px" }}
              >
                <div className="relative max-w-sm mx-auto md:mx-0">
                  <div className="absolute -top-3 -left-3 w-full h-full border-2 border-blue-300/30 rounded-full"></div>
                  <div className="rounded-full overflow-hidden shadow-xl relative z-10" style={{ aspectRatio: "1/1" }}>
                    <img 
                      src={teammember2}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div className="absolute -bottom-3 -right-3 w-20 h-20 bg-blue-500/10 rounded-full z-0"></div>
                </div>
              </motion.div>
              
              <motion.div 
                className="w-full md:w-3/5"
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-100px" }}
              >
                <h3 className="text-2xl md:text-3xl font-bold text-blue-900 mb-3">Kevin Becker</h3>
                <h4 className="text-lg text-blue-600 mb-4">Projektleiter</h4>
                <div className="w-20 h-1 bg-blue-500 mb-6"></div>
                <p className="text-gray-700 mb-4">
                  Kevin koordiniert unsere größten Projekte und sorgt dafür, dass alles pünktlich und zur vollsten Zufriedenheit unserer Kunden umgesetzt wird. Mit ihrem Auge für Detail und ihrer strukturierten Arbeitsweise garantiert sie reibungslose Abläufe.
                </p>
                <p className="text-gray-700">
                  Mit ihrem Hintergrund in Architektur und Innendesign bringt sie wertvolle Perspektiven in unsere Projekte ein und findet innovative Lösungen für selbst die anspruchsvollsten Herausforderungen.
                </p>
              </motion.div>
            </div>
            
            {/* Team Member 3 */}
            <div className="flex flex-col md:flex-row items-center gap-12">
              <motion.div 
                className="w-full md:w-2/5"
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-100px" }}
              >
                <div className="relative max-w-sm mx-auto md:mx-0">
                  <div className="absolute -top-3 -left-3 w-full h-full border-2 border-blue-300/30 rounded-full"></div>
                  <div className="rounded-full overflow-hidden shadow-xl relative z-10" style={{ aspectRatio: "1/1" }}>
                    <img 
                      src={teammember3}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div className="absolute -bottom-3 -right-3 w-20 h-20 bg-blue-500/10 rounded-full z-0"></div>
                </div>
              </motion.div>
              
              <motion.div 
                className="w-full md:w-3/5"
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-100px" }}
              >
                <h3 className="text-2xl md:text-3xl font-bold text-blue-900 mb-3">David Müller</h3>
                <h4 className="text-lg text-blue-600 mb-4">Meister Trockenbau</h4>
                <div className="w-20 h-1 bg-blue-500 mb-6"></div>
                <p className="text-gray-700 mb-4">
                  Als Meister seines Fachs führt Thomas unser Trockenbau-Team mit höchsten Qualitätsstandards und innovativen Lösungen. Seine handwerkliche Präzision und sein technisches Wissen machen ihn zu einer wertvollen Stütze unseres Unternehmens.
                </p>
                <p className="text-gray-700">
                  Mit über 15 Jahren Berufserfahrung und kontinuierlicher Weiterbildung in neuen Materialien und Techniken ist er stets auf dem neuesten Stand der Trockenbaukunst.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
        
        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, margin: "-100px" }}
          className="max-w-4xl mx-auto text-center py-12 px-4 border-t border-blue-100"
        >
          <h3 className="text-3xl font-bold text-blue-900 mb-4">Bereit, mit uns zu arbeiten?</h3>
          <p className="text-lg text-blue-700/80 mb-8 max-w-2xl mx-auto">
            Kontaktieren Sie uns noch heute für eine kostenlose Beratung und ein unverbindliches Angebot.
          </p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-700 transition-colors flex items-center mx-auto"
          >
            <span>Kontakt aufnehmen</span>
            <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default About;