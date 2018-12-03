import React from 'react';
import NavButtons from './NavButtons';

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

export default InformationPage;
