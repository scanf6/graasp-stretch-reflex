import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from 'react-responsive-modal';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Settings';
import Fab from '@material-ui/core/Fab';
import LangBox from './LangBox';
import SwitchBox from './SwitchBox';
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

const SettingManager = ({
  t,
  classes,
  themeColor,
  onOpenModal,
  openModal,
  onCloseModal,
  handleChangeComplete,
  handleChangeLang,
}) => {
  const defaultColor = themeColor || '#0f94f8';
  return (
    <div className="SettingManager-container">
      <Fab
        color="primary"
        aria-label="Add"
        onClick={onOpenModal}
        className={classes.fab}
        style={{ backgroundColor: defaultColor }}
      >
        <AddIcon style={{ color: 'white' }} />
      </Fab>
      <Modal open={openModal} onClose={onCloseModal} center>
        <SwitchBox
          handleChangeComplete={handleChangeComplete}
          t={t}
        />
        <LangBox
          handleChangeLang={handleChangeLang}
          t={t}
        />
      </Modal>
    </div>
  );
};

SettingManager.propTypes = {
  t: PropTypes.func.isRequired,
  themeColor: PropTypes.string.isRequired,
  handleChangeLang: PropTypes.func.isRequired,
  handleChangeComplete: PropTypes.func.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  onOpenModal: PropTypes.func.isRequired,
  openModal: PropTypes.bool.isRequired,
  classes: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
  themeColor: state.setting.themeColor,
});

const connectedComponent = connect(mapStateToProps)(SettingManager);
export default withStyles(styles)(connectedComponent);
