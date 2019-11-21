import {
  CUT_NERF_MOTOR,
  CUT_NERF_SENSITIVE,
  RESET_NERFS
} from "../types/index";

const initialState = {
  nerfSensitive: "intact",
  nerfMotor: "intact"
};
export default (state = initialState, action) => {
  switch (action.type) {
    case CUT_NERF_MOTOR:
      return { ...state, nerfMotor: "cut" };
    case CUT_NERF_SENSITIVE:
      return { ...state, nerfSensitive: "cut" };
    case RESET_NERFS:
      return { nerfSensitive: "intact", nerfMotor: "intact" };
    default:
      return state;
  }
};
