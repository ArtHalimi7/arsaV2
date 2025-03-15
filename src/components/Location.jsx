import React from 'react';
import { motion } from 'framer-motion';

const GoogleMapsSection = () => {
  return (
    <div className="relative w-full">

      {/* Full width Map Container */}
      <div className="w-full h-[500px] relative">
        <iframe
          src="https://maps.google.com/maps?q=Rigiweg%204,%208604%20Volketswil&t=&z=13&ie=UTF8&iwloc=&output=embed"
          className="w-full h-full"
          frameBorder="0"
          allowFullScreen
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default GoogleMapsSection;