import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import Switch from 'react-switch';
import {
  Col,
  Row,
} from 'reactstrap';
import Modal from 'react-responsive-modal';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Settings';
import Fab from '@material-ui/core/Fab';
import i18n from '../../config/i18n';
import LangBox from './LangBox';
import SwitchBox from './SwitchBox';
import { AppState } from '../../config/AppState';
import {
  changeThemeColor,
  changeLanguage,
  toggleHeader,
} from '../../actions';
import './Settings.css';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
  fab: {
    right: theme.spacing.unit * 4,
    bottom: theme.spacing.unit * 4,
    position: 'fixed',
  },
});

export class SettingsModal extends Component {
  state = AppState;

  handleToggleHeader = showHeader => () => {
    const { dispatchToggleHeader } = this.props;
    dispatchToggleHeader(showHeader);
    this.postMessage({ show_header: showHeader });
  };

  handleChangeComplete = (color) => {
    const newColor = color.hex;
    const { dispatchChangeThemeColor } = this.props;
    dispatchChangeThemeColor(newColor);
    this.postMessage({ theme_color: newColor });
  }

  handleChangeLanguage = (lang) => {
    const newLang = lang.value;
    const { dispatchChangeLanguage } = this.props;
    i18n.changeLanguage(newLang);
    dispatchChangeLanguage(newLang);
  };

  onOpenModal = () => {
    this.setState({ openModal: true });
    this.postMessage({ open_setting_modal: true });
  };

  onCloseModal = () => {
    this.setState({ openModal: false });
    this.postMessage({ open_setting_modal: false });
  };

  postMessage = (data) => {
    const message = JSON.stringify(data);
    console.log('message', message);
    if (document.postMessage) {
      document.postMessage(message, '*');
    } else if (window.postMessage) {
      window.postMessage(message, '*');
    } else {
      console.error('unable to find postMessage');
    }
  };

  render() {
    const {
      t,
      classes,
      showHeader,
      themeColor,
    } = this.props;
    const { openModal } = this.state;

    return (
      <div className="Setting-container">
        <Fab
          color="primary"
          aria-label="Add"
          onClick={this.onOpenModal}
          className={classes.fab}
          style={{ backgroundColor: themeColor }}
        >
          <AddIcon style={{ color: 'white' }} />
        </Fab>
        <Modal open={openModal} onClose={this.onCloseModal} center>
          <SwitchBox
            themeColor={themeColor}
            handleChangeComplete={this.handleChangeComplete}
            t={t}
          />
          <LangBox
            handleChangeLanguage={this.handleChangeLanguage}
            t={t}
          />
          <Row className="title-switch">
            <Col xs={8}>
              <h5 className="display-title">{t('Display Lab title')}</h5>
            </Col>
            <Col xs={4}>
              <Switch
                onChange={this.handleToggleHeader(!showHeader)}
                checked={showHeader}
                id="title-switch"
              />
            </Col>
          </Row>
        </Modal>
      </div>
    );
  }
}

SettingsModal.propTypes = {
  t: PropTypes.func.isRequired,
  themeColor: PropTypes.string.isRequired,
  classes: PropTypes.shape({}).isRequired,
  showHeader: PropTypes.bool.isRequired,
  dispatchChangeThemeColor: PropTypes.func.isRequired,
  dispatchChangeLanguage: PropTypes.func.isRequired,
  dispatchToggleHeader: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  themeColor: state.layout.themeColor,
  showHeader: state.layout.showHeader,
});

const mapDispatchToProps = {
  dispatchChangeThemeColor: changeThemeColor,
  dispatchChangeLanguage: changeLanguage,
  dispatchToggleHeader: toggleHeader,
};

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(SettingsModal);

const StyledComponent = withStyles(styles)(ConnectedComponent);

export default withTranslation()(StyledComponent);
