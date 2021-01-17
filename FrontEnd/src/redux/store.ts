import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counter from '../redux-example/counter/counterSlice';
import { auth, housing, filter } from './slices/index';

export const store = configureStore({
  reducer: {
    counter, // TODO eventually delete (this is for the example)
    auth,
    housing,
    filter,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
