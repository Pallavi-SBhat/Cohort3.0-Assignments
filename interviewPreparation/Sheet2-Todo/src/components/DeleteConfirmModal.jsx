import React, { useEffect } from 'react';
import { useKanban } from '../context/KanbanContext';
import { Trash2 } from 'lucide-react';

export default function DeleteConfirmModal() {
  const { deleteModalState, closeDeleteModal, confirmDeleteTask } = useKanban();
  const { isOpen, task } = deleteModalState;

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && isOpen) {
        closeDeleteModal();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeDeleteModal]);

  if (!isOpen || !task) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="delete-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeDeleteModal();
      }}
    >
      <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 text-center animate-scale-up">
        {/* Warning Icon */}
        <div className="w-14 h-14 rounded-full bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400 flex items-center justify-center mx-auto mb-4">
          <Trash2 className="w-7 h-7 stroke-[2]" />
        </div>

        <h3 id="delete-title" className="font-heading text-base font-bold text-slate-900 dark:text-white mb-1.5">
          Delete Task?
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
          Are you sure you want to delete <strong className="text-slate-800 dark:text-slate-200">"{task.title}"</strong>?
          You can also undo this action right from the toast notification.
        </p>

        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={closeDeleteModal}
            className="flex-1 px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={confirmDeleteTask}
            className="flex-1 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-red-600 hover:bg-red-500 shadow-md shadow-red-500/20 transition-all active:scale-95"
          >
            Delete Task
          </button>
        </div>
      </div>
    </div>
  );
}
