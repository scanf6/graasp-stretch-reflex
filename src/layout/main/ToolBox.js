import React, { Component } from "react";
import { chooseCissors } from "../../actions/index";
import { connect } from "react-redux";
import { ReactComponent as Scissors } from "../../resources/scissors.svg";
import "./ToolBox.css";

class ToolBox extends Component {
  render() {
    const { chooseCissors, flow, tool } = this.props;
    if (flow.length !== 0) {
      return null;
    } else {
      return (
        <div className="toolBox">
          <b>Outils</b>
          <p>Choisissez un outils pour interragir avec l'experience!</p>
          <div className="tools">
            <button
              className={`btn ${
                tool === "cissors" ? "btn--white" : "btn--red"
              }`}
              onClick={chooseCissors}
            >
              <Scissors
                fill={`${tool === "cissors" ? "#474747" : "white"} `}
                width="20px"
                height="20px"
              />
              <span style={{ verticalAlign: "middle" }}>Cisseaux</span>
            </button>
            <button className="btn btn--red">Outil2</button>
            <button className="btn btn--red">Outil3</button>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  flow: state.flow,
  tool: state.tool
});

export default connect(mapStateToProps, { chooseCissors })(ToolBox);
