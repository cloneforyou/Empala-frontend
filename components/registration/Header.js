import IoIosArrowThinLeft from 'react-icons/lib/io/ios-arrow-thin-left';

const Header = () => (
    <div className='header'>
      <div className='row no-gutters header__block'>
        <a href='#' className="header__block__left-link"> <IoIosArrowThinLeft size={52} /><sapn>Back</sapn></a>
        <a href='#'>Logo</a>
        <a href='#' className="header__block__right-link">I have an account (Login)</a>
      </div>
    </div>
);

export default Header