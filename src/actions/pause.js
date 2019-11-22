import { PAUSE, RUN } from '../types/pauseTypes';

export const pauseAnimation = () => (dispatch) => {
  dispatch({
    type: PAUSE,
  });
};

export const runAnimation = () => (dispatch) => {
  dispatch({
    type: RUN,
  });
};
