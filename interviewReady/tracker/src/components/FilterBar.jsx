import React from 'react';
import { Search, X, Filter } from 'lucide-react';

export function FilterBar({ 
  searchQuery, 
  setSearchQuery, 
  selectedCategory, 
  setSelectedCategory, 
  selectedStatus, 
  setSelectedStatus, 
  selectedDifficulty, 
  setSelectedDifficulty,
  activeFilterCount,
  onClearFilters
}) {
  const categories = [
    { id: 'ALL', label: 'All Categories' },
    { id: 'DSA', label: 'DSA (LeetCode)' },
    { id: 'Git', label: 'Git & GitHub' },
    { id: 'Technical', label: 'Full-Stack Technical' },
    { id: 'Machine Coding', label: 'Machine Coding' },
  ];

  const statuses = ['ALL', 'Pending', 'In Progress', 'Completed'];
  const difficulties = ['ALL', 'Easy', 'Medium', 'Hard'];

  const chipStyle = (isActive) => ({
    padding: '0.45rem 0.85rem',
    borderRadius: 'var(--radius-md)',
    fontSize: '0.85rem',
    fontWeight: isActive ? 600 : 500,
    background: isActive ? 'linear-gradient(135deg, var(--primary), var(--primary-hover))' : 'rgba(255, 255, 255, 0.05)',
    color: isActive ? '#fff' : 'var(--text-muted)',
    border: isActive ? '1px solid var(--primary)' : '1px solid var(--border-glass)',
    cursor: 'pointer',
    transition: 'var(--transition)',
    whiteSpace: 'nowrap'
  });

  return (
    <div className="glass-panel" style={{ padding: '1.25rem', marginBottom: '1.75rem' }}>
      
      {/* Top Row: Search Input & Dropdowns */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '1rem' }}>
        
        {/* Search Bar */}
        <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
          <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
          <input 
            type="text" 
            placeholder="Search questions by title, notes, keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '0.65rem 1rem 0.65rem 2.6rem',
              background: 'rgba(15, 23, 42, 0.7)',
              border: '1px solid var(--border-glass)',
              borderRadius: 'var(--radius-md)',
              color: '#fff',
              fontSize: '0.9rem',
              outline: 'none'
            }}
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'transparent', color: 'var(--text-muted)' }}
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Status Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>Status:</span>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            style={{
              background: 'rgba(15, 23, 42, 0.7)',
              border: '1px solid var(--border-glass)',
              borderRadius: 'var(--radius-md)',
              color: '#fff',
              padding: '0.6rem 0.8rem',
              fontSize: '0.85rem',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            {statuses.map(st => (
              <option key={st} value={st} style={{ background: '#1e293b' }}>
                {st === 'ALL' ? 'All Statuses' : st}
              </option>
            ))}
          </select>
        </div>

        {/* Difficulty Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>Difficulty:</span>
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            style={{
              background: 'rgba(15, 23, 42, 0.7)',
              border: '1px solid var(--border-glass)',
              borderRadius: 'var(--radius-md)',
              color: '#fff',
              padding: '0.6rem 0.8rem',
              fontSize: '0.85rem',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            {difficulties.map(diff => (
              <option key={diff} value={diff} style={{ background: '#1e293b' }}>
                {diff === 'ALL' ? 'All Difficulties' : diff}
              </option>
            ))}
          </select>
        </div>

        {/* Clear Filters Button */}
        {activeFilterCount > 0 && (
          <button
            onClick={onClearFilters}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'rgba(244, 63, 94, 0.15)',
              color: 'var(--rose)',
              border: '1px solid rgba(244, 63, 94, 0.3)',
              padding: '0.55rem 0.85rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <X size={14} />
            <span>Clear Filters ({activeFilterCount})</span>
          </button>
        )}

      </div>

      {/* Bottom Row: Category Chips */}
      <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.2rem' }}>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            style={chipStyle(selectedCategory === cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

    </div>
  );
}
