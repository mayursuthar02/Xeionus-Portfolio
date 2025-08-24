import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Brush, User } from 'lucide-react';

const Hero: React.FC = () => {
  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 1,
        ease: "easeOut"
      }
    }
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        delay: 0.3,
        ease: "easeOut"
      }
    }
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.6,
        delay: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-white relative overflow-hidden pt-20">
      {/* Artistic background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 border-2 border-black rotate-45 animate-pulse"></div>
        <div className="absolute bottom-32 right-32 w-24 h-24 border-2 border-black rounded-full"></div>
        <div className="absolute top-1/2 left-10 w-2 h-40 bg-black transform -rotate-12 opacity-60"></div>
        <div className="absolute top-1/3 right-20 w-2 h-32 bg-black transform rotate-45 opacity-60"></div>
        <div className="absolute top-40 right-1/4 w-16 h-16 border border-black rounded-full opacity-40"></div>
        <div className="absolute bottom-40 left-1/4 w-20 h-20 border border-black transform rotate-12 opacity-40"></div>
        <div className="absolute top-2/3 right-10 w-1 h-24 bg-black transform rotate-12 opacity-50"></div>
      </div>
      
      <div className="text-center relative z-10">
        {/* Profile Picture */}
        <motion.div
          className="flex items-center justify-center mb-8"
          initial="hidden"
          animate="visible"
          variants={iconVariants}
        >
          <Palette className="w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 text-black mr-4" />
          <Brush className="w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 text-black ml-4" />
        </motion.div>
        
        <motion.h1 
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-black mb-6 tracking-tight relative"
          initial="hidden"
          animate="visible"
          variants={textVariants}
        >
          <h1 className='text-[70px] md:text-[150px] lg:text-[200px]'>Xeionus</h1>
          <div className="absolute -top-4 -right-4 w-4 h-4 bg-black rounded-full opacity-60 animate-pulse"></div>
          <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-black rounded-full opacity-40"></div>
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl text-black font-light tracking-wide mb-8"
          initial="hidden"
          animate="visible"
          variants={subtitleVariants}
        >
          <h1 className='text-[20px] md:text-[30px] lg:text-[40px]'>Digital Artist</h1>
        </motion.p>
        
        <motion.div
          className="w-16 h-0.5 bg-black mx-auto"
          initial={{ width: 0 }}
          animate={{ width: 64 }}
          transition={{ duration: 1, delay: 0.8 }}
        />
      </div>
    </section>
  );
};

export default Hero;