import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import journalReducer from './journalSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    journal: journalReducer,
  },
});
