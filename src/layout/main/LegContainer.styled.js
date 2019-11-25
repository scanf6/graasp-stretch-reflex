import styled from "styled-components";

export default styled.div`
  position: relative;
  min-height: 400px;
  path {
    pointer-events: visibleFill;
  }

  .partPopup {
    display: inline-block;
    position: absolute;
    border: 1px solid gray;
    background-color: #ecf0f1;
    .title {
      background-color: #95a5a6;
      padding: 5px;
    }

    .description {
      padding: 10px;
    }
  }
  .animationContainer {
    .leg {
      position: absolute;
      top: 36%;
      left: 21%;
      display: none;
      &:nth-of-type(${props => props.visibleChild}) {
        display: inline-block;
      }
    }
  }

  #hammer {
    position: absolute;
    top: 35%;
    left: 41.2%;
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
    top: 0;
    left: 61%;
  }
  #moelle {
    z-index: 99999;
    top: 6%;
    left: 50%;
  }

  #nerfs {
    position: absolute;
    top: 6%;
    left: 50%;
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
