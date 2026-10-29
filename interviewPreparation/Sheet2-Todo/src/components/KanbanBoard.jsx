import React, { useState } from 'react';
import { useKanban } from '../context/KanbanContext';
import KanbanColumn from './KanbanColumn';
import { SearchX, RotateCcw } from 'lucide-react';

export default function KanbanBoard() {
  const { filteredTasks, mobileTab, isFilterActive, resetFilters } = useKanban();
  const [draggedTaskId, setDraggedTaskId] = useState(null);

  const todoTasks = filteredTasks.filter((t) => t.status === 'todo');
  const inProgressTasks = filteredTasks.filter((t) => t.status === 'in-progress');
  const completedTasks = filteredTasks.filter((t) => t.status === 'completed');

  const totalFiltered = filteredTasks.length;

  const handleDragStart = (e, taskId) => {
    setDraggedTaskId(taskId);
    e.dataTransfer.setData('text/plain', taskId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setDraggedTaskId(null);
  };

  return (
    <main className="flex-1 px-4 sm:px-7 pb-6 flex flex-col">
      {/* Global No Results Banner */}
      {totalFiltered === 0 && isFilterActive && (
        <div className="mb-4 p-4 rounded-2xl bg-brand-50/70 dark:bg-brand-950/30 border border-brand-200 dark:border-brand-800/80 flex items-center justify-between gap-4 animate-fade-in">
          <div className="flex items-center gap-3">
            <SearchX className="w-5 h-5 text-brand-600 dark:text-brand-400 shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                No matching tasks found
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                No tasks match your current search and filter criteria.
              </p>
            </div>
          </div>
          <button
            onClick={resetFilters}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all active:scale-95 shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear Filters</span>
          </button>
        </div>
      )}

      {/* Columns Grid */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 items-start">
        {/* To Do Column */}
        <div className={mobileTab === 'todo' ? 'block' : 'hidden md:block'}>
          <KanbanColumn
            columnId="todo"
            tasks={todoTasks}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            draggedTaskId={draggedTaskId}
          />
        </div>

        {/* In Progress Column */}
        <div className={mobileTab === 'in-progress' ? 'block' : 'hidden md:block'}>
          <KanbanColumn
            columnId="in-progress"
            tasks={inProgressTasks}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            draggedTaskId={draggedTaskId}
          />
        </div>

        {/* Completed Column */}
        <div className={mobileTab === 'completed' ? 'block' : 'hidden md:block'}>
          <KanbanColumn
            columnId="completed"
            tasks={completedTasks}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            draggedTaskId={draggedTaskId}
          />
        </div>
      </div>
    </main>
  );
}
