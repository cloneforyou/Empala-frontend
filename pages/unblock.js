import React from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { withReduxSaga } from '../store';
import Header from '../components/registration/Header';
import Footer from '../components/registration/Footer';
import stylesheet from '../assets/styles/main.scss';
import { unblockAccountInit } from '../actions/auth';

class Index extends React.PureComponent {
  static async getInitialProps({ store, query }) {
    if (query.code) store.dispatch(unblockAccountInit(query.code));
    return { code: query.code };
  }

  componentDidMount() {
    if (localStorage.getItem('accessToken')) {
      window.location.assign('/dashboard');
    }
    if (!this.props.code) {
      window.location.assign('/');
    }
  }
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
          <Header />
          <div className="index_placeholder noselect">
            <div className="index_placeholder__inner">
              <div>
                UNBLOCK
                {this.props.error ?
                  <p>Error while unblocking account: {this.props.error}</p>
                  : <p>Account unblocked, please <Link href="/" >log in</Link></p>}
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withReduxSaga(connect(state => ({ error: state.auth.loginError }), null)(Index));
