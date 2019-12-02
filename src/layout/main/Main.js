import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import Fab from "@material-ui/core/Fab";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Styles from "../sidemenu/Styles";
import { AppState } from "../../config/AppState";
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
} from "../../actions";
import "./Main.css";
import Steps from "./steps.json";
import LegContainer from "./LegContainer.styled";
import { ReactComponent as Nerf } from "../../resources/newParts/asset6.svg";
import { ReactComponent as Leg1 } from "../../resources/legAnimation/j1.svg";
import { ReactComponent as Leg2 } from "../../resources/legAnimation/j2.svg";
import { ReactComponent as Leg3 } from "../../resources/legAnimation/j3.svg";
import { ReactComponent as Leg4 } from "../../resources/legAnimation/j4.svg";
import { ReactComponent as Leg5 } from "../../resources/legAnimation/j5.svg";
import { ReactComponent as Leg6 } from "../../resources/legAnimation/j6.svg";
import { ReactComponent as Hammer } from "../../resources/newParts/Hammer.svg";
import { ReactComponent as Moelle } from "../../resources/newParts/Moelle.svg";
import { ReactComponent as Moelle2 } from "../../resources/newParts/Moelle2.svg";
import Timeout from "smart-timeout";
import PartPopup from "./PartPopup";
import NerfCutPopup from "./NerfCutPopup";
import ToolBox from "./ToolBox";

//====== UNUSED FOR NOW ========================================
//import Popup from "./Popup.unused";
//import PopupStyled from "./Popup.styled.unused";
//import ErrorPopup from "./ErrorPopup.unused";
//import ErrorPopupStyled from "./ErrorPopup.styled.unused";

const styles = Styles;

class Main extends Component {
  // state = AppState;
  state = {
    redraw: 0,
    visibleChild: 1,
    animationInterval: null,
    hoveredElement: null,
    disabledCauseCut: false,
    disabledMessage: ""
  };

  startAnimation = () => {
    this.props.incrementStepCounter();
    this.props.addStep(Steps[this.props.currentStep + 1]);
    this.props.runAnimation();

    //Handling Leg rotate animation
    if (
      this.props.nerfStatus.nerfSensitive !== "cut" &&
      this.props.nerfStatus.nerfMotor !== "cut"
    ) {
      Timeout.set(
        "legAnimation",
        () => {
          let int = setInterval(() => {
            this.setState({ visibleChild: this.state.visibleChild + 1 });
          }, 80);

          this.setState({ animationInterval: int });
        },
        4100
      );
    }

    //Handling animation reset
    Timeout.set(
      "stopAnimation",
      () => {
        this.props.resetFlow();
        this.props.resetNerfs();
        this.props.resetStepCounter();
        this.props.pauseAnimation();
        this.reDraw();
        this.setState({ visibleChild: 1 });
      },
      5000
    );

    //Handling nerf cut status
    const { nerfSensitive, nerfMotor, pauseOn } = this.props.nerfStatus;
    if (nerfSensitive === "cut") {
      Timeout.set(
        "stopAnimation",
        () => {
          this.props.resetFlow();
          this.props.resetNerfs();
          this.props.resetStepCounter();
          this.props.pauseAnimation();
          this.setState({
            disabledCauseCut: true,
            disabledMessage: "Nerf Sensitif sectionner"
          });
        },
        pauseOn
      );
    } else if (nerfMotor === "cut") {
      Timeout.set(
        "stopAnimation",
        () => {
          this.props.resetFlow();
          this.props.resetNerfs();
          this.props.resetStepCounter();
          this.props.pauseAnimation();
          this.setState({
            disabledCauseCut: true,
            disabledMessage: "Nerf Moteur sectionner"
          });
        },
        pauseOn
      );
    }
  };

  resetCutState = () => {
    this.setState({
      disabledCauseCut: false,
      disabledMessage: ""
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
    if (line.tagName === "svg") return;
    const pauseCutAnimation = line.getAttribute("data-duration");
    line.style.strokeOpacity = 0;
    if (line.classList.contains("nerfSensitive")) {
      this.props.cutNerfSensitive(pauseCutAnimation);
    } else if (line.classList.contains("nerfMotor")) {
      this.props.cutNerfMotor(pauseCutAnimation);
    }
  };

  displayInfo = e => {
    if (this.props.tool === "cissors") return;
    if (this.state.hoveredElement) {
      const { target, stroke, strokeWidth, fill } = this.state.hoveredElement;
      target.style.stroke = stroke;
      target.style.fill = fill;
      target.style.strokeWidth = strokeWidth;
      this.setState({ hoveredElement: null });
    } else {
      const element = {
        target: e.target,
        title: e.target.getAttribute("data-title"),
        description: e.target.getAttribute("data-description"),
        popupXY: [e.clientX, e.clientY],
        stroke: e.target.style.stroke,
        strokeWidth: e.target.style.strokeWidth,
        fill: e.target.style.fill
      };

      this.setState({ hoveredElement: element });
      element.target.style.stroke = "red";
      element.target.style.fill = "rgba(255, 99, 71, 0.582)";
      element.target.style.strokeWidth = 3;
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
        })}
      >
        {showHeader ? <div className={classes.drawerHeader} /> : ""}
        {showHeader ? (
          ""
        ) : (
          <Fab
            color="primary"
            aria-label="Add"
            onClick={this.handleToggleSideMenu(!showSideMenu)}
            className={classes.fab}
            style={{ backgroundColor: themeColor, outline: "none" }}
          >
            {showSideMenu ? (
              <ChevronRightIcon />
            ) : (
              <MenuIcon style={{ color: "white" }} />
            )}
          </Fab>
        )}
        <div className="main-container">
          <ToolBox />
          <button
            className="hitButton"
            disabled={
              flow.length !== 0 ||
              this.state.disabledCauseCut ||
              tool === "cissors"
            }
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
              visibleChild={this.state.visibleChild}
            >
              <div id="popups">
                {this.state.disabledCauseCut && (
                  <NerfCutPopup
                    title={this.state.disabledMessage}
                    reDraw={this.reDraw}
                    resetCutState={this.resetCutState}
                  />
                )}
                {this.state.hoveredElement && (
                  <PartPopup
                    title={this.state.hoveredElement.title}
                    description={this.state.hoveredElement.description}
                    position={this.state.hoveredElement.popupXY}
                  />
                )}
              </div>
              <Hammer width="3.5%" />
              <span className="animationContainer">
                <Leg1 className="leg" width="35%" onClick={this.displayInfo} />
                <Leg2 className="leg" width="35%" />
                <Leg3 className="leg" width="35%" />
                <Leg4 className="leg" width="35%" />
                <Leg5 className="leg" width="35%" />
                <Leg6 className="leg" width="35%" />
              </span>
              <Moelle2 width="25%" onClick={this.displayInfo} />
              <Nerf width="21%" onClick={this.cutNerf} />
              <Moelle width="21%" />
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
