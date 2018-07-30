import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { openModal } from '../../../../../../actions/dashboard';
import { updateProfileSend } from '../../../../../../actions/profile';
import * as dashboardActions from '../../../../../../actions/dashboard';


class Footer extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const { deleteAccountBtnIsShow } = this.props;
    return (
      <div className="tab-container__foot buttons-row">
        <div className="buttons-row__right">
          {
            deleteAccountBtnIsShow &&
            <button
              className="profile-btn profile-btn_red profile-btn_delete"
              onClick={this.props.showDeleteModal}
            >Delete Account
            </button>
          }
        </div>
        <div className="buttons-row__left">
          <button
            className="default-btn"
            onClick={this.props.handleCancel}
          >Cancel
          </button>
          <button
            className="profile-btn profile-btn_green"
            onClick={this.props.handleUpdateInfo}
          >Save
          </button>
          <div className="errorText" >
            {this.props.PageErrorText || ' '}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    PageErrorText: state.dashboard.error,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    showDeleteModal: () => dispatch(openModal('accountDelete')),
    handleUpdateInfo: () => dispatch(updateProfileSend()),
    handleCancel: () => dispatch(dashboardActions.getUserData()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
