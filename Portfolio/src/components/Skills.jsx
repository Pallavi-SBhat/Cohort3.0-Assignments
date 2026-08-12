import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Skills = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const bubblesRef = useRef([]);

  const skills = [
    { name: "JavaScript", color: "from-yellow-400 to-yellow-600", shadow: "shadow-yellow-500/20" },
    { name: "HTML5", color: "from-orange-400 to-orange-600", shadow: "shadow-orange-500/20" },
    { name: "CSS3", color: "from-blue-400 to-blue-600", shadow: "shadow-blue-500/20" },
    { name: "Python", color: "from-green-400 to-green-600", shadow: "shadow-green-500/20" },
    { name: "Java", color: "from-orange-500 to-red-600", shadow: "shadow-orange-500/20" },
    { name: "C", color: "from-blue-500 to-blue-700", shadow: "shadow-blue-500/20" },
    { name: "DBMS", color: "from-slate-500 to-slate-700", shadow: "shadow-slate-500/20" },
    { name: "PostgreSQL", color: "from-sky-500 to-sky-700", shadow: "shadow-sky-500/20" },
    { name: "MongoDB", color: "from-emerald-500 to-emerald-700", shadow: "shadow-emerald-500/20" },
    { name: "Supabase", color: "from-green-500 to-emerald-600", shadow: "shadow-green-500/20" },
    { name: "React.js", color: "from-cyan-400 to-cyan-600", shadow: "shadow-cyan-500/20" },
    { name: "Redux", color: "from-purple-500 to-purple-700", shadow: "shadow-purple-500/20" },
    { name: "Tailwind CSS", color: "from-teal-400 to-teal-600", shadow: "shadow-teal-500/20" },
    { name: "GSAP", color: "from-lime-400 to-lime-600", shadow: "shadow-lime-500/20" },
    { name: "Git", color: "from-red-400 to-red-600", shadow: "shadow-red-500/20" },
    { name: "GitHub", color: "from-gray-600 to-gray-800", shadow: "shadow-gray-500/20" },
    { name: "Vercel", color: "from-slate-800 to-black", shadow: "shadow-slate-500/20" },
    { name: "VS Code", color: "from-blue-500 to-indigo-600", shadow: "shadow-indigo-500/20" }
  ];

  useEffect(() => {
    // Initial entrance animation
    gsap.fromTo(containerRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      }
    );

    // Free-floating continuous animation for each bubble
    bubblesRef.current.forEach((bubble, index) => {
      if (!bubble) return;
      
      // Assign each bubble its own dedicated "zone" in a 6x3 grid to prevent overlapping
      const col = index % 6;
      const row = Math.floor(index / 6);
      
      const animateBubble = () => {
        // Calculate safe boundaries for this specific bubble
        // 100% width / 6 cols = ~16.6% per column
        const minLeft = (col * 16.6) + 2; 
        const maxLeft = minLeft + 10;
        
        // 100% height / 3 rows = 33.3% per row
        const minTop = (row * 33.3) + 5;
        const maxTop = minTop + 15;
        
        gsap.to(bubble, {
          left: `${Math.random() * (maxLeft - minLeft) + minLeft}%`,
          top: `${Math.random() * (maxTop - minTop) + minTop}%`,
          rotation: (Math.random() - 0.5) * 20,
          duration: Math.random() * 2 + 1.5, // Faster movement (1.5s to 3.5s)
          ease: "sine.inOut",
          onComplete: animateBubble
        });
      };
      
      // Add a small staggered start
      setTimeout(animateBubble, Math.random() * 1000);
    });
  }, []);

  return (
    // Break out of the max-w-3xl container to use the full viewport width
    <section id="skills" className="pt-20 pb-10 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden bg-[#0a0d14]" ref={sectionRef}>
      
      <div className="mb-12 text-center max-w-3xl mx-auto px-4 relative z-20">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
          Technical <span className="text-gradient">Arsenal</span>
        </h2>
        <p className="text-slate-400 text-base md:text-lg max-w-lg mx-auto leading-relaxed">
          The languages and tools I use to bring ideas to life.
        </p>
      </div>

      <div 
        ref={containerRef}
        className="relative w-full"
        style={{ height: '600px' }}
      >
        {/* Decorative background blur to make the full-width section pop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="absolute inset-0 z-10 w-full h-full">
          {skills.map((skill, index) => {
            // Give each bubble an initial position inside its dedicated zone
            const col = index % 6;
            const row = Math.floor(index / 6);
            
            const minLeft = (col * 16.6) + 2; 
            const maxLeft = minLeft + 10;
            const minTop = (row * 33.3) + 5;
            const maxTop = minTop + 15;
            
            const randomLeft = `${Math.random() * (maxLeft - minLeft) + minLeft}%`;
            const randomTop = `${Math.random() * (maxTop - minTop) + minTop}%`;
            
            return (
              <div
                key={index}
                ref={el => bubblesRef.current[index] = el}
                style={{ 
                  left: randomLeft, 
                  top: randomTop,
                  transform: 'translate(-50%, -50%)' // Center exactly on the coordinate
                }}
                className={`
                  absolute px-8 py-5 rounded-2xl bg-gradient-to-br ${skill.color} 
                  text-white font-bold text-base md:text-lg tracking-wide
                  shadow-2xl ${skill.shadow} border border-white/20
                  flex items-center justify-center cursor-default
                  hover:scale-125 transition-transform duration-300 hover:z-50
                `}
              >
                {skill.name}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
