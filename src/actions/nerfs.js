import {
  CUT_NERF_MOTOR,
  CUT_NERF_SENSITIVE,
  RESET_NERFS,
} from '../types/index';

export const cutNerfSensitive = () => (dispatch) => {
  dispatch({ type: CUT_NERF_SENSITIVE });
};

export const cutNerfMotor = () => (dispatch) => {
  dispatch({ type: CUT_NERF_MOTOR });
};

export const resetNerfs = () => (dispatch) => {
  dispatch({ type: RESET_NERFS });
};
