/* eslint-disable max-len */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';


class Footer extends PureComponent {
  render() {
    let platformDisclaimerFooter;
    if (this.props.legalMessages) {
      // Todo add some logic
      this.props.legalMessages.forEach((item) => {
        if (item.country === 'USA' && item.page === 'Platform Disclaimer Footer') {
          platformDisclaimerFooter = item.text;
        }
      })
    }
    return (
      <div className={
        `${this.props.full ? 'dashboard__footer dashboard__footer_full' : 'dashboard__footer'}
        dashboard__footer_${this.props.theme}`}
      >
        <div
          dangerouslySetInnerHTML={{ __html: platformDisclaimerFooter }}
        />
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    legalMessages: state.dashboard.legalMessages,
  };
}

export default connect(mapStateToProps)(Footer);
