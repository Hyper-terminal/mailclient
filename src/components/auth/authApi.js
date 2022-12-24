export const signUpRequest = async (user) => {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_API}`;

  const response = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: user.userEmail,
      password: user.userPassword,
    }),
  });

  const data = await response.json();

  return { data, response };
};

export const loginRequest = async (user) => {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_API}`;

  const response = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: user.userEmail,
      password: user.userPassword,
    }),
  });

  const data = await response.json();

  return { data, response };
};

export const forgetRequest = async (email) => {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${process.env.REACT_APP_FIREBASE_API}`;
  const response = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      requestType: "PASSWORD_RESET",
    }),
  });

  const data = await response.json();

  return { response, data };
};