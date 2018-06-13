import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {cleanErrorText, cleanImage, closeModal, setUploadableImage, uploadImage} from '../../../../actions/dashboard';
import {ALTO, GREEN, TORCH_RED, WHITE} from "../../../../constants/colors";

const style = {
  chooseBtn: {
    backgroundColor: ALTO,
    margin: '10px 0',
  },
  labelChoose: {
    fontSize: '12px',
  },
  uploadInput: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
  uploadBtn: {
    backgroundColor: GREEN,
    width: '130px',
    height: '48px',
    lineHeight: '15px',
    verticalAlign: 'top',
    margin: '0 20px',
  },
  cancelBtn: {
    backgroundColor: TORCH_RED,
    width: '130px',
    height: '48px',
    lineHeight: '15px',
    verticalAlign: 'top',
    margin: '0 20px',
  },
  labelBtn: {
    color: WHITE,
    fontSize: '12px',
    textAlign: 'center',
    padding: 0,
  },
  errorText: {
    fontSize: '12px',
    lineHeight: '12px',
    color: 'rgb(244, 67, 54)',
    margin: '10px 0'
  }
};

class UploadImage extends PureComponent {
 constructor(props) {
   super(props);
   this.state = {
     imagePreviewUrl: '',
   };
   this.actions = [
     <FlatButton
       label="Cancel"
       style={style.cancelBtn}
       labelStyle={style.labelBtn}
       onClick={this.props.handleCancel}
     />,
     <FlatButton
       label="Upload"
       style={style.uploadBtn}
       labelStyle={style.labelBtn}
       onClick={this.props.uploadImage}
     />,
     ]
 }

  handleImageChange = (e) => {
    e.preventDefault();
    const data = new FormData();
    const reader = new FileReader();
    data.append('avatar', e.target.files[0]);
    this.props.setUploadableImage(data);
    console.log(' ** ', data);
    const file = e.target.files[0];

    reader.onloadend = () => {
    // this.props.setUploadableImage(data);
      this.setState({
        imagePreviewUrl: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };

  render() {
    return (
      <Dialog
        onClose={this.props.handleCancel}
        aria-labelledby="simple-dialog-title"
        actions={this.actions}
        open={this.props.modalOpen}>
        {/*<DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>*/}
      <div className="">
        <div
          className=""
          style={{
               backgroundImage: `url(${this.state.imagePreviewUrl})`,
               backgroundPosition: 'center center',
               backgroundRepeat: 'no-repeat',
               backgroundSize: 'cover',
               height: 200,
               width: 200,
               borderRadius: '5%',
             }}
        />
        <div style={style.errorText}>{this.props.errorText || ''}</div>
       <FlatButton
         label="Choose an Image"
         style={style.chooseBtn}
         labelStyle={style.labelChoose}
         labelPosition="before"
         containerElement="label">
        <input
          type="file"
          onChange={this.handleImageChange}
          style={style.uploadInput}
        />
       </FlatButton>
      </div>
      </Dialog>
    );
  }
}

const mapStateToProps = state => (
  {
    image: state.dashboard.uploadableImage,
    modalOpen: state.dashboard.modalOpen && state.dashboard.openModalName === 'uploadImage',
    errorText: state.dashboard.error,
  }
);

const mapDispatchToProps = dispatch => (
  {
    setUploadableImage: data => dispatch(setUploadableImage(data)),
    uploadImage: () => dispatch(uploadImage()),
    handleCancel: () => {
      dispatch(cleanImage());
      dispatch(cleanErrorText());
      dispatch(closeModal());
    },
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(UploadImage);

