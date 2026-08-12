import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Mail, Briefcase, GitBranch, Phone, Send } from 'lucide-react';

const Contact = () => {
  const sectionRef = useRef(null);
  const elementsRef = useRef([]);
  
  // State for form fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Load from local storage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('contactFormData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  // Save to local storage whenever form data changes
  useEffect(() => {
    localStorage.setItem('contactFormData', JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Details saved to local storage! (This is a demo)');
    // Optional: Clear form after submit
    // setFormData({ name: '', email: '', message: '' });
  };

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      }
    });

    // Heading fade up
    tl.fromTo(elementsRef.current[0],
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );
    
    // Form slides in with scale
    tl.fromTo(elementsRef.current[1],
      { opacity: 0, x: -50, scale: 0.95 },
      { opacity: 1, x: 0, scale: 1, duration: 0.8, ease: 'back.out(1.2)' },
      "-=0.4"
    );

    // Social cards pop in with a bounce
    const socialCards = [elementsRef.current[2], elementsRef.current[3], elementsRef.current[4], elementsRef.current[5]];
    tl.fromTo(socialCards,
      { opacity: 0, scale: 0, rotation: -15 },
      { opacity: 1, scale: 1, rotation: 0, duration: 0.6, stagger: 0.1, ease: 'back.out(2)' },
      "-=0.6"
    );

    // Map fades up
    tl.fromTo(elementsRef.current[6],
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
      "-=0.4"
    );

    // Add continuous floating animation to social cards
    socialCards.forEach((card, index) => {
      if (card) {
        gsap.to(card, {
          y: -8,
          duration: 1.5 + (index * 0.2), // slightly different speeds
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
          delay: Math.random() // start out of sync
        });
      }
    });
  }, []);

  return (
    <section id="contact" className="pt-10" ref={sectionRef}>
      <div className="mb-10 text-center" ref={el => elementsRef.current[0] = el}>
        <p className="text-slate-400 text-base md:text-lg max-w-sm mx-auto leading-relaxed">
          Currently open for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Contact Form */}
        <div className="bento-card p-6 md:p-8 col-span-1 md:col-span-2 lg:col-span-2 row-span-2" ref={el => elementsRef.current[1] = el}>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-2">Name</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name" 
                className="w-full bg-white text-slate-800 placeholder-blue-300/50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-2">Email</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@gmail.com" 
                className="w-full bg-white text-slate-800 placeholder-blue-300/50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-2">Message</label>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="How can I help you?" 
                rows="5"
                className="w-full bg-transparent border border-white/10 text-slate-300 placeholder-slate-500 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 font-medium resize-none"
              ></textarea>
            </div>
            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-blue-300 to-blue-400 text-[#0B0F19] font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity cursor-pointer"
            >
              Send Message <Send size={18} />
            </button>
          </form>
        </div>

        {/* Social Cards */}
        <a 
          href="mailto:bhatpallavi.24@gmail.com" 
          className="bento-card p-6 flex flex-col items-center justify-center gap-3 hover:bg-[#1a2133] transition-colors col-span-1"
          ref={el => elementsRef.current[2] = el}
        >
          <div className="w-10 h-10 rounded-full bg-[#1e293b] flex items-center justify-center border border-white/5">
            <Mail size={18} className="text-indigo-400" />
          </div>
          <span className="text-sm font-bold text-slate-300">Email</span>
        </a>

        <a 
          href="https://www.linkedin.com/in/pallavisbhat" target="_blank" rel="noreferrer"
          className="bento-card p-6 flex flex-col items-center justify-center gap-3 hover:bg-[#1a2133] transition-colors col-span-1"
          ref={el => elementsRef.current[3] = el}
        >
          <div className="w-10 h-10 rounded-full bg-[#1e293b] flex items-center justify-center border border-white/5">
            <Briefcase size={18} className="text-blue-400" />
          </div>
          <span className="text-sm font-bold text-slate-300">LinkedIn</span>
        </a>

        <a 
          href="https://github.com" target="_blank" rel="noreferrer"
          className="bento-card p-6 flex flex-col items-center justify-center gap-3 hover:bg-[#1a2133] transition-colors col-span-1"
          ref={el => elementsRef.current[4] = el}
        >
          <div className="w-10 h-10 rounded-full bg-[#1e293b] flex items-center justify-center border border-white/5">
            <GitBranch size={18} className="text-pink-400" />
          </div>
          <span className="text-sm font-bold text-slate-300">GitHub</span>
        </a>

        <a 
          href="tel:7259932987"
          className="bento-card p-6 flex flex-col items-center justify-center gap-3 hover:bg-[#1a2133] transition-colors col-span-1"
          ref={el => elementsRef.current[5] = el}
        >
          <div className="w-10 h-10 rounded-full bg-[#1e293b] flex items-center justify-center border border-white/5">
            <Phone size={18} className="text-emerald-400" />
          </div>
          <span className="text-sm font-bold text-slate-300">Phone</span>
        </a>

        {/* Functional Google Map */}
        <div className="col-span-1 md:col-span-2 lg:col-span-4 mt-4" ref={el => elementsRef.current[6] = el}>
          <div className="bento-card h-64 w-full relative overflow-hidden flex items-center justify-center bg-[#131722] border-white/5 border rounded-2xl">
            <iframe 
              title="Mangaluru Location"
              src="https://maps.google.com/maps?q=Mangaluru,%20Karnataka&t=&z=11&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(1.1) opacity(0.8)' }} 
              loading="lazy"
              className="absolute inset-0 z-0"
            ></iframe>
            {/* Optional overlay to prevent map from capturing all scroll events immediately */}
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_20px_rgba(11,15,25,1)] z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
