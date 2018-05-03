import React from 'react';
import ContentMenu from './ContentMenu';
import ContentFillingInformation from './ContentFillingInformation';
import Button from './Button';
import {getMenuItems, setTabName, setTabPageIndex} from "../../actions/registration";
import {getMenuItemsByTabName, getTabContentByTabName} from "../../utils/registrationUtils";
import { connect } from "react-redux";


function mapStateToProps(state) {
  return {
    tabName: state.registration.tabName || 'member',
    tabIndex: state.registration.tabIndex || 1,
    menuItems: state.registration.menuItems,
  }
}

function mapDispatchToProps(dispatch) {
  return (
    {
      getMenuItems: (tabName) => {dispatch(getMenuItems(getMenuItemsByTabName(tabName)))},
      setTabName: (tabName) => dispatch(setTabName(tabName)),
      setTabPageIndex:(tabIndex) => dispatch(setTabPageIndex(tabIndex)),
    })
}


class Content extends React.PureComponent {

  componentWillReceiveProps(nextProps) {
    console.log(this.props)
    console.log(nextProps)
    if (this.props.tabName !== nextProps.tabName) {
      this.props.getMenuItems(nextProps.tabName)
    }
  }

  render() {
    const pageContent = getTabContentByTabName(this.props.tabName, this.props.tabIndex-1);

    if (!this.props.menuItems || this.props.menuItems.length == 0) {
      this.props.getMenuItems(this.props.tabName); 
    }
    // console.log('content props -->', props.tabName)
    // console.log('content props -->', props.tabIndex-1)
    // console.log('content props -->', pageContent)
    return(
      <div className='onboard'>
        <div className='onboard__container'>
          <div className='row no-gutters onboard__container__col'>
            <div className='col-6 relative onboard__left-block menu-items--min-height'>
              <ContentMenu menuItems={this.props.menuItems} tabIndex={this.props.tabIndex}  />
            </div>
            <div className='col-6 onboard__right-block'>

              <div className="onboard__right-block--center">
                {/*<ContentFillingInformation {...props} />*/}
                {pageContent.tabContent}
              </div>
              <div className="onboard__right-block--bottom">
                <Button
                  tabName={this.props.tabName}
                  tabIndex={this.props.tabIndex} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Content);