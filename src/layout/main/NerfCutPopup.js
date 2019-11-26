import React from "react";
import { connect } from "react-redux";
import { resetFlow, resetNerfs, resetStepCounter } from "../../actions";

const NerfCutPopup = ({
  title,
  reDraw,
  resetFlow,
  resetNerfs,
  resetStepCounter,
  resetCutState
}) => {
  return (
    <div className="nerfCutPopup">
      {title}{" "}
      <button
        onClick={() => {
          resetCutState();
          resetFlow();
          resetNerfs();
          resetStepCounter();
          reDraw();
        }}
      >
        Recommencer experience
      </button>
    </div>
  );
};

export default connect(null, { resetFlow, resetNerfs, resetStepCounter })(
  NerfCutPopup
);
