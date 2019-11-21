import { CISSORS } from "../types/index";
export default (state = "", action) => {
  switch (action.type) {
    case CISSORS:
      return "cissors";
    default:
      return "";
  }
};
