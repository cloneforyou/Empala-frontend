import MdArrowBack from 'react-icons/lib/md/arrow-back';
import MdArrowForward from 'react-icons/lib/md/arrow-forward';

const Button = () => (
  <div className='buttons__container'>
    <button type='button' className='btn--navigate btn--prev'> <MdArrowBack /> </button>
    <button type='button' className='btn--navigate btn--next'> <MdArrowForward /> </button>
  </div>
);

export default Button
