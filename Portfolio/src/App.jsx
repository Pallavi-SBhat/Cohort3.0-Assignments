import React, { useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import ParticleBackground from './components/ParticleBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import BottomNav from './components/BottomNav';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`bg-[#0B0F19] min-h-screen relative text-slate-300 font-sans pb-24 ${isLoading ? 'overflow-hidden h-screen' : ''}`}>
      <ParticleBackground />
      <CustomCursor />
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      
      {/* Hide main content until preloader is done so animations trigger correctly */}
      <div className={`relative z-10 transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Navbar />
        <main className="w-full max-w-[1920px] mx-auto px-6 md:px-16 lg:px-24 pt-24 pb-12 space-y-24">
          <Hero />
          {/* We will merge Hero and About mostly, but keep components if needed */}
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Contact />
        </main>
        <Footer />
        <BottomNav />
        <BackToTop />
      </div>
    </div>
  );
}

export default App;
