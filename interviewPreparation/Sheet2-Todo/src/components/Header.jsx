import React, { useState, useRef, useEffect } from 'react';
import { useKanban } from '../context/KanbanContext';
import { exportTasksAsJSON, parseImportedJSON } from '../utils/storage';
import {
  Kanban as KanbanIcon,
  Plus,
  Sun,
  Moon,
  MoreVertical,
  Download,
  Upload,
  RotateCcw,
  Trash2
} from 'lucide-react';

export default function Header() {
  const {
    tasks,
    stats,
    theme,
    toggleTheme,
    openCreateModal,
    loadSampleData,
    clearAllTasks,
    importTasks,
    addToast
  } = useKanban();

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const fileInputRef = useRef(null);

  // Close menu on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleExport = () => {
    exportTasksAsJSON(tasks);
    setMenuOpen(false);
    addToast({
      type: 'info',
      title: 'Export Complete',
      message: 'Tasks exported as JSON file.'
    });
  };

  const handleFileImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = parseImportedJSON(event.target.result);
        importTasks(imported);
      } catch (err) {
        addToast({
          type: 'danger',
          title: 'Import Failed',
          message: err.message
        });
      }
    };
    reader.readAsText(file);
    e.target.value = '';
    setMenuOpen(false);
  };

  const handleClearAll = () => {
    setMenuOpen(false);
    if (window.confirm('Are you sure you want to clear all tasks from the board?')) {
      clearAllTasks();
    }
  };

  return (
    <header className="sticky top-0 z-40 flex flex-wrap items-center justify-between gap-4 px-4 sm:px-7 py-3 bg-white/80 dark:bg-[#111827]/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80">
      {/* Left: Logo & Stats */}
      <div className="flex items-center gap-6 sm:gap-8 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-indigo-500 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-brand-500/25 transition-transform hover:scale-105 hover:-rotate-3">
            <KanbanIcon className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight font-heading text-slate-900 dark:text-white flex items-center gap-1 leading-none">
              Flow<span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-purple-400">Board</span>
            </h1>
            <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400 dark:text-slate-500">
              React Kanban Pro
            </span>
          </div>
        </div>

        {/* Board Statistics Overview */}
        <div className="hidden md:flex items-center gap-3.5 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 dark:text-slate-400 font-medium">Total</span>
            <span className="font-bold text-slate-900 dark:text-slate-100">{stats.total}</span>
          </div>
          <div className="w-px h-3.5 bg-slate-200 dark:bg-slate-700" />
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 dark:text-slate-400 font-medium">Done</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">{stats.completed}</span>
          </div>
          <div className="w-px h-3.5 bg-slate-200 dark:bg-slate-700" />
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 dark:text-slate-400 font-medium">Progress</span>
            <span className="font-bold text-brand-600 dark:text-brand-400">{stats.rate}%</span>
          </div>
          <div className="w-16 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden ml-1">
            <div
              className="h-full bg-gradient-to-r from-brand-500 to-emerald-500 rounded-full transition-all duration-300"
              style={{ width: `${stats.rate}%` }}
            />
          </div>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {/* New Task Button */}
        <button
          onClick={() => openCreateModal('todo')}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-md shadow-brand-500/25 transition-all duration-150 active:scale-95"
          title="Create New Task (Press N)"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>New Task</span>
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-bold bg-black/25 rounded border border-white/20">
            N
          </kbd>
        </button>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-600" />}
        </button>

        {/* Data & Options Menu */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(prev => !prev)}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Data & Board Options"
            aria-label="More options"
          >
            <MoreVertical className="w-5 h-5" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 p-1.5 z-50 animate-scale-up text-xs font-medium">
              <button
                onClick={handleExport}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/60 rounded-lg transition-colors"
              >
                <Download className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                <span>Export Tasks (JSON)</span>
              </button>

              <label className="w-full flex items-center gap-2.5 px-3 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/60 rounded-lg transition-colors cursor-pointer">
                <Upload className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                <span>Import Tasks (JSON)</span>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileImport}
                  accept=".json"
                  className="hidden"
                />
              </label>

              <div className="my-1 border-t border-slate-100 dark:border-slate-700/80" />

              <button
                onClick={() => {
                  setMenuOpen(false);
                  loadSampleData();
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/60 rounded-lg transition-colors"
              >
                <RotateCcw className="w-4 h-4 text-brand-500" />
                <span>Reset to Demo Data</span>
              </button>

              <button
                onClick={handleClearAll}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span>Clear All Tasks</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
