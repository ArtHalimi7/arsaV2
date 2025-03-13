import React, { useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './index.css';
import { Home, About, Services, Contact} from './pages';
import Navbar from './components/Navbar';
import WhatsappWidget from './components/WhatsappWidget';
import Lenis from '@studio-freight/lenis';


const App = () => {
  useEffect(() => {
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
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <main className='background1'>
        <Router>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Router>
        <WhatsappWidget />
      </main>
    </>
  );
}

export default App;
