import { configureStore } from '@reduxjs/toolkit';
import studyReducer from './studySlice';
import authReducer from './authSlice';
import themeReducer from './themeSlice';

const LOCAL_STORAGE_KEY = 'devtrack_redux_state_v1';


const loadFromStorage = () => {
  try {
    const serializedState = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (serializedState === null) {
      return undefined;
    }
    const parsedState = JSON.parse(serializedState);
    return {
      study: parsedState,
    };
  } catch (error) {
    console.error('Failed to load state from localStorage:', error);
    return undefined;
  }
};

const saveToStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state.study);
    localStorage.setItem(LOCAL_STORAGE_KEY, serializedState);
  } catch (error) {
    console.error('Failed to save state to localStorage:', error);
  }
};


export const store = configureStore({
  reducer: {
    study: studyReducer,
    auth: authReducer,
    theme: themeReducer,
  },
  preloadedState: loadFromStorage(),
});

store.subscribe(() => {
  saveToStorage(store.getState());
});

export default store;
