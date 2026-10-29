import React from 'react';
import { useKanban } from '../context/KanbanContext';
import { Info, CheckCircle2, AlertTriangle, XCircle, X } from 'lucide-react';

const TOAST_ICONS = {
  info: <Info className="w-4 h-4 text-brand-500 shrink-0" />,
  success: <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />,
  warning: <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />,
  danger: <XCircle className="w-4 h-4 text-red-500 shrink-0" />,
};

export default function ToastContainer() {
  const { toasts, removeToast } = useKanban();

  if (toasts.length === 0) return null;

  return (
    <aside
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-[calc(100%-2.5rem)] pointer-events-none"
      aria-live="polite"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto relative flex items-start gap-3 p-3.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden animate-scale-up"
          role="alert"
        >
          {TOAST_ICONS[toast.type] || TOAST_ICONS.info}

          <div className="flex-1 text-xs">
            <h5 className="font-bold text-slate-900 dark:text-slate-100 mb-0.5">
              {toast.title}
            </h5>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              {toast.message}
            </p>

            {toast.action && (
              <button
                type="button"
                onClick={() => {
                  toast.action.onClick?.();
                  removeToast(toast.id);
                }}
                className="mt-1.5 text-xs font-bold text-brand-600 dark:text-brand-400 underline hover:text-brand-700"
              >
                {toast.action.label}
              </button>
            )}
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            aria-label="Dismiss toast"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </aside>
  );
}
