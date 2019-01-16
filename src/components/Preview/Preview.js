import React from 'react';
import { withNamespaces } from 'react-i18next';
import PropTypes from 'prop-types';
import './Preview.css';

export const Preview = ({ t }) => (
  <div className="preview-container">
    <p>&nbsp;</p>
  </div>
);

Preview.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withNamespaces('translations')(Preview);
