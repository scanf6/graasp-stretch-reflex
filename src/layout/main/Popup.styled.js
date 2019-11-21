import styled from "styled-components";
import Steps from "./steps.json";

export default styled.div`
  display: ${({ animationStatus, nerfSensitive, nerfMotor, currentStep }) =>
    (nerfSensitive === "intact" || currentStep === 0) &&
    (nerfMotor === "intact" || currentStep === 0) &&
    animationStatus === "pause"
      ? "inline-block"
      : "none"};
  animation: fadeIn 1s;
  position: absolute;
  z-index: 99898989898;
  .continueBtn,
  .resetBtn {
    border: none;
    background-color: rgb(236, 69, 69);
    color: white;
    cursor: pointer;
    padding: 10px;

    &:disabled {
      background-color: rgb(146, 146, 146);
      color: rgb(119, 119, 119);
    }
  }
  background: linear-gradient(
    to right bottom,
    rgb(39, 39, 39),
    rgb(49, 49, 49)
  );
  color: white;
  padding: ${({ currentStep }) => (currentStep === -1 ? 0 : "10px")};
  font-size: 12px;

  top: ${({ currentStep }) =>
    currentStep === -1 ? 0 : Steps[currentStep].popupPosition[1] + "px"};
  left: ${({ currentStep }) =>
    currentStep === -1 ? 0 : Steps[currentStep].popupPosition[0] + "px"};

  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translateY(-10%);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
