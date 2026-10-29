import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import confetti from 'canvas-confetti';
import {
  loadTasksFromStorage,
  saveTasksToStorage,
  getInitialSeedTasks,
  THEME_KEY
} from '../utils/storage';

const KanbanContext = createContext();

const PRIORITY_WEIGHTS = {
  Urgent: 4,
  High: 3,
  Medium: 2,
  Low: 1
};

export function KanbanProvider({ children }) {
  // 1. Task State
  const [tasks, setTasks] = useState(() => loadTasksFromStorage());

  // 2. Filter & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState('order-asc');
  const [mobileTab, setMobileTab] = useState('todo');

  // 3. Theme State
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem(THEME_KEY) || 'dark';
  });

  // Apply theme to <html>
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  // 4. Toast Notifications State
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({ type = 'info', title, message, duration = 4000, action = null }) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newToast = { id, type, title, message, duration, action };
    setToasts(prev => [...prev, newToast]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // 5. Modals State
  const [taskModalState, setTaskModalState] = useState({
    isOpen: false,
    mode: 'create', // 'create' | 'edit'
    task: null,
    defaultStatus: 'todo'
  });

  const [deleteModalState, setDeleteModalState] = useState({
    isOpen: false,
    task: null
  });

  // Save to storage on tasks change
  useEffect(() => {
    saveTasksToStorage(tasks);
  }, [tasks]);

  // Confetti trigger
  const triggerConfetti = useCallback(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#8b5cf6', '#ec4899', '#10b981', '#38bdf8', '#fbbf24']
      });
    } catch (e) {
      // safe fallback
    }
  }, []);

  // Task Actions
  const addTask = useCallback((taskData) => {
    const status = taskData.status || 'todo';
    const colTasks = tasks.filter(t => t.status === status);

    const newTask = {
      id: `task-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      title: taskData.title.trim(),
      description: (taskData.description || '').trim(),
      priority: taskData.priority || 'Medium',
      status,
      dueDate: taskData.dueDate || '',
      createdAt: Date.now(),
      order: colTasks.length
    };

    setTasks(prev => [...prev, newTask]);
    addToast({
      type: 'success',
      title: 'Task Created',
      message: `"${newTask.title}" added to ${status === 'todo' ? 'To Do' : status === 'in-progress' ? 'In Progress' : 'Completed'}.`
    });
    return newTask;
  }, [tasks, addToast]);

  const updateTask = useCallback((id, updates) => {
    setTasks(prev =>
      prev.map(t => {
        if (t.id === id) {
          return {
            ...t,
            ...updates,
            title: updates.title !== undefined ? updates.title.trim() : t.title,
            description: updates.description !== undefined ? updates.description.trim() : t.description
          };
        }
        return t;
      })
    );
    addToast({
      type: 'success',
      title: 'Task Updated',
      message: `Changes were successfully saved.`
    });
  }, [addToast]);

  const deleteTask = useCallback((id) => {
    const taskToDelete = tasks.find(t => t.id === id);
    if (!taskToDelete) return;

    setTasks(prev => prev.filter(t => t.id !== id));

    // Offer 6-second undo toast
    addToast({
      type: 'warning',
      title: 'Task Deleted',
      message: `"${taskToDelete.title}" was removed.`,
      duration: 6000,
      action: {
        label: 'Undo',
        onClick: () => {
          setTasks(prev => [...prev, taskToDelete]);
          addToast({
            type: 'success',
            title: 'Restored',
            message: `Task "${taskToDelete.title}" has been restored.`
          });
        }
      }
    });
  }, [tasks, addToast]);

  const moveTask = useCallback((id, newStatus, targetIndex = null) => {
    setTasks(prev => {
      const task = prev.find(t => t.id === id);
      if (!task) return prev;

      const oldStatus = task.status;
      const otherTasks = prev.filter(t => t.id !== id);

      const targetColTasks = otherTasks
        .filter(t => t.status === newStatus)
        .sort((a, b) => a.order - b.order);

      const updatedTask = { ...task, status: newStatus };

      if (targetIndex === null || targetIndex >= targetColTasks.length) {
        targetColTasks.push(updatedTask);
      } else {
        targetColTasks.splice(Math.max(0, targetIndex), 0, updatedTask);
      }

      // Re-assign order numbers
      targetColTasks.forEach((t, i) => {
        t.order = i;
      });

      // Filter tasks from other columns
      const nonTargetTasks = otherTasks.filter(t => t.status !== newStatus);

      // Trigger celebration if newly completed
      if (newStatus === 'completed' && oldStatus !== 'completed') {
        triggerConfetti();
        addToast({
          type: 'success',
          title: 'Task Completed! 🎉',
          message: `"${task.title}" was marked as completed.`
        });
      } else if (newStatus !== oldStatus) {
        const labels = { 'todo': 'To Do', 'in-progress': 'In Progress', 'completed': 'Completed' };
        addToast({
          type: 'info',
          title: 'Status Updated',
          message: `"${task.title}" is now in ${labels[newStatus] || newStatus}.`
        });
      }

      return [...nonTargetTasks, ...targetColTasks];
    });
  }, [addToast, triggerConfetti]);

  const resetFilters = useCallback(() => {
    setSearchQuery('');
    setPriorityFilter('ALL');
    setSortBy('order-asc');
  }, []);

  const loadSampleData = useCallback(() => {
    const seed = getInitialSeedTasks();
    setTasks(seed);
    addToast({
      type: 'info',
      title: 'Board Reset',
      message: 'Demo tasks restored.'
    });
  }, [addToast]);

  const clearAllTasks = useCallback(() => {
    setTasks([]);
    addToast({
      type: 'warning',
      title: 'Board Cleared',
      message: 'All tasks have been removed.'
    });
  }, [addToast]);

  const importTasks = useCallback((newTasks) => {
    setTasks(newTasks);
    addToast({
      type: 'success',
      title: 'Import Successful',
      message: `Imported ${newTasks.length} tasks.`
    });
  }, [addToast]);

  // Modals helpers
  const openCreateModal = useCallback((defaultStatus = 'todo') => {
    setTaskModalState({
      isOpen: true,
      mode: 'create',
      task: null,
      defaultStatus
    });
  }, []);

  const openEditModal = useCallback((task) => {
    setTaskModalState({
      isOpen: true,
      mode: 'edit',
      task,
      defaultStatus: task.status
    });
  }, []);

  const closeTaskModal = useCallback(() => {
    setTaskModalState(prev => ({ ...prev, isOpen: false }));
  }, []);

  const openDeleteModal = useCallback((task) => {
    setDeleteModalState({
      isOpen: true,
      task
    });
  }, []);

  const closeDeleteModal = useCallback(() => {
    setDeleteModalState({ isOpen: false, task: null });
  }, []);

  const confirmDeleteTask = useCallback(() => {
    if (deleteModalState.task) {
      deleteTask(deleteModalState.task.id);
      closeDeleteModal();
    }
  }, [deleteModalState.task, deleteTask, closeDeleteModal]);

  // Computed Filtered Tasks
  const filteredTasks = useMemo(() => {
    let result = [...tasks];

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        t => t.title.toLowerCase().includes(q) || (t.description && t.description.toLowerCase().includes(q))
      );
    }

    // Priority filter
    if (priorityFilter !== 'ALL') {
      result = result.filter(t => t.priority === priorityFilter);
    }

    // Sort
    switch (sortBy) {
      case 'dueDate-asc':
        result.sort((a, b) => {
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate) - new Date(b.dueDate);
        });
        break;
      case 'dueDate-desc':
        result.sort((a, b) => {
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(b.dueDate) - new Date(a.dueDate);
        });
        break;
      case 'priority-desc':
        result.sort((a, b) => (PRIORITY_WEIGHTS[b.priority] || 0) - (PRIORITY_WEIGHTS[a.priority] || 0));
        break;
      case 'createdAt-desc':
        result.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
        break;
      case 'title-asc':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'order-asc':
      default:
        result.sort((a, b) => (a.order || 0) - (b.order || 0));
        break;
    }

    return result;
  }, [tasks, searchQuery, priorityFilter, sortBy]);

  // Overall statistics
  const stats = useMemo(() => {
    const total = tasks.length;
    const todo = tasks.filter(t => t.status === 'todo').length;
    const inProgress = tasks.filter(t => t.status === 'in-progress').length;
    const completed = tasks.filter(t => t.status === 'completed').length;
    const rate = total === 0 ? 0 : Math.round((completed / total) * 100);

    return { total, todo, inProgress, completed, rate };
  }, [tasks]);

  const isFilterActive = useMemo(() => {
    return Boolean(searchQuery.trim() || priorityFilter !== 'ALL' || sortBy !== 'order-asc');
  }, [searchQuery, priorityFilter, sortBy]);

  const value = {
    tasks,
    filteredTasks,
    stats,
    searchQuery,
    setSearchQuery,
    priorityFilter,
    setPriorityFilter,
    sortBy,
    setSortBy,
    mobileTab,
    setMobileTab,
    theme,
    toggleTheme,
    toasts,
    addToast,
    removeToast,
    taskModalState,
    openCreateModal,
    openEditModal,
    closeTaskModal,
    deleteModalState,
    openDeleteModal,
    closeDeleteModal,
    confirmDeleteTask,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
    resetFilters,
    isFilterActive,
    loadSampleData,
    clearAllTasks,
    importTasks,
    triggerConfetti
  };

  return <KanbanContext.Provider value={value}>{children}</KanbanContext.Provider>;
}

export function useKanban() {
  const context = useContext(KanbanContext);
  if (!context) {
    throw new Error('useKanban must be used within a KanbanProvider');
  }
  return context;
}
