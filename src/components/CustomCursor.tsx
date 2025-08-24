import React, { useState, useEffect } from 'react';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isInverted, setIsInverted] = useState(false);
  const [isMagnetic, setIsMagnetic] = useState(false);
  const [magneticTarget, setMagneticTarget] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      let targetX = e.clientX;
      let targetY = e.clientY;

      // Check for magnetic elements
      const magneticElements = document.querySelectorAll('.magnetic');
      let foundMagnetic = false;

      magneticElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.sqrt(
          Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
        );

        // Magnetic effect within 100px radius
        if (distance < 100) {
          foundMagnetic = true;
          const strength = Math.max(0, 1 - distance / 100);
          targetX = e.clientX + (centerX - e.clientX) * strength * 0.3;
          targetY = e.clientY + (centerY - e.clientY) * strength * 0.3;
          setMagneticTarget({ x: centerX, y: centerY });
        }
      });

      setIsMagnetic(foundMagnetic);
      if (!foundMagnetic) {
        setMagneticTarget(null);
      }

      setPosition({ x: targetX, y: targetY });
      setIsVisible(true);

      // Check what element is under the cursor for color inversion
      const elementUnderCursor = document.elementFromPoint(e.clientX, e.clientY);
      if (elementUnderCursor) {
        const computedStyle = window.getComputedStyle(elementUnderCursor);
        const backgroundColor = computedStyle.backgroundColor;
        const color = computedStyle.color;
        
        const isOverBlackBackground = backgroundColor.includes('rgb(0, 0, 0)') || 
                                    backgroundColor.includes('rgba(0, 0, 0') ||
                                    elementUnderCursor.closest('.bg-black') !== null;
        
        const isOverBlackText = color.includes('rgb(0, 0, 0)') || 
                               color.includes('rgba(0, 0, 0') ||
                               elementUnderCursor.closest('.text-black') !== null;

        setIsInverted(isOverBlackBackground || isOverBlackText);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', updatePosition);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const cursorSize = isMagnetic ? 32 : 24;
  const trailSize = isMagnetic ? 8 : 8;

  return (
    <>
      {/* Main cursor */}
      <div
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-50 transition-all duration-300 ease-out mix-blend-difference ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          width: `${cursorSize}px`,
          height: `${cursorSize}px`,
          transform: `translate(${position.x - cursorSize / 2}px, ${position.y - cursorSize / 2}px)`,
          backgroundColor: isInverted ? '#ffffff' : '#000000',
          boxShadow: isMagnetic 
            ? `0 0 40px ${isInverted ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)'}` 
            : `0 0 30px ${isInverted ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)'}`,
        }}
      />
      
      {/* Trailing effect */}
      <div
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-40 transition-all duration-500 ease-out ${
          isVisible ? 'opacity-60' : 'opacity-0'
        }`}
        style={{
          width: `${trailSize}px`,
          height: `${trailSize}px`,
          transform: `translate(${position.x - trailSize / 2}px, ${position.y - trailSize / 2}px)`,
          backgroundColor: isInverted ? '#ffffff' : '#000000',
        }}
      />

      {/* Magnetic connection line */}
      {isMagnetic && magneticTarget && (
        <div
          className="fixed top-0 left-0 pointer-events-none z-30 opacity-20"
          style={{
            width: '2px',
            height: Math.sqrt(
              Math.pow(magneticTarget.x - position.x, 2) + 
              Math.pow(magneticTarget.y - position.y, 2)
            ),
            backgroundColor: isInverted ? '#ffffff' : '#000000',
            transform: `translate(${position.x}px, ${position.y}px) rotate(${
              Math.atan2(magneticTarget.y - position.y, magneticTarget.x - position.x) * 180 / Math.PI + 90
            }deg)`,
            transformOrigin: 'top center',
            transition: 'all 0.1s ease-out',
          }}
        />
      )}
    </>
  );
};

export default CustomCursor;