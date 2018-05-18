import React from 'react';
import Header from '../components/registration/Header';
import Content from '../components/registration/Content';
import Footer from '../components/registration/Footer';
import stylesheet from '../assets/styles/main.scss'
import { getMenuItems } from "../actions/registration";
import { getMenuItemsByTabName } from "../utils/registrationUtils";
import { withReduxSaga } from "../store";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const env = 'undefined' !== process ? process.env.SERVER : null;

class Registration extends React.PureComponent {

  static async getInitialProps({store, isServer}) {
    console.log('registration', store);
    const tabName = store.registration ? store.registration.tabName : 'member';
    const tabIndex = store.registration ? store.registration.tabIndex : 1 ;
    store.dispatch(getMenuItems(getMenuItemsByTabName(tabName)));
    //if(isServer)store.dispatch('',env)
    return { env }
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <style dangerouslySetInnerHTML={{__html: stylesheet}}/>
          <Header/>
          <Content {...this.props} />
          <Footer/>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default withReduxSaga(Registration);
