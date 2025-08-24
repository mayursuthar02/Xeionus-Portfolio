import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowUpRight } from 'lucide-react';
import logo from "../assets/logo white.png"

const Contact: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <footer id="contact" className="py-16 px-8 bg-black relative overflow-hidden">
      {/* Artistic background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-8 right-20 w-20 h-20 border-2 border-white rotate-12 animate-pulse"></div>
        <div className="absolute bottom-8 left-16 w-16 h-16 border-2 border-white rounded-full"></div>
        <div className="absolute top-1/2 right-1/3 w-2 h-20 bg-white transform rotate-45"></div>
        <div className="absolute top-4 left-1/4 w-12 h-12 border border-white transform -rotate-12 opacity-60"></div>
        <div className="absolute bottom-4 right-1/4 w-1 h-16 bg-white transform rotate-12 opacity-70"></div>
        <div className="absolute top-1/3 left-8 w-8 h-8 border border-white rounded-full opacity-50"></div>
      </div>
      
      <motion.div
        className="max-w-4xl mx-auto text-center relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="flex items-center justify-center gap-6 mb-6">
          {/* <Mail className="w-6 h-6 text-white mr-3" /> */}
          <div className='w-7 h-7'>
            <img src={logo} className='w-full h-full object-cover'/>
          </div>
          <h2 className="text-2xl md:text-3xl font-light text-white">
            Let's Connect
          </h2>
          <div className='w-7 h-7'>
            <img src={logo} className='w-full h-full object-cover'/>
          </div>
          {/* <div className="absolute -top-1 right-40 w-2 h-2 bg-white rounded-full opacity-60"></div> */}
        </div>
        
        <div className="w-16 h-0.5 bg-white mx-auto mb-8 opacity-60 relative">
          <div className="absolute -left-2 -top-1 w-2 h-2 bg-white rounded-full opacity-40"></div>
          <div className="absolute -right-2 -top-1 w-2 h-2 bg-white rounded-full opacity-40"></div>
        </div>
        
        <div className="flex items-center justify-center group magnetic">
          <a
            href="mailto:xeionus00@gmail.com"
            className="text-lg md:text-xl text-white font-medium relative inline-flex items-center transition-all duration-500 hover:text-gray-300 hover:scale-105"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            xeionus00@gmail.com
            <ArrowUpRight className={`w-5 h-5 ml-2 transition-transform duration-500 ${
              isHovered ? 'translate-x-2 -translate-y-1 rotate-12' : ''
            }`} />
            <span 
              className={`absolute bottom-0 left-0 w-full h-0.5 bg-white transform transition-transform duration-500 origin-left ${
                isHovered ? 'scale-x-100' : 'scale-x-0'
              }`}
            />
          </a>
        </div>
        
        <motion.p 
          className="text-sm text-gray-400 mt-8 font-light"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          © 2025 Xeionus. All rights reserved.
        </motion.p>
      </motion.div>
      
      {/* Bottom artistic line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1.5, delay: 0.3 }}
      />
    </footer>
  );
};

export default Contact;