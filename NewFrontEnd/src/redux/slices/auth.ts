import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../store'; // TODO
import { userLogIn, userLogOut } from '../../apis/index';

interface User {
  name: string;
  email: string;
  imageUrl: string;
}

interface AuthState {
  user?: User;
  isLoggedIn: boolean;
  token: string;
}

const initialState: AuthState = {
  user: undefined,
  isLoggedIn: false,
  token: '',
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
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

// Export actions that were defined with createSlice
export const { setUser, setIsLoggedIn, setToken } = authSlice.actions;

// Thunks here
export const login = (userInfo: string): AppThunk => async (dispatch) => {
  // login api function call here to the backend
  const response: any = await userLogIn(userInfo);
  dispatch(
    setUser(
      response
        ? {
            name: response['user'],
            email: response['email'],
            imageUrl: response['imageUrl'],
          }
        : undefined,
    ),
  );
  if (response !== undefined) {
    dispatch(setIsLoggedIn(true));
    dispatch(setToken(response['access_token']));
  }
};

export const logout = (userInfo: string): AppThunk => async (dispatch) => {
  // remove cookies here, which will automatically update the user. then set isLoggedIn
  console.log(userInfo);
  const response: any = await userLogOut(userInfo);
  if (response !== undefined) {
    dispatch(setUser(undefined)); // TODO not sure if this is needed
    dispatch(setIsLoggedIn(false));
  }
};

// Selects here
const selectUser = (state: RootState) => state.auth.user;
const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
const selectToken = (state: RootState) => state.auth.token;

export { selectUser, selectIsLoggedIn, selectToken };

// Export everything
export default authSlice.reducer;
