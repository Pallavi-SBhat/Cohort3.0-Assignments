import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Preloader = ({ onComplete }) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // Fade out the entire preloader
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: 'power2.inOut',
          onComplete: onComplete
        });
      }
    });

    // Reveal text
    tl.fromTo(textRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
    );

    // Animate progress bar
    tl.fromTo(progressRef.current,
      { width: '0%' },
      { width: '100%', duration: 1.5, ease: 'power2.inOut' }
    );
  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0B0F19]"
    >
      <div className="flex flex-col items-center">
        <h1 
          ref={textRef}
          className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400 mb-6 tracking-widest"
        >
          PALLAVI
        </h1>
        
        {/* Progress Bar Container */}
        <div className="w-48 md:w-64 h-1 bg-white/10 rounded-full overflow-hidden">
          {/* Progress Bar Fill */}
          <div 
            ref={progressRef}
            className="h-full bg-gradient-to-r from-blue-400 to-emerald-400 rounded-full"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
