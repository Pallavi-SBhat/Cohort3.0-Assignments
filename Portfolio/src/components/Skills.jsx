import React from 'react';
import { Layout, Database, Terminal, Wrench } from 'lucide-react';

const categories = [
  {
    index: '01',
    title: 'Frontend Architecture',
    icon: Layout,
    caption: 'Component-driven user interfaces',
    skills: ['React.js', 'JavaScript (ES6+)', 'Tailwind CSS', 'HTML5 & CSS3', 'Redux', 'Vite']
  },
  {
    index: '02',
    title: 'Backend & Data',
    icon: Database,
    caption: 'Persistence, schemas & API consumption',
    skills: ['PostgreSQL', 'MongoDB', 'Supabase', 'Relational DBMS', 'REST APIs', 'SQL']
  },
  {
    index: '03',
    title: 'Programming Core',
    icon: Terminal,
    caption: 'Algorithmic foundations & OOP',
    skills: ['Python', 'Java', 'C', 'JavaScript', 'SQL']
  },
  {
    index: '04',
    title: 'Workflow & Tools',
    icon: Wrench,
    caption: 'Dev environments & deployment',
    skills: ['Git', 'GitHub', 'VS Code', 'Vercel', 'Postman', 'Linux Basics']
  }
];

const Skills = () => {
  return (
    <section id="skills" className="section-rail pt-20 pb-8">
      {/* Header */}
      <div className="border-b border-[rgba(173,186,205,0.12)] pb-4 mb-10">
        <p className="eyebrow mb-1">03 / Technical toolkit</p>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#E8EAED]">
          Crafted with intention<span className="text-[#3DDC97]">.</span>
        </h2>
      </div>

      {/* 4-Panel Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <div
              key={cat.title}
              className="border border-[rgba(173,186,205,0.15)] rounded-md p-5 bg-[#141b28]/70 hover:border-[#3DDC97]/40 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between font-mono text-[11px] text-[#5B6472] mb-3">
                  <span className="flex items-center gap-1.5 text-[#3DDC97]">
                    <Icon size={14} />
                    <span>{cat.index}</span>
                  </span>
                  <span className="uppercase tracking-wider">Domain</span>
                </div>

                <h3 className="text-base font-semibold text-[#E8EAED] mb-1">
                  {cat.title}
                </h3>
                <p className="text-xs text-[#858e9c] mb-5">
                  {cat.caption}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="font-mono text-[11px] px-2 py-1 rounded bg-[#0b101a] border border-[rgba(173,186,205,0.1)] text-[#a2a9b4]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-[rgba(173,186,205,0.08)] font-mono text-[10px] text-[#5B6472] flex items-center justify-between">
                <span>Status:</span>
                <span className="text-[#3DDC97]">Active & Practiced</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Skills;
