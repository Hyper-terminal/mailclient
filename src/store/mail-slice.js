import { createSlice } from "@reduxjs/toolkit";

const mailSlice = createSlice({
  name: "mail",
  initialState: { inboxMail: {} },
  reducers: {
    replaceEmails(state, action) {
      state.inboxMail = action.payload;
    },

    markRead(state, action) {
      state.inbox[action.payload].markRead = true;
    },
  },
});

export const mailActions = mailSlice.actions;
export default mailSlice;
