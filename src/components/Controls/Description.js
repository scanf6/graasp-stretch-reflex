import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import i18n from '../../config/i18n';
import Resume from './Resume';
import SettingManager from './Settings/SettingManager';
import './Description.css';
import { titleState, defaultLang, themeColor } from '../../actions';
import { AppState } from '../../config/AppState';

export class Description extends Component {
  state = AppState;

  handleChangeComplete = (color) => {
    const newColor = color.hex;
    const {
      dispatchThemeColor,
    } = this.props;
    dispatchThemeColor({ newColor });
  }

handleChangeLang = (lang) => {
  const newLang = lang.value;
  const { dispatchDefaultLanguage } = this.props;
  i18n.changeLanguage(newLang);
  dispatchDefaultLanguage({ newLang });
  postMessage({ default_lang: newLang });
}

onOpenModal = () => {
  this.setState({
    openModal: true,
  });
}

onCloseModal = () => {
  this.setState({
    openModal: false,
  });
}

toggleTitle = () => {
  const { showTitle } = this.state;
  this.setState({ showTitle: !showTitle });
  const { dispatchTitleState } = this.props;
  dispatchTitleState({ showTitle });
}

render() {
  const { t } = this.props;
  const { openModal } = this.state;
  return (
    <div className="description-container">
      <Resume t={t} />
      <SettingManager
        handleChangeLang={this.handleChangeLang}
        onOpenModal={this.onOpenModal}
        onCloseModal={this.onCloseModal}
        handleChangeComplete={this.handleChangeComplete}
        openModal={openModal}
        themeColor={themeColor}
        toggleTitle={this.toggleTitle}
        t={t}
      />
    </div>
  );
}
}

Description.propTypes = {
  t: PropTypes.func.isRequired,
  dispatchDefaultLanguage: PropTypes.func.isRequired,
  dispatchThemeColor: PropTypes.func.isRequired,
  dispatchTitleState: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  themeColor: state.setting.themeColor,
  defaultLang: state.setting.defaultLang,
  titleState: state.setting.showTitle,
});

const mapDispatchToProps = {
  dispatchThemeColor: themeColor,
  dispatchDefaultLanguage: defaultLang,
  dispatchTitleState: titleState,
};

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(Description);


export default withTranslation()(connectedComponent);
