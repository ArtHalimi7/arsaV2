import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  UserIcon, 
  EnvelopeIcon, 
  PhoneIcon, 
  ChatBubbleBottomCenterTextIcon 
} from '@heroicons/react/24/outline';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="relative w-full min-h-screen bg-gradient-to-b from-blue-900 to-blue-950 py-32 overflow-hidden flex items-center">
      {/* Blueprint Grid Background */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#3b82f6" strokeWidth="0.5"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 w-full">
        {/* Title Section */}
        <div className="relative mb-16 flex justify-center">
          <motion.div
            className="inline-block relative"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white relative z-10">
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

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Name Input */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                <UserIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-400/60" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-blue-800/20 backdrop-blur-sm border border-blue-700/20 rounded-lg pl-12 pr-4 py-3 text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-400/60"
                  placeholder="Ihr Name"
                />
              </div>
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-blue-400/40"></div>
              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-blue-400/40"></div>
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-blue-400/40"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-blue-400/40"></div>
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
                <EnvelopeIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-400/60" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-blue-800/20 backdrop-blur-sm border border-blue-700/20 rounded-lg pl-12 pr-4 py-3 text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-400/60"
                  placeholder="Ihre E-Mail"
                />
              </div>
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-blue-400/40"></div>
              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-blue-400/40"></div>
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-blue-400/40"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-blue-400/40"></div>
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
                <PhoneIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-400/60" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-blue-800/20 backdrop-blur-sm border border-blue-700/20 rounded-lg pl-12 pr-4 py-3 text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-400/60"
                  placeholder="Ihre Telefonnummer (optional)"
                />
              </div>
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-blue-400/40"></div>
              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-blue-400/40"></div>
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-blue-400/40"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-blue-400/40"></div>
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
                <ChatBubbleBottomCenterTextIcon className="absolute left-4 top-4 w-5 h-5 text-blue-400/60" />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full bg-blue-800/20 backdrop-blur-sm border border-blue-700/20 rounded-lg pl-12 pr-4 py-3 text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-400/60 resize-none"
                  placeholder="Ihre Nachricht"
                ></textarea>
              </div>
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-blue-400/40"></div>
              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-blue-400/40"></div>
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-blue-400/40"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-blue-400/40"></div>
            </motion.div>

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
                className="relative group bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                <span className="relative z-10">Nachricht senden</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-300"></div>
              </button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;