import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {cleanErrorText, cleanImage, closeModal, setUploadableImage, uploadImage} from '../../../../actions/dashboard';
import avatar from '../../../../static/images/default-avatar-of-user.svg';

class UploadImage extends PureComponent {
 constructor(props) {
   super(props);
   this.state = {
     imagePreviewUrl: '',
   };
   this.actions = [
     <FlatButton
       label="Cancel"
       className="profile-popup__btn profile-popup__btn_cancel"
       onClick={() => {
         this.setState({
           imagePreviewUrl: '',
         });
         this.props.handleCancel();
       }}
     />,
     <FlatButton
       label="Upload"
       backgroundColor="none"
       className="profile-popup__btn profile-popup__btn_upload"
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
        contentClassName="profile-popup"
        actionsContainerClassName="profile-popup__action-container"
        open={this.props.modalOpen}>
      <div className="profile-popup__image-wrapper">
        <div
          style={{
               backgroundImage: `url(${this.state.imagePreviewUrl})`,
               backgroundPosition: 'center center',
               backgroundRepeat: 'no-repeat',
               backgroundSize: 'cover',
               height: 200,
               width: 200,
               borderRadius: '5%',
             }}
        >{!this.state.imagePreviewUrl &&
          <div className="profile-image">
            <p>NO FILE CHOSEN</p>
            <img
              className={'profile-menu__avatar profile-menu__avatar_bordered'}
              src={avatar}
              alt="Userpic"
            />
        </div>}
        </div>
        <div className="profile-popup__error-text">{this.props.errorText || ''}</div>
       <FlatButton
         label="Choose an Image"
         className="profile-popup__choose-file_btn"
         labelPosition="before"
         containerElement="label">
        <input
          type="file"
          onChange={this.handleImageChange}
          className="profile-popup__choose-file_input"
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

