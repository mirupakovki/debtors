import { configureStore } from '@reduxjs/toolkit';
import debtsSlice from './slices/debtsSlice';

export const store = configureStore({
  reducer: {
    debts: debtsSlice,
  },
});