import { connect } from "react-redux";
import MdArrowBack from 'react-icons/lib/md/arrow-back';
import MdArrowForward from 'react-icons/lib/md/arrow-forward';
import {
  changeTabPage,
  validateFieldsBlank
} from "../../actions/registration";
import _ from 'lodash';

function isFieldsFilled(fieldNames, fields) {
  return _.every(fieldNames, (name) => {return (fields[name] && fields[name] !== '')})
}

function mapStateToProps(state) {
  return {
    tabName: state.registration.tabName || 'info',
    tabIndex: state.registration.tabIndex || 1,
    registrationData: state.registration.registrationData,
    errors: state.fieldsErrors,
    checkboxes: state.registration.checkboxes,
  }
}

function mapDispatchToProps(dispatch) {
  return ({
    validateFieldsBlank: (fieldNames) => dispatch(validateFieldsBlank(fieldNames)),
    changeTabPage: (tabName, tabIndex, direction) => dispatch(changeTabPage(tabName, tabIndex, direction)),
  })
}

function filterActiveCheckboxes(checkboxesList) {
  return Object.keys(checkboxesList).filter((key) => (/identity_checkbox/.test(key)) && checkboxesList[key])
}

const NavButtons = (props) => {
  let disabled = !isFieldsFilled(props.fieldNames, props.registrationData);
  if (props.tabName === 'member' &&
    props.registrationData['member_account_password_confirm'] !== props.registrationData['member_account_password'])
  {
    disabled = true;
  } else if (props.tabName === 'identity' && props.tabIndex === 4) {
    disabled = filterActiveCheckboxes(props.checkboxes).length > 0;
  }
    return (
    <div>
      <button
        type='button'
        className='btn--navigate btn--prev '
        onClick={() => props.changeTabPage(props.tabName, props.tabIndex, 'backward')}
      >
        <MdArrowBack size={20}/>
      </button>
      <div style={{display: 'inline-block'}}
           onClick={()=>props.validateFieldsBlank(props.fieldNames)}>
      <button
        type='button'
        className={`btn--navigate btn--next ${disabled ? '' : 'btn--navigate--active'}`}
        onClick={() => props.changeTabPage(props.tabName, props.tabIndex, 'forward')}
        disabled={disabled}
      >
        <MdArrowForward size={20}/>
      </button>
    </div>
    </div>
  );
};

export default connect(mapStateToProps,mapDispatchToProps)(NavButtons);
