import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import Switch from 'react-switch';
import {
  Col,
  Row,
} from 'reactstrap';
import PropTypes from 'prop-types';
import TabComponent from './TabComponent';
import Resume from './Resume';
import SettingManager from './Settings/SettingManager';
import './Description.css';
import { defaultLang, themeColor } from '../../actions';
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
  const {
    dispatchDefaultLanguage,
  } = this.props;
  dispatchDefaultLanguage({ newLang });
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

render() {
  const {
    obserViewActive,
    t,
    toggleTitle,
    showTitle,
  } = this.props;
  const { openModal } = this.state;
  return (
    <div className="description-container">
      <TabComponent
        obserViewActive={obserViewActive}
        t={t}
      />
      <Row className="title-switch">
        <Col xs={8}>
          <h4 className="display-title">{t('Display Lab title')}</h4>
        </Col>
        <Col xs={4}>
          <Switch
            onChange={toggleTitle}
            checked={showTitle}
            id="title-switch"
          />
        </Col>
      </Row>
      <Resume t={t} />
      <SettingManager
        handleChangeLang={this.handleChangeLang}
        onOpenModal={this.onOpenModal}
        onCloseModal={this.onCloseModal}
        handleChangeComplete={this.handleChangeComplete}
        openModal={openModal}
        themeColor={themeColor}
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
  obserViewActive: PropTypes.bool.isRequired,
  showTitle: PropTypes.bool.isRequired,
  toggleTitle: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  themeColor: state.setting.themeColor,
  defaultLang: state.setting.defaultLang,
});

const mapDispatchToProps = {
  dispatchThemeColor: themeColor,
  dispatchDefaultLanguage: defaultLang,
};

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(Description);


export default withNamespaces('translations')(connectedComponent);
