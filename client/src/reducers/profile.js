import { profileActionTypes } from "../actions/types";
const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
};

const profile = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case profileActionTypes.GET_PROFILE:
    case profileActionTypes.UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case profileActionTypes.GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
      };
    case profileActionTypes.PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case profileActionTypes.CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false,
      };
    case profileActionTypes.GET_REPOS:
      return {
        ...state,
        repos: payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default profile;
