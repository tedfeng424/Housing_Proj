import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counter from '../redux-example/counter/counterSlice';
import { auth, housing, housePost } from './slices/index';

export const store = configureStore({
  reducer: {
    counter, // TODO eventually delete (this is for the example)
    auth,
    housing,
    housePost,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
