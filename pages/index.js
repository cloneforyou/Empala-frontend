/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { withReduxSaga } from '../store';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from '../components/registration/Header';
import Footer from '../components/registration/Footer';
import stylesheet from '../assets/styles/main.scss';
import Login from '../components/login/Login';


class Index extends React.PureComponent {
  componentDidMount() {
    if (localStorage.getItem('accessToken')) {
      window.location.assign('/dashboard');
    }
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
          <Header />
          <div className="index_placeholder noselect no-borders simple-box-shadow">
            <div className="container-fluid">
              <Login />
            </div>
          </div>
          <Footer />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withReduxSaga(Index);
