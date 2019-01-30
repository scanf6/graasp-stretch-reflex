import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Fab from '@material-ui/core/Fab';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Description from '../Controls/Description';
import Preview from '../Preview/Preview';
import Styles from './Styles';

const styles = Styles;

class PersistentDrawerRight extends React.Component {
  state = { open: false };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const {
      classes,
      theme,
      showTitle,
      themeColor,
      obserViewActive,
      t,
    } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <CssBaseline />
        { showTitle ? (
          <AppBar
            position="fixed"
            className={classNames(classes.appBar, {
              [classes.appBarShift]: open,
            })}
          >
            <Toolbar disableGutters={!open} style={{ backgroundColor: themeColor }}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, open && classes.hide)}
                style={{ outline: 'none' }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h4" color="inherit" noWrap className={classes.title}>
                {t('Lab Title')}
              </Typography>
            </Toolbar>
          </AppBar>
        ) : ''
        }
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          { showTitle ? (
            <div className={classes.drawerHeader} />
          ) : ''
          }
          { showTitle ? ''
            : (
              <Fab
                color="primary"
                aria-label="Add"
                onClick={open ? this.handleDrawerClose : this.handleDrawerOpen}
                className={classes.fab}
                style={{ backgroundColor: themeColor, outline: 'none' }}
              >
                { open ? <ChevronRightIcon /> : <MenuIcon style={{ color: 'white' }} /> }
              </Fab>
            )
          }
          <Preview t={t} />
        </main>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="right"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose} style={{ outline: 'none' }}>
              {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
            <h3>{t('Observe')}</h3>
          </div>
          <Divider />
          <Description
            t={t}
            obserViewActive={obserViewActive}
          />
        </Drawer>
      </div>
    );
  }
}

PersistentDrawerRight.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  theme: PropTypes.shape({}).isRequired,
  themeColor: PropTypes.string.isRequired,
  showTitle: PropTypes.bool.isRequired,
  obserViewActive: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  themeColor: state.setting.themeColor,
  showTitle: state.setting.showTitle,
});

const connectedComponent = connect(mapStateToProps)(PersistentDrawerRight);

export default withStyles(styles, { withTheme: true })(connectedComponent);
