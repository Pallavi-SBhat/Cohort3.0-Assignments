import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

const Hero = () => {
  return (
    <section id="hero" className="relative min-h-[82vh] md:min-h-[88vh] flex flex-col justify-between pt-28 pb-12 overflow-hidden border-b border-[rgba(173,186,205,0.12)]">
      {/* Blueprint Grid / Ambient Backdrop */}
      <div className="absolute inset-0 project-art-grid opacity-60 pointer-events-none"></div>

      {/* Hero Architectural Frame Borders */}
      <div className="absolute inset-x-4 inset-y-24 sm:inset-x-8 sm:inset-y-20 border border-[rgba(232,234,237,0.06)] pointer-events-none hidden md:block">
        <span className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#3DDC97]/60"></span>
        <span className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#3DDC97]/60"></span>
        <span className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#3DDC97]/60"></span>
        <span className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#3DDC97]/60"></span>
      </div>

      {/* Top Mono Caption */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-[#858e9c] uppercase tracking-wider mb-8">
        <span className="flex items-center gap-2">
          <span className="status-dot"></span>
          <span>Building in the open</span>
        </span>
        <span className="hidden sm:inline text-[#5B6472]">
          Frontend / Systems / MCA Candidate
        </span>
      </div>

      {/* Center Hero Content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center my-auto py-6">
        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-full overflow-hidden border border-[#3DDC97]/40 p-0.5 shadow-lg bg-[#141b28]">
            <img src="/profile.jpg" alt="Pallavi" className="w-full h-full object-cover rounded-full" />
          </div>
          <p className="eyebrow text-[#3DDC97]">Software Engineer & Curious Builder</p>
        </div>

        <h1 className="text-5xl sm:text-7xl md:text-8xl font-serif tracking-tight text-[#E8EAED] leading-none mb-6">
          PALLAVI<br />
          <span className="text-[#E8EAED]">
            BHAT<span className="text-[#3DDC97]">.</span>
          </span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-[#a2a9b4] max-w-xl mx-auto leading-relaxed mb-8">
          I build responsive frontend applications, explore data-driven models, and engineer web interfaces that are fast, accessible, and clean.
        </p>

        {/* Hero Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-[#3DDC97] text-[#0F1420] font-mono text-xs font-semibold uppercase tracking-wider hover:bg-[#34c888] transition-all shadow-md shadow-[#3DDC97]/10"
          >
            <span>Explore my work</span>
            <ArrowUpRight size={15} />
          </a>
          <a
            href="#approach"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-[rgba(232,234,237,0.2)] bg-[#0F1420]/60 hover:bg-white/[0.05] text-[#E8EAED] font-mono text-xs uppercase tracking-wider transition-all"
          >
            <span>The approach</span>
            <ArrowUpRight size={15} />
          </a>
        </div>
      </div>

      {/* Bottom Sidebars / Quick Stats */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 mt-6 border-t border-[rgba(173,186,205,0.08)] text-xs">
        {/* Left Side: Connect */}
        <div className="flex items-center gap-4 text-xs font-mono">
          <span className="eyebrow text-[#5B6472]">Connect:</span>
          <a
            href="https://github.com/Pallavi-SBhat"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-[#a2a9b4] hover:text-[#E8EAED] transition-colors"
          >
            <GithubIcon size={13} />
            <span>GitHub</span>
            <ArrowUpRight size={12} className="text-[#5B6472]" />
          </a>
          <a
            href="https://www.linkedin.com/in/pallavisbhat"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-[#a2a9b4] hover:text-[#E8EAED] transition-colors"
          >
            <LinkedinIcon size={13} />
            <span>LinkedIn</span>
            <ArrowUpRight size={12} className="text-[#5B6472]" />
          </a>
        </div>

        {/* Right Side: Currently Into */}
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-[#858e9c]">
          <span className="eyebrow text-[#5B6472]">Focus:</span>
          <span className="px-2.5 py-1 rounded border border-[rgba(173,186,205,0.12)] bg-[#141b28]/60 text-[#a2a9b4]">
            React 19 & Component Architecture
          </span>
          <span className="px-2.5 py-1 rounded border border-[rgba(173,186,205,0.12)] bg-[#141b28]/60 text-[#a2a9b4]">
            Python & ML
          </span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
