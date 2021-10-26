import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import { setAlert } from "./alert";
import {
  registerActionsTypes,
  authCheckerTyper,
  loginActionsTypes,
  LOGOUT,
} from "./types";

//Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/auth");

    dispatch({
      type: authCheckerTyper.USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: authCheckerTyper.AUTH_ERROR,
    });
  }
};

//Register User
export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ name, email, password });

    try {
      const res = await axios.post("api/users", body, config);

      dispatch({
        type: registerActionsTypes.REGISTER_SUCCESS,
        payload: res.data,
      });

      dispatch(loadUser);
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
      dispatch({
        type: registerActionsTypes.REGISTER_FAILURE,
      });
    }
  };

//login user
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("api/auth", body, config);

    dispatch({
      type: loginActionsTypes.LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser);
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: loginActionsTypes.LOGIN_FAILURE,
    });
  }
};

//Logout /clear Profile
export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
