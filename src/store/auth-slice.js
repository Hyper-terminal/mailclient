import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: localStorage.getItem("idToken") ? true : false,
    idToken: null,
  },
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.idToken = action.payload;
      localStorage.setItem("idToken", action.payload);
    },
    logout(state) {
      localStorage.removeItem("idToken");
      state.idToken = null;
      state.isAuthenticated = false;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
