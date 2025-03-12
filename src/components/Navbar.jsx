import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLinkClick = (event, targetId, route) => {
    event.preventDefault();

    // If we're currently on the /about page, redirect to the homepage
    if (location.pathname === '/about') {
      navigate('/'); // Redirect to homepage
      // Set a timeout to allow navigation before scrolling
      setTimeout(() => {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100); // Delay to ensure navigation has taken place
    } else {
      // Handle navigation or scrolling normally
      if (route) {
        navigate(route);
      } else if (targetId) {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }

    setMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-screen-xl px-4 py-3 lg:px-8 lg:py-4 z-50 transition-all rounded-md duration-300 ${
        isScrolled
          ? 'bg-white shadow-lg border border-gray-200 backdrop-blur-lg'
          : 'bg-transparent'
      }`}
      style={{ marginTop: '10px' }}
    >
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        {/* Brand Logo */}
        <a href="/" className="text-xl font-bold text-black">
          LOGO
        </a>

        {/* Hamburger Menu Icon for small devices */}
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="focus:outline-none"
            aria-label="Toggle Menu"
          >
            <div
              className={`w-6 h-0.5 bg-emerald-700 mb-1 transition-transform ${
                menuOpen ? 'transform rotate-45 translate-y-2' : ''
              }`}
            ></div>
            <div
              className={`w-6 h-0.5 bg-emerald-800 transition-opacity ${
                menuOpen ? 'opacity-0' : ''
              }`}
            ></div>
            <div
              className={`w-6 h-0.5 bg-emerald-900 mt-1 transition-transform ${
                menuOpen ? 'transform -rotate-45 -translate-y-2' : ''
              }`}
            ></div>
          </button>
        </div>

        {/* Menu items */}
        <div
          className={`${
            menuOpen ? 'block' : 'hidden'
          } w-full bg-emerald-600 lg:bg-transparent lg:flex lg:w-auto lg:space-x-8 lg:mt-0 lg:items-center rounded-lg shadow-lg lg:shadow-none p-4 lg:p-0`}
        >
          <ul className="flex flex-col lg:flex-row lg:items-center lg:space-x-8 space-y-4 lg:space-y-0 mt-4 lg:mt-0">
            <li>
              <a
                href="#services"
                className="text-lg text-black font-semibold hover:text-emerald-400 transition duration-300"
                onClick={(e) => handleLinkClick(e, 'services')}
              >
                Shërbimet
              </a>
            </li>
            <li>
              <a
                href="#partners"
                className="text-lg text-black font-semibold hover:text-emerald-400 transition duration-300"
                onClick={(e) => handleLinkClick(e, 'partners')}
              >
                Klientët
              </a>
            </li>
            <li>
              <button
                onClick={(e) => handleLinkClick(e, null, '/about')}
                className="text-lg text-black font-semibold hover:text-emerald-400 transition duration-300"
              >
                Rreth Nesh
              </button>
            </li>
            <li>
              <a
                href="#contact"
                className="text-lg text-black font-semibold hover:text-emerald-400 transition duration-300"
                onClick={(e) => handleLinkClick(e, 'contact')}
              >
                Kontakti
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;