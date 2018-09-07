import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { closeInfoPopup } from '../../../actions/dashboard';
import { getPopupTextById, getPopupTitleById } from '../../../utils/dashboardUtils';

const mapStateToProps = state => ({
  showInfoPopup: state.dashboard.showInfoPopup,
});

const mapDispatchToProps = dispatch => ({
  closeInfoPopup: () => dispatch(closeInfoPopup()),
});

class DashboardInfoPopup extends Component {

  // componentWillMount() {
  //   document.addEventListener('click', this.handleClickOutsideBackground);
  // }
  //
  // componentWillUnmount() {
  //   document.removeEventListener('click', this.handleClickOutsideBackground);
  // }
  //
  // handleClickOutsideBackground(event) {
  //   if (!this.infoPopup.contains(event.target)) {
  //     this.props.closeInfoPopup();
  //   }
  // };

  render() {
    return (
      <div
        className={`info-popup ${this.props.showInfoPopup && 'd-block'}`}
        ref={node => this.infoPopup = node}
      >
        <div className="info-popup__container">
          <div className="info-popup__title">
            <i className="registration__icon icon_width15 margin-right10" />
            { getPopupTitleById(this.props.name) }
          </div>
          <div className="info-popup__text">
            { getPopupTextById(this.props.name) }
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <button
            onClick={this.props.closeInfoPopup}
            className="info-popup__btn"
          >
            Close
          </button>
        </div>
      </div>
    );
  }
}

DashboardInfoPopup.propTypes = {
  open: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardInfoPopup);