import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'universal-cookie';
import { AppThunk, RootState } from '../store'; // TODO
import { userLogIn, userLogOut } from '../../apis/index';

const cookies = new Cookies();

interface User {
  name: string;
  email: string;
  imageUrl: string;
  token: string;
}

interface AuthState {
  user?: User;
}

const initialState: AuthState = {
  user: cookies.get<User>('user'),
  // TODO temp for fake logged in user: {
  //   name: 'Amit Bar',
  //   email: "'noneofyobusiness@gmail.com",
  //   imageUrl: 'image',
  //   token: 'fake',
  // },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | undefined>) => {
      console.log('setting user');
      state.user = action.payload;
      if (action.payload) {
        cookies.set('user', action.payload, {
          maxAge: 4320, // expires  72 hours after login
        });
      } else {
        cookies.remove('user');
      }
    },
  },
});

// Export actions that were defined with createSlice
export const { setUser } = authSlice.actions;

// Thunks here
export const login = (name: string, email: string): AppThunk => async (
  dispatch,
) => {
  console.log('logging in');
  // login api function call here to the backend
  const response = await userLogIn(name, email);
  if (response) {
    dispatch(
      setUser({
        name: response.user,
        email: response.email,
        imageUrl: response.imageUrl,
        token: response.access_token,
      }),
    );
  }
};

// TODO this doesn't seem to be able to handle when the cookie times out
export const logout = (): AppThunk => async (dispatch, getState) => {
  console.log('logging out');
  // remove cookies here, which will automatically update the user
  const token = getState().auth.user?.token;
  if (!token) return;

  const response = await userLogOut(token);
  if (response) {
    console.log('dispatching the logout');
    dispatch(setUser(undefined)); // TODO not sure if this is needed
  }
};

// Selects here
const selectUser = (state: RootState) => state.auth.user;

export { selectUser };

// Export everything
export default authSlice.reducer;
