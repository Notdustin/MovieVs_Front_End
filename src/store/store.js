import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import battleReducer from './battleSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    battle: battleReducer,
  },
});
