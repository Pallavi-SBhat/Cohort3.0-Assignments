import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Navbar = () => {
  const navRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    // Initial navbar animation
    gsap.fromTo(navRef.current, 
      { y: -50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
      }
    );

    // Scroll progress bar
    gsap.to(progressRef.current, {
      width: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3
      }
    });
  }, []);

  return (
    <nav ref={navRef} className="fixed top-0 w-full z-50 px-6 py-4 backdrop-blur-md bg-[#0B0F19]/80 border-b border-white/5">
      <div className="w-full max-w-[1920px] mx-auto flex items-center justify-between md:px-10 lg:px-16">
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-lg group-hover:scale-105 transition-transform overflow-hidden shadow-[0_0_15px_rgba(59,130,246,0.5)]">
            <img src="/profile.jpg" alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <span className="font-bold text-xl tracking-tight text-white group-hover:text-blue-400 transition-colors">Pallavi S Bhat</span>
        </div>
        
        {/* Navigation Links (Hidden on Mobile) */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#skills" className="text-sm font-bold text-slate-300 hover:text-blue-400 transition-colors">Skills</a>
          <a href="#experience" className="text-sm font-bold text-slate-300 hover:text-blue-400 transition-colors">Experience</a>
          <a href="#projects" className="text-sm font-bold text-slate-300 hover:text-blue-400 transition-colors">Projects</a>
          <a href="#contact" className="text-sm font-bold text-slate-300 hover:text-blue-400 transition-colors">Contact</a>
        </div>

        <a href="#contact" className="px-5 py-2 rounded-full bg-[#93C5FD] text-[#0B0F19] font-semibold text-sm hover:bg-blue-300 transition-colors shadow-[0_0_20px_rgba(147,197,253,0.3)] hover:shadow-[0_0_25px_rgba(147,197,253,0.6)]">
          Hire Me
        </a>
      </div>

      {/* Scroll Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/5">
        <div 
          ref={progressRef}
          className="h-full bg-gradient-to-r from-blue-400 to-emerald-400 w-0 shadow-[0_0_10px_rgba(59,130,246,0.8)]"
        ></div>
      </div>
    </nav>
  );
};

export default Navbar;
