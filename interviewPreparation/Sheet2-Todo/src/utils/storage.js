/**
 * FlowBoard Kanban - LocalStorage & Seed Data Utilities
 */

export const STORAGE_KEY = 'flowboard_react_tasks_v1';
export const THEME_KEY = 'flowboard_react_theme_v1';

export const getInitialSeedTasks = () => {
  const today = new Date();
  const formatDate = (daysOffset) => {
    const d = new Date(today);
    d.setDate(d.getDate() + daysOffset);
    return d.toISOString().split('T')[0];
  };

  return [
    {
      id: 'task-seed-1',
      title: 'Architect Drag & Drop Interaction Engine',
      description: 'Implement HTML5 Drag and Drop API with visual drop placeholders and smooth drop zone cues.',
      priority: 'Urgent',
      status: 'todo',
      dueDate: formatDate(1),
      createdAt: Date.now() - 3600000 * 24 * 3,
      order: 0
    },
    {
      id: 'task-seed-2',
      title: 'Design Accessible Color Tokens & Dark Mode',
      description: 'Curate WCAG compliant color contrast ratios for Urgent, High, Medium, and Low priority badges in Tailwind.',
      priority: 'High',
      status: 'todo',
      dueDate: formatDate(3),
      createdAt: Date.now() - 3600000 * 24 * 2,
      order: 1
    },
    {
      id: 'task-seed-3',
      title: 'Build Search & Multi-criteria Filter Pipeline',
      description: 'Provide instant title search with keyword highlighting and combine with priority & status filters.',
      priority: 'Medium',
      status: 'in-progress',
      dueDate: formatDate(2),
      createdAt: Date.now() - 3600000 * 24 * 1.5,
      order: 0
    },
    {
      id: 'task-seed-4',
      title: 'Implement LocalStorage State Sync with Undo Stack',
      description: 'Persist state updates safely with JSON validation and provide 5-second undo toast on task removal.',
      priority: 'High',
      status: 'in-progress',
      dueDate: formatDate(4),
      createdAt: Date.now() - 3600000 * 24 * 1,
      order: 1
    },
    {
      id: 'task-seed-5',
      title: 'Setup Responsive Mobile Layout & Column Tabs',
      description: 'Ensure touch-friendly tap targets and segmented tab controls for smaller viewport widths.',
      priority: 'Medium',
      status: 'completed',
      dueDate: formatDate(-1),
      createdAt: Date.now() - 3600000 * 24 * 4,
      order: 0
    },
    {
      id: 'task-seed-6',
      title: 'Frontend Machine Coding Submission Walkthrough',
      description: 'Prepare video recording and feature checklist demonstrating all project criteria in React.',
      priority: 'Low',
      status: 'completed',
      dueDate: formatDate(0),
      createdAt: Date.now() - 3600000 * 24 * 5,
      order: 1
    }
  ];
};

export const loadTasksFromStorage = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const seed = getInitialSeedTasks();
      saveTasksToStorage(seed);
      return seed;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      throw new Error('Data is not an array');
    }
    return parsed;
  } catch (err) {
    console.warn('Failed to load tasks from localStorage, initializing seed:', err);
    const seed = getInitialSeedTasks();
    saveTasksToStorage(seed);
    return seed;
  }
};

export const saveTasksToStorage = (tasks) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (err) {
    console.error('Failed to save tasks to localStorage:', err);
  }
};

export const exportTasksAsJSON = (tasks) => {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(tasks, null, 2));
  const anchor = document.createElement('a');
  anchor.setAttribute("href", dataStr);
  anchor.setAttribute("download", `flowboard-react-tasks-${new Date().toISOString().split('T')[0]}.json`);
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
};

export const parseImportedJSON = (jsonString) => {
  const parsed = JSON.parse(jsonString);
  if (!Array.isArray(parsed)) {
    throw new Error('File must contain a valid JSON array of tasks.');
  }
  return parsed.map((item, idx) => ({
    id: item.id || `task-imported-${Date.now()}-${idx}`,
    title: String(item.title || 'Untitled Task').trim(),
    description: String(item.description || '').trim(),
    priority: ['Urgent', 'High', 'Medium', 'Low'].includes(item.priority) ? item.priority : 'Medium',
    status: ['todo', 'in-progress', 'completed'].includes(item.status) ? item.status : 'todo',
    dueDate: item.dueDate || '',
    createdAt: Number(item.createdAt) || Date.now(),
    order: Number(item.order) || idx
  }));
};
