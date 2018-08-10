import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { closeInfoPopup } from '../../actions/registration';

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
            Equity Investments
          </div>
          <div className="info-popup__text">
            Liquorice cake marshmallow lemon drops marzipan dragée lollipop
            marshmallow. Jelly cake ice cream cupcake muffin cookie jelly beans
            pudding bonbon. Tiramisu pudding wafer croissant tart. Cotton candy
            tiramisu macaroon donut pie candy canes.
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