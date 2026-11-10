import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';

function App() {
  return (
    <div className="bg-[#0F1420] text-[#E8EAED] min-h-screen relative antialiased selection:bg-[#3DDC97]/25 selection:text-[#3DDC97]">
      <Navbar />

      <main className="w-full max-w-[1140px] mx-auto px-4 sm:px-8">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}

export default App;
