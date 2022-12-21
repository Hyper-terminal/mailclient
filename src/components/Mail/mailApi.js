export const composeMail = async (mailObj, formattedEmail) => {
  const url =
    "https://mailbox-64e91-default-rtdb.asia-southeast1.firebasedatabase.app/" +
    formattedEmail +
    "/sentMail.json";

  const response = await fetch(url, {
    method: "post",
    body: JSON.stringify(mailObj),
  });

  const data = await response.json();

  return { response, data };
};

export const inboxMail = async (mailObj, formattedEmail) => {
  const url =
    "https://mailbox-64e91-default-rtdb.asia-southeast1.firebasedatabase.app/" +
    formattedEmail +
    "/inboxMail.json";

  const response = await fetch(url, {
    method: "post",
    body: JSON.stringify(mailObj),
  });

  const data = await response.json();

  return { response, data };
};

export const getInboxMail = async (formattedEmail) => {
  const url =
    "https://mailbox-64e91-default-rtdb.asia-southeast1.firebasedatabase.app/" +
    formattedEmail +
    "/inboxMail.json";

  const response = await fetch(url);
  const data = await response.json();

  return { data, response };
};

export const getSentMail = async (formattedEmail) => {
  const url =
    "https://mailbox-64e91-default-rtdb.asia-southeast1.firebasedatabase.app/" +
    formattedEmail +
    "/sentMail.json";

  const response = await fetch(url);
  const data = await response.json();

  return { data, response };
};

export const updateMarkRead = async (formattedEmail, id, mail) => {
  const url =
    "https://mailbox-64e91-default-rtdb.asia-southeast1.firebasedatabase.app/" +
    formattedEmail +
    "/inboxMail/" +
    id +
    ".json";

  const response = await fetch(url, {
    method: "put",
    body: JSON.stringify(mail),
  });

  const data = await response.json();

  return { response, data };
};

export const updateSentMarkRead = async (formattedEmail, id, mail) => {
  const url =
    "https://mailbox-64e91-default-rtdb.asia-southeast1.firebasedatabase.app/" +
    formattedEmail +
    "/sentMail/" +
    id +
    ".json";

  const response = await fetch(url, {
    method: "put",
    body: JSON.stringify(mail),
  });

  const data = await response.json();

  return { response, data };
};

export const deleteMail = async (formattedEmail, id) => {
  const url =
    "https://mailbox-64e91-default-rtdb.asia-southeast1.firebasedatabase.app/" +
    formattedEmail +
    "/inboxMail/" +
    id +
    ".json";

  const response = await fetch(url, {
    method: "delete",
  });

  const data = await response.json();

  return { response, data };
};

export const deleteSentMail = async (formattedEmail, id) => {
  const url =
    "https://mailbox-64e91-default-rtdb.asia-southeast1.firebasedatabase.app/" +
    formattedEmail +
    "/sentMail/" +
    id +
    ".json";

  const response = await fetch(url, {
    method: "delete",
  });

  const data = await response.json();

  return { response, data };
};
