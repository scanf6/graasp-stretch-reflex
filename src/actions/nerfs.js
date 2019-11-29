import {
  CUT_NERF_MOTOR,
  CUT_NERF_SENSITIVE,
  RESET_NERFS
} from "../types/index";

export const cutNerfSensitive = pauseCutAnimation => dispatch => {
  dispatch({ type: CUT_NERF_SENSITIVE, pauseOn: pauseCutAnimation });
};

export const cutNerfMotor = pauseCutAnimation => dispatch => {
  dispatch({ type: CUT_NERF_MOTOR, pauseOn: pauseCutAnimation });
};

export const resetNerfs = () => dispatch => {
  dispatch({ type: RESET_NERFS });
};
