/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';

const FieldComponent = props => (
  <div className={`flex fd-column flex-start frc-block__field col-${props.col}`}>
    <div className="frc-block__field-label">
      {props.label}
    </div>
    <div className="frc-block__field-value">
      {typeof props.value === 'object' ? JSON.stringify(props.value) : props.value}
    </div>
  </div>
);

FieldComponent.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  col: PropTypes.number,
};

export default FieldComponent;
