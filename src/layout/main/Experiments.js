import React, { Component } from "react";
import { connect } from "react-redux";
import { chooseCissors } from "../../actions/index";
import { ReactComponent as Scissors } from "../../resources/scissors.svg";
import Done from "@material-ui/icons/DoneRounded"
import { Button } from "@material-ui/core";
import "./Experiments.css";

class Experiments extends Component {
  render() {
    const stimulationButtonStyle = {
      backgroundColor: "#e2b415",
      color: "#FFF"
    };

    const {
      chooseCissors,
      flow,
      tool,
      nerfSensitiveCut,
      nerfMotorCut,
      startAnimationCutNerfSensitif,
      startAnimationCutNerfMotor,
      cancelCutNerfSensitif,
      cancelCutNerfMotor,
      cutBoutPeripherique,
      cutMotorBoutPeripherique,
      cutBoutCentral,
      cutMotorBoutCentral
    } = this.props;
    if (flow.length !== 0) {
      return null;
    }
    return (
      <div className="toolBox">
        <b className="h3">Expériences de section</b>
        <div>
          <p>
          {!nerfMotorCut &&
            <span>
              {!nerfSensitiveCut
                ? <Button disabled={nerfSensitiveCut || nerfMotorCut} onClick={()=>startAnimationCutNerfSensitif()} variant="contained" color="primary"><Done/> Sectionner le nerf sensitif</Button> 
                : <Button disabled={!nerfSensitiveCut} onClick={()=>cancelCutNerfSensitif()} className="ml-2 cancelButton" variant="contained" color="secondary">Annuler la section</Button>
              }
              {nerfSensitiveCut && (
                <>
                <Button disabled={!nerfSensitiveCut} onClick={()=>cutBoutPeripherique()} className="ml-2" variant="contained" style={stimulationButtonStyle}>Stimuler le bout périphérique</Button>
                <Button disabled={!nerfSensitiveCut} onClick={()=>cutBoutCentral()} className="ml-2" variant="contained" style={stimulationButtonStyle}>Stimuler le bout central</Button>
                </>
              )}
            </span>
          }
          </p>
          <p>
          {!nerfSensitiveCut &&
            <span>
              {!nerfMotorCut
                ? <Button disabled={nerfMotorCut || nerfSensitiveCut} onClick={()=>startAnimationCutNerfMotor()} variant="contained" color="primary"><Done/> Sectionner le nerf moteur</Button>
                : <Button disabled={!nerfMotorCut} onClick={()=>cancelCutNerfMotor()} className="ml-2 cancelButton" variant="contained" color="secondary">Annuler la section</Button>
              }
              {nerfMotorCut && (
                <>
                <Button disabled={!nerfMotorCut} onClick={()=>cutMotorBoutPeripherique()} className="ml-2" variant="contained" style={stimulationButtonStyle}>Stimuler le bout périphérique</Button>
                <Button disabled={!nerfMotorCut} onClick={()=>cutMotorBoutCentral()} className="ml-2" variant="contained" style={stimulationButtonStyle}>Stimuler le bout central</Button>
                </>
              )}
            </span>
          }
          </p>
        </div>
        {/* <div className="tools">
          <button
            className={`btn ${tool === "cissors" ? "btn--white" : "btn--red"}`}
            onClick={chooseCissors}
          >
            <Scissors
              fill={`${tool === "cissors" ? "#474747" : "white"} `}
              width="20px"
              height="20px"
            />
            <span style={{ verticalAlign: "middle" }}>Cisseaux</span>
          </button>
        </div> */}

      </div>
    );
  }
}

const mapStateToProps = state => ({
  flow: state.flow,
  tool: state.tool
});

export default connect(mapStateToProps, { chooseCissors })(Experiments);
