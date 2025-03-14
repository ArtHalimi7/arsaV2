import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import header4 from '../assets/images/header4.jpg';

const words = [
  "Trockenbau",
  "Gipsarbeiten",
  "Akustikdecken",
  "Brandschutz"
];

const Hero = () => {
  const [currentWord, setCurrentWord] = useState(0);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  useEffect(() => {
    // Word flip animation timer
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="relative" style={{ overflow: 'hidden' }}>
        <div className="relative">
          <img 
            src={header4} 
            alt="ARSA Gipser" 
            className="w-full h-auto object-cover slider-image img-fade-in-up" 
          />
          <div className="text-container">
            <div className="animated-title">
              <h1 className="title-static">Qualität in</h1>
              <div className="word-container">
                <AnimatePresence mode='wait'>
                  <motion.span
                    key={currentWord}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="title-dynamic"
                  >
                    {words[currentWord]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
            
            <motion.div
              className="button-container"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Link to="/kontakt">
                <motion.button 
                  className="image-button"
                  onMouseEnter={() => setIsButtonHovered(true)}
                  onMouseLeave={() => setIsButtonHovered(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Kontakt</span>
                  <motion.span 
                    className="button-arrow"
                    animate={{ x: isButtonHovered ? 5 : 0 }}
                    transition={{ duration: 0.2 }}
                  >→</motion.span>
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          overflow-x: hidden; /* Prevent horizontal scrolling */
        }
      `}</style>

      <style jsx>{`
        .slider-image {
          height: 80vh;
          animation: fadeInOut 1s ease-in-out;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        }

        .text-container {
          position: absolute;
          top: 50%;
          left: 150px;
          transform: translateY(-50%);
          text-align: left;
          z-index: 1;
        }
        
        .button-container {
          margin-top: 40px;
        }
        
        .image-button {
          width: 200px;
          height: 60px;
          background-color: #3074e4;
          color: white;
          padding: 12px 24px;
          border: none;
          border-radius: 8px;
          font-size: 18px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          box-shadow: 0 4px 14px rgba(48, 116, 228, 0.4);
          position: relative;
          overflow: hidden;
        }

        .image-button:hover {
          background-color: #1d5ac3;
          box-shadow: 0 6px 20px rgba(48, 116, 228, 0.6);
        }
        
        .image-button::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.7s ease;
        }
        
        .image-button:hover::after {
          left: 100%;
        }

        .button-arrow {
          font-size: 20px;
          display: inline-block;
        }

        .animated-title {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 10px;
          position: relative;
          z-index: 2;
        }

        .title-static {
          font-size: 72px;
          color: white;
          margin: 0;
          font-weight: bold;
          text-shadow: 
            -1px -1px 0 #3074e4,
            1px -1px 0 #3074e4,
            -1px 1px 0 #3074e4,
            1px 1px 0 #3074e4;
        }

        .title-dynamic {
          font-size: 80px;
          color: #3074e4;
          font-weight: bold;
          display: block;
          white-space: nowrap;
          text-shadow:
            -1px -1px 0 white,
            1px -1px 0 white,
            -1px 1px 0 white,
            1px 1px 0 white;
        }

        .word-container {
          height: 90px;
          position: relative;
          display: flex;
          align-items: center;
          overflow: hidden;
        }

        @media (max-width: 767px) {
          .slider-image {
            height: 100vh;
            object-position: center;
          }

          .text-container {
            top: 30%;
            left: 20px;
            width: 90%;
          }
          
          .animated-title {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }
          
          .title-static, .title-dynamic {
            font-size: 40px;
          }
          
          .title-dynamic {
            font-size: 48px;
          }
          
          .word-container {
            height: 50px;
          }
          
          .button-container {
            margin-top: 30px;
          }
          
          .image-button {
            width: 180px;
            height: 50px;
            font-size: 16px;
            padding: 10px 20px;
          }
        }

        @keyframes fadeInOut {
          0% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0.3;
          }
        }

        .img-fade-in-up {
          opacity: 0;
          animation: fadeInUp 0.5s forwards;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translate3d(0, 20px, 0);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </>
  );
};

export default Hero;