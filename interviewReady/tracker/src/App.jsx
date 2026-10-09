import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { INITIAL_QUESTIONS } from './data/initialQuestions';
import { Navbar } from './components/Navbar';
import { DashboardStats } from './components/DashboardStats';
import { FilterBar } from './components/FilterBar';
import { QuestionCard } from './components/QuestionCard';
import { QuestionModal } from './components/QuestionModal';
import { SolutionDrawer } from './components/SolutionDrawer';
import { EmptyState } from './components/EmptyState';

const LOCAL_STORAGE_KEY = 'interview_tracker_questions_v1';

export default function App() {
  const [questions, setQuestions] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load questions from LocalStorage:', e);
    }
    return INITIAL_QUESTIONS;
  });

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [selectedDifficulty, setSelectedDifficulty] = useState('ALL');

  // Modal / Drawer States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [activeSolutionQuestion, setActiveSolutionQuestion] = useState(null);

  // Auto-sync to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(questions));
    } catch (e) {
      console.error('Failed to save to LocalStorage:', e);
    }
  }, [questions]);

  // Status Cycle: Pending -> In Progress -> Completed -> Pending
  const handleToggleStatus = (id) => {
    setQuestions(prev => prev.map(q => {
      if (q.id === id) {
        let nextStatus = 'Pending';
        if (q.status === 'Pending') nextStatus = 'In Progress';
        else if (q.status === 'In Progress') nextStatus = 'Completed';
        else if (q.status === 'Completed') nextStatus = 'Pending';

        if (nextStatus === 'Completed') {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.8 }
          });
        }
        return { ...q, status: nextStatus };
      }
      return q;
    }));
  };

  // Add or Edit Question
  const handleSaveQuestion = (savedItem) => {
    setQuestions(prev => {
      const exists = prev.some(q => q.id === savedItem.id);
      if (exists) {
        return prev.map(q => q.id === savedItem.id ? savedItem : q);
      } else {
        return [savedItem, ...prev];
      }
    });
  };

  // Delete Question
  const handleDeleteQuestion = (id) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      setQuestions(prev => prev.filter(q => q.id !== id));
    }
  };

  // Reset to original Sheet 01 questions
  const handleResetData = () => {
    if (window.confirm('Reset all questions to default Sheet 01 prep set? Any custom edits will be restored.')) {
      setQuestions(INITIAL_QUESTIONS);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  };

  // Export JSON Backup
  const handleExportData = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(questions, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `interview_tracker_sheet01_${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import JSON Backup
  const handleImportData = (importedList) => {
    setQuestions(importedList);
    alert(`Successfully imported ${importedList.length} questions!`);
  };

  // Clear Active Filters
  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('ALL');
    setSelectedStatus('ALL');
    setSelectedDifficulty('ALL');
  };

  // Compute Filtered Questions
  const filteredQuestions = questions.filter(q => {
    // Search match
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      q.title.toLowerCase().includes(query) ||
      q.description.toLowerCase().includes(query) ||
      (q.notes && q.notes.toLowerCase().includes(query)) ||
      q.category.toLowerCase().includes(query);

    // Category match
    const matchesCategory = selectedCategory === 'ALL' || q.category === selectedCategory;

    // Status match
    const matchesStatus = selectedStatus === 'ALL' || q.status === selectedStatus;

    // Difficulty match
    const matchesDifficulty = selectedDifficulty === 'ALL' || q.difficulty === selectedDifficulty;

    return matchesSearch && matchesCategory && matchesStatus && matchesDifficulty;
  });

  const activeFilterCount = (searchQuery ? 1 : 0) + 
    (selectedCategory !== 'ALL' ? 1 : 0) + 
    (selectedStatus !== 'ALL' ? 1 : 0) + 
    (selectedDifficulty !== 'ALL' ? 1 : 0);

  const completedCount = questions.filter(q => q.status === 'Completed').length;

  return (
    <div className="app-container">
      
      {/* Top Navbar */}
      <Navbar 
        totalCount={questions.length}
        completedCount={completedCount}
        onOpenAddModal={() => {
          setEditingQuestion(null);
          setIsModalOpen(true);
        }}
        onResetData={handleResetData}
        onExportData={handleExportData}
        onImportData={handleImportData}
      />

      {/* KPI Dashboard Stats */}
      <DashboardStats questions={questions} />

      {/* Filter & Search Bar */}
      <FilterBar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        selectedDifficulty={selectedDifficulty}
        setSelectedDifficulty={setSelectedDifficulty}
        activeFilterCount={activeFilterCount}
        onClearFilters={handleClearFilters}
      />

      {/* Question Cards Grid */}
      {filteredQuestions.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.25rem',
          marginBottom: '3rem'
        }}>
          {filteredQuestions.map(q => (
            <QuestionCard 
              key={q.id}
              question={q}
              onToggleStatus={handleToggleStatus}
              onOpenSolution={(item) => setActiveSolutionQuestion(item)}
              onEdit={(item) => {
                setEditingQuestion(item);
                setIsModalOpen(true);
              }}
              onDelete={handleDeleteQuestion}
            />
          ))}
        </div>
      ) : (
        <EmptyState 
          isSearchActive={activeFilterCount > 0 || questions.length > 0}
          onClearFilters={handleClearFilters}
          onResetData={handleResetData}
        />
      )}

      {/* Question Add/Edit Modal */}
      <QuestionModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveQuestion}
        editingQuestion={editingQuestion}
      />

      {/* Solution View Drawer */}
      <SolutionDrawer 
        question={activeSolutionQuestion}
        onClose={() => setActiveSolutionQuestion(null)}
      />

      {/* Footer */}
      <footer style={{ textAlign: 'center', color: 'var(--text-dark)', fontSize: '0.8rem', margin: '2rem 0' }}>
        Interview Practice Tracker • Sheryians Coding School Sheet 01 • Built with React & Vite
      </footer>

    </div>
  );
}
