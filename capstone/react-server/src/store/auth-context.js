import React, { useState } from "react";
import { API_BASE_URL } from "../service/backend-config";
const ACCESS_TOKEN = "ACCESS_TOKEN";
const USER_ID = "USER_ID";

const AuthContext = React.createContext({
  token: "",
  id: "",
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
    console.log("try");
    const response = await fetch(`${API_BASE_URL}${api}`, {
      method: "POST",
      headers,
      body: JSON.stringify(userData),
    });
    console.log("res", response);
    const data = await response.json();
    if (!response.ok) {
      //throw new Error(data.error);
      // console.log("에러메시지", data.error);
      return Promise.reject(data); // 에러 메시지
    }
    if (isLogin) {
      return data;
    }
    return response;
  } catch (err) {
    console.log(err.message);
    if (err.status === 403) {
      window.location.href = "/login";
    }
    return err;
  }
};

export const AuthContextProvider = (props) => {
  const tokenData =
    localStorage.getItem("ACCESS_TOKEN") === "null"
      ? false
      : localStorage.getItem("ACCESS_TOKEN");
  const idData =
    localStorage.getItem("USER_ID") === "null"
      ? false
      : localStorage.getItem("USER_ID");
  let initialToken = null;
  let initialId = null;
  let isLoggedIn = !!tokenData;

  if (tokenData) {
    initialToken = tokenData;
    initialId = idData;
  }

  const [token, setToken] = useState("");
  const [id, setId] = useState("");

  const logoutHandler = () => {
    localStorage.setItem(ACCESS_TOKEN, null);
    const tokenData =
      localStorage.getItem("ACCESS_TOKEN") === "null"
        ? false
        : localStorage.getItem("ACCESS_TOKEN");
    const idData =
      localStorage.getItem("USER_ID") === "null"
        ? false
        : localStorage.getItem("USER_ID");

    setToken(tokenData);
    setId(idData);

    if (isLoggedIn) {
      window.location.href = "/";
      return;
    }
    window.location.href = "/login";
  };

  const loginHandler = async (userData) => {
    const { token, id } = await call("/auth/signin", userData, true);
    console.log(token);
    console.log(id);
    setToken(token);
    setId(id);

    if (token) {
      localStorage.setItem(ACCESS_TOKEN, token);
      localStorage.setItem(USER_ID, id);
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
    id: id || initialId,
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
