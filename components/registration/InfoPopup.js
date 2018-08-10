import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { closeInfoPopup } from '../../actions/registration';
import { getPopupTextById, getPopupTitleById } from '../../utils/registrationUtils';

const mapStateToProps = state => ({
  showInfoPopup: state.registration.showInfoPopup,
});

const mapDispatchToProps = dispatch => ({
  closeInfoPopup: () => dispatch(closeInfoPopup()),
});

class InfoPopup extends Component {

  componentWillMount() {
    document.addEventListener('click', this.handldeClickOutsideBackground);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handldeClickOutsideBackground);
  }

  handldeClickOutsideBackground = (event) => {
    if (!this.infoPopup.contains(event.target)) {
      this.props.closeInfoPopup();
    }
  };

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

InfoPopup.propTypes = {
  open: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(InfoPopup);