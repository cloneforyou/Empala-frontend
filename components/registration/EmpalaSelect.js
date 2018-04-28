import React from 'react';

const EmpalaSelect = (props) => {
  console.log('Select props -------------------', props )
  return(
    <div className='input-group mb-3'>
        <select className="custom-select border-0" value={''} >
          <option value="" disabled selected hidden>{props.label}</option>
          {props.options.map((option) => (<option key={Date.now()+ Math.random()} value={option.value}>{option.title}</option>))}
        </select>
    </div>
  )
};

export default EmpalaSelect;