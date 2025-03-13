import React from 'react';
import Hero from '../components/Hero';
import AnimatedTextSection from '../components/AnimatedTextSection';
import HorizontalScrollSection from '../components/HorizontalScrollSection';
import BeforeAfterGallery from '../components/BeforeAfterGallery';

const Home = () => {
  return (
    <>
      <Hero />
      <AnimatedTextSection />
      <BeforeAfterGallery/>
      <HorizontalScrollSection />
    </>
  );
};

export default Home;