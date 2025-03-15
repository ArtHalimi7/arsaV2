import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import AnimatedTextSection from '../components/AnimatedTextSection';
import HorizontalScrollSection from '../components/HorizontalScrollSection';
import BeforeAfterGallery from '../components/BeforeAfterGallery';
import Location from '../components/Location';
import Footer from '../components/Footer';
import Testimonials from '../components/Testimonials';

const Home = () => {
  // Add scroll to top effect when component mounts
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);
  
  return (
    <>
      <Hero />
      <AnimatedTextSection />
      <BeforeAfterGallery/>
      <HorizontalScrollSection />
      <Testimonials/>
      <Location />
      <Footer/>
    </>
  );
};

export default Home;