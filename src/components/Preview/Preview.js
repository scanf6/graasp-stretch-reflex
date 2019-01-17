import React from 'react';
import { withNamespaces } from 'react-i18next';
// import PropTypes from 'prop-types';
import './Preview.css';

export const Preview = () => (
  <div className="preview-container">
    <p>&nbsp;</p>
  </div>
);

Preview.propTypes = {};

export default withNamespaces('translations')(Preview);
