import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import { Col, Row } from 'reactstrap';
import { AppState } from '../config/AppState';
import Description from '../components/Controls/Description';
import Preview from '../components/Preview/Preview';
import './StudentView.css';

class StudentView extends Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    themeColor: PropTypes.string.isRequired,
    showTitle: PropTypes.bool.isRequired,
  };

  state = AppState;

  render() {
    const { obserViewActive } = this.state;
    const { t, themeColor, showTitle } = this.props;
    const defaultColor = themeColor || '#0f94f8';
    return (
      <div className="main-container">
        { showTitle ? (
          <Row>
            <Col md={12}>
              <h1 className="lab-title" style={{ backgroundColor: defaultColor }}>{t('Lab Title')}</h1>
            </Col>
          </Row>
        ) : ''
        }
        <Row className="app-loader">
          <Col md={8} className="preview-container">
            <Preview t={t} />
          </Col>
          <Col md={4} className="controls-container">
            <Description
              t={t}
              obserViewActive={obserViewActive}
            />
          </Col>
        </Row>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  themeColor: state.setting.themeColor,
  showTitle: state.setting.showTitle,
});

const connectedComponents = connect(mapStateToProps)(StudentView);
export default withNamespaces('translations')(connectedComponents);
