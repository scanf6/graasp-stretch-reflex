import styled from 'styled-components';
import scis32 from '../../resources/scis32.png';

export default styled.div`
  position: relative;
  min-height: 400px;
  cursor: ${({ tool }) =>
    tool === 'cissors' ? `url(${scis32}) 32 16,default` : ''};

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
      top: 43%;
      left: 8.1%;
      display: none;
      &:nth-of-type(${props => props.visibleChild}) {
        display: inline-block;
      }
    }
  }

  #hammer {
    position: absolute;
    top: 48%;
    left: 28%;
    transform: rotate(10deg);
    animation: hit 0.8s;
    animation-play-state: ${props =>
      props.animationStatus === 'pause' ? 'paused' : 'running'};
  }

  #moelle,
  #moelle2 {
    position: absolute;
  }

  #moelle2 {
    top: 23%;
    left: 52%;
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
    z-index: ${({ tool }) => (tool === 'cissors' ? 99999999999 : 0)};
    .lineSegment {
      &:hover {
        stroke-width: 7px !important;
        stroke: whitesmoke !important;
      }
    }

    path {
      animation: ${({ tool }) =>
        tool === 'cissors' ? 'flash 1s ease-in-out infinite' : 'none'};
    }
  }

  .sensitif {
    stroke-dasharray: 1200;
    stroke-dashoffset: 1200;
    animation: lineDraw 15s linear 940ms forwards;
    animation-play-state: ${props =>
      props.animationStatus === 'pause' ? 'paused' : 'running'};
  }

  .moteur {
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    animation: lineDraw 15s linear 6000ms forwards;
    animation-play-state: ${props =>
      props.animationStatus === 'pause' ? 'paused' : 'running'};
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

  @keyframes flash {
    0% {
      stroke-width: 2;
    }

    50% {
      stroke-width: 6;
    }

    100% {
      stroke-width: 2;
    }
  }
`;
