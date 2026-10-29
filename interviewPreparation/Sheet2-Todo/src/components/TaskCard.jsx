import React from 'react';
import { useKanban } from '../context/KanbanContext';
import { Pencil, Trash2, Calendar, AlertCircle, Clock } from 'lucide-react';

const PRIORITY_STYLES = {
  Urgent: {
    bg: 'bg-red-500/10 dark:bg-red-500/15',
    text: 'text-red-600 dark:text-red-400',
    border: 'border-red-500/20 dark:border-red-500/30',
    dot: 'bg-red-500',
  },
  High: {
    bg: 'bg-amber-500/10 dark:bg-amber-500/15',
    text: 'text-amber-600 dark:text-amber-400',
    border: 'border-amber-500/20 dark:border-amber-500/30',
    dot: 'bg-amber-500',
  },
  Medium: {
    bg: 'bg-blue-500/10 dark:bg-blue-500/15',
    text: 'text-blue-600 dark:text-blue-400',
    border: 'border-blue-500/20 dark:border-blue-500/30',
    dot: 'bg-blue-500',
  },
  Low: {
    bg: 'bg-emerald-500/10 dark:bg-emerald-500/15',
    text: 'text-emerald-600 dark:text-emerald-400',
    border: 'border-emerald-500/20 dark:border-emerald-500/30',
    dot: 'bg-emerald-500',
  },
};

export default function TaskCard({ task, onDragStart, onDragEnd }) {
  const { openEditModal, openDeleteModal, moveTask, searchQuery } = useKanban();

  const priorityStyle = PRIORITY_STYLES[task.priority] || PRIORITY_STYLES.Medium;

  // Search keyword highlight helper
  const highlightMatches = (text) => {
    if (!searchQuery.trim() || !text) return text;

    const regex = new RegExp(`(${searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-amber-200/60 dark:bg-yellow-400/30 text-amber-950 dark:text-yellow-200 px-0.5 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  // Due date metadata
  const getDueInfo = () => {
    if (!task.dueDate) return null;

    try {
      const parts = task.dueDate.split('-');
      if (parts.length !== 3) return null;

      const due = new Date(parts[0], parts[1] - 1, parts[2]);
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      const diffDays = Math.round((due - today) / (1000 * 60 * 60 * 24));
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const formatted = `${months[due.getMonth()]} ${due.getDate()}, ${due.getFullYear()}`;

      if (diffDays < 0) {
        return {
          text: `Overdue (${formatted})`,
          className: 'text-red-500 font-bold',
          icon: <AlertCircle className="w-3.5 h-3.5 text-red-500" />
        };
      } else if (diffDays === 0) {
        return {
          text: 'Due Today',
          className: 'text-amber-500 font-bold',
          icon: <Clock className="w-3.5 h-3.5 text-amber-500" />
        };
      } else if (diffDays === 1) {
        return {
          text: 'Due Tomorrow',
          className: 'text-slate-600 dark:text-slate-400 font-medium',
          icon: <Calendar className="w-3.5 h-3.5 text-slate-400" />
        };
      } else {
        return {
          text: formatted,
          className: 'text-slate-500 dark:text-slate-400 font-medium',
          icon: <Calendar className="w-3.5 h-3.5 text-slate-400" />
        };
      }
    } catch (e) {
      return null;
    }
  };

  const dueInfo = getDueInfo();

  return (
    <article
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
      onDragEnd={onDragEnd}
      data-task-id={task.id}
      className="task-card group relative flex flex-col gap-2.5 p-4 bg-white dark:bg-[#161e31]/80 hover:dark:bg-[#1c263d]/90 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm hover:shadow-md transition-all duration-150 cursor-grab active:cursor-grabbing hover:-translate-y-0.5"
    >
      {/* Card Header: Priority & Quick Actions */}
      <div className="flex items-center justify-between gap-2">
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider rounded-full border ${priorityStyle.bg} ${priorityStyle.text} ${priorityStyle.border}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${priorityStyle.dot}`} />
          <span>{task.priority}</span>
        </span>

        <div className="flex items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => openEditModal(task)}
            className="p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Edit task"
            aria-label="Edit task"
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => openDeleteModal(task)}
            className="p-1 rounded-md text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
            title="Delete task"
            aria-label="Delete task"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div>
        <h4 className="font-heading text-sm font-bold text-slate-900 dark:text-slate-100 leading-snug break-words">
          {highlightMatches(task.title)}
        </h4>
        {task.description && (
          <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed break-words">
            {highlightMatches(task.description)}
          </p>
        )}
      </div>

      {/* Card Footer: Due Date & Mobile Move Select */}
      <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/80 text-xs">
        {dueInfo ? (
          <div className={`flex items-center gap-1.5 ${dueInfo.className}`} title="Due date">
            {dueInfo.icon}
            <span className="text-[11px]">{dueInfo.text}</span>
          </div>
        ) : (
          <div />
        )}

        {/* Quick move dropdown for accessibility / mobile */}
        <div className="relative flex items-center">
          <select
            value={task.status}
            onChange={(e) => moveTask(task.id, e.target.value)}
            className="appearance-none pl-2 pr-5 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700/80 cursor-pointer focus:outline-none"
            aria-label="Change status"
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <div className="absolute right-1.5 pointer-events-none text-slate-400 text-[8px]">▼</div>
        </div>
      </div>
    </article>
  );
}
