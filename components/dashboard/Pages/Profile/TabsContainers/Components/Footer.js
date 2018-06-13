import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { openModal } from "../../../../../../actions/dashboard";


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
            deleteAccountBtnIsShow && <button
              className="profile-btn profile-btn_red"
              onClick={this.props.showDeleteModal}
            >Delete Account</button>
          }
        </div>
        <div className="buttons-row__left">
          <button className="default-btn">Cancel</button>
          <button className="profile-btn profile-btn_green">Save</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    showDeleteModal: () => dispatch(openModal('accountDelete')),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
