import React from 'react';
import { 
  Code2, 
  GitBranch, 
  Terminal, 
  Layout, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  FileText,
  Edit2,
  Trash2
} from 'lucide-react';

export function QuestionCard({ 
  question, 
  onToggleStatus, 
  onOpenSolution, 
  onEdit, 
  onDelete 
}) {
  const getCategoryTheme = (cat) => {
    switch (cat) {
      case 'DSA':
        return { icon: Code2, color: 'var(--cyan)', bg: 'var(--cyan-bg)' };
      case 'Git':
        return { icon: GitBranch, color: 'var(--purple)', bg: 'var(--purple-bg)' };
      case 'Technical':
        return { icon: Terminal, color: 'var(--primary)', bg: 'rgba(99, 102, 241, 0.15)' };
      case 'Machine Coding':
        return { icon: Layout, color: 'var(--emerald)', bg: 'var(--emerald-bg)' };
      default:
        return { icon: FileText, color: 'var(--text-muted)', bg: 'rgba(255, 255, 255, 0.05)' };
    }
  };

  const getDifficultyColor = (diff) => {
    switch (diff) {
      case 'Easy':
        return { color: 'var(--emerald)', bg: 'var(--emerald-bg)' };
      case 'Medium':
        return { color: 'var(--amber)', bg: 'var(--amber-bg)' };
      case 'Hard':
        return { color: 'var(--rose)', bg: 'var(--rose-bg)' };
      default:
        return { color: 'var(--text-muted)', bg: 'rgba(255, 255, 255, 0.05)' };
    }
  };

  const getStatusBadge = (st) => {
    switch (st) {
      case 'Completed':
        return { icon: CheckCircle2, text: 'Completed', color: 'var(--emerald)', bg: 'var(--emerald-bg)', border: 'rgba(16, 185, 129, 0.3)' };
      case 'In Progress':
        return { icon: Clock, text: 'In Progress', color: 'var(--amber)', bg: 'var(--amber-bg)', border: 'rgba(245, 158, 11, 0.3)' };
      default:
        return { icon: AlertCircle, text: 'Pending', color: 'var(--text-muted)', bg: 'rgba(255, 255, 255, 0.05)', border: 'var(--border-glass)' };
    }
  };

  const catTheme = getCategoryTheme(question.category);
  const diffTheme = getDifficultyColor(question.difficulty);
  const statusBadge = getStatusBadge(question.status);
  const CatIcon = catTheme.icon;
  const StatusIcon = statusBadge.icon;

  return (
    <div 
      className="glass-panel animate-fade-in" 
      style={{
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'var(--transition)',
        position: 'relative',
        background: question.status === 'Completed' ? 'rgba(19, 27, 46, 0.9)' : 'var(--bg-glass)'
      }}
    >
      <div>
        {/* Card Header: Category & Badges */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', gap: '0.5rem', flexWrap: 'wrap' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.35rem', 
              fontSize: '0.75rem', 
              fontWeight: 700, 
              padding: '0.25rem 0.6rem', 
              borderRadius: 'var(--radius-sm)', 
              background: catTheme.bg, 
              color: catTheme.color 
            }}>
              <CatIcon size={13} />
              {question.category}
            </span>

            <span style={{ 
              fontSize: '0.75rem', 
              fontWeight: 700, 
              padding: '0.25rem 0.6rem', 
              borderRadius: 'var(--radius-sm)', 
              background: diffTheme.bg, 
              color: diffTheme.color 
            }}>
              {question.difficulty}
            </span>
          </div>

          {/* Quick Status Toggle Button */}
          <button
            onClick={() => onToggleStatus(question.id)}
            title="Click to cycle status: Pending -> In Progress -> Completed"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              fontSize: '0.75rem',
              fontWeight: 600,
              padding: '0.25rem 0.65rem',
              borderRadius: '999px',
              background: statusBadge.bg,
              color: statusBadge.color,
              border: `1px solid ${statusBadge.border}`,
              cursor: 'pointer',
              transition: 'var(--transition)'
            }}
          >
            <StatusIcon size={13} />
            <span>{statusBadge.text}</span>
          </button>

        </div>

        {/* Title & Description */}
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.5rem', color: question.status === 'Completed' ? '#94a3b8' : '#fff' }}>
          {question.title}
        </h3>

        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem', lineClamp: 2, WebkitLineClamp: 2, display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {question.description}
        </p>
      </div>

      {/* Card Footer: Action Buttons */}
      <div style={{
        paddingTop: '0.85rem',
        borderTop: '1px solid var(--border-glass)',
        display: 'flex',
        justify: 'space-between',
        alignItems: 'center',
        gap: '0.5rem',
        flexWrap: 'wrap'
      }}>
        
        {/* Solution View Button */}
        <button
          onClick={() => onOpenSolution(question)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'rgba(99, 102, 241, 0.12)',
            color: 'var(--primary)',
            border: '1px solid rgba(99, 102, 241, 0.25)',
            padding: '0.45rem 0.8rem',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.8rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'var(--transition)'
          }}
        >
          <FileText size={14} />
          <span>View Solution</span>
        </button>

        {/* External Link or Extra Tools */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          {question.leetcodeUrl && (
            <a 
              href={question.leetcodeUrl} 
              target="_blank" 
              rel="noreferrer"
              title="Open LeetCode Problem"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '0.45rem',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(255, 255, 255, 0.05)',
                color: 'var(--text-muted)',
                border: '1px solid var(--border-glass)'
              }}
            >
              <ExternalLink size={14} />
            </a>
          )}

          <button
            onClick={() => onEdit(question)}
            title="Edit Question"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '0.45rem',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(255, 255, 255, 0.05)',
              color: 'var(--text-muted)',
              border: '1px solid var(--border-glass)',
              cursor: 'pointer'
            }}
          >
            <Edit2 size={14} />
          </button>

          <button
            onClick={() => onDelete(question.id)}
            title="Delete Question"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '0.45rem',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(244, 63, 94, 0.1)',
              color: 'var(--rose)',
              border: '1px solid rgba(244, 63, 94, 0.2)',
              cursor: 'pointer'
            }}
          >
            <Trash2 size={14} />
          </button>
        </div>

      </div>

    </div>
  );
}
