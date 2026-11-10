import React, { useState } from 'react';
import { Terminal, GitBranch, Briefcase, Mail, Cpu, User, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { name: 'Intro', href: '#hero', icon: Terminal },
    { name: 'Approach', href: '#approach', icon: User },
    { name: 'Projects', href: '#projects', icon: GitBranch },
    { name: 'Skills', href: '#skills', icon: Cpu },
    { name: 'Trajectory', href: '#trajectory', icon: Briefcase },
    { name: 'Contact', href: '#contact', icon: Mail },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-5 transition-all">
      <div className="max-w-[1140px] mx-auto flex items-center justify-between">
        {/* Wordmark */}
        <a href="#hero" className="wordmark flex items-center gap-0.5 group">
          <span>pb</span><span className="text-[#3DDC97] animate-pulse">_</span>
        </a>

        {/* Floating Desktop Navigation Dock */}
        <nav className="hidden md:flex items-center p-1.5 gap-1 border border-[rgba(173,186,205,0.15)] rounded-full bg-[#0b101af5] backdrop-blur-md shadow-2xl">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.href}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-mono text-[11px] uppercase tracking-wider text-[#858e9c] hover:text-[#E8EAED] hover:bg-white/[0.05] transition-all"
              >
                <Icon size={12} className="stroke-[1.8]" />
                <span>{link.name}</span>
              </a>
            );
          })}
        </nav>

        {/* Status Pill & Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          <a 
            href="#contact" 
            className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full font-mono text-[11px] text-[#a2a9b4] border border-[rgba(173,186,205,0.15)] bg-[#0b101a]/80 hover:border-[#3DDC97]/40 hover:text-[#E8EAED] transition-all"
          >
            <span className="status-dot"></span>
            <span>Open to roles</span>
          </a>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-[#858e9c] hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="md:hidden mt-3 max-w-[1140px] mx-auto p-4 rounded-2xl border border-[rgba(173,186,205,0.15)] bg-[#0b101af5] backdrop-blur-xl space-y-2 shadow-2xl">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg font-mono text-xs uppercase tracking-wider text-[#a2a9b4] hover:text-white hover:bg-white/5 transition-colors"
              >
                <Icon size={14} className="text-[#3DDC97]" />
                <span>{link.name}</span>
              </a>
            );
          })}
          <div className="pt-2 border-t border-[rgba(173,186,205,0.12)]">
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-[#3DDC97] text-[#0F1420] font-mono text-xs font-semibold uppercase tracking-wider"
            >
              <span className="status-dot !bg-[#0F1420]"></span>
              <span>Get in touch</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
