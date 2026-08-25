import { useEffect } from 'react';
import setMeta from '../lib/seo';
import Hero from '../components/Hero';
import AnimatedTextSection from '../components/AnimatedTextSection';
import HorizontalScrollSection from '../components/HorizontalScrollSection';
import BeforeAfterGallery from '../components/BeforeAfterGallery';
import Location from '../components/Location';
import Footer from '../components/Footer';
import Testimonials from '../components/Testimonials';
import ProcessSection from '../components/ProcessSection';

const Home = () => {
  // Add scroll to top effect when component mounts
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setMeta({
      title: 'ARSA Gipser — Startseite',
      description: 'ARSA Gipser in Volketswil. Trockenbau, Renovation und Malerarbeiten. Professionelle Gipserarbeiten mit über 15 Jahren Erfahrung.',
      url: 'https://arsagipser.ch/'
    });
  }, []);
  
  return (
    <>
      <Hero />
      <AnimatedTextSection />
      <BeforeAfterGallery/>
      <HorizontalScrollSection />
      <ProcessSection/>
      <Testimonials/>
      <Location />
      <Footer/>
    </>
  );
};

export default Home;