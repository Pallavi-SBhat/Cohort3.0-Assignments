import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '../redux/studySlice';
import { logoutUser } from '../redux/authSlice';
import { toggleTheme } from '../redux/themeSlice';
import { Search, Plus, Sparkles, Layout, LogOut, Sun, Moon } from 'lucide-react';

const Navbar = ({ onOpenModal }) => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.study.searchQuery);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const { mode } = useSelector((state) => state.theme);

  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out of DevTrack?')) {
      dispatch(logoutUser());
    }
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <header className="sticky top-0 z-40 bg-slateDark/80 backdrop-blur-md border-b border-slateBorder/60 px-4 lg:px-8 py-3.5 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand & Title */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brandIndigo to-brandPurple flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white font-bold">
              <Layout className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-400 bg-clip-text text-transparent">
                  DailyTrack
                </h1>
                <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Workspace
                </span>
              </div>
              <p className="text-xs text-textMuted hidden sm:block">
                Personal Task & Learning Progress Manager
              </p>
            </div>
          </div>

          <button
            onClick={() => dispatch(toggleTheme())}
            title={mode === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
            className="p-2 rounded-xl bg-slateCard border border-slateBorder text-textMuted hover:text-indigo-400 transition-all md:hidden"
          >
            {mode === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-500" />}
          </button>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-textMuted" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search tasks, tags..."
              className="w-full bg-inputBg border border-slateBorder rounded-xl pl-10 pr-4 py-2 text-sm text-textMain placeholder-textMuted focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => dispatch(setSearchQuery(''))}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-textMuted hover:text-textMain"
              >
                ✕
              </button>
            )}
          </div>

          <button
            onClick={() => dispatch(toggleTheme())}
            title={mode === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
            className="hidden md:flex p-2.5 rounded-xl bg-slateCard hover:bg-slateBorder/50 border border-slateBorder text-textMuted hover:text-indigo-400 transition-all active:scale-95 items-center justify-center"
          >
            {mode === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-500" />}
          </button>

          <button
            onClick={onOpenModal}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-brandIndigo to-brandPurple hover:from-indigo-600 hover:to-purple-600 text-white font-medium text-sm px-4 py-2 rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 active:scale-95 transition-all duration-200 whitespace-nowrap"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span className="hidden sm:inline">New Task</span>
          </button>

          {currentUser && (
            <div className="flex items-center gap-2 pl-2 border-l border-slateBorder/60">
              <div 
                title={`Logged in as ${currentUser.name} (${currentUser.email})`}
                className="w-9 h-9 rounded-xl bg-slateCard border border-slateBorder/80 flex items-center justify-center text-xs font-extrabold text-indigo-500 shadow-sm cursor-help"
              >
                {getInitials(currentUser.name)}
              </div>
              <button
                onClick={handleLogout}
                title="Log Out"
                className="p-2 rounded-xl bg-slateCard hover:bg-rose-500/10 text-textMuted hover:text-rose-500 border border-slateBorder hover:border-rose-500/30 transition-all active:scale-95"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};

export default Navbar;
