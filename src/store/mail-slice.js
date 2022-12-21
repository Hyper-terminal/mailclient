import { createSlice } from "@reduxjs/toolkit";

const mailSlice = createSlice({
  name: "mail",
  initialState: { inboxMail: {}, sentMail: {} },
  reducers: {
    replaceEmails(state, action) {
      state.inboxMail = action.payload;
    },

    replaceSentMails(state, action) {
      state.sentMail = action.payload;
    },

    markInboxMailRead(state, action) {
      state.inboxMail[action.payload].markRead = true;
    },
    markSentMailRead(state, action) {
      state.sentMail[action.payload].markRead = true;
    },
    deleteMail(state, action) {
      delete state.inboxMail[action.payload];
    },
    deleteSentMail(state, action) {
      delete state.sentMail[action.payload];
    },
  },
});

export const mailActions = mailSlice.actions;
export default mailSlice;
