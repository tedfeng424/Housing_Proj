import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counter from '../features/counter/counterSlice';
import { auth, housing } from './slices/index';

export const store = configureStore({
  reducer: {
    counter,
    auth,
    housing,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
