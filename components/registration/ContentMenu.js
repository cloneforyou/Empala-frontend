import React from "react";
import ContentMenuTabs from './ContentMenuTabs';
import ContentMenuItems from './ContentMenuItems';

export default class ContentMenu extends React.Component {

  componentWillMount() {
    console.log(this.props)
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log(this.props)
  //   console.log(nextProps)
  //   if (this.props.tabName !== nextProps.tabName) {
  //     nextProps.getMenuItems(nextProps.tabName)
  //   }
  // }

  render() {
    return (
      <div className=''>
        <ContentMenuTabs />
        <ContentMenuItems {...this.props} />

      </div>
    );
  }
}
