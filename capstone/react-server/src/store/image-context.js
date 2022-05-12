import React, { useState } from "react";

const ImgContext = React.createContext({
  imageFile: "",
  imageSrc: "",
});

export const ImgContextProvider = (props) => {
  const tokenData =
    localStorage.getItem("ACCESS_TOKEN") === "null"
      ? false
      : localStorage.getItem("ACCESS_TOKEN");
  let initialToken = null;
  let isLoggedIn = !!tokenData;

  if (tokenData) {
    initialToken = tokenData;
  }

  const [token, setToken] = useState("");

  const logoutHandler = () => {
    localStorage.setItem(ACCESS_TOKEN, null);
    const tokenData =
      localStorage.getItem("ACCESS_TOKEN") === "null"
        ? false
        : localStorage.getItem("ACCESS_TOKEN");

    setToken(tokenData);

    if (isLoggedIn) {
      window.location.href = "/";
      return;
    }
    window.location.href = "/login";
  };

  const loginHandler = async (userData) => {
    const { token } = await call("/auth/signin", userData, true);
    console.log(token);
    setToken(token);

    if (token) {
      localStorage.setItem(ACCESS_TOKEN, token);
      window.location.href = "/";
    }
  };

  const signupHandler = async (userData) => {
    const response = await call("/auth/signup", userData);
    if (response.status === 200) {
      window.location.href = "/login";
    }
  };

  const contextValue = {
    token: token || initialToken,
    isLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    signup: signupHandler,
  };

  console.log(contextValue);

  return (
    <ImgContext.Provider value={contextValue}>
      {props.children}
    </ImgContext.Provider>
  );
};

export default ImgContext;
