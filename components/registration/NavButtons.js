import Link from 'next/link';
import MdArrowBack from 'react-icons/lib/md/arrow-back';
import MdArrowForward from 'react-icons/lib/md/arrow-forward';
import { withReduxSaga } from "../../store";
import { changeTabPage } from "../../actions/registration";
import _ from 'lodash';

function isFieldsFilled(fieldNames, fields) {
  return _.every(fieldNames, (name) => {return (fields[name] && fields[name] !== '')})
}

const NavButtons = (props) => {
  let disabled = !isFieldsFilled(props.fieldNames, props.registrationData);
  if (props.tabName === 'member' &&
    props.registrationData['member_account_password_confirm'] !== props.registrationData['member_account_password'])
  { disabled = true;}
    return (
    <div>
      <button
        type='button'
        className='btn--navigate btn--prev '
        onClick={() => props.dispatch(changeTabPage(props.tabName, props.tabIndex, 'backward'))}
      >
        <MdArrowBack size={20}/>
      </button>
      <button
        type='button'
        className={`btn--navigate btn--next ${disabled ? '' : 'btn--navigate--active'}`}
        onClick={() => props.dispatch(changeTabPage(props.tabName, props.tabIndex, 'forward'))}
        disabled={disabled}
      >
        <MdArrowForward size={20}/>
      </button>
    </div>
  );
}

export default withReduxSaga(NavButtons);