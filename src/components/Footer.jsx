import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

const openingHours = [
  { day: 'Montag - Freitag', hours: '07:00 - 17:00' },
  { day: 'Samstag & Sonntag', hours: 'Geschlossen' },
];

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'Über Uns', href: '/about' },
  { name: 'Leistungen', href: '/services' },
  { name: 'Kontakt', href: '/contact' },
];

const socialLinks = [
  { icon: FaFacebook, href: '#', label: 'Facebook' },
  { icon: FaInstagram, href: '#', label: 'Instagram' },
  { icon: FaLinkedin, href: '#', label: 'LinkedIn' },
];

const Footer = () => {
  return (
    <footer className="relative w-full h-[500px] bg-gradient-to-b from-blue-900 to-blue-950 py-8 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#3b82f6" strokeWidth="0.5"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Title Section */}
        <div className="relative mb-6 flex justify-center">
          <motion.div
            className="inline-block relative"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <br />
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white relative z-10">
              Öffnungszeiten
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

        <br />

        {/* Opening Hours Grid */}
        <div className="grid grid-cols-1 max-w-[420px] mx-auto mb-6">
        {openingHours.map((schedule, index) => (
            <motion.div
              key={schedule.day}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="relative bg-blue-800/20 backdrop-blur-sm rounded-lg p-4 border border-blue-700/20 flex flex-col items-center justify-center w-full"
            >
              {/* Decorative corners remain the same */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-blue-400/40"></div>
              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-blue-400/40"></div>
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-blue-400/40"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-blue-400/40"></div>

              <h3 className="text-lg font-semibold text-white mb-0.5 whitespace-nowrap">{schedule.day}</h3>
              <p className={`text-base ${schedule.hours === 'Geschlossen' ? 'text-red-400' : 'text-blue-200'} whitespace-nowrap`}>
                {schedule.hours}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Links and Social Section */}
        <div className="flex flex-col items-center gap-4 mt-[-390px]">
          {/* Quick Links */}
          <div className="flex gap-6">
            {quickLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={link.href}
                  className="text-sm text-blue-200 hover:text-white transition-colors duration-300"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Social Icons */}
          <div className="flex gap-4">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-blue-200 hover:text-white transition-colors duration-300"
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Copyright and Credits */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="pt-4 border-t border-blue-800/30 text-center text-blue-200/60"
        >
          <p className="text-sm mb-1">© 2024 ARSA. Alle Rechte vorbehalten.</p>
          <a
            href="https://arthalimi.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm inline-block hover:text-white transition-colors duration-300"
          >
            Entwickelt von Art Halimi
          </a>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;