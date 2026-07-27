import { createSlice } from '@reduxjs/toolkit';

const USERS_STORAGE_KEY = 'devtrack_users_v1';
const CURRENT_USER_KEY = 'devtrack_current_user_v1';

const loadUsers = () => {
  try {
    const data = localStorage.getItem(USERS_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const loadCurrentUser = () => {
  try {
    const data = localStorage.getItem(CURRENT_USER_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

const initialState = {
  users: loadUsers(),
  currentUser: loadCurrentUser(),
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    registerUser: (state, action) => {
      const { name, email, password } = action.payload;
      
      const existingUser = state.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
      if (existingUser) {
        state.error = 'An account with this email address already exists!';
        return;
      }

      const newUser = {
        id: 'user_' + Date.now(),
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password,
        createdAt: new Date().toISOString(),
      };

      state.users.push(newUser);
      state.currentUser = newUser;
      state.error = null;

      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(state.users));
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
    },

    loginUser: (state, action) => {
      const { email, password } = action.payload;
      
      const user = state.users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );

      if (!user) {
        state.error = 'Invalid email or password. Please register an account first if you haven\'t already!';
        return;
      }

      state.currentUser = user;
      state.error = null;
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    },

    logoutUser: (state) => {
      state.currentUser = null;
      state.error = null;
      localStorage.removeItem(CURRENT_USER_KEY);
    },

    clearAuthError: (state) => {
      state.error = null;
    }
  },
});

export const { registerUser, loginUser, logoutUser, clearAuthError } = authSlice.actions;

export default authSlice.reducer;
