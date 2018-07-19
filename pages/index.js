/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { withReduxSaga } from '../store';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
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
          <div className="container-fluid">
            <Login />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withReduxSaga(Index);
