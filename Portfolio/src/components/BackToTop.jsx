import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowUp } from 'lucide-react';

const BackToTop = () => {
  const buttonRef = useRef(null);

  useEffect(() => {
    // Hide initially
    gsap.set(buttonRef.current, { opacity: 0, scale: 0, y: 20 });

    const showAnim = gsap.to(buttonRef.current, { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      duration: 0.3, 
      paused: true,
      ease: 'back.out(1.5)'
    });

    const handleScroll = () => {
      if (window.scrollY > 500) {
        showAnim.play();
      } else {
        showAnim.reverse();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      ref={buttonRef}
      onClick={scrollToTop}
      className="fixed bottom-24 md:bottom-8 right-6 md:right-8 z-40 w-12 h-12 bg-blue-500/20 backdrop-blur-md border border-blue-400/30 rounded-full flex items-center justify-center text-blue-400 hover:bg-blue-500/40 hover:text-white hover:scale-110 hover:-translate-y-1 transition-all duration-300 shadow-[0_0_15px_rgba(59,130,246,0.3)] cursor-pointer"
      aria-label="Back to top"
    >
      <ArrowUp size={24} />
    </button>
  );
};

export default BackToTop;
