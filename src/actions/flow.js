import { ADD_STEP, RESET_FLOW } from "../types/index";

export const addStep = step => dispatch => {
  dispatch({ type: ADD_STEP, step });
};

export const resetFlow = () => dispatch => {
  dispatch({ type: RESET_FLOW });
};
