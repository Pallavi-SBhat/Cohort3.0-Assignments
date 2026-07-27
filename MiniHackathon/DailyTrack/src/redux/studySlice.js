import { createSlice } from '@reduxjs/toolkit';


const initialGoals = [
  {
    id: '1',
    title: 'Build Responsive E-Commerce Dashboard in React',
    category: 'Frontend',
    priority: 'High',
    status: 'Completed',
    notes: 'Designed reusable card components, responsive grid layouts, and custom glassmorphism dark theme.',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: '2',
    title: 'Implement JWT Authentication & Protected Routes',
    category: 'Backend',
    priority: 'High',
    status: 'In Progress',
    notes: 'Setting up secure password hashing with bcrypt and token validation in Express middleware.',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '3',
    title: 'Practice Sliding Window & Two-Pointer Algorithms',
    category: 'DSA',
    priority: 'Medium',
    status: 'Completed',
    notes: 'Solved 5 medium problems focusing on string manipulation and array optimization.',
    createdAt: new Date(Date.now() - 43200000).toISOString(),
  },
  {
    id: '4',
    title: 'Optimize Web Accessibility & Run Lighthouse Audit',
    category: 'General',
    priority: 'Low',
    status: 'Planned',
    notes: 'Ensure all interactive buttons have proper ARIA labels and keyboard navigation support.',
    createdAt: new Date().toISOString(),
  }
];

const initialState = {
  goals: initialGoals,
  filterStatus: 'All', 
  searchQuery: '',
};


export const studySlice = createSlice({
  name: 'study',
  initialState,
  reducers: {
   
    addGoal: (state, action) => {
      state.goals.unshift(action.payload);
    },

    updateGoal: (state, action) => {
      const { id, title, category, priority, status, notes } = action.payload;
      const existingGoal = state.goals.find((goal) => goal.id === id);
      if (existingGoal) {
        existingGoal.title = title;
        existingGoal.category = category;
        existingGoal.priority = priority;
        existingGoal.status = status;
        existingGoal.notes = notes;
      }
    },

   
    deleteGoal: (state, action) => {
      const goalId = action.payload;
      state.goals = state.goals.filter((goal) => goal.id !== goalId);
    },

    toggleGoalStatus: (state, action) => {
      const goalId = action.payload;
      const goal = state.goals.find((g) => g.id === goalId);
      if (goal) {
        if (goal.status === 'Completed') {
          goal.status = 'In Progress';
        } else {
          goal.status = 'Completed';
        }
      }
    },

  
    setFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },

    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },

    clearCompletedGoals: (state) => {
      state.goals = state.goals.filter((goal) => goal.status !== 'Completed');
    },

    loadStateFromStorage: (state, action) => {
      if (action.payload && Array.isArray(action.payload.goals)) {
        state.goals = action.payload.goals;
      }
    }
  },
});

export const {
  addGoal,
  updateGoal,
  deleteGoal,
  toggleGoalStatus,
  setFilterStatus,
  setSearchQuery,
  clearCompletedGoals,
  loadStateFromStorage,
} = studySlice.actions;

export default studySlice.reducer;
