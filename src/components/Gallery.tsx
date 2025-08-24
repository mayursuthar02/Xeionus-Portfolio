import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from "framer-motion";
import {artworks} from "../data/images"
import { Artwork } from '../types/artwork';

const Gallery: React.FC = () => {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [isHovered, setIsHovered] = useState(false)
  const [seeArtworks, setSeeArtworks] = useState(20);

  
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04, // small stagger for smoothness
      duration: 0.6,
      ease: "easeInOut"
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

  return (
    <section id="gallery" className="py-20 px-8 bg-white relative">
      {/* Artistic section divider */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-20 bg-black opacity-30"></div>
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 border border-black rounded-full opacity-20"></div>
      
      {/* Additional artistic elements */}
      <div className="absolute top-16 left-16 w-12 h-12 border border-black transform rotate-45 opacity-10"></div>
      <div className="absolute top-32 right-20 w-16 h-1 bg-black opacity-15 transform rotate-12"></div>
      <div className="absolute bottom-32 left-24 w-10 h-10 border border-black rounded-full opacity-10"></div>
      
      <div className="max-w-8xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.2 } }
          }}
        >
          <h2 className="text-3xl md:text-4xl font-light text-black mb-4 tracking-wide">
            Artworks
          </h2>
          <div className="w-16 h-0.5 bg-black mx-auto relative">
            <div className="absolute -left-2 -top-1 w-2 h-2 bg-black rounded-full opacity-60"></div>
            <div className="absolute -right-2 -top-1 w-2 h-2 bg-black rounded-full opacity-60"></div>
          </div>
        </motion.div>
        
        <motion.div
          key={seeArtworks}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <AnimatePresence>
          {artworks.slice(0,seeArtworks).map((artwork, i) => (
            <motion.div
              key={artwork.id ?? i}
              className="relative aspect-square overflow-hidden bg-gray-50 cursor-pointer group transition-all duration-500 hover:shadow-2xl rounded-2xl"
              variants={itemVariants}
              onMouseEnter={() => setHoveredItem(i)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <img
                src={artwork.imageUrl}
                alt="artwork" 
                loading="lazy"
                onContextMenu={(e) => e.preventDefault()} 
                draggable="false"
                className="select-none pointer-events-none w-full h-full object-cover transition-all duration-700 ease-out filter rounded-2xl"
              />
            </motion.div>
          ))}
          </AnimatePresence>
        </motion.div>

        {/* Button to show more/less artworks */}
        {artworks.length > 20 && (
          <div className="flex flex-col items-center justify-center w-full">
            <button
              onClick={() => {
                  // Toggle artworks
                  if (seeArtworks === 20) {
                    setSeeArtworks(artworks.length);
                  } else {
                    setSeeArtworks(20);
                  }

                  // Scroll to gallery
                  const gallery = document.getElementById("gallery");
                  if (gallery) {
                    gallery.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
              className="text-xl md:text-2xl font-light text-black mb-2 mt-10 tracking-wide cursor-pointer relative"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {seeArtworks === 20 ? "More Artworks" : "Less Artworks"} 
              <span
                className={`absolute bottom-0 left-0 w-full h-0.5 bg-black transform transition-transform duration-500 origin-left ${
                  isHovered ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;