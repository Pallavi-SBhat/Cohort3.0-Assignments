import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';

export function QuestionModal({ isOpen, onClose, onSave, editingQuestion }) {
  const [formData, setFormData] = useState({
    title: '',
    category: 'DSA',
    difficulty: 'Easy',
    status: 'Pending',
    description: '',
    solution: '',
    notes: '',
    leetcodeUrl: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingQuestion) {
      setFormData({
        title: editingQuestion.title || '',
        category: editingQuestion.category || 'DSA',
        difficulty: editingQuestion.difficulty || 'Easy',
        status: editingQuestion.status || 'Pending',
        description: editingQuestion.description || '',
        solution: editingQuestion.solution || '',
        notes: editingQuestion.notes || '',
        leetcodeUrl: editingQuestion.leetcodeUrl || ''
      });
    } else {
      setFormData({
        title: '',
        category: 'DSA',
        difficulty: 'Easy',
        status: 'Pending',
        description: '',
        solution: '',
        notes: '',
        leetcodeUrl: ''
      });
    }
    setErrors({});
  }, [editingQuestion, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.title.trim()) {
      errs.title = 'Title is required';
    }
    if (!formData.description.trim()) {
      errs.description = 'Description is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSave({
        ...formData,
        id: editingQuestion ? editingQuestion.id : `custom-${Date.now()}`
      });
      onClose();
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem'
    }}>
      <div 
        className="glass-panel animate-fade-in"
        style={{
          width: '100%',
          maxWidth: '560px',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '1.5rem',
          position: 'relative'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff' }}>
            {editingQuestion ? 'Edit Question' : 'Add New Question'}
          </h2>
          <button 
            onClick={onClose}
            style={{ background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          {/* Title */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
              Question Title *
            </label>
            <input 
              type="text" 
              placeholder="e.g. Reverse Linked List or Merge Conflict Scenario"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              style={{
                width: '100%',
                padding: '0.65rem 0.85rem',
                background: 'rgba(15, 23, 42, 0.8)',
                border: errors.title ? '1px solid var(--rose)' : '1px solid var(--border-glass)',
                borderRadius: 'var(--radius-md)',
                color: '#fff',
                fontSize: '0.9rem'
              }}
            />
            {errors.title && <span style={{ fontSize: '0.75rem', color: 'var(--rose)', marginTop: '0.2rem', display: 'block' }}>{errors.title}</span>}
          </div>

          {/* Category & Difficulty & Status */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.85rem' }}>
            
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem',
                  background: '#1e293b',
                  border: '1px solid var(--border-glass)',
                  borderRadius: 'var(--radius-md)',
                  color: '#fff',
                  fontSize: '0.85rem'
                }}
              >
                <option value="DSA">DSA (LeetCode)</option>
                <option value="Git">Git & GitHub</option>
                <option value="Technical">Full-Stack Technical</option>
                <option value="Machine Coding">Machine Coding</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                Difficulty
              </label>
              <select
                value={formData.difficulty}
                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem',
                  background: '#1e293b',
                  border: '1px solid var(--border-glass)',
                  borderRadius: 'var(--radius-md)',
                  color: '#fff',
                  fontSize: '0.85rem'
                }}
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem',
                  background: '#1e293b',
                  border: '1px solid var(--border-glass)',
                  borderRadius: 'var(--radius-md)',
                  color: '#fff',
                  fontSize: '0.85rem'
                }}
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

          </div>

          {/* Description */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
              Description / Problem Statement *
            </label>
            <textarea 
              rows={3}
              placeholder="Describe the problem, scenario, or question..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              style={{
                width: '100%',
                padding: '0.65rem 0.85rem',
                background: 'rgba(15, 23, 42, 0.8)',
                border: errors.description ? '1px solid var(--rose)' : '1px solid var(--border-glass)',
                borderRadius: 'var(--radius-md)',
                color: '#fff',
                fontSize: '0.85rem',
                resize: 'vertical'
              }}
            />
            {errors.description && <span style={{ fontSize: '0.75rem', color: 'var(--rose)', marginTop: '0.2rem', display: 'block' }}>{errors.description}</span>}
          </div>

          {/* Solution Code / Answer */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
              Solution Code / Answer Breakdown
            </label>
            <textarea 
              rows={4}
              placeholder="Paste solution code, CLI commands, or key architectural points..."
              value={formData.solution}
              onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
              style={{
                width: '100%',
                padding: '0.65rem 0.85rem',
                background: 'rgba(15, 23, 42, 0.8)',
                border: '1px solid var(--border-glass)',
                borderRadius: 'var(--radius-md)',
                color: '#fff',
                fontFamily: 'Fira Code, monospace',
                fontSize: '0.82rem',
                resize: 'vertical'
              }}
            />
          </div>

          {/* External Reference Link */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
              Reference URL (Optional)
            </label>
            <input 
              type="url" 
              placeholder="e.g. https://leetcode.com/problems/two-sum/"
              value={formData.leetcodeUrl}
              onChange={(e) => setFormData({ ...formData, leetcodeUrl: e.target.value })}
              style={{
                width: '100%',
                padding: '0.65rem 0.85rem',
                background: 'rgba(15, 23, 42, 0.8)',
                border: '1px solid var(--border-glass)',
                borderRadius: 'var(--radius-md)',
                color: '#fff',
                fontSize: '0.85rem'
              }}
            />
          </div>

          {/* Form Actions */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                color: 'var(--text-muted)',
                padding: '0.6rem 1.1rem',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.85rem',
                fontWeight: 500
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                background: 'linear-gradient(135deg, var(--primary), var(--primary-hover))',
                color: '#fff',
                padding: '0.6rem 1.25rem',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.85rem',
                fontWeight: 600,
                boxShadow: 'var(--shadow-glow)'
              }}
            >
              {editingQuestion ? 'Save Changes' : 'Add Question'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
