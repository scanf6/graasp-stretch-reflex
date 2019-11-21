import styled from "styled-components";

export default styled.p`
  position: relative;
  #leg {
    position: relative;
    top: 110px;
    left: -130px;
  }

  #pied {
    animation: move 1s linear 4.1s;
    animation-play-state: ${props =>
      props.animationStatus === "pause" ? "paused" : "running"};
  }

  #hammer {
    position: absolute;
    top: 28%;
    left: 42.8%;
    transform: rotate(10deg);
    animation: hit 0.8s;
    animation-play-state: ${props =>
      props.animationStatus === "pause" ? "paused" : "running"};
  }

  #moelle,
  #moelle2 {
    position: absolute;
    right: 10%;
  }

  #moelle2 {
    top: -13%;
    left: 61%;
  }
  #moelle {
    z-index: 99999;
    top: -25px;
    left: 725px;
  }

  #nerfs {
    position: absolute;
    top: -25px;
    left: 725px;
    z-index: ${({ tool }) => (tool === "cissors" ? 99999999999 : 0)};
    .lineSegment {
      animation: flash 1s ease-in-out infinite;
      cursor: pointer;
      &:hover {
        stroke-width: 5px !important;
        stroke: black !important;
      }
    }
  }

  .sensitif {
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    animation: lineDraw 5s linear 940ms forwards;
    animation-play-state: ${props =>
      props.animationStatus === "pause" ? "paused" : "running"};
  }

  .moteur {
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    animation: lineDraw 5s linear 2800ms forwards;
    animation-play-state: ${props =>
      props.animationStatus === "pause" ? "paused" : "running"};
  }

  @keyframes move {
    0% {
      transform: rotate(0deg);
      transform-origin: 0% 0%;
    }

    80% {
      transform: rotate(30deg);
      transform-origin: 70% 20%;
    }

    100% {
      transform: rotate(0deg);
      transform-origin: 0% 0%;
    }
  }

  @keyframes hit {
    0% {
      transform: rotate(10deg);
    }
    50% {
      transform: rotate(-20deg);
    }
    100% {
      transform: rotate(10deg);
    }
  }

  @keyframes lineDraw {
    to {
      stroke-dashoffset: 0;
    }
  }

  @keyframes flash {
    0% {
      -webkit-box-shadow: 10px 10px 21px -5px rgba(71, 186, 109, 1);
      -moz-box-shadow: 10px 10px 21px -5px rgba(71, 186, 109, 1);
      box-shadow: 10px 10px 21px -5px rgba(71, 186, 109, 1);
    }
    100% {
      -webkit-box-shadow: 10px 10px 39px 16px rgba(71, 186, 109, 1);
      -moz-box-shadow: 10px 10px 39px 16px rgba(71, 186, 109, 1);
      box-shadow: 10px 10px 39px 16px rgba(71, 186, 109, 1);
    }
  }
`;
