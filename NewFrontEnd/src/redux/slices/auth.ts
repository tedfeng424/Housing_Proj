import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'universal-cookie';
import { AppThunk, RootState } from '../store'; // TODO
import { userLogIn, userLogOut, userEditProfile } from '../../apis/index';
import { User } from '../../assets/models/User';

const cookies = new Cookies();

interface AuthState {
  user?: User;
  userDraft?: User;
}

const initialState: AuthState = {
  user: cookies.get<User>('user'),
  userDraft: cookies.get<User>('userDraft'),
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
    setUserDraft: (state, action: PayloadAction<User | undefined>) => {
      state.userDraft = action.payload;
      if (action.payload) {
        cookies.set('userDraft', action.payload, {
          // TODO should probably set this from the backend as well (similar to access_token)
          maxAge: 4320, // expires  72 hours after login
        });
      } else {
        cookies.remove('userDraft');
      }
    },
  },
});

// Export actions that were defined with createSlice
export const { setUser, setUserDraft } = authSlice.actions;

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
        description: response.description,
        major: response.major,
        schoolYear: response.schoolYear,
        phone: response.phone,
      }),
    );
    dispatch(
      setUserDraft({
        name: response.name,
        email: response.email,
        token: response.token,
        description: response.description,
        major: response.major,
        schoolYear: response.schoolYear,
        phone: response.phone,
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
    dispatch(setUser(undefined));
    dispatch(setUserDraft(undefined)); // TODO not sure if this is needed
  }
};

export const editProfile = (
  email: string,
  userDraft: User,
  kvPairs: any,
  onSucess: Function,
): AppThunk => async (dispatch) => {
  const response = await userEditProfile(email, kvPairs);
  if (response) {
    onSucess(true);
    dispatch(setUser(userDraft));
  }
};

// Selects here
const selectUser = (state: RootState) => state.auth.user;
const selectUserDraft = (state: RootState) => state.auth.userDraft;
export { selectUser, selectUserDraft };

// Export everything
export default authSlice.reducer;
