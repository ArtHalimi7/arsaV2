import React, { useState, useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './index.css';
import { Home, About, Projects, Contact} from './pages';
import Navbar from './components/Navbar';
import WhatsappWidget from './components/WhatsappWidget';
import Lenis from '@studio-freight/lenis';
import SplashScreen from './components/ui/splash-screen';
import { AnimatePresence } from 'framer-motion';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 seconds

    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,      // Controls the speed of the smooth scrolling
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Ease out function
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,  // Enable smooth scrolling for mouse wheel
      wheelMultiplier: 1, // Adjust the intensity of wheel scrolling
      smoothTouch: false, // Usually better to disable for touch devices
      touchMultiplier: 2, // Adjust the intensity of touch scrolling
    });

    // Link lenis to requestAnimationFrame for optimal performance
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    
    requestAnimationFrame(raf);

    // Cleanup function
    return () => {
      clearTimeout(timer);
      lenis.destroy();
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading ? <SplashScreen /> : (
        <main className='background1'>
          <Router>
            <Navbar/>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projekte" element={<Projects />} />
              <Route path="/kontakt" element={<Contact />} />
            </Routes>
          </Router>
          <WhatsappWidget />
        </main>
      )}
    </AnimatePresence>
  );
}

export default App;
