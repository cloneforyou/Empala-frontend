import React from 'react';
import TextField from 'material-ui/TextField';
import '../../assets/styles/modules/_input-group.scss'

const EmpalaInput = (props) => {
  return (
    <div className={props.col ? `registration-group col-md-${props.col}` : 'registration-group col-12'}>
      {/*<label className='registration-label'*/}
             {/*htmlFor={props.id}>*/}
        {/*{props.label}*/}
      {/*</label>*/}
        <TextField
          id={props.id}
          type={props.type}
          floatingLabelText={props.label}
          floatingLabelFixed={true}
          floatingLabelStyle={{color: '#98c73a'}}
          hintText={props.placeholder}
          style={{ width: '100%' }}
          underlineStyle={{ borderBottom : '2px solid #e0e0e0' }}
          hintStyle={{ color: '#858c99' }}
          inputStyle={{ color: '#858c99' }}
          value={props.value}
          onChange={(e) => props.handleChange(e)}
          disabled={props.disabled}
          errorText={props.errorText}
        />
    </div>
  )
};

export default EmpalaInput;
