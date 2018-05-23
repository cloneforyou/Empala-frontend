import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function mapStateToProps(state) {
  return {
    currentPage: state.dashboard.currentPage,
  };
}

function TitleBar(props) {
  return (
    <div className="titlebar">
      <span
        className={`titlebar__icon titlebar__icon_${props.currentPage}`}
      />
      <span className="titlebar__title">{props.currentPage}</span>
    </div>
  );
}

TitleBar.propTypes = {
  currentPage: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(TitleBar);
