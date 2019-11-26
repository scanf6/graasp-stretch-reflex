import styled from "styled-components";

export default styled.div`
  position: relative;
  min-height: 400px;
  path {
    pointer-events: all;
  }

  #popups {
    position: absolute;
    top: 40%;
    left: 0;
    z-index: 99999999999;
    .partPopup {
      display: inline-block;

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

    .nerfCutPopup {
      border: 1px solid tomato;
      color: tomato;
      padding: 10px;
      margin-bottom: 10px;
      border-radius: 4px;
      animation: shake 0.5s ease-in-out;

      button {
        color: white;
        background-color: tomato;
        padding: 3px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
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

  @keyframes shake {
    0% {
      transform: translateX(0);
    }
    20% {
      transform: translateX(10px);
    }
    40% {
      transform: translateX(-10px);
    }
    60% {
      transform: translateX(10px);
    }
    80% {
      transform: translateX(-10px);
    }
    100% {
      transform: translateX(0);
    }
  }
`;
