import Link from 'next/link';
import MdArrowBack from 'react-icons/lib/md/arrow-back';
import MdArrowForward from 'react-icons/lib/md/arrow-forward';
import { withReduxSaga } from "../../store";
import {changeTabPage, validateFieldsBlank} from "../../actions/registration";
import _ from 'lodash';

function isFieldsFilled(fieldNames, fields) {
  return _.every(fieldNames, (name) => {return (fields[name] && fields[name] !== '')})
}

const NavButtons = (props) => {
  let disabled = !isFieldsFilled(props.fieldNames, props.registrationData);
  // console.log(' *** disabled',disabled, props.fieldNames );
  if (props.tabName === 'member' &&
    props.registrationData['member_account_password_confirm'] !== props.registrationData['member_account_password'])
  {
    disabled = true;
  } else if (props.tabName === 'identity' && props.tabIndex === 4) {
    disabled = false;
  }
    return (
    <div>
      <button
        type='button'
        className='btn--navigate btn--prev '
        onClick={() => props.dispatch(changeTabPage(props.tabName, props.tabIndex, 'backward'))}
      >
        <MdArrowBack size={20}/>
      </button>
      <div style={{display: 'inline-block'}}
           onClick={()=> props.dispatch(validateFieldsBlank(props.fieldNames))}>
      <button
        type='button'
        className={`btn--navigate btn--next ${disabled ? '' : 'btn--navigate--active'}`}
        onClick={() => props.dispatch(changeTabPage(props.tabName, props.tabIndex, 'forward'))}
        disabled={disabled}
      >
        <MdArrowForward size={20}/>
      </button>
    </div>
    </div>
  );
}

export default withReduxSaga(NavButtons);
