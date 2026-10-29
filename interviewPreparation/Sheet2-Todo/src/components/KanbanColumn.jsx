import React, { useState } from 'react';
import { useKanban } from '../context/KanbanContext';
import TaskCard from './TaskCard';
import { Plus, CheckCircle2, Clock, ListTodo } from 'lucide-react';

const COLUMN_CONFIG = {
  todo: {
    title: 'To Do',
    accentDot: 'bg-purple-500 shadow-purple-500/50 shadow-sm',
    emptyIcon: ListTodo,
    emptyText: 'No tasks to do yet',
    quickAddText: '+ Add a task',
  },
  'in-progress': {
    title: 'In Progress',
    accentDot: 'bg-sky-500 shadow-sky-500/50 shadow-sm',
    emptyIcon: Clock,
    emptyText: 'Nothing currently in progress',
    quickAddText: '+ Start a task',
  },
  completed: {
    title: 'Completed',
    accentDot: 'bg-emerald-500 shadow-emerald-500/50 shadow-sm',
    emptyIcon: CheckCircle2,
    emptyText: 'No completed tasks yet',
    quickAddText: '+ Complete a task',
  },
};

export default function KanbanColumn({ columnId, tasks, onDragStart, onDragEnd, draggedTaskId }) {
  const { openCreateModal, moveTask } = useKanban();
  const [isDragOver, setIsDragOver] = useState(false);

  const config = COLUMN_CONFIG[columnId] || COLUMN_CONFIG.todo;
  const EmptyIcon = config.emptyIcon;

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (!isDragOver) setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    // Only remove highlight if truly leaving the column container
    const rect = e.currentTarget.getBoundingClientRect();
    if (
      e.clientX <= rect.left ||
      e.clientX >= rect.right ||
      e.clientY <= rect.top ||
      e.clientY >= rect.bottom
    ) {
      setIsDragOver(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);

    const taskId = e.dataTransfer.getData('text/plain') || draggedTaskId;
    if (!taskId) return;

    // Calculate approximate drop position based on mouse position
    const cardElements = [...e.currentTarget.querySelectorAll('.task-card')];
    let targetIndex = cardElements.length;

    for (let i = 0; i < cardElements.length; i++) {
      const box = cardElements[i].getBoundingClientRect();
      if (e.clientY < box.top + box.height / 2) {
        targetIndex = i;
        break;
      }
    }

    moveTask(taskId, columnId, targetIndex);
  };

  return (
    <section
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`flex flex-col bg-slate-100/70 dark:bg-[#0f172a]/60 backdrop-blur-md rounded-2xl border transition-all duration-200 min-h-[480px] max-h-[calc(100vh-210px)] ${
        isDragOver
          ? 'border-brand-500 dark:border-brand-400 ring-2 ring-brand-500/20 bg-brand-50/20 dark:bg-brand-950/20'
          : 'border-slate-200/80 dark:border-slate-800/80'
      }`}
    >
      {/* Column Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="flex items-center gap-2.5">
          <span className={`w-2.5 h-2.5 rounded-full ${config.accentDot}`} />
          <h2 className="font-heading font-bold text-sm text-slate-800 dark:text-slate-100">
            {config.title}
          </h2>
          <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 text-slate-600 dark:text-slate-400">
            {tasks.length}
          </span>
        </div>

        <button
          onClick={() => openCreateModal(columnId)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-white dark:hover:bg-slate-800 transition-all active:scale-95"
          title={`Add task to ${config.title}`}
          aria-label={`Add task to ${config.title}`}
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>

      {/* Cards List / Droppable Zone */}
      <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-3 min-h-[160px]">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
            />
          ))
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-400 dark:text-slate-500">
            <div className="w-12 h-12 rounded-full border border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center mb-3">
              <EmptyIcon className="w-6 h-6 stroke-[1.5]" />
            </div>
            <p className="text-xs font-medium mb-3">{config.emptyText}</p>
            <button
              onClick={() => openCreateModal(columnId)}
              className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
            >
              {config.quickAddText}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
