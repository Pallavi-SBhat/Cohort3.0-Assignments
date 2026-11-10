import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const CustomCursor = () => {
  const followerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Only enable on desktop with fine mouse pointer
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const followerX = gsap.quickTo(followerRef.current, 'x', { duration: 0.35, ease: 'power2.out' });
    const followerY = gsap.quickTo(followerRef.current, 'y', { duration: 0.35, ease: 'power2.out' });

    const moveCursor = (e) => {
      setIsVisible(true);
      followerX(e.clientX);
      followerY(e.clientY);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      ref={followerRef} 
      className={`fixed top-0 left-0 rounded-full pointer-events-none z-[9998] transition-all duration-200 hidden md:block ${
        isHovering 
          ? 'w-10 h-10 border border-blue-400/40 bg-blue-500/10' 
          : 'w-6 h-6 border border-white/20 bg-white/5'
      }`}
      style={{ transform: 'translate(-50%, -50%)' }}
    ></div>
  );
};

export default CustomCursor;
