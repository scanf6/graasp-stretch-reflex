import { ADD_STEP_COUNT, RESET_STEP_COUNT } from '../types/index';

export const incrementStepCounter = () => (dispatch) => {
  dispatch({ type: ADD_STEP_COUNT });
};

export const resetStepCounter = () => ({ type: RESET_STEP_COUNT });
