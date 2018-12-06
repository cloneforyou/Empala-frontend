import React from 'react';
import NavButtons from './NavButtons';

const InformationPage = ({ annualFeesDisclaimer, accountId }) => {
  let replacedAnnualFeesDisclaimer;
  if (accountId && annualFeesDisclaimer) {
    replacedAnnualFeesDisclaimer = annualFeesDisclaimer.replace(/%%MEMBER_ID%%/, accountId);
  }
  return (
    <div className="information-container">
      <div
        className="h-100"
        dangerouslySetInnerHTML={{ __html: replacedAnnualFeesDisclaimer || annualFeesDisclaimer }}
      />
      <NavButtons
        tabName="info"
        tabIndex={1}
      />
    </div>
  );
};

export default InformationPage;
