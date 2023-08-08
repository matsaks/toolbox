import { configureStore } from '@reduxjs/toolkit'
import AdFiltersReducer from "./AdFiltersReducer";
import darkModeReducer from './darkModeSlice';

export const store = configureStore({
  reducer: {
    AdFilters: AdFiltersReducer,
    darkMode: darkModeReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch