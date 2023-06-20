import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { User } from "../interfaces/User";

interface AuthState {
  currentUser: User | null;
  accessToken: string | null;
}

const initialState: AuthState = {
  currentUser: null,
  accessToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action) {
      const { user, accessToken } = action.payload;

      if (user) state.currentUser = user;
      if (accessToken) state.accessToken = accessToken;
    },
    clearCredentials() {
      return initialState;
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;

export const getCurrentUser = (state: RootState) => state.auth.currentUser;
export const getAccessToken = (state: RootState) => state.auth.accessToken;

export default authSlice.reducer;
