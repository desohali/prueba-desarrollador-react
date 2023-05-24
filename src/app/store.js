import { configureStore } from '@reduxjs/toolkit';
import tareasReducer from '../features/tareasSlice';

export const store = configureStore({
  reducer: {
    tareas: tareasReducer,
  },
});