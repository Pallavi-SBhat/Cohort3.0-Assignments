import React from 'react';
import { SearchX, FolderPlus, RotateCcw } from 'lucide-react';

export function EmptyState({ isSearchActive, onClearFilters, onResetData }) {
  return (
    <div 
      className="glass-panel animate-fade-in"
      style={{
        padding: '3.5rem 1.5rem',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        marginTop: '1rem'
      }}
    >
      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        padding: '1.25rem',
        borderRadius: '999px',
        border: '1px solid var(--border-glass)'
      }}>
        {isSearchActive ? <SearchX size={36} color="var(--amber)" /> : <FolderPlus size={36} color="var(--primary)" />}
      </div>

      <div>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', marginBottom: '0.4rem' }}>
          {isSearchActive ? 'No matching questions found' : 'No questions in tracker'}
        </h3>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', maxWidth: '400px', margin: '0 auto' }}>
          {isSearchActive 
            ? 'Try adjusting your search criteria or clearing active filters to see all preparation tasks.' 
            : 'Get started by restoring the Sheet 01 question dataset or adding your custom interview questions.'}
        </p>
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
        {isSearchActive ? (
          <button
            onClick={onClearFilters}
            style={{
              background: 'linear-gradient(135deg, var(--primary), var(--primary-hover))',
              color: '#fff',
              padding: '0.65rem 1.25rem',
              borderRadius: 'var(--radius-md)',
              fontWeight: 600,
              fontSize: '0.85rem'
            }}
          >
            Clear Active Filters
          </button>
        ) : (
          <button
            onClick={onResetData}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'linear-gradient(135deg, var(--primary), var(--primary-hover))',
              color: '#fff',
              padding: '0.65rem 1.25rem',
              borderRadius: 'var(--radius-md)',
              fontWeight: 600,
              fontSize: '0.85rem'
            }}
          >
            <RotateCcw size={16} />
            <span>Load Sheet 01 Data</span>
          </button>
        )}
      </div>

    </div>
  );
}
