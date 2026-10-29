import React from 'react';

export default function Footer() {
  return (
    <footer className="px-4 sm:px-7 py-3 bg-white/60 dark:bg-[#111827]/60 backdrop-blur-md border-t border-slate-200/80 dark:border-slate-800/80 text-[11px] text-slate-500 dark:text-slate-400 flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-4 flex-wrap">
        <span>
          <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 font-bold text-[10px]">
            N
          </kbd>{' '}
          New task
        </span>
        <span>
          <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 font-bold text-[10px]">
            /
          </kbd>{' '}
          Search
        </span>
        <span>
          <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 font-bold text-[10px]">
            Esc
          </kbd>{' '}
          Close modal
        </span>
        <span className="hidden sm:inline">Drag cards between columns to change status or reorder</span>
      </div>

      <div className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        <span>Synced with LocalStorage</span>
      </div>
    </footer>
  );
}
