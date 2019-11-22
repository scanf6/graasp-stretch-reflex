import styled from 'styled-components';
import Steps from './steps.json';

export default styled.div`
  background: linear-gradient(
    to right bottom,
    rgb(39, 39, 39),
    rgb(49, 49, 49)
  );
  color: white;
  width: 350px;
  position: absolute;
  z-index: 9999;
  padding: ${({ currentStep }) => (currentStep === -1 ? 0 : '10px')};
  display: ${({ nerfSensitive, nerfMotor, currentStep }) => ((nerfSensitive === 'cut' || nerfMotor === 'cut') && currentStep === 1
    ? 'inline-block'
    : 'none')};
  top: ${({ currentStep }) => (currentStep === -1 ? 0 : `${Steps[currentStep].popupPosition[1]}px`)};
  left: ${({ currentStep }) => (currentStep === -1 ? 0 : `${Steps[currentStep].popupPosition[0]}px`)};

  h4 {
    color: rgb(236, 69, 69);
  }

  .resetBtn {
    border: none;
    background-color: rgb(236, 69, 69);
    color: white;
    cursor: pointer;
    padding: 10px;
  }
`;
