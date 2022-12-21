import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: localStorage.getItem("idToken") ? true : false,
    idToken: localStorage.getItem("idToken")
      ? localStorage.getItem("idToken")
      : null,
    loggedInEmail: localStorage.getItem("loggedInEmail")
      ? localStorage.getItem("loggedInEmail")
      : null,
  },
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.idToken = action.payload;
      state.loggedInEmail = action.payload.email;
      localStorage.setItem("loggedInEmail", action.payload.email);
      localStorage.setItem("idToken", action.payload.idToken);
    },
    logout(state) {
      localStorage.removeItem("idToken");
      state.loggedInEmail = null;
      localStorage.removeItem("loggedInEmail");
      state.idToken = null;
      state.isAuthenticated = false;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
