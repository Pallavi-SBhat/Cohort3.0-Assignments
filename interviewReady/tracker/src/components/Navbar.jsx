import React, { useRef } from 'react';
import { 
  Sparkles, 
  RotateCcw, 
  Download, 
  Upload, 
  Plus, 
  CheckCircle2, 
  BookOpen
} from 'lucide-react';

export function Navbar({ 
  totalCount, 
  completedCount, 
  onOpenAddModal, 
  onResetData, 
  onExportData, 
  onImportData 
}) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const json = JSON.parse(event.target.result);
          if (Array.isArray(json)) {
            onImportData(json);
          } else {
            alert('Invalid file format. Expected a JSON array of questions.');
          }
        } catch (err) {
          alert('Failed to parse JSON file.');
        }
      };
      reader.readAsText(file);
    }
  };

  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <header className="glass-panel" style={{ padding: '1.25rem 1.75rem', marginBottom: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        
        {/* Brand & Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            background: 'linear-gradient(135deg, var(--primary), var(--purple))',
            padding: '0.75rem',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-glow)'
          }}>
            <Sparkles size={24} color="#fff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h1 style={{ fontSize: '1.4rem', fontWeight: 800, tracking: '-0.02em', background: 'linear-gradient(to right, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Interview Tracker
              </h1>
              <span style={{ 
                fontSize: '0.75rem', 
                fontWeight: 700, 
                padding: '0.2rem 0.6rem', 
                borderRadius: '999px', 
                background: 'rgba(99, 102, 241, 0.15)', 
                color: 'var(--primary)',
                border: '1px solid rgba(99, 102, 241, 0.3)'
              }}>
                Sheet 01
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Sheryians Coding School • Weekly Interview Prep Dashboard
            </p>
          </div>
        </div>

        {/* Global Progress pill */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          background: 'rgba(15, 23, 42, 0.6)',
          padding: '0.5rem 1rem',
          borderRadius: '999px',
          border: '1px solid var(--border-glass)'
        }}>
          <CheckCircle2 size={18} color="var(--emerald)" />
          <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>
            {completedCount} / {totalCount} Completed ({progressPercent}%)
          </span>
          <div style={{
            width: '60px',
            height: '6px',
            background: '#334155',
            borderRadius: '3px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${progressPercent}%`,
              height: '100%',
              background: 'linear-gradient(90deg, var(--emerald), var(--cyan))',
              transition: 'var(--transition)'
            }} />
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
          <button 
            onClick={onOpenAddModal}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'linear-gradient(135deg, var(--primary), var(--primary-hover))',
              color: '#fff',
              padding: '0.6rem 1.1rem',
              borderRadius: 'var(--radius-md)',
              fontWeight: 600,
              fontSize: '0.85rem',
              boxShadow: '0 4px 14px rgba(99, 102, 241, 0.4)',
              transition: 'var(--transition)'
            }}
          >
            <Plus size={16} />
            <span>Add Question</span>
          </button>

          <button 
            onClick={onResetData}
            title="Reset to original Sheet 01 questions"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'rgba(255, 255, 255, 0.05)',
              color: 'var(--text-muted)',
              border: '1px solid var(--border-glass)',
              padding: '0.6rem 0.9rem',
              borderRadius: 'var(--radius-md)',
              fontWeight: 500,
              fontSize: '0.85rem',
              transition: 'var(--transition)'
            }}
          >
            <RotateCcw size={16} />
            <span className="hide-mobile">Reset Sheet 01</span>
          </button>

          <button 
            onClick={onExportData}
            title="Export JSON Backup"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'rgba(255, 255, 255, 0.05)',
              color: 'var(--text-muted)',
              border: '1px solid var(--border-glass)',
              padding: '0.6rem 0.8rem',
              borderRadius: 'var(--radius-md)',
              fontWeight: 500,
              fontSize: '0.85rem'
            }}
          >
            <Download size={16} />
          </button>

          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept=".json" 
            style={{ display: 'none' }} 
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            title="Import JSON Backup"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'rgba(255, 255, 255, 0.05)',
              color: 'var(--text-muted)',
              border: '1px solid var(--border-glass)',
              padding: '0.6rem 0.8rem',
              borderRadius: 'var(--radius-md)',
              fontWeight: 500,
              fontSize: '0.85rem'
            }}
          >
            <Upload size={16} />
          </button>
        </div>

      </div>
    </header>
  );
}
