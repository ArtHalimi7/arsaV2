import { useState, useRef, useEffect } from 'react';
import setMeta from '../lib/seo';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { 
  UserIcon, 
  EnvelopeIcon, 
  PhoneIcon, 
  ChatBubbleBottomCenterTextIcon,
  ArrowRightIcon,
  ClockIcon,
  MapPinIcon,
  BuildingOfficeIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';

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
  const [errors, setErrors] = useState({
    from_name: '',
    from_email: '',
    phone: '',
    message: ''
  });

  // Add scroll to top effect when component mounts
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setMeta({
      title: 'ARSA Gipser — Kontakt',
      description: 'Kontaktieren Sie ARSA Gipser in Volketswil für ein unverbindliches Angebot. Telefon, E-Mail und Adresse sind verfügbar.',
      url: 'https://arsagipser.ch/contact'
    });
  }, []);
  
  // Initialize EmailJS
  useEffect(() => {
    emailjs.init("-NWp731-hJ2KBhmcB");
  }, []);

  // Validate form fields
  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      from_name: '',
      from_email: '',
      phone: '',
      message: ''
    };

    // Validate name
    if (formData.from_name.trim().length < 2) {
      newErrors.from_name = 'Name muss mindestens 2 Zeichen lang sein';
      isValid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.from_email)) {
      newErrors.from_email = 'Bitte geben Sie eine gültige E-Mail-Adresse ein';
      isValid = false;
    }

    // Validate phone (optional)
    if (formData.phone && !/^[+\d\s()-]{6,20}$/.test(formData.phone)) {
      newErrors.phone = 'Bitte geben Sie eine gültige Telefonnummer ein';
      isValid = false;
    }

    // Validate message
    if (formData.message.trim().length < 10) {
      newErrors.message = 'Nachricht muss mindestens 10 Zeichen lang sein';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      return;
    }
    
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
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({...errors, [name]: ''});
    }
  };

  // Add field-specific blur validation for immediate feedback
  const handleBlur = (e) => {
    const { name } = e.target;
    
    switch(name) {
      case 'from_name':
        if (formData.from_name.trim().length < 2) {
          setErrors({...errors, from_name: 'Name muss mindestens 2 Zeichen lang sein'});
        }
        break;
      case 'from_email': {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.from_email)) {
          setErrors({...errors, from_email: 'Bitte geben Sie eine gültige E-Mail-Adresse ein'});
        }
        break;
      }
      case 'phone':
        if (formData.phone && !/^[+\d\s()-]{6,20}$/.test(formData.phone)) {
          setErrors({...errors, phone: 'Bitte geben Sie eine gültige Telefonnummer ein'});
        }
        break;
      case 'message':
        if (formData.message.trim().length < 10) {
          setErrors({...errors, message: 'Nachricht muss mindestens 10 Zeichen lang sein'});
        }
        break;
      default:
        break;
    }
  };

  return (
    <>
      <section className="relative w-full min-h-screen bg-gradient-to-b from-white via-blue-50 to-blue-100 pt-28 pb-24 px-4 lg:px-6 overflow-hidden flex items-center justify-center">
        {/* Background elements remain the same */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e40af" strokeWidth="0.5"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Decorative Elements */}
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

        {/* Decorative Elements from About.jsx */}
        <div className="absolute top-0 left-0 w-80 h-80 opacity-30 -translate-x-12 -translate-y-12 z-0">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path 
              d="M200,0 L160,45 L170,60 L155,75 L170,90 L150,110 L160,120 L145,135 L150,160 L135,170 L140,190 L120,200" 
              fill="none" 
              stroke="#2563eb" 
              strokeWidth="1.2" 
              strokeLinecap="round" 
            />
            <path 
              d="M170,60 L188,72" 
              fill="none" 
              stroke="#2563eb" 
              strokeWidth="1" 
              strokeLinecap="round" 
            />
          </svg>
        </div>
        
        <div className="absolute bottom-40 right-0 w-96 h-96 opacity-20 translate-x-20 translate-y-20 z-0">
          <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <rect x="0" y="50" width="75" height="38" fill="none" stroke="#1e40af" strokeWidth="2" />
            <rect x="85" y="55" width="65" height="33" fill="none" stroke="#1e40af" strokeWidth="2" />
            <rect x="160" y="48" width="85" height="40" fill="none" stroke="#1e40af" strokeWidth="2" />
            <rect x="255" y="52" width="60" height="36" fill="none" stroke="#1e40af" strokeWidth="2" />
            <rect x="325" y="48" width="70" height="40" fill="none" stroke="#1e40af" strokeWidth="2" />
            <rect x="15" y="98" width="90" height="35" fill="none" stroke="#1e40af" strokeWidth="2" />
            <rect x="115" y="95" width="65" height="38" fill="none" stroke="#1e40af" strokeWidth="2" />
          </svg>
        </div>

        {/* Add Glowing Orbs */}
        <div className="absolute top-40 left-10 w-60 h-60 rounded-full bg-blue-100/20 blur-3xl z-0"></div>
        <div className="absolute bottom-60 right-10 w-80 h-80 rounded-full bg-blue-200/30 blur-3xl z-0"></div>

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
              <svg className="absolute -left-6 bottom-0 w-12 h-12 opacity-30" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <path d="M0,80 H40 V40" stroke="#2563eb" strokeWidth="2" fill="none" />
              </svg>
              <svg className="absolute -right-6 bottom-0 w-12 h-12 opacity-30" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <path d="M100,80 H60 V40" stroke="#2563eb" strokeWidth="2" fill="none" />
              </svg>
            </motion.div>
          </div>

          {/* Two column section with contact info + form - Reduced gap and equal heights */}
          <div className="w-full flex flex-col lg:flex-row gap-4 items-stretch justify-center">
            {/* Contact Info Panel - Height adjusted to match form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full lg:w-1/3 max-w-md flex h-full"
            >
              <div className="relative flex-1 h-full">
                {/* Add the border decoration from About page */}
                <div className="absolute -top-4 -left-4 w-full h-full border-2 border-blue-300/30 rounded-xl"></div>
                
                <div className="backdrop-blur-sm bg-white/70 p-6 lg:p-8 rounded-xl border border-blue-200 shadow-lg relative overflow-hidden h-full flex flex-col z-10">
                  {/* Animated corner accent */}
                  <motion.div 
                    className="absolute top-0 left-0 w-24 h-24 pointer-events-none opacity-10"
                    initial={{ rotate: -15, scale: 0.9 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                  >
                    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0,0 L100,0 L0,100 Z" fill="#3b82f6" />
                    </svg>
                  </motion.div>
                  
                  <div className="flex-auto flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-blue-900 mb-5 relative">Unsere Kontaktdaten</h3>

                      {/* Contact info items - Reduced spacing for equal height */}
                      <div className="space-y-5 relative">
                        {/* Phone */}
                        <motion.div 
                          className="flex items-start space-x-4"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.2 }}
                          whileHover={{ scale: 1.03 }}
                        >
                          <div className="bg-blue-50 p-3 rounded-lg">
                            <PhoneIcon className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-blue-800">Telefon</h4>
                            <a href="tel:+41796590245" className="text-blue-700 hover:text-blue-500 transition-colors">
                              +41 79 659 02 45
                            </a>
                          </div>
                        </motion.div>

                        {/* Email */}
                        <motion.div 
                          className="flex items-start space-x-4"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 }}
                          whileHover={{ scale: 1.03 }}
                        >
                          <div className="bg-blue-50 p-3 rounded-lg">
                            <EnvelopeIcon className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-blue-800">E-Mail</h4>
                            <a href="mailto:redzepi.arsa@gmail.com" className="text-blue-700 hover:text-blue-500 transition-colors">
                            redzepi.arsa@gmail.com
                            </a>
                          </div>
                        </motion.div>

                        {/* Address */}
                        <motion.div 
                          className="flex items-start space-x-4"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.4 }}
                          whileHover={{ scale: 1.03 }}
                        >
                          <div className="bg-blue-50 p-3 rounded-lg">
                            <MapPinIcon className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-blue-800">Adresse</h4>
                            <p className="text-blue-700">
                            Rigiweg 4
                            <br />
                            8604 Volketswil
                            </p>
                          </div>
                        </motion.div>

                        {/* Office hours */}
                        <motion.div 
                          className="flex items-start space-x-4"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.5 }}
                          whileHover={{ scale: 1.03 }}
                        >
                          <div className="bg-blue-50 p-3 rounded-lg">
                            <ClockIcon className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-blue-800">Bürozeiten</h4>
                            <p className="text-blue-700">
                              Mo - Fr: <br/>
                              8:00 - 17:00 Uhr
                            </p>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                    
                    {/* Company logo or additional branding element */}
                    <motion.div 
                      className="mt-auto pt-4 flex justify-center"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.7 }}
                    >
                      <div className="flex items-center justify-center p-4 border-t border-blue-100">
                        <BuildingOfficeIcon className="w-8 h-8 text-blue-500 opacity-70 mr-3" />
                        <p className="text-blue-800 font-medium">ARSA</p>
                      </div>
                    </motion.div>

                    {/* Animated decorative pulse */}
                    <motion.div 
                      className="absolute -bottom-24 -right-24 w-48 h-48 bg-blue-400/10 rounded-full"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.2, 0.1]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    />
                  </div>
                </div>
                
                {/* Add the circle decoration from About page */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-500/10 rounded-xl z-0"></div>
              </div>
            </motion.div>

            {/* Form Container - With new decorative elements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="w-full lg:w-2/3 max-w-2xl relative z-10"
            >
              {/* Add decorative elements */}
              <div className="relative h-full">
                {/* Add the border decoration from About page */}
                <div className="absolute -top-4 -left-4 w-full h-full border-2 border-blue-300/30 rounded-xl"></div>
                
                {/* Form layout remains the same but with z-10 to appear above border */}
                <form 
                  ref={form} 
                  onSubmit={handleSubmit} 
                  className="w-full h-full space-y-4 relative backdrop-blur-sm bg-white/80 p-6 lg:p-8 rounded-xl border border-blue-200 shadow-lg flex flex-col justify-between z-10"
                >
                  {/* Wrap input fields in a div */}
                  <div className="space-y-5">
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
                          name="from_name"
                          value={formData.from_name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          className={`w-full bg-white/90 backdrop-blur-sm border rounded-lg pl-12 pr-4 py-3 text-blue-900 placeholder-blue-400/70 focus:outline-none focus:ring-2 transition-all duration-300 group-hover:border-blue-400
                            ${errors.from_name ? 'border-red-300 focus:ring-red-400/60' : 'border-blue-200 focus:ring-blue-400/60'}`}
                          placeholder="Ihr Name"
                        />
                        {/* Error icon */}
                        {errors.from_name && (
                          <ExclamationCircleIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
                        )}
                        {/* Decorative glow effect */}
                        <div className="absolute inset-0 -z-10 bg-blue-400/10 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </motion.div>
                      {/* Error message */}
                      {errors.from_name && (
                        <motion.p 
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-1 text-sm text-red-500"
                        >
                          {errors.from_name}
                        </motion.p>
                      )}
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
                          name="from_email"
                          value={formData.from_email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          className={`w-full bg-white/90 backdrop-blur-sm border rounded-lg pl-12 pr-4 py-3 text-blue-900 placeholder-blue-400/70 focus:outline-none focus:ring-2 transition-all duration-300
                            ${errors.from_email ? 'border-red-300 focus:ring-red-400/60' : 'border-blue-200 focus:ring-blue-400/60'}`}
                          placeholder="Ihre E-Mail"
                        />
                        {/* Error icon */}
                        {errors.from_email && (
                          <ExclamationCircleIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
                        )}
                      </div>
                      {/* Error message */}
                      {errors.from_email && (
                        <motion.p 
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-1 text-sm text-red-500"
                        >
                          {errors.from_email}
                        </motion.p>
                      )}
                      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-blue-300"></div>
                      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-blue-300"></div>
                      <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-blue-300"></div>
                      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-blue-300"></div>
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
                          onBlur={handleBlur}
                          className={`w-full bg-white/90 backdrop-blur-sm border rounded-lg pl-12 pr-4 py-3 text-blue-900 placeholder-blue-400/70 focus:outline-none focus:ring-2 transition-all duration-300
                            ${errors.phone ? 'border-red-300 focus:ring-red-400/60' : 'border-blue-200 focus:ring-blue-400/60'}`}
                          placeholder="Ihre Telefonnummer (optional)"
                        />
                        {/* Error icon */}
                        {errors.phone && (
                          <ExclamationCircleIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
                        )}
                      </div>
                      {/* Error message */}
                      {errors.phone && (
                        <motion.p 
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-1 text-sm text-red-500"
                        >
                          {errors.phone}
                        </motion.p>
                      )}
                      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-blue-300"></div>
                      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-blue-300"></div>
                      <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-blue-300"></div>
                      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-blue-300"></div>
                    </motion.div>

                    {/* Message Textarea - Made slightly taller for equal height */}
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
                          onBlur={handleBlur}
                          required
                          rows="4"
                          className={`w-full bg-white/90 backdrop-blur-sm border rounded-lg pl-12 pr-4 py-3 text-blue-900 placeholder-blue-400/70 focus:outline-none focus:ring-2 resize-none transition-all duration-300
                            ${errors.message ? 'border-red-300 focus:ring-red-400/60' : 'border-blue-200 focus:ring-blue-400/60'}`}
                          placeholder="Ihre Nachricht"
                        ></textarea>
                        {/* Error icon */}
                        {errors.message && (
                          <ExclamationCircleIcon className="absolute right-4 top-4 w-5 h-5 text-red-500" />
                        )}
                      </div>
                      {/* Error message */}
                      {errors.message && (
                        <motion.p 
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-1 text-sm text-red-500"
                        >
                          {errors.message}
                        </motion.p>
                      )}
                      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-blue-300"></div>
                      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-blue-300"></div>
                      <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-blue-300"></div>
                      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-blue-300"></div>
                    </motion.div>
                  </div>

                  {/* Status and button container */}
                  <div className="space-y-4 mt-auto">
                    {/* Status Message */}
                    <AnimatePresence>
                      {status.show && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className={`text-center p-3 rounded-lg ${
                            status.success ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'
                          }`}
                        >
                          {status.message}
                        </motion.div>
                      )}
                    </AnimatePresence>

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
                
                {/* Circle decoration */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-500/10 rounded-xl z-0"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactForm;