import React from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import EmpalaSelect from '../../registration/EmpalaSelect';
import EmpalaInput from '../../registration/EmpalaInput';
import {
  closeModalMicroDepositsApprove,
  changeModalMicroDepositsApproveValueById,
  approveMicroDepositRequest,
} from '../../../actions/funding';


class MicroDepositsApprove extends React.Component {
  handleClose = (e) => {
    e.stopPropagation();
    this.props.closeModal();
  };

  handleChangeValue = (e) => {
    const { target: { value, id: rawId}  } = e;
    const id = rawId.split('.')[1];

    this.props.changeModalMicroDepositsApproveValueById(id, value);
  };

  handleApprove = () => {
    const data = {
      institutionId: this.props.institutionId,
      value1: this.props.value1,
      value2: this.props.value2
    };
    console.log('test2', data)
    this.props.approveMicroDepositRequest(data);
  };

  render() {
    return (
      <div onClick={e => e.stopPropagation()}>
        <Dialog
          classes={{root: 'modal-micro-deposits-approve'}}
          open={this.props.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <div className="title">
            Micro deposits confirm
          </div>
          <div className="body no-gutters">
            <div className="first-row">
              <div className="info-block">
                <div className="info-block__label">
                  Financial Institute
                </div>
                <div className="info-block__value">
                  {this.props.institutionName}
                </div>
              </div>
            </div>
            <div className="second-row">
              <div className="info-block">
                <div className="info-block__label">
                  Account type
                </div>
                <div className="info-block__value">
                  {this.props.institutionType}
                </div>
              </div>
              <div className="info-block info-block--second-block">
                <div className="info-block__label">
                  Account number
                </div>
                <div className="info-block__value">
                  ****{this.props.institutionMask}
                </div>
              </div>
            </div>
            <div className="third-row">
              <div className="test no-gutters">
                <EmpalaInput
                  id="modalMicroDepositsApprove.value1"
                  type="number"
                  label="Verification amount 1"
                  value={this.props.value1}
                  handleChange={this.handleChangeValue}
                />
              </div>
              <div className="test no-gutters test--2">
                <EmpalaInput
                  id="modalMicroDepositsApprove.value2"
                  type="number"
                  label="Verification amount 2"
                  value={this.props.value2}
                  handleChange={this.handleChangeValue}
                />
              </div>
            </div>
            <div className="last-row">
              Enter the amounts you have
              received in your account.
            </div>
          </div>
          <div className="footer">
            <button
              className="confirm"
              onClick={this.handleApprove}
            >
              Confirm
            </button>
            <button
              className="cancel"
              onClick={this.handleClose}
            >
              Cancel
            </button>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default connect(
  state => ({
    open: state.funding.isOpenModalMicroDepositsApprove,
    value1: state.funding.modalMicroDepositsApprove.value1,
    value2: state.funding.modalMicroDepositsApprove.value2,
    institutionId: state.funding.modalMicroDepositsApprove.institutionId,
    institutionName: state.funding.modalMicroDepositsApprove.institutionName,
    institutionMask: state.funding.modalMicroDepositsApprove.institutionMask,
    institutionType: state.funding.modalMicroDepositsApprove.institutionType,
  }),
  dispatch => ({
    closeModal: () => dispatch(closeModalMicroDepositsApprove()),
    changeModalMicroDepositsApproveValueById: (id, value) => dispatch(changeModalMicroDepositsApproveValueById(id, value)),
    approveMicroDepositRequest: data => dispatch(approveMicroDepositRequest(data)),
  }))(MicroDepositsApprove);
