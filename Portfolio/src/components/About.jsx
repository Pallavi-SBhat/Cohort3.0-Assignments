import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const About = () => {
  const toolkit = [
    'React.js',
    'JavaScript (ES6+)',
    'Tailwind CSS',
    'Python',
    'PostgreSQL',
    'MongoDB',
    'Vite',
    'Git'
  ];

  return (
    <section id="approach" className="section-rail pt-20 pb-8">
      {/* Eyebrow Index */}
      <div className="flex items-center justify-between border-b border-[rgba(173,186,205,0.12)] pb-3 mb-10">
        <span className="eyebrow">01 / The approach</span>
        <span className="font-mono text-sm text-[#3DDC97]">+</span>
      </div>

      {/* Main Grid: Serif Title + Content */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-14">
        <div className="md:col-span-5">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#E8EAED] leading-tight">
            Good interfaces.<br />
            <span className="text-[#858e9c] italic font-serif">Thoughtful code.</span>
          </h2>
        </div>

        <div className="md:col-span-7 space-y-5 text-sm sm:text-base text-[#a2a9b4] leading-relaxed">
          <p>
            I’m Pallavi, a frontend engineer and MCA student at <strong className="text-[#E8EAED] font-semibold">MITE Mangalore</strong> with hands-on internship experience at <strong className="text-[#E8EAED] font-semibold">CodeLab Systems</strong>. I focus on component architecture, state management, and building user interfaces that feel responsive and reliable.
          </p>
          <p>
            I believe the best way to understand something is to build it with real constraints—and the next best way is to keep the code transparent, accessible, and well-tested.
          </p>

          {/* Code Annotation */}
          <div className="p-4 rounded-md bg-[#141b28] border border-[rgba(173,186,205,0.12)] font-mono text-xs text-[#E8EAED]">
            <span className="text-[#5B6472] block mb-1.5">// the short version</span>
            <span className="text-[#3DDC97]">while</span> (curious) &#123; build(); learn(); &#125;
          </div>

          <div>
            <a
              href="#trajectory"
              className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#3DDC97] hover:text-[#34c888] transition-colors"
            >
              <span>Review my background & education</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* Everyday Toolkit Strip */}
      <div className="border-y border-[rgba(173,186,205,0.12)] py-4 flex flex-wrap items-center gap-4 sm:gap-7 font-mono text-xs">
        <span className="eyebrow text-[#5B6472]">Everyday toolkit:</span>
        {toolkit.map((tool) => (
          <span key={tool} className="text-[#E8EAED] flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-[#3DDC97]"></span>
            <span>{tool}</span>
          </span>
        ))}
      </div>
    </section>
  );
};

export default About;
