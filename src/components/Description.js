import React from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Resume from './Resume';
import './Description.css';

const Description = ({ t }) => (
  <div className="description-container">
    <Resume t={t} />
  </div>
);

Description.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation()(Description);
