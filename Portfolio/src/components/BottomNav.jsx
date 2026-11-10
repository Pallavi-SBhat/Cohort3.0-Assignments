import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { LayoutGrid, Cpu, Briefcase, FolderGit2, Mail } from 'lucide-react';

const BottomNav = () => {
  const navRef = useRef(null);
  const [active, setActive] = useState('home');

  useEffect(() => {
    gsap.from(navRef.current, {
      y: 100,
      opacity: 0,
      duration: 1,
      delay: 0.5,
      ease: 'back.out(1.2)'
    });
  }, []);

  const navItems = [
    { id: 'home', title: 'Home', icon: <LayoutGrid size={18} />, href: '#hero' },
    { id: 'skills', title: 'Skills', icon: <Cpu size={18} />, href: '#skills' },
    { id: 'experience', title: 'Experience', icon: <Briefcase size={18} />, href: '#experience' },
    { id: 'projects', title: 'Projects', icon: <FolderGit2 size={18} />, href: '#projects' },
    { id: 'contact', title: 'Contact', icon: <Mail size={18} />, href: '#contact' },
  ];

  return (
    <div className="fixed bottom-6 w-full z-50 px-4 flex justify-center pointer-events-none">
      <nav ref={navRef} className="bento-card px-3 py-2 flex items-center gap-1.5 pointer-events-auto backdrop-blur-xl bg-[#131722]/90 border-white/10 shadow-2xl">
        {navItems.map((item) => {
          const isActive = active === item.id;
          return (
            <a
              key={item.id}
              href={item.href}
              onClick={() => setActive(item.id)}
              title={item.title}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 relative ${
                isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              {isActive && (
                <span className="absolute inset-0 bg-blue-600 rounded-xl shadow-[0_0_15px_rgba(37,99,235,0.5)] z-0"></span>
              )}
              <span className="relative z-10">{item.icon}</span>
            </a>
          );
        })}
      </nav>
    </div>
  );
};

export default BottomNav;
