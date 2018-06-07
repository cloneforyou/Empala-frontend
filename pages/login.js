import React from 'react';
import { withReduxSaga } from '../store';
import Header from '../components/registration/Header';
import Footer from '../components/registration/Footer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import stylesheet from '../assets/styles/main.scss';

function Login() {
  return (
    <MuiThemeProvider>
      <div>
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
        <Header />
        <div className="index_placeholder noselect">
          <div className="index_placeholder__inner">
            <div>

            </div>
          </div>
        </div>
        <Footer />
      </div>
    </MuiThemeProvider>
  );
}

export default withReduxSaga(Login);
