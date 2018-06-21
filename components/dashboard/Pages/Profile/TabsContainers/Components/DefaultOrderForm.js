import React from 'react';
import FormGroupMapping from './FormGroupMapping';
import { connect } from 'react-redux';
import { getInfoByZipCode, setInputFieldValueById, toggleCheckboxById } from '../../../../../../actions/registration';
import { openModal } from '../../../../../../actions/dashboard';

const DefaultOrderForm = props => (
  <div>
    {
      props.list.length > 0 && props.list.map(item => <FormGroupMapping {...{ ...props, item }} />)
    }
  </div>
);
export default connect(
  () => {},
  (dispatch => (
    {
      setInputValueById: e => dispatch(setInputFieldValueById(id, value)),
      setSelectedValueById: (id, value) => dispatch(setInputFieldValueById(id, value)),
      toggleCheckboxById: (e, checked) => dispatch(toggleCheckboxById(e.target.id)),
    })
  ),
)(DefaultOrderForm);

