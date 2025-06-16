import axiosInstance from "../untils/axiosInstance";
import axios from "axios";

export const loginUser = (email, password, showAlert) => {
  return async (dispatch) => {
    dispatch({ type: "AUTH_LOADING" });
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/users/login`,
        {
          userEmail: email,
          userPassword: password,
        },
        { withCredentials: true }
      );

      const data = res.data;

      if (data.code === 200) {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: { accessToken: data.accessToken },
        });
        return { success: true };
      } else {
        dispatch({ type: "LOGIN_FAILURE", payload: data.message });
        showAlert("error", data.message);
        return { success: false };
      }
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to connect to the server";
      dispatch({ type: "LOGIN_FAILURE", payload: message });
      showAlert("error", message);
      return { success: false };
    } finally {
      dispatch({ type: "AUTH_DONE" });
    }
  };
};

export const logoutUser = () => async (dispatch) => {
  try {
    await axios.post(
      "/api/v1/users/logout",
      {},
      {
        baseURL: `${process.env.REACT_APP_API_URL}`,
        withCredentials: true,
      }
    );

    dispatch({ type: "LOGOUT" });
  } catch (error) {
    console.error("Error during logout:", error);
    dispatch({ type: "LOGOUT" });
  }
};

export const checkAuth = () => async (dispatch) => {
  dispatch({ type: "AUTH_LOADING" });
  try {
    const res = await axios.get("/api/v1/users/refresh-token", {
      baseURL: `${process.env.REACT_APP_API_URL}`,
      withCredentials: true,
    });

    if (res.status === 200) {
      dispatch({
        type: "SET_AUTH",
        payload: { accessToken: res.data.accessToken },
      });
    } else {
      dispatch({ type: "LOGOUT" });
    }
  } catch (error) {
    console.error("Error during checkAuth:", error);
    dispatch({ type: "LOGOUT" });
  } finally {
    dispatch({ type: "AUTH_DONE" });
  }
};
