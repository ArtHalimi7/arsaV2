import React from 'react';
import Hero from '../components/Hero';
import AnimatedTextSection from '../components/AnimatedTextSection';
import HorizontalScrollSection from '../components/HorizontalScrollSection';
import BeforeAfterGallery from '../components/BeforeAfterGallery';
import Location from '../components/Location';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <>
      <Hero />
      <AnimatedTextSection />
      <BeforeAfterGallery/>
      <HorizontalScrollSection />
      <Location />
      <Footer/>
    </>
  );
};

export default Home;