import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-[#111] border-t border-white/10 py-6 mt-auto">
      <div className="flex flex-col items-center justify-center gap-1">
        <h2 className="text-volt font-heading font-bold text-lg">SkyMart</h2>
        <p className="text-[11px] text-white/40">
          &copy; 2025 SkyMart &bull; Built with React + Redux + TanStack Query
        </p>
      </div>
    </footer>
  );
};

export default Footer;

