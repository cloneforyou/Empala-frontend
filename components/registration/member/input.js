import React from 'react';

const EmpalaInput = (props) => {
  return(
    <form className=''>
      <label className='registration-label' htmlFor={props.id}>{props.label}</label>
      <input className='form-control border-0' id={props.id} type={props.type} placeholder={props.placeholder} />
    </form>
  )
};

export default EmpalaInput;