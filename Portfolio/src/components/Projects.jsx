import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ExternalLink, Code } from 'lucide-react';

const projects = [
  {
    title: "Weather Forecast",
    description: "A real-time weather application providing accurate forecasts and conditions.",
    tags: ["React", "API", "Tailwind"],
    github: "#",
    live: "https://weather-forecast-pallavii.vercel.app/",
    color: "from-blue-500/20 to-transparent"
  },
  {
    title: "SkyMart E-Commerce",
    description: "A modern e-commerce storefront with a sleek user interface.",
    tags: ["React", "State Management", "Tailwind"],
    github: "#",
    live: "https://skymart-tawny.vercel.app/",
    color: "from-pink-500/20 to-transparent"
  },
  {
    title: "Productivity Planner",
    description: "An elegant planner application to track tasks and boost productivity.",
    tags: ["JavaScript", "React", "Local Storage"],
    github: "#",
    live: "https://productivityplanner-mu.vercel.app/",
    color: "from-emerald-500/20 to-transparent"
  },
  {
    title: "Daily Track",
    description: "A comprehensive daily habit and activity tracker.",
    tags: ["React", "Tailwind", "Responsive"],
    github: "#",
    live: "https://dailytrack-wine.vercel.app/",
    color: "from-violet-500/20 to-transparent"
  },

  {
    title: "FinTrack Pro",
    description: "A robust financial tracking application for managing expenses.",
    tags: ["React", "Charts", "Tailwind"],
    github: "#",
    live: "https://fintrackpro-pallavii.vercel.app/",
    color: "from-cyan-500/20 to-transparent"
  }
];

const Projects = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      gsap.fromTo(card,
        { opacity: 0, y: 50, scale: 0.9, rotationX: 15 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: 0.8,
          delay: index * 0.15,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          }
        }
      );
    });
  }, []);

  return (
    <section id="projects" className="pt-10" ref={sectionRef}>
      <div className="mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
          Selected <span className="text-gradient">Works</span>
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {projects.map((project, index) => (
          <div 
            key={index}
            ref={el => cardsRef.current[index] = el}
            className="bento-card group flex flex-col hover:border-white/20 transition-colors overflow-hidden"
          >
            <div className={`h-48 bg-gradient-to-b ${project.color} border-b border-white/5 relative overflow-hidden flex items-center justify-center`}>
              {/* Dynamic Live Screenshot via Microlink */}
              <img 
                src={`https://api.microlink.io/?url=${project.live}&screenshot=true&meta=false&embed=screenshot.url`} 
                alt={`${project.title} Preview`}
                className="w-full h-full object-cover object-top opacity-60 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/20 to-transparent opacity-90 group-hover:opacity-70 transition-opacity"></div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col z-10 relative bg-[#0B0F19]">
              <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>
              <p className="text-slate-400 text-sm mb-6 flex-1">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag, i) => (
                  <span key={i} className="text-[10px] font-bold px-2 py-1 rounded bg-[#1e293b] text-slate-300 border border-white/5">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center gap-2 pt-4 border-t border-white/5">
                <a href={project.live} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors bg-blue-500/10 px-3 py-1.5 rounded">
                  <ExternalLink size={14} /> Live
                </a>
                <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-slate-300 transition-colors bg-white/5 px-3 py-1.5 rounded">
                  <Code size={14} /> Code
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
