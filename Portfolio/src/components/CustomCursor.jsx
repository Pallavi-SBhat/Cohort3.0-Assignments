import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // QuickTo for high performance cursor tracking
    const cursorX = gsap.quickTo(cursorRef.current, 'x', { duration: 0.1, ease: 'power3' });
    const cursorY = gsap.quickTo(cursorRef.current, 'y', { duration: 0.1, ease: 'power3' });
    
    // Slower trailing animation for the follower ring
    const followerX = gsap.quickTo(followerRef.current, 'x', { duration: 0.5, ease: 'power3' });
    const followerY = gsap.quickTo(followerRef.current, 'y', { duration: 0.5, ease: 'power3' });

    const moveCursor = (e) => {
      cursorX(e.clientX);
      cursorY(e.clientY);
      followerX(e.clientX);
      followerY(e.clientY);
    };

    const handleMouseOver = (e) => {
      // Check if hovering over clickable elements
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
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* Main tiny dot */}
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-2 h-2 bg-emerald-400 rounded-full pointer-events-none z-[9999] mix-blend-screen"
        style={{ transform: 'translate(-50%, -50%)' }}
      ></div>
      
      {/* Trailing hollow ring */}
      <div 
        ref={followerRef} 
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[9998] transition-all duration-300 ${
          isHovering 
            ? 'w-16 h-16 border-2 border-emerald-400/80 bg-emerald-400/20 mix-blend-screen' 
            : 'w-8 h-8 border border-emerald-400/50'
        }`}
        style={{ transform: 'translate(-50%, -50%)' }}
      ></div>
    </>
  );
};

export default CustomCursor;
