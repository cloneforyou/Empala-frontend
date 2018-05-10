import Link from 'next/link';
import MdArrowBack from 'react-icons/lib/md/arrow-back';
import MdArrowForward from 'react-icons/lib/md/arrow-forward';
import { withReduxSaga } from "../../store";
import { changeTabPage } from "../../actions/registration";


const LeafLink = (props) => (
  <Link as={`/registration/${props.name}/${props.tabNumber}`}
        href={`/registration?name=${props.name}&tabNumber=${props.tabNumber}`}>
    {props.children}
  </Link>
);


const NavButtons = (props) => (
  <div>
    <button
      type='button'
      className='btn--navigate btn--prev'
      onClick={() => props.dispatch(changeTabPage(props.tabName, props.tabIndex, 'backward'))}
    >
      <MdArrowBack size={20}/>
    </button>
    <button
      type='button'
      className='btn--navigate btn--next'
      onClick={() => props.dispatch(changeTabPage(props.tabName, props.tabIndex, 'forward'))}
    >
      <MdArrowForward size={20}/>
    </button>
  </div>
);

export default withReduxSaga(NavButtons);