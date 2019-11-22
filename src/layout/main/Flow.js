import React from 'react';
import './Flow.css';
import { connect } from 'react-redux';
import Timeout from 'smart-timeout';
import {
  addStep,
  incrementStepCounter,
  runAnimation,
  pauseAnimation,
  resetFlow,
  resetStepCounter,
} from '../../actions';

const Flow = ({
  flow,
  addStep,
  incrementStepCounter,
  steps,
  reDraw,
  currentStep,
  runAnimation,
  pauseAnimation,
  animeStatus,
  resetFlow,
  resetStepCounter,
}) => (
  <div className="Flow">
    {currentStep === steps.length - 1 && (
    <button
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
    {currentStep !== steps.length - 1 && (
    <button
      className="continueBtn"
      disabled={animeStatus === 'run'}
      onClick={() => {
        if (steps.length - 1 > currentStep) {
          incrementStepCounter();
          addStep(steps[currentStep + 1]);
          runAnimation();
          Timeout.set(
            'stopAnimation',
            () => {
              pauseAnimation();
            },
            steps[currentStep + 1].duration,
          );
        }
      }}
    >
          Continuer
    </button>
    )}

    <div className="eventsContainer">
      {flow.map((step, index) => (
        <div key={index} className="eventFlow">
          {step.title}
        </div>
      ))}
    </div>
  </div>
);

const mapStateToProps = state => ({
  flow: state.flow,
  currentStep: state.currentStep,
  animeStatus: state.animeStatus,
});

const mapDispatchToProps = {
  addStep,
  incrementStepCounter,
  runAnimation,
  pauseAnimation,
  resetFlow,
  resetStepCounter,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Flow);
