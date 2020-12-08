import React, { Component } from 'react';
import Lottie from 'react-lottie';
import Swal from "sweetalert2";

// Animations Data
import nerfAnimationData from '../../resources/animationData/new/nerf2.json';
import blueSliceAnimationData from '../../resources/animationData/blue_slice.json';
import redSliceAnimationData from '../../resources/animationData/slice.json';
import cutedNerfSensitifAnimationData from '../../resources/animationData/new/cuted_nerf_sensitif.json';
import cutedNerfMotorAnimationData from '../../resources/animationData/new/cuted_nerf_motor.json';
import cutedNerfSensitifMotorAnimationData from '../../resources/animationData/new/cuted_nerf_sensitif_motor.json';

// Stimulations
import cutedNerfSensitifStimulBPAnimationData from '../../resources/animationData/new/cuted_nerf_sensitif_stimul_bp.json';
import cutedNerfSensitifStimulBCAnimationData from '../../resources/animationData/new/cuted_nerf_sensitif_stimul_bc.json';
import cutedNerfMotorStimulBCAnimationData from '../../resources/animationData/new/cuted_nerf_motor_stimul_bc.json';
import cutedNerfMotorStimulBPAnimationData from '../../resources/animationData/new/cuted_nerf_motor_stimul_bp.json';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import Fab from '@material-ui/core/Fab';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Styles from '../sidemenu/Styles';
import {
  toggleSideMenu,
  pauseAnimation,
  runAnimation,
  addStep,
  resetFlow,
  resetNerfs,
  resetStepCounter,
  incrementStepCounter,
  cutNerfMotor,
  cutNerfSensitive
} from '../../actions';
import './Main.css';
import Steps from './steps.json';
import LegContainer from './LegContainer.styled';
import { ReactComponent as Leg1 } from '../../resources/legAnimation/j1.svg';
import { ReactComponent as Leg2 } from '../../resources/legAnimation/j2.svg';
import { ReactComponent as Leg3 } from '../../resources/legAnimation/j3.svg';
import { ReactComponent as Leg4 } from '../../resources/legAnimation/j4.svg';
import { ReactComponent as Leg5 } from '../../resources/legAnimation/j5.svg';
import { ReactComponent as Leg6 } from '../../resources/legAnimation/j6.svg';
import { ReactComponent as Hammer } from '../../resources/newParts/Hammer.svg';
import { ReactComponent as Moelle2 } from '../../resources/newParts/new_moelle_epiniere.svg';
import Timeout from 'smart-timeout';
import PartPopup from './PartPopup';
import NerfCutPopup from './NerfCutPopup';
import Experiments from './Experiments';

const styles = Styles;
const Toast = Swal.mixin({
  toast: true,
  position: 'bottom-right',
  showConfirmButton: false,
  timer: 5500,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
});

class Main extends Component {
  // state = AppState;
  state = {
    redraw: 0,
    visibleChild: 1,
    animationInterval: null,
    hoveredElement: null,
    disabledCauseCut: false,
    disabledMessage: '',
    playNerfInflux: false,
    playCutSensitifAnimation: false,
    playCutMotorAnimation: false,
    stopAnimation: false,
    stopCutSensitifAnimation: false,
    stopCutMotorAnimation: false,
    illustrationCutNerfSensitif: false,
    illustrationCutNerfMotor: false,
    stimulSensitifBP: false,
    stimulMotorBP: false,
    stimulSensitifBPPause: false,
    stimulMotorBPPause: false,
    stimulSensitifBC: false,
    stimulMotorBC: false,
    stimulSensitifBCPause: false,
    stimulMotorBCPause: false
  };

  startAnimation = () => {
    const { illustrationCutNerfMotor, illustrationCutNerfSensitif } = this.state;
    if(illustrationCutNerfSensitif && illustrationCutNerfMotor) {
      Toast.fire({ icon: 'error', title: 'Nerf sensitif et nerf moteur sectionnés!' });
    }
    else if(illustrationCutNerfMotor) {
      Toast.fire({ icon: 'error', title: 'Nerf moteur sectionner!' });
    }
    else if(illustrationCutNerfSensitif) {
      Toast.fire({ icon: 'error', title: 'Nerf sensitif sectionner!' });
    }
    this.props.incrementStepCounter();
    this.props.addStep(Steps[this.props.currentStep + 1]);
    this.props.runAnimation();
    this.setState({ playNerfInflux: true, stopAnimation: false, stopCutSensitifAnimation: true, stopCutMotorAnimation: true });
    //Handling Leg rotate animation
    if (
      !illustrationCutNerfMotor && !illustrationCutNerfSensitif
    ) {
      Timeout.set(
        'legAnimation',
        () => {
          this.setState({ playNerfInflux: false, stopAnimation: true });
          let int = setInterval(() => {
            this.setState({ visibleChild: this.state.visibleChild + 1 });
          }, 100);
          this.setState({ animationInterval: int });
        },
        illustrationCutNerfSensitif ? 5000 : illustrationCutNerfMotor ? 10000 : 14000
      );
    }

    //Handling animation reset
    Timeout.set(
      'stopAnimation',
      () => {
        this.props.resetFlow();
        this.props.resetNerfs();
        this.props.resetStepCounter();
        this.props.pauseAnimation();
        this.reDraw();
        this.setState({ visibleChild: 1 });
        this.setState({ playNerfInflux: false, stopAnimation: true, stopCutSensitifAnimation: true, stopCutMotorAnimation: true });
      },
      illustrationCutNerfSensitif ? 4800 : illustrationCutNerfMotor ? 5350 : 15000
    );

    //Handling nerf cut status
    const { nerfSensitive, nerfMotor, pauseOn } = this.props.nerfStatus;
    if (nerfSensitive === 'cut') {
      Timeout.set(
        'stopAnimation',
        () => {
          this.props.resetFlow();
          this.props.resetNerfs();
          this.props.resetStepCounter();
          this.props.pauseAnimation();
          this.setState({
            disabledCauseCut: true,
            disabledMessage: 'Nerf Sensitif sectionner'
          });
        },
        pauseOn
      );
    } else if (nerfMotor === 'cut') {
      Timeout.set(
        'stopAnimation',
        () => {
          this.props.resetFlow();
          this.props.resetNerfs();
          this.props.resetStepCounter();
          this.props.pauseAnimation();
          this.setState({
            disabledCauseCut: true,
            disabledMessage: 'Nerf Moteur sectionner'
          });
        },
        pauseOn
      );
    }
  };

  extendLeg = () => {
    this.setState({ playNerfInflux: false, stopAnimation: true });
    let int = setInterval(() => {
      this.setState({ visibleChild: this.state.visibleChild + 1 });
    }, 100);
    this.setState({ animationInterval: int });
    this.stopLegExtension(1300);
  }

  stopLegExtension = (timeoutDuration) => {
    Timeout.set(
      'stopAnimation',
      () => {
        this.props.resetFlow();
        this.props.resetNerfs();
        this.props.resetStepCounter();
        this.props.pauseAnimation();
        this.reDraw();
        this.setState({
          visibleChild: 1,
          playNerfInflux: false,
          stopAnimation: true,
          stopCutSensitifAnimation: true,
          stopCutMotorAnimation: true,
          stimulSensitifBC: false,
          stimulSensitifBCPause: false
        });
      },
      timeoutDuration
    );
  }

  resetCutState = () => {
    this.setState({
      disabledCauseCut: false,
      disabledMessage: ''
    });
  };

  handleToggleSideMenu = open => () => {
    const { dispatchToggleSideMenu } = this.props;
    dispatchToggleSideMenu(open);
  };

  reDraw = () => {
    this.setState({ redraw: Math.random() * 800 });
  };

  cutNerf = e => {
    const line = e.target;
    if (line.tagName === 'svg') return;
    const pauseCutAnimation = line.getAttribute('data-duration');
    line.style.strokeOpacity = 0;
    if (line.classList.contains('nerfSensitive')) {
      this.props.cutNerfSensitive(pauseCutAnimation);
    } else if (line.classList.contains('nerfMotor')) {
      this.props.cutNerfMotor(pauseCutAnimation);
    }
  };

  cutNerfSensitifAnimationStart = ()=>{
    this.setState({
      playCutSensitifAnimation: true, stopCutSensitifAnimation: false, stopAnimation: true, stopCutMotorAnimation: true
    },()=>{
      setTimeout(() => {
        this.cutNerfSensitifAnimationStop();
      }, 900);
    })
  }

  cutNerfSensitifAnimationStop = ()=>{
    this.setState({
      playCutSensitifAnimation: false, stopCutSensitifAnimation: true, illustrationCutNerfSensitif: true
    })
  }

  cutNerfMotorAnimationStart = ()=>{
    this.setState({
      playCutMotorAnimation: true, stopCutMotorAnimation: false, stopCutSensitifAnimation: true, stopAnimation: true
    },()=>{
      setTimeout(() => {
        this.cutNerfMotorAnimationStop();
      }, 900);
    })
  }

  cutNerfMotorAnimationStop = ()=>{
    this.setState({
      playCutMotorAnimation: false, stopCutMotorAnimation: true, illustrationCutNerfMotor: true
    })
  }

  cancelCutNerfSensitif = ()=>{
    this.setState({ illustrationCutNerfSensitif: false, stimulSensitifBP: false, stimulSensitifBPPause: false });
  }

  cancelCutNerfMotor = ()=>{
    this.setState({ illustrationCutNerfMotor: false, stimulMotorBP: false, stimulMotorBPPause: false })
  }

  cutBoutPeripherique = ()=>{
    this.stopLegExtension(0);
    if(this.state.legExtensionTimeout) {
      clearTimeout(this.state.legExtensionTimeout)
    }
    this.setState({ stimulSensitifBP: true, stimulSensitifBC: false, stimulSensitifBCPause: false }, ()=> {
      setTimeout(() => {
        this.setState({ stimulSensitifBP: false })
      }, 1000);
    })
  }

  cutMotorBoutPeripherique = ()=>{
    this.stopLegExtension(0);
    if(this.state.legExtensionTimeout) {
      clearTimeout(this.state.legExtensionTimeout)
    }
    this.setState({ stimulMotorBP: true, stimulMotorBC: false, stimulMotorBPPause: false }, ()=> {
      const legExtensionTimeout = setTimeout(() => {
        this.setState({ stimulMotorBPPause: true });
        this.extendLeg();
      }, 3300);
      this.setState({ legExtensionTimeout })
    })
  }

  cutBoutCentral = ()=>{
    this.props.addStep(Steps[this.props.currentStep + 1]);
    if(this.state.legExtensionTimeout) {
      clearTimeout(this.state.legExtensionTimeout)
    }
    this.setState({ stimulSensitifBC: true, stimulSensitifBP: false, stimulSensitifBPPause: false }, ()=> {
      const legExtensionTimeout = setTimeout(() => {
        this.setState({ stimulSensitifBCPause: true });
        this.extendLeg();
      }, 10300);
      this.setState({ legExtensionTimeout })
    })
  }

  cutMotorBoutCentral = ()=>{
    this.stopLegExtension(0);
    if(this.state.legExtensionTimeout) {
      clearTimeout(this.state.legExtensionTimeout)
    }
    this.setState({ stimulMotorBC: true, stimulMotorBP: false, stimulMotorBPOptions: false }, ()=> {
      setTimeout(() => {
        this.setState({ stimulMotorBC: false })
      }, 1000);
    })
  }

  render() {
    const {
      playNerfInflux,
      playCutSensitifAnimation,
      playCutMotorAnimation,
      stopAnimation,
      stopCutSensitifAnimation,
      stopCutMotorAnimation,
      illustrationCutNerfSensitif,
      illustrationCutNerfMotor,
      stimulSensitifBP,
      stimulMotorBP,
      stimulSensitifBPPause,
      stimulMotorBPPause,
      stimulSensitifBC,
      stimulMotorBC,
      stimulSensitifBCPause,
      stimulMotorBCPause
    } = this.state;

    // ================== ANIMATION DATA OPTIONS =============== //
    const defaultOptions = {
      autoplay: playNerfInflux,
      animationData: nerfAnimationData,
    };

    const cutedNerfSensitifOptions = {
      autoplay: playNerfInflux,
      animationData: cutedNerfSensitifAnimationData,
    };

    const cutedNerfMotorOptions = {
      autoplay: playNerfInflux,
      animationData: cutedNerfMotorAnimationData,
    };

    const cutedNerfSensitifMotorOptions = {
      autoplay: playNerfInflux,
      animationData: cutedNerfSensitifMotorAnimationData,
    };

    const sensitifSliceOptions = {
      autoplay: playCutSensitifAnimation,
      animationData: blueSliceAnimationData,
    };

    const motorSliceOptions = {
      autoplay: playCutMotorAnimation,
      animationData:redSliceAnimationData
    };

    const stimulSensitifBPOptions = {
      autoplay: stimulSensitifBP,
      animationData:cutedNerfSensitifStimulBPAnimationData
    };

    const stimulMotorBPOptions = {
      autoplay: stimulMotorBP,
      animationData:cutedNerfMotorStimulBPAnimationData
    };

    const stimulSensitifBCOptions = {
      autoplay: stimulSensitifBC,
      animationData:cutedNerfSensitifStimulBCAnimationData
    };

    const stimulMotorBCOptions = {
      autoplay: stimulMotorBC,
      animationData:cutedNerfMotorStimulBCAnimationData
    };
    // ======================================================== //

    const {
      classes,
      showHeader,
      showSideMenu,
      themeColor,
      animation,
      flow,
      pauseAnimation,
      runAnimation,
      tool
    } = this.props;

    //Handling leg rotation reset
    if (this.state.visibleChild === 6) {
      clearInterval(this.state.animationInterval);
    }

    return (
      <main
        className={classNames(classes.content, {
          [classes.contentShift]: showSideMenu
        })}>
        {showHeader ? <div className={classes.drawerHeader} /> : ''}
        {showHeader ? (
          ''
        ) : (
          <Fab
            color='primary'
            aria-label='Add'
            onClick={this.handleToggleSideMenu(!showSideMenu)}
            className={classes.fab}
            style={{ backgroundColor: themeColor, outline: 'none' }}>
            {showSideMenu ? (
              <ChevronRightIcon />
            ) : (
              <MenuIcon style={{ color: 'white' }} />
            )}
          </Fab>
        )}
        <div className='main-container'>
          <Experiments
          cancelCutNerfSensitif={this.cancelCutNerfSensitif}
          cancelCutNerfMotor={this.cancelCutNerfMotor}
          cutBoutPeripherique={this.cutBoutPeripherique}
          cutMotorBoutPeripherique={this.cutMotorBoutPeripherique}
          cutMotorBoutCentral={this.cutMotorBoutCentral}
          cutBoutCentral={this.cutBoutCentral}
          nerfSensitiveCut={illustrationCutNerfSensitif}
          nerfMotorCut={illustrationCutNerfMotor}
          startAnimationCutNerfSensitif={this.cutNerfSensitifAnimationStart}
          stopAnimationCutNerfSensitif={this.cutNerfSensitifAnimationStop}
          startAnimationCutNerfMotor={this.cutNerfMotorAnimationStart}
          stopAnimationCutNerfMotor={this.cutNerfMotorAnimationStop}
          />
          <button
            className='hitButton'
            disabled={
              flow.length !== 0 ||
              this.state.disabledCauseCut ||
              tool === 'cissors'
            }
            onClick={this.startAnimation}>
            Frapper!
          </button>

          <div className='legContainer'>
            {/* <Circle /> */}
            <LegContainer
              key={this.state.redraw}
              animationStatus={animation}
              runAnimation={runAnimation}
              pauseAnimation={pauseAnimation}
              tool={tool}
              visibleChild={this.state.visibleChild}>
              <Hammer width='3.5%' />
              <span className='animationContainer'>
                <Leg1 className='leg' width='35%' />
                <Leg2 className='leg' width='35%' />
                <Leg3 className='leg' width='35%' />
                <Leg4 className='leg' width='35%' />
                <Leg5 className='leg' width='35%' />
                <Leg6 className='leg' width='35%' />
              </span>
              <Moelle2 width="45%" height={200} />

              <div className="lottie-container1">
                {stimulSensitifBP ?
                (<Lottie isClickToPauseDisabled={true} options={stimulSensitifBPOptions} isPaused={stimulSensitifBPPause} width={600} />):

                stimulSensitifBC ?
                (<Lottie isClickToPauseDisabled={true} options={stimulSensitifBCOptions} isPaused={stimulSensitifBCPause} width={600} />):

                stimulMotorBP ?
                (<Lottie isClickToPauseDisabled={true} options={stimulMotorBPOptions} isPaused={stimulMotorBPPause} width={600} />):

                stimulMotorBC ?
                (<Lottie isClickToPauseDisabled={true} options={stimulMotorBCOptions} isPaused={stimulMotorBCPause} width={600} />):

                (illustrationCutNerfSensitif ?
                (<Lottie isClickToPauseDisabled={true} options={cutedNerfSensitifOptions} isStopped={stopAnimation} width={600} />):
                illustrationCutNerfMotor ?
                (<Lottie isClickToPauseDisabled={true} options={cutedNerfMotorOptions} isStopped={stopAnimation} width={600} />):
                (<Lottie isClickToPauseDisabled={true} options={defaultOptions} isStopped={stopAnimation} width={600} />))}
              </div>

              {/* ======== Slice Animations ======== */}
              <div className="lottie-container2">
                <Lottie isClickToPauseDisabled={true} options={sensitifSliceOptions} isStopped={stopCutSensitifAnimation} width={120} />
              </div>
              <div className="lottie-container3">
              <Lottie isClickToPauseDisabled={true} options={motorSliceOptions} isStopped={stopCutMotorAnimation} width={120} />
              </div>
              {/* ======== Slice Animations ======== */}
            </LegContainer>
          </div>
        </div>
      </main>
    );
  }
}

Main.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  themeColor: PropTypes.string.isRequired,
  showHeader: PropTypes.bool.isRequired,
  showSideMenu: PropTypes.bool.isRequired,
  dispatchToggleSideMenu: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  themeColor: state.layout.themeColor,
  showHeader: state.layout.showHeader,
  showSideMenu: state.layout.showSideMenu,
  animation: state.animeStatus,
  flow: state.flow,
  currentStep: state.currentStep,
  tool: state.tool,
  nerfStatus: state.nerfStatus
});

const mapDispatchToProps = {
  dispatchToggleSideMenu: toggleSideMenu,
  pauseAnimation,
  runAnimation,
  addStep,
  incrementStepCounter,
  cutNerfMotor,
  cutNerfSensitive,
  resetFlow,
  resetNerfs,
  resetStepCounter
};

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(Main);

export default withStyles(styles, { withTheme: true })(connectedComponent);
