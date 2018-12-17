/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Head from 'next/head';
import { withReduxSaga } from '../store';

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
        <Fragment>
          <Head>
            <title>Empala - Investor Empowerment</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
          </Head>
          <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
          <div className="container-fluid">
            <Login />
          </div>
        </Fragment>
      </MuiThemeProvider>
    );
  }
}

export default withReduxSaga(Index);
