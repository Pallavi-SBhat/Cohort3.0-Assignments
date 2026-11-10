import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-40 w-9 h-9 bg-[#141b28] border border-[rgba(173,186,205,0.18)] hover:border-[#3DDC97] rounded flex items-center justify-center text-[#858e9c] hover:text-[#3DDC97] transition-all cursor-pointer shadow-xl"
      aria-label="Back to top"
    >
      <ArrowUp size={14} />
    </button>
  );
};

export default BackToTop;
