import React from "react";
import Timeout from "smart-timeout";
import {
  addStep,
  runAnimation,
  pauseAnimation,
  incrementStepCounter,
  resetFlow,
  resetStepCounter
} from "../../actions/index";
import { connect } from "react-redux";
import Steps from "./steps.json";

const Popup = ({
  currentStep,
  addStep,
  runAnimation,
  pauseAnimation,
  incrementStepCounter,
  resetFlow,
  resetStepCounter,
  reDraw,
  animeStatus,
  nerfStatus
}) => {
  const { nerfSensitive, nerfMotor } = nerfStatus;
  if (currentStep === -1) return null;
  else {
    return (
      <div>
        <p>{Steps[currentStep].title}</p>

        {currentStep !== Steps.length - 1 && (
          <button
            className="continueBtn"
            disabled={animeStatus === "run"}
            onClick={() => {
              if (Steps.length - 1 > currentStep) {
                incrementStepCounter();
                addStep(Steps[currentStep + 1]);
                if (nerfSensitive === "cut" || nerfMotor === "cut") {
                  return;
                } else {
                  runAnimation();
                  Timeout.set(
                    "stopAnimation",
                    () => {
                      pauseAnimation();
                    },
                    Steps[currentStep + 1].duration
                  );
                }
              }
            }}
          >
            Continuez!
          </button>
        )}
        {currentStep === Steps.length - 1 && (
          <button
            disabled={animeStatus === "run"}
            className="resetBtn"
            onClick={() => {
              resetFlow();
              resetStepCounter();
              reDraw();
            }}
          >
            Recommencer Experience
          </button>
        )}
      </div>
    );
  }
};

const mapStateToProps = state => ({
  animeStatus: state.animeStatus,
  nerfStatus: state.nerfStatus
});

export default connect(mapStateToProps, {
  addStep,
  runAnimation,
  pauseAnimation,
  incrementStepCounter,
  resetFlow,
  resetStepCounter
})(Popup);
