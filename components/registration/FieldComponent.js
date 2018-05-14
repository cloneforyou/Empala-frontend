import React from 'react';

const FieldComponent = (props) => {
  return (
    <div className={`flex fd-column flex-start frc-block__field col-${props.col}`}>
      <div className='frc-block__field-label'>
        {props.label}
      </div>
      <div className='frc-block__field-value'>
        {typeof props.value === 'object' ? JSON.stringify(props.value) : props.value}
      </div>
    </div>
  )
};

export default FieldComponent;
