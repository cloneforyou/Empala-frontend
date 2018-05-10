import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class ModalWindow extends React.Component {

  constructor(props) {
    super(props);

    this.styles = {
      cancelBtn: {
        backgroundColor: '#98c73a',
        width: '130px',
        height: '48px',
        lineHeight: '15px',
        verticalAlign: 'top',
        margin: '0 20px',
      },
      returnBtn: {
        backgroundColor: '#f80a2e',
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
        textAlign: 'center'
      },
      contentStyle: {
        textAlign: 'center'
      }
    }
  }

  render() {
    const actions = [
      <FlatButton
        label='Cancel Registration'
        onClick={this.props.handleClose}
        style={ this.styles.cancelBtn }
        labelStyle={ this.styles.labelCancelBtn }
      />,
      <FlatButton
        label='Return'
        keyboardFocused={true}
        onClick={this.props.handleClose}
        style={ this.styles.returnBtn }
        labelStyle={ this.styles.labelReturnBtn }
      />,
    ];

    return (
      <div>
        <Dialog
          actions={actions}
          modal={false}
          open={this.props.open}
          onRequestClose={this.handleClose}
          actionsContainerStyle={ this.styles.actionsContainer }
          contentStyle={ this.styles.contentStyle }
        >
          Sorry we are not yet able to open accounts with
          this characteristic but we are working on it.
        </Dialog>
      </div>
    );
  }
}

export default ModalWindow;