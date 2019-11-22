import { CISSORS } from '../types/index';

export const chooseCissors = () => (dispatch) => {
  dispatch({ type: CISSORS });
};
