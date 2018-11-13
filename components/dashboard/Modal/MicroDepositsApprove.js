import React from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
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
          open={this.props.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Micro deposits confirm
          </DialogTitle>
          <DialogContent>
            <EmpalaInput
              id="modalMicroDepositsApprove.value1"
              type="number"
              label="Verification amount 1"
              value={this.props.value1}
              handleChange={this.handleChangeValue}
            />
            <EmpalaInput
              id="modalMicroDepositsApprove.value2"
              type="number"
              label="Verification amount 2"
              value={this.props.value2}
              handleChange={this.handleChangeValue}
            />
          </DialogContent>
          <DialogActions>
            <button
              className="modal__btn modal__btn_green"
              onClick={this.handleApprove}
            >
              Confirm
            </button>
            <button
              className="default-btn"
              onClick={this.handleClose}
            >
              Cancel
            </button>
          </DialogActions>
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
  }),
  dispatch => ({
    closeModal: () => dispatch(closeModalMicroDepositsApprove()),
    changeModalMicroDepositsApproveValueById: (id, value) => dispatch(changeModalMicroDepositsApproveValueById(id, value)),
    approveMicroDepositRequest: data => dispatch(approveMicroDepositRequest(data)),
  }))(MicroDepositsApprove);
