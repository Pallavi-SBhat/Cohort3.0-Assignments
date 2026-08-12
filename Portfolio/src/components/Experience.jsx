import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Briefcase, GraduationCap } from 'lucide-react';

const Experience = () => {
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    // Animate the main timeline line growing downwards
    gsap.fromTo('.timeline-line', 
      { height: 0 },
      {
        height: '100%',
        duration: 2,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        }
      }
    );

    itemsRef.current.forEach((item, index) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
        }
      });

      // Card slides in with 3D rotation and bounce
      tl.fromTo(item.querySelector('.bento-card'),
        { opacity: 0, x: -50, scale: 0.9, rotationY: 15 },
        { opacity: 1, x: 0, scale: 1, rotationY: 0, duration: 0.8, ease: 'back.out(1.5)' }
      );

      // Icon pops in with a spin
      tl.fromTo(item.querySelector('.timeline-icon'),
        { opacity: 0, scale: 0, rotation: -180 },
        { opacity: 1, scale: 1, rotation: 0, duration: 0.6, ease: 'back.out(2)' },
        "-=0.5"
      );
    });
  }, []);

  const experiences = [
    {
      role: "Bachelor of Computer Applications, CS",
      company: "VIJAYA COLLEGE",
      period: "Sep 2022 - Aug 2024",
      icon: <GraduationCap size={20} className="text-pink-400" />,
      responsibilities: [
        "Graduated with an O+ Grade.",
        "Prepared to contribute effectively in professional environments.",
        "Continuously enhanced technical and analytical capabilities using Python and Git."
      ]
    },
    {
      role: "Master of Computer Applications, AI",
      company: "MITE",
      period: "Sep 2024 - Aug 2026",
      icon: <GraduationCap size={20} className="text-blue-400" />,
      responsibilities: [
        "Currently pursuing specialization in Artificial Intelligence & Machine Learning.",
        "Achieved an A+ Grade.",
        "Developing advanced skills in Python and the MERN Stack."
      ]
    },
    {
      role: "AI-ML Intern",
      company: "CODELAB SYSTEMS",
      period: "Sep 2025 - Dec 2025",
      icon: <Briefcase size={20} className="text-emerald-400" />,
      responsibilities: [
        "Completed an on-site internship based in Mangaluru.",
        "Worked on Supervised Learning algorithms and models.",
        "Utilized Python and other technical skills for AI/ML development."
      ]
    }
  ];

  return (
    <section id="experience" className="pt-10" ref={sectionRef}>
      <div className="mb-12">
        <p className="text-slate-400 text-base md:text-lg max-w-sm leading-relaxed">
          A timeline of my professional experience and academic journey.
        </p>
      </div>

      {/* The main vertical line that grows down */}
      <div className="relative border-l-0 ml-6 md:ml-8 space-y-12">
        <div className="timeline-line absolute left-0 top-0 w-px bg-gradient-to-b from-blue-500/50 via-emerald-500/50 to-transparent"></div>
        
        {experiences.map((exp, index) => (
          <div 
            key={index} 
            className="relative pl-8 md:pl-12 group"
            ref={el => itemsRef.current[index] = el}
          >
            {/* Timeline Node */}
            <div className="timeline-icon absolute -left-6 md:-left-7 top-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#0B0F19] border border-white/10 flex items-center justify-center z-10 group-hover:border-blue-400/50 transition-colors duration-500 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#131722] flex items-center justify-center shadow-inner group-hover:bg-blue-900/20 transition-colors duration-500">
                {exp.icon}
              </div>
            </div>

            {/* Experience Card */}
            <div className="bento-card p-6 md:p-8 group-hover:-translate-y-1 group-hover:border-white/20 transition-all duration-500 shadow-xl shadow-black/20">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{exp.role}</h3>
              <div className="flex flex-wrap items-center gap-3 text-xs font-bold tracking-wider mb-6">
                <span className="text-blue-400 uppercase">{exp.company}</span>
                <span className="text-slate-600 hidden sm:inline">•</span>
                <span className="text-slate-500 uppercase">{exp.period}</span>
              </div>
              
              <ul className="space-y-3">
                {exp.responsibilities.map((resp, i) => (
                  <li key={i} className="text-slate-400 text-sm flex items-start gap-3">
                    <span className="text-slate-600 mt-1.5 text-xs">●</span>
                    <span className="leading-relaxed">{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
