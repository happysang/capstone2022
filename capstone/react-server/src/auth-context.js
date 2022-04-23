import axios from "axios";
import React, { useState } from "react";
import { API_BASE_URL } from "./app-config";
const ACCESS_TOKEN = "ACCESS_TOKEN";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  signup: () => {},
  login: (userData) => {},
  logout: (userData) => {},
});

export const call = async (api, userData, isLogin = false) => {
  let headers = {
    "Content-Type": "application/json",
  };

  const accessToken = localStorage.getItem("ACCESS_TOKEN");
  if (accessToken && accessToken !== null) {
    headers = {
      ...headers,
      Authorization: "Bearer " + accessToken,
    };
  }
  console.log(userData);

  try {
    const response = await fetch(`${API_BASE_URL}${api}`, {
      method: "POST",
      headers,
      body: JSON.stringify(userData),
    });
    console.log("res", response);
    const data = await response.json();
    if (!response.ok) {
      console.log("에러메시지", data.error);
      return Promise.reject(data); // 에러 메시지
    }
    if (isLogin) {
      return data;
    }
    return response;
  } catch (err) {
    if (err.status === 403) {
      window.location.href = "/login1";
    }
    return err;
  }
};

export const AuthContextProvider = (props) => {
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
      window.location.href = "/home";
      return;
    }
    window.location.href = "/login1";
  };

  const loginHandler = async (userData) => {
    const { token } = await call("/auth/signin", userData, true);
    console.log(token);
    setToken(token);

    if (token) {
      localStorage.setItem(ACCESS_TOKEN, token);
      window.location.href = "/home";
    }
  };

  const signupHandler = async (userData) => {
    const response = await call("/auth/signup", userData);
    if (response.status === 200) {
      window.location.href = "/login1";
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
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
