import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'universal-cookie';
import { AppThunk, RootState } from '../store'; // TODO
import { userLogIn, userLogOut } from '../../apis/index';
import { User } from '../../assets/models/User';

const cookies = new Cookies();

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
      state.user = action.payload;
      if (action.payload) {
        cookies.set('user', action.payload, {
          // TODO should probably set this from the backend as well (similar to access_token)
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
  const response = await userLogIn(name, email);
  if (response) {
    dispatch(
      setUser({
        name: response.name,
        email: response.email,
        token: response.token,
      }),
    );
  }
};

// TODO this doesn't seem to be able to handle when the cookie times out
export const logout = (): AppThunk => async (dispatch, getState) => {
  // remove cookies here, which will automatically update the user
  const token = getState().auth.user?.token;
  if (!token) return; // TODO doesn't work well anymore. I think it's cause we changed the backend

  const response = await userLogOut(token);
  if (response) {
    dispatch(setUser(undefined)); // TODO not sure if this is needed
  }
};

// Selects here
const selectUser = (state: RootState) => state.auth.user;

export { selectUser };

// Export everything
export default authSlice.reducer;
