import React, { useState, useEffect, useRef } from 'react';
import { useKanban } from '../context/KanbanContext';
import { X } from 'lucide-react';

export default function TaskModal() {
  const { taskModalState, closeTaskModal, addTask, updateTask } = useKanban();
  const { isOpen, mode, task, defaultStatus } = taskModalState;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [status, setStatus] = useState('todo');
  const [dueDate, setDueDate] = useState('');
  const [hasError, setHasError] = useState(false);
  const [shake, setShake] = useState(false);

  const titleInputRef = useRef(null);

  // Sync form state when modal opens or task changes
  useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && task) {
        setTitle(task.title || '');
        setDescription(task.description || '');
        setPriority(task.priority || 'Medium');
        setStatus(task.status || 'todo');
        setDueDate(task.dueDate || '');
      } else {
        setTitle('');
        setDescription('');
        setPriority('Medium');
        setStatus(defaultStatus || 'todo');
        setDueDate('');
      }
      setHasError(false);
      setShake(false);
      setTimeout(() => titleInputRef.current?.focus(), 50);
    }
  }, [isOpen, mode, task, defaultStatus]);

  // Keyboard shortcut: Escape to close
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && isOpen) {
        closeTaskModal();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeTaskModal]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || title.trim().length < 2) {
      setHasError(true);
      setShake(true);
      setTimeout(() => setShake(false), 400);
      titleInputRef.current?.focus();
      return;
    }

    if (mode === 'edit' && task) {
      updateTask(task.id, {
        title,
        description,
        priority,
        status,
        dueDate
      });
    } else {
      addTask({
        title,
        description,
        priority,
        status,
        dueDate
      });
    }

    closeTaskModal();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeTaskModal();
      }}
    >
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-scale-up">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <h3 id="modal-title" className="font-heading text-base font-bold text-slate-900 dark:text-white">
            {mode === 'edit' ? 'Edit Task' : 'Create New Task'}
          </h3>
          <button
            onClick={closeTaskModal}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4 text-xs font-medium">
          {/* Title Field */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="task-title" className="font-semibold text-slate-700 dark:text-slate-300">
                Task Title <span className="text-red-500">*</span>
              </label>
              <span className="text-[11px] text-slate-400">{title.length}/80</span>
            </div>
            <input
              ref={titleInputRef}
              id="task-title"
              type="text"
              maxLength={80}
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (e.target.value.trim().length >= 2) setHasError(false);
              }}
              placeholder="e.g. Design wireframes for onboarding flow"
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800/80 focus:outline-none focus:ring-2 transition-all ${
                hasError
                  ? 'border-red-500 ring-2 ring-red-500/20 bg-red-50/20 dark:bg-red-950/20'
                  : 'border-slate-200 dark:border-slate-700 focus:border-brand-500 focus:ring-brand-500/20'
              } ${shake ? 'animate-shake' : ''}`}
            />
            {hasError && (
              <p className="mt-1 text-[11px] text-red-500 font-semibold">
                Title is required (minimum 2 characters).
              </p>
            )}
          </div>

          {/* Description Field */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="task-desc" className="font-semibold text-slate-700 dark:text-slate-300">
                Description
              </label>
              <span className="text-[11px] text-slate-400">{description.length}/400</span>
            </div>
            <textarea
              id="task-desc"
              rows={3}
              maxLength={400}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add key context, acceptance criteria, or links..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800/80 focus:outline-none focus:ring-2 focus:border-brand-500 focus:ring-brand-500/20 transition-all resize-y"
            />
          </div>

          {/* Priority & Status Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Priority */}
            <div>
              <label htmlFor="task-priority" className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Priority
              </label>
              <div className="relative">
                <select
                  id="task-priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full appearance-none px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800/80 focus:outline-none focus:ring-2 focus:border-brand-500 focus:ring-brand-500/20 transition-all cursor-pointer"
                >
                  <option value="Urgent">🔥 Urgent</option>
                  <option value="High">⚡ High</option>
                  <option value="Medium">🔷 Medium</option>
                  <option value="Low">🌱 Low</option>
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">▼</div>
              </div>
            </div>

            {/* Status / Column */}
            <div>
              <label htmlFor="task-status" className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Column / Status
              </label>
              <div className="relative">
                <select
                  id="task-status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full appearance-none px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800/80 focus:outline-none focus:ring-2 focus:border-brand-500 focus:ring-brand-500/20 transition-all cursor-pointer"
                >
                  <option value="todo">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">▼</div>
              </div>
            </div>
          </div>

          {/* Due Date Field */}
          <div>
            <label htmlFor="task-duedate" className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Due Date
            </label>
            <input
              id="task-duedate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800/80 focus:outline-none focus:ring-2 focus:border-brand-500 focus:ring-brand-500/20 transition-all"
            />
            <p className="mt-1 text-[11px] text-slate-400">Optional deadline to track overdue tasks.</p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100 dark:border-slate-800 mt-2">
            <button
              type="button"
              onClick={closeTaskModal}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-brand-600 hover:bg-brand-500 shadow-md shadow-brand-500/20 transition-all active:scale-95"
            >
              {mode === 'edit' ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
