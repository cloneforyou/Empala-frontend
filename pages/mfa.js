/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Component} from 'react';
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
        <div>
          <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
          <div className="container-fluid">
            <AuthPhone />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withReduxSaga(MFA);
