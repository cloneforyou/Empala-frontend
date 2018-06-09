import React from 'react';
import FormGroupMapping from './FormGroupMapping';

const DefaultOrderForm = props => (
  <div>
    {
      props.list.length > 0 && props.list.map(item => <FormGroupMapping item={item} />)
    }
  </div>
);
export default DefaultOrderForm;
