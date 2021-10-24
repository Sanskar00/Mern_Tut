import { alertActionsTypes } from "../actions/types";
const intialState = [];

const alert = (state = intialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case alertActionsTypes.SET_ALERT:
      return [...state, payload];
    case alertActionsTypes.REMOVE_ALERT:
      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
  }
};

export default alert;
