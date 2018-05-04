import React from 'react';

const EmpalaInput = (props) => {
  
  return(
    <div className="registration-group">
      <label className='registration-label' htmlFor={props.id}>{props.label}</label>
      <input className='registration-input' id={props.id} type={props.type} placeholder={props.placeholder} />
    </div>
  )
};

export default EmpalaInput;