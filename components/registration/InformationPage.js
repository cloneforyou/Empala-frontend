import React from 'react';
import PropTypes from 'prop-types';

import NavButtons from './NavButtons';


const propTypes = {
  annualFeesDisclaimer: PropTypes.string.isRequired,
};

const InformationPage = ({ annualFeesDisclaimer }) => (
  <div className="information-container">
    <div
      className="h-100"
      dangerouslySetInnerHTML={{ __html: annualFeesDisclaimer }}
    />
    <NavButtons
      tabName="info"
      tabIndex={1}
    />
  </div>
);

InformationPage.propTypes = propTypes;

export default InformationPage;
