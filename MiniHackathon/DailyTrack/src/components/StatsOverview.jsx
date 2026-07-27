import React from 'react';
import { useSelector } from 'react-redux';
import { Target, CheckCircle2, Clock, Flame, TrendingUp } from 'lucide-react';

const StatsOverview = () => {
  const goals = useSelector((state) => state.study.goals);

  const totalGoals = goals.length;
  const completedGoals = goals.filter((g) => g.status === 'Completed').length;
  const inProgressGoals = goals.filter((g) => g.status === 'In Progress').length;
  const highPriorityGoals = goals.filter((g) => g.priority === 'High' && g.status !== 'Completed').length;
  
  const completionRate = totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0;

  return (
    <div className="mb-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <h2 className="text-lg font-bold text-textMain flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-500" />
            Productivity & Progress Overview
          </h2>
          <p className="text-xs text-textMuted">
            Real-time metrics updated automatically as you complete your tasks
          </p>
        </div>

        <div className="flex items-center gap-3 bg-slateCard border border-slateBorder px-4 py-2 rounded-xl shadow-sm">
          <div className="text-xs font-semibold text-textMuted">Overall Progress:</div>
          <div className="w-24 bg-slateBorder rounded-full h-2 overflow-hidden border border-slateBorder/80">
            <div 
              className="bg-gradient-to-r from-brandIndigo to-brandPurple h-full transition-all duration-500 rounded-full"
              style={{ width: `${completionRate}%` }}
            />
          </div>
          <div className="text-xs font-bold text-indigo-500">{completionRate}%</div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        
        <div className="glass-card rounded-2xl p-4 flex items-center justify-between border-l-4 border-l-indigo-500 shadow-sm">
          <div>
            <span className="text-xs font-medium text-textMuted block mb-1">Total Tasks</span>
            <span className="text-2xl font-extrabold text-textMain">{totalGoals}</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-500">
            <Target className="w-5 h-5" />
          </div>
        </div>

        <div className="glass-card rounded-2xl p-4 flex items-center justify-between border-l-4 border-l-amber-500 shadow-sm">
          <div>
            <span className="text-xs font-medium text-textMuted block mb-1">In Progress</span>
            <span className="text-2xl font-extrabold text-amber-500">{inProgressGoals}</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="glass-card rounded-2xl p-4 flex items-center justify-between border-l-4 border-l-emerald-500 shadow-sm">
          <div>
            <span className="text-xs font-medium text-textMuted block mb-1">Completed</span>
            <span className="text-2xl font-extrabold text-emerald-500">{completedGoals}</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="glass-card rounded-2xl p-4 flex items-center justify-between border-l-4 border-l-rose-500 shadow-sm">
          <div>
            <span className="text-xs font-medium text-textMuted block mb-1">High Priority</span>
            <span className="text-2xl font-extrabold text-rose-500">{highPriorityGoals}</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500">
            <Flame className="w-5 h-5" />
          </div>
        </div>

      </div>
    </div>
  );
};

export default StatsOverview;
