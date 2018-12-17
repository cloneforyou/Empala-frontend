/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment } from 'react';
import Head from 'next/head';
import { withReduxSaga } from '../store';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import stylesheet from '../assets/styles/main.scss';
import AuthPhone from '../components/login/AuthPhone';


class MFA extends Component {
  componentDidMount() {

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
            <AuthPhone />
          </div>
        </Fragment>
      </MuiThemeProvider>
    );
  }
}

export default withReduxSaga(MFA);
