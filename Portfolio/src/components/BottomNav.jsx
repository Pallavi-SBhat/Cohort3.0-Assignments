import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { LayoutGrid, FileTerminal, BrainCircuit, AtSign } from 'lucide-react';

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
    { id: 'home', icon: <LayoutGrid size={20} />, href: '#hero' },
    { id: 'experience', icon: <FileTerminal size={20} />, href: '#experience' },
    { id: 'skills', icon: <BrainCircuit size={20} />, href: '#skills' },
    { id: 'contact', icon: <AtSign size={20} />, href: '#contact' },
  ];

  return (
    <div className="fixed bottom-6 w-full z-50 px-4 flex justify-center pointer-events-none">
      <nav ref={navRef} className="bento-card px-2 py-2 flex items-center gap-2 pointer-events-auto backdrop-blur-xl bg-[#131722]/80">
        {navItems.map((item) => {
          const isActive = active === item.id;
          return (
            <a
              key={item.id}
              href={item.href}
              onClick={() => setActive(item.id)}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 relative ${
                isActive ? 'text-blue-950' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {isActive && (
                <span className="absolute inset-0 bg-[#818CF8] rounded-full shadow-[0_0_15px_rgba(129,140,248,0.5)] z-0"></span>
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
