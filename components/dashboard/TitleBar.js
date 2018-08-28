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
      {props.currentPage && (props.currentPage !== 'global portfolio') && (props.currentPage !== 'funding' && props.currentPage !== 'market') &&
      <div className="d-flex">
        <span>
          <i className={`titlebar__icon titlebar__icon_${props.currentPage}`} />
        </span>
        <span className="titlebar__title">{props.currentPage}</span>
      </div>}

      {props.currentPage && (props.currentPage === 'global portfolio') &&
      <div className="d-flex">
        <span>
          <i className="titlebar__icon titlebar__icon_wallet" />
          {props.iconAccountTitleBar &&
          <i className={`titlebar__icon-country_flag-${props.iconAccountTitleBar}`} />}
        </span>
        <span className="titlebar__title">{props.currentSectionTitleBar}</span>
      </div>}

      {props.currentPage && (props.currentPage === 'funding' || props.currentPage === 'market') &&
      <div className="d-flex">
        <span>
          <i className="titlebar__icon titlebar__icon_wallet" />
        </span>
        <span className="titlebar__title">{props.currentPage}</span>
      </div>}
    </div>
  );
}

TitleBar.propTypes = {
  currentPage: PropTypes.string.isRequired,
  iconAccountTitleBar: PropTypes.string,
  currentSectionTitleBar: PropTypes.string,
};

export default connect(mapStateToProps)(TitleBar);
