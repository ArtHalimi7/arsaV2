import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import teamImg from '../assets/images/teamhero.jpg'; 

const Hero = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  
  useEffect(() => {
    // Add animation classes after component mounts
    setTimeout(() => {
      if (titleRef.current && subtitleRef.current && ctaRef.current) {
        titleRef.current.classList.add('opacity-100', 'translate-y-0');
        subtitleRef.current.classList.add('opacity-100', 'translate-y-0');
        ctaRef.current.classList.add('opacity-100', 'translate-y-0');
      }
    }, 100);
  }, []);

  const handleCallClick = () => {
    window.location.href = 'tel:+41796590245';
  };

  return (
    <div className="relative h-[80vh] w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center brightness-[0.8]"
          style={{ 
            backgroundImage: `url(${teamImg})` 
          }}
        />
        {/* Subtle gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 to-transparent"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 h-full max-w-[1400px] mx-auto px-8 flex flex-col justify-center">
        <h1 
          ref={titleRef}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight tracking-tight opacity-0 translate-y-8 transition-all duration-1000"
        >
          Präzision und <span className="text-blue-300">Eleganz</span> in jedem Detail
        </h1>
        
        <p 
          ref={subtitleRef}
          className="text-lg md:text-xl font-light text-white/90 max-w-xl mb-8 opacity-0 translate-y-8 transition-all duration-1000 delay-200"
        >
          ARSA liefert erstklassige Gipser- und Trockenbaulösungen für moderne Wohn- und Geschäftsräume.
        </p>
        
        <div 
          ref={ctaRef}
          className="flex flex-col sm:flex-row gap-4 opacity-0 translate-y-8 transition-all duration-1000 delay-400"
        >
          <button 
            onClick={handleCallClick}
            className="px-6 py-3 text-base font-semibold bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 hover:-translate-y-1 transition-all duration-300"
          >
            Kontakt aufnehmen
          </button>
          
          <Link to="/projekte" className="px-6 py-3 text-base font-semibold bg-transparent text-white border-2 border-white/70 rounded hover:bg-white/10 transition-all duration-300 text-center">
            Unsere Projekte
          </Link>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/70 hover:text-white/100 transition-opacity duration-300">
        <span className="text-sm">Mehr entdecken</span>
        <div className="mt-2 animate-bounce">↓</div>
      </div>
    </div>
  );
};

export default Hero;