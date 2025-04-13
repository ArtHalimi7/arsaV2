import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import teamImg from '../assets/images/teamhero.jpg'; 
import RotatingText from './ui/RotatingText'


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
      </div>
      
      {/* Content */}
      <div className="relative z-10 h-full max-w-[1400px] mx-auto px-4 md:px-8 lg:pl-16 flex flex-col justify-center">
        {/* Updated header section with center alignment on mobile */}
        <div className="flex flex-col items-center md:items-start md:flex-row  gap-2">
          <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-white whitespace-nowrap text-center md:text-left">
            IHR PARTNER IN
          </span>
          <RotatingText
            texts={[
              'TROCKENBAU',
              'GIPSERARBEITEN',
              'SPACHTELARBEITEN',
            ]}
            mainClassName="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-400 mb-5 leading-tight tracking-tight mt-2 md:mt-0 text-center md:text-left [text-shadow:_-1px_-1px_0_#fff,_1px_-1px_0_#fff,_-1px_1px_0_#fff,_1px_1px_0_#fff]"
            staggerFrom={"last"}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={3000}
          />
        </div>
        
        {/* Updated paragraph with center alignment on mobile */}
        <p 
          className="text-lg md:text-xl font-light text-white/90 max-w-xl mb-8 transition-all duration-1000 mt-4 text-center md:text-left mx-auto md:mx-0"
        >
          ARSA liefert erstklassige Gipser- und Trockenbaulösungen für moderne Wohn- und Geschäftsräume.
        </p>
        
        {/* Updated buttons container with center alignment on mobile */}
        <div 
          className="flex flex-col sm:flex-row gap-4 transition-all duration-1000 items-center md:items-start"
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