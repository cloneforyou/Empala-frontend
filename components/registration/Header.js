import MdArrowBack from 'react-icons/lib/md/arrow-back';

const Header = () => (
    <div className='header'>
      <div className='row no-gutters header__block'>
        <a href='#' className="header__block__left-link"> <MdArrowBack />Back</a>
        <a href='#'>Logo</a>
        <a href='#' className="header__block__right-link">I have an account (Login)</a>
      </div>
    </div>
);

export default Header