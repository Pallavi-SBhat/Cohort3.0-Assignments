import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  Code, 
  Maximize2,
  X
} from 'lucide-react';

const projects = [
  {
    id: 'weather',
    number: '01',
    type: 'Web App',
    name: 'weather-forecast',
    caption: 'Forecast. Track. Decide.',
    description: 'A real-time weather intelligence web application featuring global city search, atmospheric condition indicators, 5-day predictive forecasts, and temperature unit switching.',
    language: 'React 19',
    tags: ['React', 'OpenWeather API', 'Tailwind CSS', 'Vite'],
    image: '/projects/weather.png',
    live: 'https://weather-forecast-pallavii.vercel.app/',
    github: 'https://github.com/Pallavi-SBhat/WeatherForecast'
  },
  {
    id: 'skymart',
    number: '02',
    type: 'E-Commerce',
    name: 'skymart-storefront',
    caption: 'Catalog. Cart. Checkout.',
    description: 'A responsive e-commerce web application featuring real-time category filtering, sliding shopping cart state management, and an interactive checkout summary workflow.',
    language: 'React',
    tags: ['React', 'Context API', 'Tailwind CSS', 'JavaScript'],
    image: '/projects/skymart.png',
    live: 'https://skymart-tawny.vercel.app/',
    github: 'https://github.com/Pallavi-SBhat/Cohort3.0-Assignments/tree/4c7eb52e79c1d94552419ba9bfb0acea3599f85b/practiceProjects/SkyMart'
  },
  {
    id: 'fintrack',
    number: '03',
    type: 'FinTech',
    name: 'fintrack-pro',
    caption: 'Log. Budget. Analyze.',
    description: 'A personal expense management dashboard to log daily transactions, calculate monthly cash flow, set category budget limits, and store financial records privately in local storage.',
    language: 'React / Chart.js',
    tags: ['React', 'Chart.js', 'LocalStorage', 'Tailwind CSS'],
    image: '/projects/fintrack.png',
    live: 'https://fintrackpro-pallavii.vercel.app/',
    github: 'https://github.com/Pallavi-SBhat/Cohort3.0-Assignments/tree/4c7eb52e79c1d94552419ba9bfb0acea3599f85b/practiceProjects/ExpenseTracker'
  },
  {
    id: 'planner',
    number: '04',
    type: 'Productivity',
    name: 'productivity-planner',
    caption: 'Prioritize. Schedule. Complete.',
    description: 'A workflow and daily planning application featuring priority tagging (High, Medium, Low), task status toggles, and persistent state restoration across browser sessions.',
    language: 'JavaScript',
    tags: ['JavaScript', 'React', 'LocalStorage', 'Tailwind CSS'],
    image: '/projects/planner.png',
    live: 'https://productivityplanner-mu.vercel.app/',
    github: 'https://github.com/Pallavi-SBhat/Cohort3.0-Assignments/tree/4c7eb52e79c1d94552419ba9bfb0acea3599f85b/practiceProjects/ProductivityDashboard'
  },
  {
    id: 'dailytrack',
    number: '05',
    type: 'Productivity',
    name: 'daily-track',
    caption: 'Habit. Streak. Repeat.',
    description: 'A daily habit tracking application built during a mini-hackathon to help users track recurring goals, calculate consistency streaks, and build disciplined routines.',
    language: 'React',
    tags: ['React', 'Tailwind CSS', 'LocalStorage'],
    image: '/projects/dailytrack.png',
    live: 'https://dailytrack-wine.vercel.app/',
    github: 'https://github.com/Pallavi-SBhat/Cohort3.0-Assignments/tree/4c7eb52e79c1d94552419ba9bfb0acea3599f85b/MiniHackathon/DailyTrack'
  },
  {
    id: 'codelab-ml',
    number: '06',
    type: 'Machine Learning',
    name: 'churn-stroke-prediction',
    caption: 'Predict. Evaluate. Classify.',
    description: 'Supervised machine learning classification models trained during an industry internship at CodeLab Systems to predict customer churn probability and evaluate stroke risk factors.',
    language: 'Python',
    tags: ['Python', 'Scikit-Learn', 'Pandas', 'NumPy'],
    image: '/projects/churn-ml.svg',
    live: null,
    github: 'https://github.com/Pallavi-SBhat'
  }
];

const categories = ['All', 'Web App', 'FinTech', 'Productivity', 'Machine Learning'];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeModalProject, setActiveModalProject] = useState(null);

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.type.toLowerCase().includes(activeCategory.toLowerCase()));

  return (
    <section id="projects" className="section-rail pt-20 pb-8">
      {/* Header Row */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[rgba(173,186,205,0.12)] pb-4 mb-10 gap-4">
        <div>
          <p className="eyebrow mb-1">02 / Built in the open</p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#E8EAED]">
            Less talk. More commits<span className="text-[#3DDC97]">.</span>
          </h2>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1 font-mono text-[11px]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#3DDC97] text-[#0F1420] font-semibold'
                  : 'text-[#858e9c] hover:text-[#E8EAED] hover:bg-white/[0.04]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 2-Column Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((item) => {
          return (
            <div
              key={item.id}
              className="group border border-[rgba(173,186,205,0.15)] rounded-md overflow-hidden bg-[#141b28]/70 hover:border-[#3DDC97]/40 transition-all flex flex-col justify-between"
            >
              {/* Project Visual / Image Frame */}
              <div 
                className="h-56 sm:h-64 bg-[#0d121d] relative overflow-hidden border-b border-[rgba(173,186,205,0.12)] cursor-pointer"
                onClick={() => setActiveModalProject(item)}
              >
                {/* Real Project Image */}
                <img 
                  src={item.image} 
                  alt={`${item.name} screenshot`}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />

                {/* Subtle vignette / overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#141b28] via-[#141b28]/25 to-transparent opacity-85 group-hover:opacity-40 transition-opacity duration-300"></div>

                {/* Quick Expand Button on Hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <span className="px-3.5 py-1.5 rounded-full bg-[#0b101af0] border border-[#3DDC97]/50 text-[#3DDC97] font-mono text-xs flex items-center gap-1.5 shadow-xl backdrop-blur-md">
                    <Maximize2 size={13} />
                    <span>View Full Preview</span>
                  </span>
                </div>

                {/* Bottom Left Art Caption */}
                <span className="absolute bottom-3 left-4 font-mono text-[11px] text-[#E8EAED] drop-shadow-md tracking-wide z-10 bg-[#0B101A]/80 px-2.5 py-0.5 rounded border border-white/5 backdrop-blur-sm">
                  {item.caption}
                </span>

                {/* Top Right Corner Tag */}
                <span className="absolute top-3 right-4 font-mono text-[11px] text-[#3DDC97] uppercase tracking-wider z-10 bg-[#0B101A]/85 px-2.5 py-0.5 rounded border border-[#3DDC97]/30 backdrop-blur-sm">
                  {item.number} / {item.type}
                </span>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-mono text-base font-semibold text-[#E8EAED] group-hover:text-[#3DDC97] transition-colors">
                      {item.name}<span className="text-[#3DDC97]">_</span>
                    </h3>
                    {item.live && (
                      <a 
                        href={item.live} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-[#858e9c] hover:text-[#3DDC97] transition-colors"
                        aria-label={`Open ${item.name} live`}
                      >
                        <ArrowUpRight size={16} />
                      </a>
                    )}
                  </div>

                  <p className="text-sm text-[#a2a9b4] leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Meta */}
                <div className="pt-4 border-t border-[rgba(173,186,205,0.12)] flex items-center justify-between text-xs font-mono">
                  <span className="flex items-center gap-2 text-[#E8EAED]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3DDC97]"></span>
                    <span>{item.language}</span>
                  </span>

                  <div className="flex items-center gap-3">
                    {item.live && (
                      <a
                        href={item.live}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[#3DDC97] hover:underline uppercase text-[11px]"
                      >
                        <span>Live Demo</span>
                        <ArrowUpRight size={12} />
                      </a>
                    )}
                    <a
                      href={item.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[#858e9c] hover:text-[#E8EAED] uppercase text-[11px]"
                    >
                      <Code size={12} />
                      <span>Code</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Preview Modal */}
      {activeModalProject && (
        <div 
          className="fixed inset-0 z-50 bg-[#0B101A]/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setActiveModalProject(null)}
        >
          <div 
            className="relative max-w-4xl w-full bg-[#141b28] border border-[rgba(173,186,205,0.2)] rounded-lg overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-[rgba(173,186,205,0.15)] bg-[#0B101A]">
              <div className="flex items-center gap-2 font-mono text-xs text-[#E8EAED]">
                <span className="text-[#3DDC97]">{activeModalProject.number}</span>
                <span>/</span>
                <span className="font-semibold">{activeModalProject.name}</span>
                <span className="text-[#5B6472]">({activeModalProject.type})</span>
              </div>

              <div className="flex items-center gap-3">
                {activeModalProject.live && (
                  <a
                    href={activeModalProject.live}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1 rounded bg-[#3DDC97] text-[#0F1420] font-mono text-xs font-semibold uppercase tracking-wider hover:bg-[#34c888] transition-colors"
                  >
                    <span>Visit Live Site</span>
                    <ArrowUpRight size={12} />
                  </a>
                )}
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="p-1 rounded text-[#858e9c] hover:text-white transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Modal Image View */}
            <div className="max-h-[75vh] overflow-y-auto bg-[#0d121d] flex items-center justify-center p-2">
              <img 
                src={activeModalProject.image} 
                alt={`${activeModalProject.name} Full Preview`}
                className="w-full h-auto object-contain rounded"
              />
            </div>

            {/* Modal Footer Description */}
            <div className="p-4 bg-[#141b28] border-t border-[rgba(173,186,205,0.12)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#a2a9b4]">
              <p className="max-w-xl font-sans">
                {activeModalProject.description}
              </p>
              <div className="flex items-center gap-2 font-mono">
                {activeModalProject.tags.map(t => (
                  <span key={t} className="px-2 py-0.5 rounded bg-[#0b101a] border border-white/5 text-[#E8EAED] text-[11px]">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
