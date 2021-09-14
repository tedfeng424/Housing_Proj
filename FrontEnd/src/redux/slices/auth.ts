import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from '@redux';
import { User, UserNameEmail } from '@models';

interface AuthState {
  shouldShowLogin: boolean;
  shouldShowDomainPopup: boolean;
  shouldShowReportIssue: boolean;
  shouldShowEmailConfirmation: boolean;
  showNewUserPopup?: UserNameEmail;
}

const initialState: AuthState = {
  shouldShowLogin: false,
  shouldShowDomainPopup: false,
  shouldShowReportIssue: false,
  shouldShowEmailConfirmation: false,
  showNewUserPopup: undefined,
};

/**
 * This slice is the redux slice for anything "auth". This includes
 * anything with users (login, creating new users) and anything with
 * the user's profile.
 */
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    startNewUserFlow: (
      state,
      action: PayloadAction<UserNameEmail | undefined>,
    ) => {
      state.showNewUserPopup = action.payload;
    },
    endNewUserFlow: (state) => {
      state.showNewUserPopup = undefined;
    },
    showLogin: (state) => {
      state.shouldShowLogin = true;
    },
    hideLogin: (state) => {
      state.shouldShowLogin = false;
    },
    showUnsupportedDomainPopup: (state) => {
      state.shouldShowDomainPopup = true;
    },
    hideUnsupportedDomainPopup: (state) => {
      state.shouldShowDomainPopup = false;
    },
    showReportIssue: (state) => {
      state.shouldShowReportIssue = true;
    },
    hideReportIssue: (state) => {
      state.shouldShowReportIssue = false;
    },
    showEmailConfirmation: (state) => {
      state.shouldShowEmailConfirmation = true;
    },
    hideEmailConfirmation: (state) => {
      state.shouldShowEmailConfirmation = false;
    },
  },
});

/**
 * Exporting action creators.
 */
export const {
  startNewUserFlow,
  endNewUserFlow,
  showLogin,
  hideLogin,
  showUnsupportedDomainPopup,
  hideUnsupportedDomainPopup,
  showReportIssue,
  hideReportIssue,
  showEmailConfirmation,
  hideEmailConfirmation,
} = authSlice.actions;

/**
 * Exporting select hooks for this slice.
 */
export const useShouldShowLogin = () => {
  return useSelector((state) => state.auth.shouldShowLogin);
};
export const useShowNewUserPopup = () => {
  return useSelector((state) => state.auth.showNewUserPopup);
};
export const useShowUnsupportedDomainPopup = () => {
  return useSelector((state) => state.auth.shouldShowDomainPopup);
};
export const useShowReportIssue = () => {
  return useSelector((state) => state.auth.shouldShowReportIssue);
};
export const useShowEmailConfirmation = () => {
  return useSelector((state) => state.auth.shouldShowEmailConfirmation);
};

export default authSlice.reducer;
