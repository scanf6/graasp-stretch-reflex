import { ADD_STEP_COUNT, RESET_STEP_COUNT } from '../types/index';

const initialState = -1;
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_STEP_COUNT:
      return state + 1;
    case RESET_STEP_COUNT:
      return -1;
    default:
      return state;
  }
};
