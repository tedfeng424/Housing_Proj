import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../store'; // TODO

interface User {
  name: string;
  email: string;
  imageUrl: string;
}

interface AuthState {
  user?: User;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  user: undefined,
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | undefined>) => {
      state.user = action.payload;
    },
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
  },
});

// Export actions that were defined with createSlice
export const { setUser, setIsLoggedIn } = authSlice.actions;

// Thunks here
export const login = (
  token: string,
  /* TODO temporary, delete when api is built */ user: User,
): AppThunk => async (dispatch) => {
  // TODO login api function call here to the backend
  // const response = await apiToLoginFunction(token)
  const response = { user };
  dispatch(setUser(response.user));
  dispatch(setIsLoggedIn(true));
};

export const logout = (): AppThunk => async (dispatch) => {
  // remove cookies here, which will automatically update the user. then set isLoggedIn
  dispatch(setUser(undefined)); // TODO not sure if this is needed
  dispatch(setIsLoggedIn(false));
};

// Selects here
const selectUser = (state: RootState) => state.auth.user;
const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;

export { selectUser, selectIsLoggedIn };

// Export everything
export default authSlice.reducer;
