import { ADD_STEP, RESET_FLOW } from '../types/index';

const initialState = [];
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_STEP:
      return [...state, action.step];
    case RESET_FLOW:
      return [];
    default:
      return state;
  }
};
