import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { setWatchListNumber } from '../../../actions/dashboard';


class WidgetDotsMenu extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      menuIsOpen: false,
    };
  }
  getMenuContentByWidgetName = name => {
    if (name === 'Watchlists') {
      return(
        <ul className={this.state.menuIsOpen ?
          'dropdown-menu dropdown-menu-right show widget-menu__list' :
          'dropdown-menu dropdown-menu-right  widget-menu__list'} >
          {this.props.watchListsNames.map((name, i) =>
            <li
              key={Math.random()}
              className="dropdown-item widget-menu__item"
              onClick={()=> {
                this.props.setWatchListNumber(i);
                this.toggleMenu();
              }}
            >{name}</li>)}
        </ul>)
    }
    return (
      <ul className={this.state.menuIsOpen ?
        'dropdown-menu dropdown-menu-right show widget-menu__list' :
        'dropdown-menu dropdown-menu-right  widget-menu__list'} >
        <li className="dropdown-item widget-menu__item"><a href="#">Link 1</a></li>
        <li className="dropdown-item widget-menu__item"><a href="#">Link 2</a></li>
        <li className="dropdown-item widget-menu__item"><a href="#">Link 3</a></li>
      </ul>
    )
  };
  toggleMenu = () => {
    const { menuIsOpen } = this.state;
    this.setState({ menuIsOpen: !menuIsOpen });
  };

  render() {
    const { menuIsOpen } = this.state;
    const { name } = this.props;
    return (
      <div className="widget-menu">
        <button className="widget-menu__btn" onClick={this.toggleMenu} />
        {/*<ul className={menuIsOpen ?*/}
          {/*'dropdown-menu dropdown-menu-right show widget-menu__list' :*/}
          {/*'dropdown-menu dropdown-menu-right  widget-menu__list'*/}
        {/*}*/}
        {/*>*/}
          {/*<li className="dropdown-item widget-menu__item"><a href="#">Link 1</a></li>*/}
          {/*<li className="dropdown-item widget-menu__item"><a href="#">Link 2</a></li>*/}
          {/*<li className="dropdown-item widget-menu__item"><a href="#">Link 3</a></li>*/}
        {/*</ul>*/}
        {this.getMenuContentByWidgetName(name)}
      </div>
    );
  }
}


export default connect(state => ({
  watchListsNames: state.dashboard.watchLists ? state.dashboard.watchLists.map(list => list['Name']) : [],
}),
  dispatch => ({
    setWatchListNumber: (i) => dispatch(setWatchListNumber(i))
  }))(WidgetDotsMenu);
