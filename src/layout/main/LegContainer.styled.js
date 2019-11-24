import styled from "styled-components";

export default styled.div`
  position: relative;
  .animationContainer {
    .leg {
      position: absolute;
      top: 180px;
      left: 21%;
      display: none;
      &:nth-of-type(${props => props.visibleChild}) {
        display: inline-block;
      }
    }
  }

  #hammer {
    position: absolute;
    top: 190px;
    left: 40.9%;
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
    top: 30px;
    left: 725px;
  }

  #nerfs {
    position: absolute;
    top: 30px;
    left: 725px;
    z-index: ${({ tool }) => (tool === "cissors" ? 99999999999 : 0)};
    .lineSegment {
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
`;
