import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

const mailSlice = createSlice({
  name: "mail",
  initialState: { inboxMail: {} },
  reducers: {
    replaceEmails(state, action) {
      state.inboxMail = action.payload;
    },

    markRead(state, action) {
      const id = action.payload;
      state.inboxMail[action.payload].markRead = true;
    },

    deleteMail(state, action) {
      const id = action.payload;
      delete state.inboxMail[id];
    },
  },
});

export const mailActions = mailSlice.actions;
export default mailSlice;
