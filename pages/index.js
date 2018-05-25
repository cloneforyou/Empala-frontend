/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { withReduxSaga } from '../store';
import Header from '../components/registration/Header';
import Footer from '../components/registration/Footer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Link from 'next/link';
import stylesheet from '../assets/styles/main.scss';

function Index() {
  return (
    <MuiThemeProvider>
      <div>
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
        <Header />
        <div className="index_placeholder noselect">
          <div className="index_placeholder__inner">
            <div>
              <Link href="/registration">
                <a className="index_placeholder__link">Registration</a>
              </Link>
              {'  /  '}
              <Link href="#">
                <a className="index_placeholder__link">Log in</a>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </MuiThemeProvider>
  );
}

export default withReduxSaga(Index);
