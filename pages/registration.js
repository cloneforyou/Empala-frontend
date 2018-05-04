import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/registration/Header';
import Content from '../components/registration/Content';
import Footer from '../components/registration/Footer';
import stylesheet from '../assets/styles/main.scss'
import {getMenuItems, setTabName, setTabPageIndex} from "../actions/registration";
import {getMenuItemsByTabName} from "../utils/registrationUtils";
import { withReduxSaga } from "../store";


class Registration extends React.PureComponent {

  static async getInitialProps({store, isServer}) {
    console.log('registration', store);
    const tabName = store.registration ? store.registration.tabName : 'member';
    const tabIndex = store.registration ? store.registration.tabIndex : 1 ;
    store.dispatch(getMenuItems(getMenuItemsByTabName(tabName)));
  }


  // componentWillReceiveProps() {
  //   if (this.props.url.query) {
  //     this.props.dispatch(setTabName(this.props.url.query.name));
  //     this.props.dispatch(setTabPageIndex(this.props.url.query.tabNumber));
  //   }
  // }


  render() {
    console.log('//////////////////////////////', this.props)
    return (
      <div>
        <style dangerouslySetInnerHTML={{__html: stylesheet}}/>
        <Header/>
        <Content {...this.props} />
        <Footer/>
      </div>
    )
  }
}

export default withReduxSaga(Registration);