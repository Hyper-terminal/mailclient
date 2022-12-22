import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { mailActions } from "../store/mail-slice";

const useFetchMail = () => {
  const [unreadCount, setUnreadCount] = useState(0);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(
    async (requestConfig, inboxMail) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(requestConfig.url, {
          method: requestConfig.method ? requestConfig.method : "GET",
          headers: requestConfig.headers ? requestConfig.headers : {},
          body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
        });

        if (!response.ok) {
          throw new Error("Request failed!");
        }

        const data = await response.json();

        if (error) {
          alert("something wrong");
          return;
        }
        const mailObjects = {};
        let count = 0;
        for (let key in data) {
          const mailObj = data[key];
          mailObj.id = key;
          if (mailObj.markRead === false) count++;
          mailObjects[key] = mailObj;
        }
        setUnreadCount(count);

        if (inboxMail) dispatch(mailActions.replaceEmails(mailObjects));
        else dispatch(mailActions.replaceSentMails(mailObjects));
        
      } catch (err) {
        setError(err.message || "Something went wrong!");
      }
      setIsLoading(false);
    },
    [dispatch, error]
  );

  return {
    isLoading,
    error,
    sendRequest,
    unreadCount,
  };
};

export default useFetchMail;
