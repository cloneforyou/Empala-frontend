import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Link from 'next/link';

class ModalWindow extends React.Component {

  constructor(props) {
    super(props);

    this.styles = {
      cancelBtn: {
        backgroundColor: '#f80a2e',
        width: '130px',
        height: '48px',
        lineHeight: '15px',
        verticalAlign: 'top',
        margin: '0 20px',
      },
      returnBtn: {
        backgroundColor: '#98c73a',
        width: '130px',
        height: '48px',
        lineHeight: '15px',
        verticalAlign: 'top',
        margin: '0 20px',
      },
      labelCancelBtn: {
        color: '#ffffff',
        fontSize: '12px',
        textAlign: 'center',
        padding: 0,
      },
      labelReturnBtn: {
        color: '#ffffff',
        fontSize: '12px',
      },
      actionsContainer: {
        textAlign: 'center',
        padding: '20px',
      },
      contentStyle: {
        textAlign: 'center',
        border: '1px solid #000000',
        width: '600px',
      },
    }
  }

  render() {
    const actions = [
      <Link href='/'>
        <FlatButton
          label='Cancel Registration'
          onClick={ this.handleCancel }
          style={ this.styles.cancelBtn }
          labelStyle={ this.styles.labelCancelBtn }
        />
      </Link>,
      <FlatButton
        label='Return'
        onClick={this.props.handleClose}
        style={ this.styles.returnBtn }
        labelStyle={ this.styles.labelReturnBtn }
      />,
    ];

    return (
        <Dialog
          actions={actions}
          modal={false}
          open={this.props.open}
          onRequestClose={this.handleClose}
          actionsContainerStyle={ this.styles.actionsContainer }
          contentStyle={ this.styles.contentStyle }
          overlayStyle={{backgroundColor: 'transparent'}}
          // style={this.styles.style}
        >
          Sorry we are not yet able to open accounts with
          this characteristic but we are working on it.
        </Dialog>
    );
  }
}

export default ModalWindow;