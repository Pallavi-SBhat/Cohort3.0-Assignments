import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { User, Clock, Code2, Coffee, ArrowRight } from 'lucide-react';

const Hero = () => {
  const containerRef = useRef(null);
  const elementsRef = useRef([]);

  useEffect(() => {
    // Staggered pop-in animation for all bento cards
    gsap.fromTo(elementsRef.current,
      { opacity: 0, y: 50, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'back.out(1.2)',
        delay: 0.2
      }
    );

    // Continuous floating animation for the avatar
    gsap.to(".avatar-container", {
      y: -15,
      duration: 2.5,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut"
    });
  }, []);

  return (
    <section id="hero" className="pt-10 flex flex-col items-center" ref={containerRef}>
      {/* Hero Header Side-by-Side Layout */}
      <div className="flex flex-col-reverse md:flex-row items-center justify-between w-full mb-20 gap-10 md:gap-8" ref={el => elementsRef.current[0] = el}>
        
        {/* Text Content */}
        <div className="flex-1 text-center md:text-left">
           <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold text-sm mb-6">
             <span className="relative flex h-2 w-2">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
             </span>
             Available for work
           </div>
           
           <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight leading-tight">
             Hi, I'm Pallavi S Bhat.<br/>
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400">
               Software Engineer.
             </span>
           </h1>
           
           <p className="text-slate-400 text-lg md:text-xl max-w-lg mx-auto md:mx-0 leading-relaxed mb-8">
             Crafting immersive digital experiences through elegant code, artificial intelligence, and refined aesthetics.
           </p>
           
           <div className="flex items-center justify-center md:justify-start gap-4">
             <a href="#projects" className="px-8 py-3.5 bg-white text-[#0B0F19] font-bold rounded-xl hover:bg-slate-200 transition-colors shadow-lg shadow-white/10">
               View Work
             </a>
             <a href="#contact" className="px-8 py-3.5 bg-white/5 text-white font-bold rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
               Contact Me
             </a>
           </div>
        </div>

        {/* Avatar Content */}
        <div className="avatar-container relative w-56 h-56 md:w-80 md:h-80 flex-shrink-0 group mt-10 md:mt-0">
          {/* Abstract background shapes and glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-emerald-500 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
          
          {/* Decorative orbiting rings */}
          <div className="absolute -inset-4 md:-inset-8 border border-white/10 rounded-full animate-[spin_10s_linear_infinite] pointer-events-none"></div>
          <div className="absolute -inset-8 md:-inset-16 border border-white/5 rounded-full animate-[spin_15s_linear_infinite_reverse] pointer-events-none"></div>
          
          <div className="w-full h-full rounded-full border-4 border-[#131722] overflow-hidden relative z-10 bg-[#0B0F19] shadow-2xl">
            <img src="/profile.jpg" alt="Pallavi" className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700" />
          </div>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* About Me Card */}
        <div 
          className="bento-card col-span-2 md:col-span-4 p-6 hover:border-white/20 transition-colors"
          ref={el => elementsRef.current[1] = el}
        >
          <div className="flex items-center gap-2 text-white font-bold mb-3">
            <User size={18} className="text-blue-400" />
            About Me
          </div>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-4">
            Currently pursuing a Master of Computer Applications (MCA) at Mangalore Institute of Technology and Engineering, with an expected completion in December 2026. I recently completed an internship at CodeLab Systems in Mangalore, where I worked on projects including customer churn prediction, stroke prediction and an expense tracker application, gaining hands-on experience in data analysis, preprocessing and application development. My core interest lies in web development and design, with a strong passion for building responsive, user-friendly web applications and continuously enhancing my technical and creative skills.
          </p>
        </div>




      </div>
    </section>
  );
};

export default Hero;
