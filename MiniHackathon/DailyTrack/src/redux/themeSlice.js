import { createSlice } from '@reduxjs/toolkit';

const THEME_STORAGE_KEY = 'devtrack_theme_v1';

const loadTheme = () => {
  try {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme === 'dark' || savedTheme === 'light') {
      return savedTheme;
    }
    return 'dark';
  } catch {
    return 'dark';
  }
};

const initialState = {
  mode: loadTheme(),
};


export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem(THEME_STORAGE_KEY, state.mode);
      } catch (e) {
        console.error('Failed to save theme to localStorage:', e);
      }
    },
    setTheme: (state, action) => {
      state.mode = action.payload;
      try {
        localStorage.setItem(THEME_STORAGE_KEY, state.mode);
      } catch (e) {
        console.error('Failed to save theme to localStorage:', e);
      }
    }
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;

export default themeSlice.reducer;
