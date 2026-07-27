import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addGoal, updateGoal } from '../redux/studySlice';
import { X, Save, PlusCircle, Sparkles, BookOpen, AlertCircle, FileText } from 'lucide-react';

const GoalModal = ({ isOpen, onClose, goalToEdit }) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Frontend');
  const [priority, setPriority] = useState('Medium');
  const [status, setStatus] = useState('In Progress');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (goalToEdit) {
      setTitle(goalToEdit.title || '');
      setCategory(goalToEdit.category || 'Frontend');
      setPriority(goalToEdit.priority || 'Medium');
      setStatus(goalToEdit.status || 'In Progress');
      setNotes(goalToEdit.notes || '');
    } else {
      setTitle('');
      setCategory('Frontend');
      setPriority('Medium');
      setStatus('In Progress');
      setNotes('');
    }
    setError('');
  }, [goalToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please enter a title for this task!');
      return;
    }

    if (goalToEdit) {
      dispatch(
        updateGoal({
          id: goalToEdit.id,
          title: title.trim(),
          category,
          priority,
          status,
          notes: notes.trim(),
        })
      );
    } else {
      dispatch(
        addGoal({
          id: Date.now().toString(),
          title: title.trim(),
          category,
          priority,
          status,
          notes: notes.trim(),
          createdAt: new Date().toISOString(),
        })
      );
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slateDark/80 backdrop-blur-md animate-fade-in">
      <div className="glass-card w-full max-w-lg rounded-3xl border border-slateBorder p-6 sm:p-8 shadow-2xl relative overflow-hidden animate-slide-up">
        
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brandIndigo via-brandPurple to-indigo-400" />

        <div className="flex items-center justify-between pb-4 mb-6 border-b border-slateBorder/60">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-500 font-bold">
              {goalToEdit ? <Save className="w-5 h-5" /> : <PlusCircle className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-lg font-bold text-textMain flex items-center gap-2">
                {goalToEdit ? 'Edit Task Details' : 'Create New Task'}
                <Sparkles className="w-4 h-4 text-purple-500" />
              </h3>
              <p className="text-xs text-textMuted">
                {goalToEdit ? 'Update your task details and notes below' : 'Add a new learning topic, project milestone, or daily task'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-textMuted hover:text-textMain p-1 rounded-lg hover:bg-slateBorder/40 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {error && (
            <div className="bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs px-3.5 py-2.5 rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-500" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-textMain uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
              Task / Topic Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => { setTitle(e.target.value); setError(''); }}
              placeholder="e.g., Build responsive e-commerce checkout page"
              className="w-full bg-inputBg border border-slateBorder rounded-xl px-4 py-2.5 text-sm text-textMain placeholder-textMuted focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-inner"
              autoFocus
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-textMain uppercase tracking-wider mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-inputBg border border-slateBorder rounded-xl px-3.5 py-2.5 text-sm text-textMain focus:outline-none focus:border-indigo-500 transition-all"
              >
                <option value="Frontend">Frontend / UI</option>
                <option value="Backend">Backend / API</option>
                <option value="Fullstack">Fullstack Dev</option>
                <option value="DSA">DSA & Algorithms</option>
                <option value="Design">UI/UX Design</option>
                <option value="General">General / Study</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-textMain uppercase tracking-wider mb-1.5">
                Priority Level
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full bg-inputBg border border-slateBorder rounded-xl px-3.5 py-2.5 text-sm text-textMain focus:outline-none focus:border-indigo-500 transition-all"
              >
                <option value="High">🔥 High Priority</option>
                <option value="Medium">⚡ Medium Priority</option>
                <option value="Low">🌱 Low Priority</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-textMain uppercase tracking-wider mb-1.5">
              Current Status
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['Planned', 'In Progress', 'Completed'].map((stat) => (
                <button
                  type="button"
                  key={stat}
                  onClick={() => setStatus(stat)}
                  className={`py-2 px-3 rounded-xl text-xs font-medium border transition-all flex items-center justify-center gap-1.5 ${
                    status === stat
                      ? stat === 'Completed'
                        ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-500 font-bold shadow-sm'
                        : stat === 'In Progress'
                        ? 'bg-amber-500/20 border-amber-500/60 text-amber-500 font-bold shadow-sm'
                        : 'bg-indigo-500/20 border-indigo-500/60 text-indigo-500 font-bold shadow-sm'
                      : 'bg-inputBg border-slateBorder text-textMuted hover:text-textMain'
                  }`}
                >
                  {stat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-textMain uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-indigo-500" />
              Notes & Reflections (Optional)
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add key takeaways, reminders, or links related to this task..."
              className="w-full bg-inputBg border border-slateBorder rounded-xl p-3 text-xs text-textMain placeholder-textMuted focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-inner resize-none"
            />
          </div>

          <div className="pt-4 border-t border-slateBorder/60 flex items-center justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-textMuted hover:text-textMain hover:bg-slateBorder/40 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 bg-gradient-to-r from-brandIndigo to-brandPurple hover:from-indigo-600 hover:to-purple-600 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-indigo-500/30 active:scale-95 transition-all"
            >
              <Save className="w-4 h-4 stroke-[2.5]" />
              <span>{goalToEdit ? 'Save Changes' : 'Create Task'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default GoalModal;
