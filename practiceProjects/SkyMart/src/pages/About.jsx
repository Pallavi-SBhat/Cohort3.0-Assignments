import React from 'react';
import { Zap, Package, Users, Star, Truck, ShieldCheck, Clock, Heart, Award, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-[1000px] mx-auto px-6 py-16 animate-fade-in flex flex-col items-center">
      
      {/* Header */}
      <div className="w-16 h-16 bg-volt rounded-full flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(200,244,0,0.3)]">
        <Zap size={32} className="text-ink fill-ink" />
      </div>
      <h1 className="text-5xl font-heading font-extrabold text-white mb-6 text-center">
        About <span className="text-volt">SkyMart</span>
      </h1>
      <p className="text-white/60 text-center max-w-2xl text-lg mb-16">
        SkyMart is a next-generation e-commerce platform built to make online shopping fast, fair, and enjoyable — for everyone.
      </p>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mb-16">
        <div className="border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center bg-transparent">
          <Package className="text-volt mb-2" size={24} />
          <h3 className="text-white font-bold text-2xl mb-1">20K+</h3>
          <p className="text-white/50 text-xs">Products</p>
        </div>
        <div className="border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center bg-transparent">
          <Users className="text-volt mb-2" size={24} />
          <h3 className="text-white font-bold text-2xl mb-1">50K+</h3>
          <p className="text-white/50 text-xs">Happy Customers</p>
        </div>
        <div className="border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center bg-transparent">
          <Star className="text-volt mb-2" size={24} />
          <h3 className="text-white font-bold text-2xl mb-1">4.9</h3>
          <p className="text-white/50 text-xs">Avg. Rating</p>
        </div>
        <div className="border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center bg-transparent">
          <Truck className="text-volt mb-2" size={24} />
          <h3 className="text-white font-bold text-2xl mb-1">99%</h3>
          <p className="text-white/50 text-xs">On-time Delivery</p>
        </div>
      </div>

      {/* Our Story */}
      <div className="w-full border border-white/10 rounded-3xl p-8 md:p-12 mb-16 bg-transparent">
        <h2 className="text-2xl font-heading font-bold text-white mb-6">Our Story</h2>
        <div className="text-white/70 space-y-6 text-sm leading-relaxed">
          <p>
            SkyMart started in 2022 as a small side project — two engineers tired of bloated, slow e-commerce experiences. We asked ourselves: what if shopping online was actually <strong>enjoyable</strong>?
          </p>
          <p>
            Three years later, SkyMart serves over 50,000 customers across the country. We stock electronics, fashion, jewelry, and everyday essentials — all at prices that don't require a second mortgage.
          </p>
          <p>
            We're still the same team at heart: obsessed with speed, transparency, and making you feel good about every purchase you make here.
          </p>
        </div>
      </div>

      {/* What We Stand For */}
      <h2 className="text-2xl font-heading font-bold text-white mb-8 text-center">What We Stand For</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-16">
        <div className="border border-white/10 rounded-2xl p-6 flex gap-4 bg-transparent items-start">
          <div className="w-10 h-10 rounded-full bg-volt/10 border border-volt/20 flex items-center justify-center shrink-0">
            <ShieldCheck size={18} className="text-volt" />
          </div>
          <div>
            <h3 className="text-white font-bold mb-2">Trust</h3>
            <p className="text-white/50 text-xs leading-relaxed">Every product is verified for quality and authenticity before listing.</p>
          </div>
        </div>
        <div className="border border-white/10 rounded-2xl p-6 flex gap-4 bg-transparent items-start">
          <div className="w-10 h-10 rounded-full bg-volt/10 border border-volt/20 flex items-center justify-center shrink-0">
            <Clock size={18} className="text-volt" />
          </div>
          <div>
            <h3 className="text-white font-bold mb-2">Speed</h3>
            <p className="text-white/50 text-xs leading-relaxed">We obsess over delivery times so your orders arrive when promised.</p>
          </div>
        </div>
        <div className="border border-white/10 rounded-2xl p-6 flex gap-4 bg-transparent items-start">
          <div className="w-10 h-10 rounded-full bg-volt/10 border border-volt/20 flex items-center justify-center shrink-0">
            <Heart size={18} className="text-volt" />
          </div>
          <div>
            <h3 className="text-white font-bold mb-2">Community</h3>
            <p className="text-white/50 text-xs leading-relaxed">Built around real customer feedback, not just business metrics.</p>
          </div>
        </div>
        <div className="border border-white/10 rounded-2xl p-6 flex gap-4 bg-transparent items-start">
          <div className="w-10 h-10 rounded-full bg-volt/10 border border-volt/20 flex items-center justify-center shrink-0">
            <Award size={18} className="text-volt" />
          </div>
          <div>
            <h3 className="text-white font-bold mb-2">Quality</h3>
            <p className="text-white/50 text-xs leading-relaxed">We curate the best — no filler, no junk, just great products.</p>
          </div>
        </div>
      </div>

      {/* Meet the Team */}
      <h2 className="text-2xl font-heading font-bold text-white mb-8 text-center">Meet the Team</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mb-16">
        <div className="border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center bg-transparent">
          <div className="w-14 h-14 rounded-full bg-[#c8f400] flex items-center justify-center font-bold text-ink text-xl mb-4">A</div>
          <h3 className="text-white font-bold text-sm mb-1">Aryan Shah</h3>
          <p className="text-white/50 text-[10px]">Founder & CEO</p>
        </div>
        <div className="border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center bg-transparent">
          <div className="w-14 h-14 rounded-full bg-[#3b82f6] flex items-center justify-center font-bold text-white text-xl mb-4">P</div>
          <h3 className="text-white font-bold text-sm mb-1">Priya Mehta</h3>
          <p className="text-white/50 text-[10px]">Head of Product</p>
        </div>
        <div className="border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center bg-transparent">
          <div className="w-14 h-14 rounded-full bg-[#a855f7] flex items-center justify-center font-bold text-white text-xl mb-4">R</div>
          <h3 className="text-white font-bold text-sm mb-1">Rohan Verma</h3>
          <p className="text-white/50 text-[10px]">Lead Engineer</p>
        </div>
        <div className="border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center bg-transparent">
          <div className="w-14 h-14 rounded-full bg-[#ef4444] flex items-center justify-center font-bold text-white text-xl mb-4">S</div>
          <h3 className="text-white font-bold text-sm mb-1">Sneha Kapoor</h3>
          <p className="text-white/50 text-[10px]">Design Director</p>
        </div>
      </div>

      {/* Ready to Shop CTA */}
      <div className="w-full border border-volt/20 rounded-2xl p-10 md:p-12 flex flex-col items-center text-center bg-gradient-to-b from-volt/5 to-transparent shadow-[0_0_50px_rgba(200,244,0,0.03)]">
        <h2 className="text-3xl font-heading font-bold text-white mb-3">Ready to shop?</h2>
        <p className="text-white/50 text-sm mb-8">Explore thousands of products at unbeatable prices.</p>
        <button 
          className="bg-volt text-ink font-bold px-8 py-3.5 rounded-full hover:bg-volt-light transition-colors flex items-center gap-2"
          onClick={() => navigate('/products')}
        >
          Browse Products <ArrowRight size={18} />
        </button>
      </div>

    </div>
  );
};

export default About;

