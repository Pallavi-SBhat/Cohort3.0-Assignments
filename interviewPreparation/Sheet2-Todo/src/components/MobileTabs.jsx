import React from 'react';
import { useKanban } from '../context/KanbanContext';

export default function MobileTabs() {
  const { mobileTab, setMobileTab, filteredTasks } = useKanban();

  const counts = {
    todo: filteredTasks.filter(t => t.status === 'todo').length,
    'in-progress': filteredTasks.filter(t => t.status === 'in-progress').length,
    completed: filteredTasks.filter(t => t.status === 'completed').length,
  };

  const tabs = [
    { id: 'todo', label: 'To Do', color: 'bg-purple-500' },
    { id: 'in-progress', label: 'In Progress', color: 'bg-sky-500' },
    { id: 'completed', label: 'Completed', color: 'bg-emerald-500' },
  ];

  return (
    <nav className="flex md:hidden px-4 mb-2 gap-2" aria-label="Mobile column switcher">
      {tabs.map((tab) => {
        const isActive = mobileTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setMobileTab(tab.id)}
            className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              isActive
                ? 'bg-brand-600 text-white shadow-md shadow-brand-500/20'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800'
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
                isActive
                  ? 'bg-white/20 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
              }`}
            >
              {counts[tab.id] || 0}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
