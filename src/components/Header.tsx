import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Home, Image, Mail } from 'lucide-react';
import logo from "../assets/logo.png"

const Header: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const controlHeader = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 100) {
        // Always show header at top
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down - hide header
        setIsVisible(false);
      } else {
        // Scrolling up - show header
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlHeader);
    return () => window.removeEventListener('scroll', controlHeader);
  }, [lastScrollY]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const headerVariants = {
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    hidden: {
      y: -100,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };

  const menuVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    closed: {
      opacity: 0,
      y: 0,
      transition: {
        duration: 0.1,
        ease: "easeIn"
      }
    }
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-black/10"
      initial="visible"
      animate={isVisible ? "visible" : "hidden"}
      variants={headerVariants}
    >
      <div className="max-w-6xl mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="text-xl font-bold text-black cursor-pointer magnetic flex items-center"
            onClick={() => scrollToSection('hero')}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.0 }}
          >
            <div className='w-7 h-7 mr-[-3px]'>
              <img src={logo} className='object-cover w-full h-full'/>
            </div>
            eionus
            <div className="absolute top-1 -right-1 w-2 h-2 bg-black rounded-full opacity-60"></div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('hero')}
              className="flex items-center text-black transition-all duration-300 magnetic font-semibold"
            >
              <Home className="w-5 h-5 mr-2" />
              Home
            </button>
            <button
              onClick={() => scrollToSection('gallery')}
              className="flex items-center text-black transition-all duration-300 magnetic font-semibold"
            >
              <Image className="w-5 h-5 mr-2" />
              Gallery
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="flex items-center text-black transition-all duration-300 magnetic font-semibold"
            >
              <Mail className="w-5 h-5 mr-2" />
              Contact
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-black"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <motion.nav
          className={isMobileMenuOpen ? "md:hidden mt-4" : "md:hidden mt-0"}
          initial="closed"
          animate={isMobileMenuOpen ? "open" : "closed"}
          variants={menuVariants}
        >
          {isMobileMenuOpen && (
            <div className="flex flex-col space-y-4 border-t border-black/10 pt-4">
              <button
                onClick={() => scrollToSection('hero')}
                className="flex items-center text-black hover:text-gray-600 transition-colors duration-300 text-left"
              >
                <Home className="w-4 h-4 mr-2" />
                Home
              </button>
              <button
                onClick={() => scrollToSection('gallery')}
                className="flex items-center text-black hover:text-gray-600 transition-colors duration-300 text-left"
              >
                <Image className="w-4 h-4 mr-2" />
                Gallery
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="flex items-center text-black hover:text-gray-600 transition-colors duration-300 text-left"
              >
                <Mail className="w-4 h-4 mr-2" />
                Contact
              </button>
            </div>
          )}
        </motion.nav>
      </div>

      {/* Artistic bottom accent */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-px bg-black opacity-20"></div>
    </motion.header>
  );
};

export default Header;