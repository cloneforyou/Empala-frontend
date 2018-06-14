/* eslint-disable max-len */
import React from 'react';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { FlatButton } from 'material-ui';
import { withReduxSaga } from '../store';
import Header from '../components/registration/Header';
import Footer from '../components/registration/Footer';
import stylesheet from '../assets/styles/main.scss';
import EmpalaInput from '../components/registration/EmpalaInput';
import { GREEN, TORCH_RED, WHITE } from '../constants/colors';
import { setInputFieldValueById } from '../actions/registration';
import { sendPasswordUpdate } from '../actions/auth';


const style = {
  submitBtn: {
    backgroundColor: GREEN,
    width: '80px',
    height: '30px',
    lineHeight: '15px',
    float: 'right',
  },
  labelSubmitBtn: {
    color: WHITE,
    fontSize: '12px',
    textAlign: 'center',
    padding: 0,
    verticalAlign: 'top',
  },
  formWrapper: {
    width: '350px',
    fontSize: '14px',
    textAlign: 'justify',
  },
  markedText: {
    color: GREEN,
    fontStyle: 'oblique',
    fontWeight: 'bolder',
  },
  errorText: {
    color: TORCH_RED,
    fontWeight: 'bolder',
  },
  markedText_link: {
    cursor: 'pointer',
    fontSize: '.9rem',
    verticalAlign: 'text-top',
  },
};

class PasswordRecovery extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleSubmit = () => {
      console.log(this.props)
      if (this.props.password && !this.props.fieldsErrorText.recovery_password && !this.props.fieldsErrorText.recovery_password_confirm) {
        this.props.submitPassword(this.props.password, this.props.code);
      }
      return false;
    };
  }

  static async getInitialProps({ isServer, res, query }) {
    if (isServer && !query.code) return res.redirect('/');
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
              Password reset
              <div style={style.formWrapper}>
                <div>
                  <p>Please provide new password for your account</p>
                  <div>
                    <EmpalaInput
                      key="recovery_password"
                      id="recovery_password"
                      type="password"
                      label="New password"
                      handleChange={e => this.props.setInputValueById(e)}
                      errorText={this.props.fieldsErrorText.recovery_password}
                      value={this.props.password}
                    />
                    <EmpalaInput
                      key="recovery_password_confirm"
                      id="recovery_password_confirm"
                      type="password"
                      label="Confirm new password"
                      handleChange={e => this.props.setInputValueById(e)}
                      errorText={this.props.fieldsErrorText.recovery_password_confirm}
                      value={this.props.passwordConfirm}
                    />
                    <FlatButton
                      label="Save"
                      style={style.submitBtn}
                      labelStyle={style.labelSubmitBtn}
                      onClick={this.handleSubmit}
                    />
                  </div>
                  { this.props.error &&
                  <p><span style={style.errorText}>{this.props.error}</span>
                  </p>
                  }
                  { this.props.changedSuccessfully &&
                  <p><span style={style.markedText}>Password successfully changed.You will be redirected to log in.</span>
                  </p>
                  }
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps(state) {
  return {
    error: state.auth.authError,
    password: state.auth.recovery_password,
    passwordConfirm: state.auth.recovery_password_confirm,
    fieldsErrorText: state.auth.fieldsErrors,
    changedSuccessfully: state.auth.passwordChanged,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setInputValueById: e => dispatch(setInputFieldValueById(e.target.id, e.target.value)),
    submitPassword: (password, code) => dispatch(sendPasswordUpdate(password, code)),
  };
}

PasswordRecovery.defaultProps = {
  error: '',
  password: '',
  passwordConfirm: '',
  fieldsErrorText: {},
};

export default withReduxSaga(connect(mapStateToProps, mapDispatchToProps)(PasswordRecovery));
