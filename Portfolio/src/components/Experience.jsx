import React from 'react';
import { MapPin } from 'lucide-react';

const experiences = [
  {
    index: '01',
    category: 'Industry Internship',
    role: 'AI-ML & Software Development Intern',
    organization: 'CodeLab Systems',
    location: 'Mangaluru, Karnataka',
    period: 'Sep 2025 – Dec 2025',
    bullets: [
      'Trained, evaluated, and benchmarked supervised machine learning models (Random Forest, Logistic Regression) for customer churn analysis and stroke risk classification.',
      'Developed an interactive Expense Tracker web application with real-time category budget calculations, visual charts, and local data persistence.',
      'Conducted data preprocessing, exploratory data analysis (EDA), missing value imputation, and feature scaling using Scikit-Learn and Pandas.'
    ],
    tags: ['Python', 'Scikit-Learn', 'Pandas', 'Machine Learning', 'Web Development']
  },
  {
    index: '02',
    category: 'Postgraduate Degree',
    role: 'Master of Computer Applications (MCA)',
    organization: 'Mangalore Institute of Technology and Engineering (MITE)',
    location: 'Mangaluru, Karnataka',
    period: '2024 – 2026 (Expected)',
    bullets: [
      'Specializing in Artificial Intelligence and Modern Web Engineering, maintaining an A+ Grade record.',
      'Architecting component-driven web applications leveraging React, modern JavaScript (ES6+), and REST API integrations.',
      'Participated in departmental hackathons, agile project collaboration, and hands-on software development.'
    ],
    tags: ['A+ Grade', 'React.js', 'Python', 'Full-Stack Web', 'DBMS']
  },
  {
    index: '03',
    category: 'Undergraduate Degree',
    role: 'Bachelor of Computer Applications (BCA)',
    organization: 'Vijaya College',
    location: 'Karnataka, India',
    period: '2022 – 2024',
    bullets: [
      'Graduated with highest academic distinction: O+ Grade in Computer Science & Applications.',
      'Built rigorous foundations in Data Structures, Object-Oriented Programming (Java/C++), and Relational Database Systems (SQL).',
      'Completed practical programming laboratory coursework and algorithmic problem-solving assignments.'
    ],
    tags: ['O+ Distinction', 'Data Structures', 'Java', 'C', 'Relational DBMS', 'SQL']
  }
];

const Experience = () => {
  return (
    <section id="trajectory" className="section-rail pt-20 pb-8">
      {/* Header */}
      <div className="border-b border-[rgba(173,186,205,0.12)] pb-4 mb-10">
        <p className="eyebrow mb-1">04 / The trajectory</p>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#E8EAED]">
          From fundamentals to production<span className="text-[#3DDC97]">.</span>
        </h2>
      </div>

      {/* Experience List */}
      <div className="space-y-6">
        {experiences.map((item) => (
          <div
            key={item.index}
            className="border border-[rgba(173,186,205,0.15)] rounded-md p-6 bg-[#141b28]/70 hover:border-[#3DDC97]/40 transition-all"
          >
            {/* Top Meta Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-[11px] text-[#858e9c] mb-3">
              <span className="text-[#3DDC97] uppercase tracking-wider flex items-center gap-2">
                <span>{item.index}</span>
                <span>/</span>
                <span>{item.category}</span>
              </span>
              <span className="text-[#5B6472]">{item.period}</span>
            </div>

            {/* Title & Organization */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-4">
              <h3 className="text-lg sm:text-xl font-bold text-[#E8EAED]">
                {item.role}
              </h3>
              <div className="flex items-center gap-2 text-xs font-mono text-[#a2a9b4]">
                <span className="text-white font-medium">{item.organization}</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-[#5B6472]">
                  <MapPin size={11} /> {item.location}
                </span>
              </div>
            </div>

            {/* Bullets */}
            <ul className="space-y-2 mb-6">
              {item.bullets.map((bullet, idx) => (
                <li key={idx} className="text-xs sm:text-sm text-[#a2a9b4] flex items-start gap-2.5 leading-relaxed">
                  <span className="text-[#3DDC97] font-mono select-none mt-0.5">›</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            {/* Tags Strip */}
            <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[rgba(173,186,205,0.08)] font-mono text-[10px]">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded bg-[#0b101a] border border-[rgba(173,186,205,0.1)] text-[#a2a9b4]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
