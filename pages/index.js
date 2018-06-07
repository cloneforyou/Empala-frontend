/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { withReduxSaga } from '../store';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from '../components/registration/Header';
import Footer from '../components/registration/Footer';
import stylesheet from '../assets/styles/main.scss';
import Login from '../components/registrationForms/Login';


function Index() {
  return (
    <MuiThemeProvider>
      <div>
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
        <Header />
        <div className="index_placeholder noselect">
          <div className="index_placeholder__inner">
            <div>
              <Login />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </MuiThemeProvider>
  );
}

export default withReduxSaga(Index);
