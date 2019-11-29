import {
  CUT_NERF_MOTOR,
  CUT_NERF_SENSITIVE,
  RESET_NERFS
} from "../types/index";

const initialState = {
  nerfSensitive: "intact",
  nerfMotor: "intact",
  pauseOn: null
};
export default (state = initialState, action) => {
  switch (action.type) {
    case CUT_NERF_MOTOR:
      return {
        ...state,
        nerfMotor: "cut",
        pauseOn:
          state.pauseOn && action.pauseOn > state.pauseOn
            ? state.pauseOn
            : action.pauseOn
      };
    case CUT_NERF_SENSITIVE:
      return {
        ...state,
        nerfSensitive: "cut",
        pauseOn:
          state.pauseOn && action.pauseOn > state.pauseOn
            ? state.pauseOn
            : action.pauseOn
      };
    case RESET_NERFS:
      return { nerfSensitive: "intact", nerfMotor: "intact", pauseOn: null };
    default:
      return state;
  }
};
