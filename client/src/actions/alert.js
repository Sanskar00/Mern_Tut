import { v4 as uuid } from "uuid";
import { alertActionsTypes } from "./types";

export const setAlert = (msg, alertType) => (dispatch) => {
  const id = uuid();
  dispatch({
    type: alertActionsTypes.SET_ALERT,
    payload: { msg, alertType, id },
  });

  setTimeout(
    () => dispatch({ type: alertActionsTypes.REMOVE_ALERT, payload: id }),
    5000
  );
};
