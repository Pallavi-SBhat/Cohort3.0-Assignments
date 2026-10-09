import React from 'react';
import { 
  Code2, 
  GitBranch, 
  Terminal, 
  Layout, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  Award
} from 'lucide-react';

export function DashboardStats({ questions }) {
  const total = questions.length;
  const completedTotal = questions.filter(q => q.status === 'Completed').length;
  const inProgressTotal = questions.filter(q => q.status === 'In Progress').length;
  const pendingTotal = questions.filter(q => q.status === 'Pending').length;

  const getCategoryStats = (cat) => {
    const list = questions.filter(q => q.category === cat);
    const count = list.length;
    const done = list.filter(q => q.status === 'Completed').length;
    const percent = count > 0 ? Math.round((done / count) * 100) : 0;
    return { count, done, percent };
  };

  const dsaStats = getCategoryStats('DSA');
  const gitStats = getCategoryStats('Git');
  const techStats = getCategoryStats('Technical');
  const mcStats = getCategoryStats('Machine Coding');

  const overallPercent = total > 0 ? Math.round((completedTotal / total) * 100) : 0;

  const cardStyle = {
    background: 'var(--bg-glass)',
    backdropFilter: 'blur(16px)',
    border: '1px solid var(--border-glass)',
    borderRadius: 'var(--radius-lg)',
    padding: '1.25rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    transition: 'var(--transition)',
    position: 'relative',
    overflow: 'hidden'
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: '1.25rem',
      marginBottom: '2rem'
    }}>

      {/* Card 1: Overall Progress */}
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Overall Progress
            </span>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '0.2rem', color: '#fff' }}>
              {overallPercent}%
            </div>
          </div>
          <div style={{ background: 'rgba(99, 102, 241, 0.15)', padding: '0.6rem', borderRadius: 'var(--radius-md)' }}>
            <TrendingUp size={22} color="var(--primary)" />
          </div>
        </div>
        
        <div style={{ marginTop: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
            <span>{completedTotal} of {total} items done</span>
            <span>{inProgressTotal} in progress</span>
          </div>
          <div style={{ height: '8px', background: '#334155', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{
              width: `${overallPercent}%`,
              height: '100%',
              background: 'linear-gradient(90deg, var(--primary), var(--cyan))',
              transition: 'var(--transition)'
            }} />
          </div>
        </div>
      </div>

      {/* Card 2: DSA Problems */}
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--cyan)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              DSA (LeetCode)
            </span>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '0.2rem', color: '#fff' }}>
              {dsaStats.done} / {dsaStats.count}
            </div>
          </div>
          <div style={{ background: 'var(--cyan-bg)', padding: '0.6rem', borderRadius: 'var(--radius-md)' }}>
            <Code2 size={22} color="var(--cyan)" />
          </div>
        </div>
        <div style={{ marginTop: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
            <span>Completion Rate</span>
            <span>{dsaStats.percent}%</span>
          </div>
          <div style={{ height: '8px', background: '#334155', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{
              width: `${dsaStats.percent}%`,
              height: '100%',
              background: 'var(--cyan)',
              transition: 'var(--transition)'
            }} />
          </div>
        </div>
      </div>

      {/* Card 3: Git & GitHub */}
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--purple)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Git & GitHub
            </span>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '0.2rem', color: '#fff' }}>
              {gitStats.done} / {gitStats.count}
            </div>
          </div>
          <div style={{ background: 'var(--purple-bg)', padding: '0.6rem', borderRadius: 'var(--radius-md)' }}>
            <GitBranch size={22} color="var(--purple)" />
          </div>
        </div>
        <div style={{ marginTop: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
            <span>Completion Rate</span>
            <span>{gitStats.percent}%</span>
          </div>
          <div style={{ height: '8px', background: '#334155', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{
              width: `${gitStats.percent}%`,
              height: '100%',
              background: 'var(--purple)',
              transition: 'var(--transition)'
            }} />
          </div>
        </div>
      </div>

      {/* Card 4: Technical & Machine Coding */}
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--emerald)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Technical & Frontend
            </span>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '0.2rem', color: '#fff' }}>
              {techStats.done + mcStats.done} / {techStats.count + mcStats.count}
            </div>
          </div>
          <div style={{ background: 'var(--emerald-bg)', padding: '0.6rem', borderRadius: 'var(--radius-md)' }}>
            <Terminal size={22} color="var(--emerald)" />
          </div>
        </div>
        <div style={{ marginTop: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
            <span>Full-Stack & Machine Coding</span>
            <span>{Math.round(((techStats.done + mcStats.done) / Math.max(1, techStats.count + mcStats.count)) * 100)}%</span>
          </div>
          <div style={{ height: '8px', background: '#334155', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{
              width: `${Math.round(((techStats.done + mcStats.done) / Math.max(1, techStats.count + mcStats.count)) * 100)}%`,
              height: '100%',
              background: 'var(--emerald)',
              transition: 'var(--transition)'
            }} />
          </div>
        </div>
      </div>

    </div>
  );
}
