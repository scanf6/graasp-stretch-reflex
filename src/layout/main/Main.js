import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import Fab from '@material-ui/core/Fab';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Styles from '../sidemenu/Styles';
import { AppState } from '../../config/AppState';
import {
  toggleSideMenu,
  pauseAnimation,
  runAnimation,
  addStep,
  incrementStepCounter,
  cutNerfMotor,
  cutNerfSensitive,
} from '../../actions';
import './Main.css';
import Steps from './steps.json';
import LegContainer from './LegContainer.styled';
import { ReactComponent as Nerf } from '../../resources/newParts/asset6.svg';
// import { ReactComponent as Leg } from "../../resources/Leg.svg";
// import { ReactComponent as Leg } from "../../resources/newParts/Leg.svg";
import { ReactComponent as Leg } from '../../resources/newParts/asset7.svg';
// import { ReactComponent as Hammer } from "../../resources/Hammer.svg";
import { ReactComponent as Hammer } from '../../resources/newParts/Hammer.svg';
// import { ReactComponent as Moelle } from "../../resources/Moelle.svg";
import { ReactComponent as Moelle } from '../../resources/newParts/Moelle.svg';
// import { ReactComponent as Moelle2 } from "../../resources/Moelle2.svg";
import { ReactComponent as Moelle2 } from '../../resources/newParts/Moelle2.svg';
import Timeout from 'smart-timeout';
// import Flow from "./Flow";
import PopupStyled from './Popup.styled';
import Popup from './Popup';
import ToolBox from './ToolBox';
import ErrorPopup from './ErrorPopup';
import ErrorPopupStyled from './ErrorPopup.styled';

const styles = Styles;

class Main extends Component {
  // state = AppState;
  state = {
    redraw: 0,
  };

  startAnimation = () => {
    this.props.incrementStepCounter();
    this.props.addStep(Steps[this.props.currentStep + 1]);
    this.props.runAnimation();

    Timeout.set(
      'stopAnimation',
      () => {
        this.props.pauseAnimation();
      },
      Steps[this.props.currentStep + 1].duration,
    );
  };

  handleToggleSideMenu = open => () => {
    const { dispatchToggleSideMenu } = this.props;
    dispatchToggleSideMenu(open);
  };

  reDraw = () => {
    this.setState({ redraw: Math.random() * 800 });
  };

  cutNerf = (e) => {
    const line = e.target;
    line.style.strokeOpacity = 0;
    if (line.classList.contains('nerfSensitive')) {
      this.props.cutNerfSensitive();
    } else if (line.classList.contains('nerfMotor')) {
      this.props.cutNerfMotor();
    }
  };

  render() {
    const {
      classes,
      showHeader,
      showSideMenu,
      themeColor,
      animation,
      flow,
      pauseAnimation,
      runAnimation,
      currentStep,
      tool,
      nerfStatus,
    } = this.props;

    const { nerfSensitive, nerfMotor } = nerfStatus;

    return (
      <main
        className={classNames(classes.content, {
          [classes.contentShift]: showSideMenu,
        })}
      >
        {showHeader ? <div className={classes.drawerHeader} /> : ''}
        {showHeader ? (
          ''
        ) : (
          <Fab
            color="primary"
            aria-label="Add"
            onClick={this.handleToggleSideMenu(!showSideMenu)}
            className={classes.fab}
            style={{ backgroundColor: themeColor, outline: 'none' }}
          >
            {showSideMenu ? (
              <ChevronRightIcon />
            ) : (
              <MenuIcon style={{ color: 'white' }} />
            )}
          </Fab>
        )}
        <div className="main-container">
          <ErrorPopupStyled
            currentStep={currentStep}
            nerfSensitive={nerfSensitive}
            nerfMotor={nerfMotor}
          >
            <ErrorPopup reDraw={this.reDraw} />
          </ErrorPopupStyled>
          <PopupStyled
            currentStep={currentStep}
            animationStatus={animation}
            nerfSensitive={nerfSensitive}
            nerfMotor={nerfMotor}
          >
            <Popup currentStep={currentStep} reDraw={this.reDraw} />
          </PopupStyled>

          <ToolBox />
          {/* {flow.length !== 0 && <Flow steps={Steps} reDraw={this.reDraw} />} */}
          <button
            className="hitButton"
            disabled={flow.length !== 0}
            onClick={this.startAnimation}
          >
            Frapper!
          </button>

          <div className="legContainer">
            <LegContainer
              key={this.state.redraw}
              animationStatus={animation}
              runAnimation={runAnimation}
              pauseAnimation={pauseAnimation}
              tool={tool}
            >
              <Hammer width="50px" />
              <Leg width="500px" />
              <Moelle2 width="400px" />
              <Nerf width="300px" onClick={this.cutNerf} />
              <Moelle width="300px" />
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
  dispatchToggleSideMenu: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  themeColor: state.layout.themeColor,
  showHeader: state.layout.showHeader,
  showSideMenu: state.layout.showSideMenu,
  animation: state.animeStatus,
  flow: state.flow,
  currentStep: state.currentStep,
  tool: state.tool,
  nerfStatus: state.nerfStatus,
});

const mapDispatchToProps = {
  dispatchToggleSideMenu: toggleSideMenu,
  pauseAnimation,
  runAnimation,
  addStep,
  incrementStepCounter,
  cutNerfMotor,
  cutNerfSensitive,
};

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(Main);

export default withStyles(styles, { withTheme: true })(connectedComponent);
