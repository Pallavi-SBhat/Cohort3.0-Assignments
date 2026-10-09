import React, { useState } from 'react';
import { X, Copy, Check, ExternalLink, Code2, BookOpen } from 'lucide-react';

export function SolutionDrawer({ question, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!question) return null;

  const handleCopy = () => {
    if (question.solution) {
      navigator.clipboard.writeText(question.solution);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
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
      zIndex: 1100,
      padding: '1rem'
    }}>
      <div 
        className="glass-panel animate-fade-in"
        style={{
          width: '100%',
          maxWidth: '680px',
          maxHeight: '85vh',
          overflowY: 'auto',
          padding: '1.75rem',
          position: 'relative'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
          <div>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', background: 'rgba(99, 102, 241, 0.15)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                {question.category}
              </span>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--amber)', background: 'var(--amber-bg)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                {question.difficulty}
              </span>
            </div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff' }}>
              {question.title}
            </h2>
          </div>

          <button 
            onClick={onClose}
            style={{ background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Description Section */}
        <div style={{ marginBottom: '1.5rem', padding: '1rem', background: 'rgba(15, 23, 42, 0.6)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-glass)' }}>
          <h4 style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
            Problem Description / Scenario
          </h4>
          <p style={{ fontSize: '0.9rem', color: '#e2e8f0', lineHeight: 1.6 }}>
            {question.description}
          </p>
        </div>

        {/* Solution / Answer Code Section */}
        {question.solution ? (
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Code2 size={16} color="var(--primary)" />
                Solution & Code Implementation
              </h4>
              <button
                onClick={handleCopy}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: copied ? 'var(--emerald)' : 'var(--text-muted)',
                  border: '1px solid var(--border-glass)',
                  padding: '0.3rem 0.6rem',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer'
                }}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied ? 'Copied!' : 'Copy Code'}</span>
              </button>
            </div>

            <pre style={{
              background: '#090d16',
              padding: '1.25rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-glass)',
              color: '#38bdf8',
              fontSize: '0.85rem',
              lineHeight: 1.6,
              overflowX: 'auto',
              whiteSpace: 'pre-wrap'
            }}>
              <code>{question.solution}</code>
            </pre>
          </div>
        ) : (
          <div style={{ padding: '1rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: 'var(--radius-md)', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
            No code solution recorded for this question yet. Click Edit to add one.
          </div>
        )}

        {/* Key Takeaways & Notes */}
        {question.notes && (
          <div style={{ marginBottom: '1.5rem', padding: '1rem', background: 'rgba(99, 102, 241, 0.08)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <BookOpen size={15} />
              Key Interview Notes & Complexity
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>
              {question.notes}
            </p>
          </div>
        )}

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid var(--border-glass)' }}>
          {question.leetcodeUrl ? (
            <a 
              href={question.leetcodeUrl} 
              target="_blank" 
              rel="noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.85rem',
                color: 'var(--primary)',
                fontWeight: 600
              }}
            >
              <ExternalLink size={15} />
              <span>Open on External Site</span>
            </a>
          ) : <div />}

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              color: '#fff',
              padding: '0.5rem 1.1rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
