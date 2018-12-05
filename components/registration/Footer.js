import React from 'react';
import { connect } from 'react-redux';

const RegistrationFooter = ({ legalMessages }) => {
  let registrationFooterDisclaimer;
  if (legalMessages) {
    legalMessages.forEach((item) => {
      if (item.page === 'Registration Footer Disclaimer') {
        registrationFooterDisclaimer = item.text;
      }
    });
  }
  return (
    <div className="footer">
      <div
        dangerouslySetInnerHTML={{ __html: registrationFooterDisclaimer }}
      />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    legalMessages: state.registration.legalMessages,
  };
}

export default connect(mapStateToProps)(RegistrationFooter);
