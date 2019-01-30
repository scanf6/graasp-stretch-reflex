import React from 'react';
import { withNamespaces } from 'react-i18next';
import './Preview.css';

export const Preview = () => (
  <div className="preview-container" />
);

Preview.propTypes = {};

export default withNamespaces('translations')(Preview);
