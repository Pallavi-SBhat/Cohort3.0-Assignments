import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilterStatus, clearCompletedGoals } from './redux/studySlice';
import Navbar from './components/Navbar';
import StatsOverview from './components/StatsOverview';
import GoalCard from './components/GoalCard';
import GoalModal from './components/GoalModal';
import Login from './components/Login';
import Register from './components/Register';
import { Filter, Trash2, Plus, BookOpen, Sparkles } from 'lucide-react';

function App() {
  const dispatch = useDispatch();
  
  const { goals, filterStatus, searchQuery } = useSelector((state) => state.study);
  const { currentUser } = useSelector((state) => state.auth);
  const { mode } = useSelector((state) => state.theme);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [goalToEdit, setGoalToEdit] = useState(null);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'

  useEffect(() => {
    if (mode === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
  }, [mode]);

  if (!currentUser) {
    if (authMode === 'register') {
      return <Register onSwitchToLogin={() => setAuthMode('login')} />;
    }
    return <Login onSwitchToRegister={() => setAuthMode('register')} />;
  }

  const filteredGoals = goals.filter((goal) => {
    let matchesFilter = true;
    if (filterStatus === 'In Progress') matchesFilter = goal.status === 'In Progress';
    if (filterStatus === 'Completed') matchesFilter = goal.status === 'Completed';
    if (filterStatus === 'High Priority') matchesFilter = goal.priority === 'High' && goal.status !== 'Completed';

    let matchesSearch = true;
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const titleMatch = goal.title?.toLowerCase().includes(query);
      const notesMatch = goal.notes?.toLowerCase().includes(query);
      const categoryMatch = goal.category?.toLowerCase().includes(query);
      matchesSearch = titleMatch || notesMatch || categoryMatch;
    }

    return matchesFilter && matchesSearch;
  });

  const handleOpenAddModal = () => {
    setGoalToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (goal) => {
    setGoalToEdit(goal);
    setIsModalOpen(true);
  };

  const handleClearCompleted = () => {
    const completedCount = goals.filter((g) => g.status === 'Completed').length;
    if (completedCount === 0) return;
    if (window.confirm(`Are you sure you want to clear ${completedCount} completed task(s)?`)) {
      dispatch(clearCompletedGoals());
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slateDark text-textMain selection:bg-indigo-500 selection:text-white pb-12 animate-fade-in transition-colors duration-300">
      
      <Navbar onOpenModal={handleOpenAddModal} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 pt-8">
        
        <StatsOverview />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-slateBorder/60 pb-5">
          
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            <div className="text-xs font-semibold text-textMuted flex items-center gap-1.5 mr-2">
              <Filter className="w-3.5 h-3.5 text-indigo-400" />
              <span>Filter:</span>
            </div>
            {['All', 'In Progress', 'Completed', 'High Priority'].map((tab) => (
              <button
                key={tab}
                onClick={() => dispatch(setFilterStatus(tab))}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  filterStatus === tab
                    ? 'bg-gradient-to-r from-brandIndigo to-brandPurple text-white shadow-md shadow-indigo-500/20'
                    : 'bg-slateCard/70 text-textMuted hover:text-textMain border border-slateBorder/60 hover:border-indigo-500/50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto">
            <span className="text-xs text-textMuted hidden md:inline">
              Showing <strong className="text-indigo-400">{filteredGoals.length}</strong> of {goals.length} tasks
            </span>
            {goals.some((g) => g.status === 'Completed') && (
              <button
                onClick={handleClearCompleted}
                className="flex items-center gap-1.5 text-xs text-textMuted hover:text-rose-400 font-medium px-3 py-1.5 rounded-xl bg-slateCard/60 hover:bg-rose-500/10 border border-slateBorder/60 hover:border-rose-500/30 transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear Completed</span>
              </button>
            )}
          </div>

        </div>

        {filteredGoals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredGoals.map((goal) => (
              <GoalCard key={goal.id} goal={goal} onEdit={handleOpenEditModal} />
            ))}
          </div>
        ) : (
          <div className="glass-card rounded-3xl p-12 text-center max-w-md mx-auto my-12 border border-dashed border-slateBorder/80">
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mx-auto mb-4 shadow-inner">
              <BookOpen className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-textMain mb-2">No Tasks Found</h3>
            <p className="text-xs text-textMuted mb-6 leading-relaxed">
              {searchQuery
                ? `No results match your search "${searchQuery}". Try a different keyword!`
                : `You don't have any tasks marked as "${filterStatus}". Add a new task to start tracking your progress!`}
            </p>
            <button
              onClick={handleOpenAddModal}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-brandIndigo to-brandPurple hover:from-indigo-600 hover:to-purple-600 text-white font-semibold text-xs px-5 py-2.5 rounded-xl shadow-lg shadow-indigo-500/25 transition-all"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Create First Task</span>
            </button>
          </div>
        )}

      </main>

      <footer className="mt-16 border-t border-slateBorder/50 py-6 px-4 text-center text-xs text-textMuted">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="flex items-center gap-1.5 justify-center">
            <span>Built by</span>
            <strong className="text-textMain">Pallavi Bhat</strong>
            <span>• Personal Task & Learning Progress Dashboard</span>
          </p>
          <div className="flex items-center gap-3">
          </div>
        </div>
      </footer>

      <GoalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        goalToEdit={goalToEdit}
      />

    </div>
  );
}

export default App;
