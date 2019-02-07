import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { AppState } from '../config/AppState';
import SideMenu from '../components/Main/SideMenu';
import './StudentView.css';

class StudentView extends Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
  };

  state = AppState;

  render() {
    const { obserViewActive } = this.state;
    const { t } = this.props;
    return (
      <div className="main-container">
        <SideMenu
          obserViewActive={obserViewActive}
          t={t}
        />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  themeColor: state.setting.themeColor,
  showTitle: state.setting.showTitle,
});

const connectedComponents = connect(mapStateToProps)(StudentView);
export default withTranslation()(connectedComponents);
