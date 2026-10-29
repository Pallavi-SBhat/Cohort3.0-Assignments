import React, { useEffect } from 'react';
import { KanbanProvider, useKanban } from './context/KanbanContext';
import Header from './components/Header';
import Toolbar from './components/Toolbar';
import MobileTabs from './components/MobileTabs';
import KanbanBoard from './components/KanbanBoard';
import TaskModal from './components/TaskModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import ToastContainer from './components/ToastContainer';
import Footer from './components/Footer';

function MainLayout() {
  const { openCreateModal, taskModalState, deleteModalState } = useKanban();

  // Global Keyboard shortcut 'N' for new task
  useEffect(() => {
    function handleKeyDown(e) {
      if ((e.key === 'n' || e.key === 'N') && !taskModalState.isOpen && !deleteModalState.isOpen) {
        const tag = document.activeElement?.tagName?.toLowerCase();
        if (tag !== 'input' && tag !== 'textarea') {
          e.preventDefault();
          openCreateModal('todo');
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [openCreateModal, taskModalState.isOpen, deleteModalState.isOpen]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Toolbar />
      <MobileTabs />
      <KanbanBoard />
      <Footer />

      {/* Overlays & Portals */}
      <TaskModal />
      <DeleteConfirmModal />
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <KanbanProvider>
      <MainLayout />
    </KanbanProvider>
  );
}
