import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteGoal, toggleGoalStatus } from '../redux/studySlice';
import { CheckCircle2, Circle, Edit3, Trash2, Tag, AlertCircle, FileText, Calendar } from 'lucide-react';

const GoalCard = ({ goal, onEdit }) => {
  const dispatch = useDispatch();

  const isCompleted = goal.status === 'Completed';

  const handleToggle = () => {
    dispatch(toggleGoalStatus(goal.id));
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${goal.title}"?`)) {
      dispatch(deleteGoal(goal.id));
    }
  };

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-rose-500/10 text-rose-500 border-rose-500/20';
      case 'Medium':
        return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'Low':
      default:
        return 'bg-slate-500/10 text-textMuted border-slateBorder';
    }
  };

  const getCategoryStyle = (category) => {
    switch (category) {
      case 'Frontend':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'Backend':
        return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'Fullstack':
        return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      case 'DSA':
        return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      case 'Design':
        return 'bg-pink-500/10 text-pink-500 border-pink-500/20';
      default:
        return 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Recently';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return 'Recently';
    }
  };

  return (
    <div 
      className={`glass-card glass-card-hover rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden transition-all duration-300 animate-slide-up ${
        isCompleted ? 'opacity-70 border-emerald-500/20' : ''
      }`}
    >
      <div 
        className={`absolute top-0 left-0 right-0 h-1 ${
          isCompleted ? 'bg-emerald-500' : goal.priority === 'High' ? 'bg-rose-500' : 'bg-indigo-500'
        }`}
      />

      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border flex items-center gap-1 ${getCategoryStyle(goal.category)}`}>
            <Tag className="w-3 h-3" />
            {goal.category || 'General'}
          </span>

          <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border flex items-center gap-1 ${getPriorityStyle(goal.priority)}`}>
            <AlertCircle className="w-3 h-3" />
            {goal.priority || 'Medium'}
          </span>
        </div>

        <div className="flex items-start gap-3 mb-3">
          <button
            onClick={handleToggle}
            title={isCompleted ? "Mark as In Progress" : "Mark as Completed"}
            className="mt-0.5 flex-shrink-0 text-textMuted hover:text-emerald-500 transition-colors focus:outline-none"
          >
            {isCompleted ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-500/20" />
            ) : (
              <Circle className="w-5 h-5 text-textMuted hover:text-indigo-500" />
            )}
          </button>
          <h3 
            className={`text-base font-bold tracking-tight transition-all ${
              isCompleted ? 'text-textMuted line-through' : 'text-textMain'
            }`}
          >
            {goal.title}
          </h3>
        </div>

        {goal.notes && (
          <div className="bg-inputBg border border-slateBorder/60 rounded-xl p-3 mb-4 text-xs text-textMain flex items-start gap-2 shadow-inner">
            <FileText className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0 mt-0.5" />
            <p className="line-clamp-3 leading-relaxed">{goal.notes}</p>
          </div>
        )}
      </div>

      <div className="pt-3 border-t border-slateBorder/50 flex items-center justify-between gap-2 text-xs text-textMuted mt-2">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-textMuted" />
          <span>{formatDate(goal.createdAt)}</span>
          <span className={`ml-2 px-2 py-0.5 rounded-full text-[10px] font-semibold ${
            isCompleted ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
          }`}>
            {goal.status || 'In Progress'}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onEdit(goal)}
            title="Edit Task"
            className="p-1.5 rounded-lg text-textMuted hover:text-indigo-500 hover:bg-indigo-500/10 transition-all"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={handleDelete}
            title="Delete Task"
            className="p-1.5 rounded-lg text-textMuted hover:text-rose-500 hover:bg-rose-500/10 transition-all"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoalCard;
