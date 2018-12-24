import React from 'react';
import PropTypes from 'prop-types';


const propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  useClassName: PropTypes.string,
};

const defaultProps = {
  className: '',
  useClassName: '',
};


function DashboardIcon({
  useClassName, className, name, viewBox, ...props
}) {
  return (
    <svg className={className} viewBox={viewBox} {...props}>
      <use className={useClassName} xlinkHref={`#${name}`} />
    </svg>
  );
}

DashboardIcon.propTypes = propTypes;
DashboardIcon.defaultProps = defaultProps;

export default DashboardIcon;
