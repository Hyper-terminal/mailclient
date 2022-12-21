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
