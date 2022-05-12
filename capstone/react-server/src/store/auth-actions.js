import { authActions } from "./auth-slice";
import { API_BASE_URL } from "../service/backend-config";

export const fetchPosts = (api, userData, isLogin = false) => {
  return async (dispatch) => {
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
        throw new Error(data.error);
      }

      dispatch(
        authActions.checkState({
          status: "success",
          message: "성공",
        })
      );

      if (isLogin) {
        return data;
      }
      return response;
    } catch (error) {
      dispatch(
        authActions.checkState({
          status: "error",
          message: error.message,
        })
      );
      console.log(error.message);
      if (error.status === 403) {
        window.location.href = "/login";
      }
      return error;
    }
  };
};
