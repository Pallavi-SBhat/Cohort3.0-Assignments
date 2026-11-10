import React from 'react';
import { ArrowUpRight, ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[rgba(173,186,205,0.12)] pt-12 pb-8 mt-12">
      <div className="section-rail">
        {/* Footer Top Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-[rgba(173,186,205,0.08)]">
          <div>
            <a href="#hero" className="wordmark inline-flex items-center gap-0.5">
              <span>pb</span><span className="text-[#3DDC97]">_</span>
            </a>
            <p className="text-xs text-[#858e9c] mt-1 font-sans">
              Build thoughtfully. Share openly.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <a
              href="https://github.com/Pallavi-SBhat"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-[#a2a9b4] hover:text-[#3DDC97] transition-colors"
            >
              <GithubIcon size={14} />
              <span>GitHub</span>
              <ArrowUpRight size={13} className="text-[#5B6472]" />
            </a>
            <a
              href="https://www.linkedin.com/in/pallavisbhat"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-[#a2a9b4] hover:text-[#3DDC97] transition-colors"
            >
              <LinkedinIcon size={14} />
              <span>LinkedIn</span>
              <ArrowUpRight size={13} className="text-[#5B6472]" />
            </a>
          </div>
        </div>

        {/* Footer Bottom Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 text-[11px] font-mono text-[#5B6472]">
          <span>© {new Date().getFullYear()} Pallavi S Bhat. All rights reserved.</span>

          <div className="flex items-center gap-5">
            <a href="#approach" className="hover:text-[#a2a9b4] transition-colors">Approach</a>
            <a href="#projects" className="hover:text-[#a2a9b4] transition-colors">Projects</a>
            <a href="#trajectory" className="hover:text-[#a2a9b4] transition-colors">Trajectory</a>
            <a href="#contact" className="hover:text-[#a2a9b4] transition-colors">Contact</a>
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1 hover:text-[#E8EAED] transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp size={12} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
