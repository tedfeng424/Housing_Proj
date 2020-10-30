import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useCookies } from 'react-cookie';
import { AppThunk, RootState } from '../store';

interface User {
  name: string;
  email: string;
  imageUrl: string;
}

interface AuthState {
  user?: User;
}

const initialState: AuthState = {
  user: undefined,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = undefined;
    }
  },
});

// Export actions that were defined with createSlice
export const { setUser, removeUser } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;