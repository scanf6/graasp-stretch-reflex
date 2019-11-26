import React from 'react';
import { connect } from 'react-redux';
import { resetFlow, resetStepCounter, resetNerfs } from '../../actions/index';

const ErrorPopup = ({
  nerfs,
  resetStepCounter,
  resetFlow,
  resetNerfs,
  reDraw,
}) => {
  const { nerfSensitive, nerfMotor } = nerfs;
  let nerfName = '';
  let influxName = '';

  if (nerfSensitive === 'cut') {
    nerfName = 'sensitif';
    influxName = 'sensitif';
  }
  if (nerfMotor === 'cut') {
    nerfName = 'moteur';
    influxName = 'moteur';
  }

  return (
    <div>
      <h4>
Nerfs
        {nerfName}
        {' '}
Sectionner
      </h4>
      <p>
        Le nerf
        {' '}
        {nerfName}
        {' '}
est sectionner! L'influx nerveux
        {' '}
        {influxName}
        {' '}
ne peut
        se rendre a la moelle epiniere
      </p>
      <button
        className="resetBtn"
        onClick={() => {
          resetFlow();
          resetNerfs();
          resetStepCounter();
          reDraw();
        }}
      >
        Recommencer Experience
      </button>
    </div>
  );
};

const mapSTateToProps = state => ({
  nerfs: state.nerfStatus,
});
export default connect(mapSTateToProps, {
  resetFlow,
  resetStepCounter,
  resetNerfs,
})(ErrorPopup);
