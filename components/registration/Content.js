import React from 'react';
import NavButtons from './NavButtons';
import {getMenuItems, setTabName, setTabPageIndex} from "../../actions/registration";
import {getMenuItemsByTabName, getTabContentByTabName} from "../../utils/registrationUtils";
import { connect } from "react-redux";
import ContentMenuTabs from './ContentMenuTabs';
import ContentMenuItems from './ContentMenuItems';
import InformationPage from "./InformationPage";


function mapStateToProps(state) {
  return {
    tabName: state.registration.tabName || 'info',
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


class Content extends React.Component{
  constructor(props) {
    super(props)
    this.state = {checkedButton: false}
  }

  componentWillReceiveProps(nextProps) {
    // console.log(this.props);
    // console.log(nextProps);
    if (this.props.tabName !== nextProps.tabName) {
      this.props.getMenuItems(nextProps.tabName)
    }
  }

  checkButton = () => {
    this.setState(prevState => {
      return {
        checkedButton: !prevState.checkedButton
      }
    })
  }

  render() {
    if (this.props.tabName === 'info') {
      this.props.setTabName('info');
      this.props.setTabPageIndex(1);
      return <InformationPage />
    }

    const pageContent = getTabContentByTabName(this.props.tabName, this.props.tabIndex-1);

    if (!this.props.menuItems || this.props.menuItems.length === 0) {
      this.props.getMenuItems(this.props.tabName);
    }

    return(
      <div className='onboard'>
        <div className='onboard__container'>
          <div className='row no-gutters onboard__col'>
            <InformationPage />
            <DatePickerField />
            {/*<div className='col-6 onboard__left-block'>*/}

              {/*<div className="onboard__left-block--top">*/}
                {/*<ContentMenuTabs />*/}
              {/*</div>*/}
              {/*<div className="onboard__left-block--center">*/}
                {/*<ContentMenuItems menuItems={this.props.menuItems} tabIndex={this.props.tabIndex} />*/}
              {/*</div>*/}
            {/*</div>*/}
            {/*<div className='col-6 onboard__right-block'>*/}

              <div className="onboard__right-block--center row">
                {/*<ContentFillingInformation {...props} />*/}
                {pageContent.tabContent}
              </div>
              <div className="onboard__right-block--bottom">
                <NavButtons
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