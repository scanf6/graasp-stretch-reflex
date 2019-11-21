import { combineReducers } from "redux";
import layoutReducer from "./layout";
import pauseReducer from "./pauseReducer";
import flowReducer from "./flowReducer";
import appInstanceReducer from "./appInstance";
import contextReducer from "./context";
import userReducer from "./users";
import currentStepReducer from "./currentStepReducer";
import toolsReducer from "./toolsReducer";
import nerfStatusReducer from "./nerfStatusReducer";

export default combineReducers({
  layout: layoutReducer,
  appInstance: appInstanceReducer,
  context: contextReducer,
  user: userReducer,
  animeStatus: pauseReducer,
  flow: flowReducer,
  currentStep: currentStepReducer,
  tool: toolsReducer,
  nerfStatus: nerfStatusReducer
});
