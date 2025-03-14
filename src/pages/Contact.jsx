import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { 
  UserIcon, 
  EnvelopeIcon, 
  PhoneIcon, 
  ChatBubbleBottomCenterTextIcon,
  ArrowRightIcon 
} from '@heroicons/react/24/outline';
import WorldMap from '../components/ui/WorldMap';

const decorativeVariants = {
  initial: { opacity: 0, scale: 0 },
  animate: { opacity: 0.3, scale: 1 },
  transition: { duration: 0.5, ease: "easeOut" }
};

const inputVariants = {
  focus: {
    scale: 1.02,
    transition: { duration: 0.2 }
  },
  blur: {
    scale: 1,
    transition: { duration: 0.2 }
  }
};

const ContactForm = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ show: false, success: false, message: '' });
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    phone: '',
    message: ''
  });

  const mapDots = [
    {
      start: { lat: 46.8182, lng: 8.2275 }, // Switzerland
      end: { lat: 40.7128, lng: -74.0060 }, // New York
    },
    {
      start: { lat: 46.8182, lng: 8.2275 }, // Switzerland
      end: { lat: 35.6762, lng: 139.6503 }, // Tokyo
    },
    {
      start: { lat: 46.8182, lng: 8.2275 }, // Switzerland
      end: { lat: -33.8688, lng: 151.2093 }, // Sydney
    },
    {
      start: { lat: 46.8182, lng: 8.2275 }, // Switzerland
      end: { lat: 13.7563, lng: 100.5018 }, // Bangkok
    },
    {
      start: { lat: 46.8182, lng: 8.2275 }, // Switzerland
      end: { lat: -22.9068, lng: -43.1729 }, // Rio de Janeiro
    },
    {
      start: { lat: 46.8182, lng: 8.2275 }, // Switzerland
      end: { lat: 25.2048, lng: 55.2708 }, // Dubai
    },
    {
      start: { lat: 46.8182, lng: 8.2275 }, // Switzerland
      end: { lat: 1.3521, lng: 103.8198 }, // Singapore
    },
    {
      start: { lat: 46.8182, lng: 8.2275 }, // Switzerland
      end: { lat: 55.7558, lng: 37.6173 }, // Moscow
    }
  ];

  // Add scroll to top effect when component mounts
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);
  
  // Initialize EmailJS
  useEffect(() => {
    emailjs.init("-NWp731-hJ2KBhmcB"); // Replace with your public key
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ show: false, success: false, message: '' });

    try {
      const templateParams = {
        from_name: formData.from_name,
        from_email: formData.from_email,
        phone: formData.phone,
        message: formData.message,
        to_name: 'Art Halimi',
        to_email: 'arthalimi989@gmail.com'
      };

      await emailjs.send(
        'service_edxi3zr',
        'template_ne9wh4b',
        templateParams,
        '-NWp731-hJ2KBhmcB'
      );

      setStatus({
        show: true,
        success: true,
        message: 'Nachricht erfolgreich gesendet!'
      });
      
      // Reset form
      setFormData({
        from_name: '',
        from_email: '',
        phone: '',
        message: ''
      });
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus({
        show: true,
        success: false,
        message: 'Fehler beim Senden der Nachricht.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="relative w-full min-h-screen bg-gradient-to-b from-white via-blue-50 to-blue-100 py-8 lg:py-16 px-4 lg:px-6 overflow-hidden flex items-center justify-center">
      {/* Blueprint Grid Background */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e40af" strokeWidth="0.5"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Add Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-600/20 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 30 - 15],
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        ))}
      </div>

      {/* Add Glowing Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-40 h-40 bg-blue-300/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-40 h-40 bg-blue-200/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto w-full z-20 flex flex-col items-center justify-center">
        {/* Title Section */}
        <div className="relative mb-16 flex justify-center">
          <motion.div
            className="inline-block relative"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-blue-900 relative z-10">
              Kontaktieren Sie uns
            </h2>
            {/* Animated underline */}
            <motion.div
              className="absolute -bottom-2 left-0 h-1 bg-blue-400/60 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
            />
            {/* Corner decorations */}
            <svg className="absolute -left-8 -top-8 w-16 h-16 opacity-20" viewBox="0 0 100 100">
              <path d="M20,0 V40 H60" stroke="#3b82f6" strokeWidth="2" fill="none" />
            </svg>
            <svg className="absolute -right-8 -top-8 w-16 h-16 opacity-20" viewBox="0 0 100 100">
              <path d="M80,0 V40 H40" stroke="#3b82f6" strokeWidth="2" fill="none" />
            </svg>
          </motion.div>
        </div>

        {/* Content Grid */}
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-start justify-items-center">
          {/* World Map - Hidden on mobile */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="hidden lg:block w-full relative rounded-xl mt-16 lg:mt-24"
          >
            <div className="w-full h-[700px] bg-white/5 backdrop-blur-sm border border-blue-200/20 rounded-xl p-6">
              <WorldMap dots={mapDots} />
              <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-transparent pointer-events-none rounded-xl" />
            </div>
          </motion.div>

          {/* Form Container - Full width on mobile */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-full col-span-1 lg:col-span-1 mt-8 lg:mt-0 relative z-10"
          >
            <form 
              ref={form} 
              onSubmit={handleSubmit} 
              className="w-full h-auto min-h-[500px] space-y-4 relative backdrop-blur-sm bg-white/80 p-6 lg:p-8 rounded-xl border border-blue-200 shadow-lg flex flex-col justify-between"
            >
              {/* Wrap input fields in a div */}
              <div className="space-y-6">
                {/* Name Input */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="relative group"
                >
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <UserIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 z-30 text-blue-600 group-hover:text-blue-800 transition-colors duration-300" />
                    <input
                      type="text"
                      name="from_name" // Changed from 'name'
                      value={formData.from_name}
                      onChange={handleChange}
                      required
                      className="w-full bg-white/90 backdrop-blur-sm border border-blue-200 rounded-lg pl-12 pr-4 py-3 text-blue-900 placeholder-blue-400/70 focus:outline-none focus:ring-2 focus:ring-blue-400/60 transition-all duration-300 group-hover:border-blue-400"
                      placeholder="Ihr Name"
                    />
                    {/* Decorative glow effect */}
                    <div className="absolute inset-0 -z-10 bg-blue-400/10 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                  <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-blue-300"></div>
                  <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-blue-300"></div>
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-blue-300"></div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-blue-300"></div>
                </motion.div>

                {/* Email Input */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="relative"
                >
                  <div className="relative">
                    <EnvelopeIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-600 group-hover:text-blue-800 transition-colors duration-300 z-30" />
                    <input
                      type="email"
                      name="from_email" // Changed from 'email'
                      value={formData.from_email}
                      onChange={handleChange}
                      required
                      className="w-full bg-white/90 backdrop-blur-sm border border-blue-200 rounded-lg pl-12 pr-4 py-3 text-blue-900 placeholder-blue-400/70 focus:outline-none focus:ring-2 focus:ring-blue-400/60"
                      placeholder="Ihre E-Mail"
                    />
                  </div>
                  <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-blue-300"></div>
                  <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-blue-300"></div>
                  <div class="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-blue-300"></div>
                  <div class="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-blue-300"></div>
                </motion.div>

                {/* Phone Input */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="relative"
                >
                  <div className="relative">
                    <PhoneIcon className="absolute z-30 left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-600 group-hover:text-blue-800 transition-colors duration-300" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-white/90 backdrop-blur-sm border border-blue-200 rounded-lg pl-12 pr-4 py-3 text-blue-900 placeholder-blue-400/70 focus:outline-none focus:ring-2 focus:ring-blue-400/60"
                      placeholder="Ihre Telefonnummer (optional)"
                    />
                  </div>
                  <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-blue-300"></div>
                  <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-blue-300"></div>
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-blue-300"></div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-blue-300"></div>
                </motion.div>

                {/* Message Textarea */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="relative"
                >
                  <div className="relative">
                    <ChatBubbleBottomCenterTextIcon className="absolute z-30 left-4 top-4 w-5 h-5 text-blue-600 group-hover:text-blue-800 transition-colors duration-300" />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      className="w-full bg-white/90 backdrop-blur-sm border border-blue-200 rounded-lg pl-12 pr-4 py-3 text-blue-900 placeholder-blue-400/70 focus:outline-none focus:ring-2 focus:ring-blue-400/60 resize-none"
                      placeholder="Ihre Nachricht"
                    ></textarea>
                  </div>
                  <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-blue-300"></div>
                  <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-blue-300"></div>
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-blue-300"></div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-blue-300"></div>
                </motion.div>
              </div>

              {/* Status and button container */}
              <div className="space-y-4">
                {/* Status Message */}
                {status.show && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`text-center p-3 rounded-lg ${
                      status.success ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'
                    }`}
                  >
                    {status.message}
                  </motion.div>
                )}

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="flex justify-center pt-4"
                >
                  <button
                    type="submit"
                    disabled={loading}
                    className="relative group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed overflow-hidden shadow-lg"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {loading ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          />
                          <span>Wird gesendet...</span>
                        </>
                      ) : (
                        <>
                          <span>Nachricht senden</span>
                          <motion.div
                            initial={{ x: -5, opacity: 0.5 }}
                            animate={{ x: 5, opacity: 1 }}
                            transition={{
                              repeat: Infinity,
                              repeatType: "reverse",
                              duration: 0.8,
                            }}
                          >
                            <ArrowRightIcon className="w-5 h-5 text-white transition-transform" />
                          </motion.div>
                        </>
                      )}
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600"
                      initial={{ x: "100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </button>
                </motion.div>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;