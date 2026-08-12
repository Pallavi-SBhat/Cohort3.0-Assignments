import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[#0B0F19]/80 backdrop-blur-md py-8 mt-20 relative z-10">
      <div className="max-w-3xl mx-auto px-4 flex items-center justify-center">
        <p className="text-slate-500 text-sm font-bold">
          © {new Date().getFullYear()} Pallavi Bhat. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
