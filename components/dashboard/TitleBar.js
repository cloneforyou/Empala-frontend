import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function mapStateToProps(state) {
  return {
    currentPage: state.dashboard.activePageDashboard,
  };
}

function TitleBar(props) {
  return (
    <div className="titlebar">
      <span>
        <i className="titlebar__icon titlebar__icon_wallet"></i>
      </span>
      <span>
        <i className={`titlebar__icon titlebar__icon_${props.currentPage}`}></i>
    </span>
      <span className="titlebar__title">{props.currentPage}</span>
    </div>
  );
}

TitleBar.propTypes = {
  currentPage: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(TitleBar);
