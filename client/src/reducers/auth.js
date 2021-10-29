import {
  registerActionsTypes,
  authCheckerTyper,
  loginActionsTypes,
  LOGOUT,
  profileActionTypes,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case authCheckerTyper.USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case registerActionsTypes.REGISTER_SUCCESS:
    case loginActionsTypes.LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case registerActionsTypes.REGISTER_FAILURE:
    case loginActionsTypes.LOGIN_FAILURE:
    case authCheckerTyper.AUTH_ERROR:
    case LOGOUT:
    case profileActionTypes.ACCOUNT_DELETED:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
};

export default authReducer;
