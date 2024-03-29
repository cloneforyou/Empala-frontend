import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { cleanErrorText, cleanImage, closeModal, setUploadableImage, uploadImage } from '../../../actions/dashboard';
import avatar from '../../../static/images/default-avatar-of-user.svg';

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
    data.append('file', e.target.files[0]);
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
    const { imagePreviewUrl } = this.state;
    return (
      <Dialog
        onClose={this.props.handleCancel}
        aria-labelledby="simple-dialog-title"
        actions={this.actions}
        contentClassName="profile-popup"
        actionsContainerClassName="profile-popup__action-container"
        open={this.props.modalOpen}>
        <div className="profile-popup__image-wrapper">


          <div className="profile-image">
            <p>NO FILE CHOSEN</p>
            <div
              className={imagePreviewUrl ?
                "profile-menu__upload-preview mr-h-auto" :
                "profile-menu__upload-preview profile-menu__upload-preview_bordered mr-h-auto"
              }
              onClick={this.props.showUploadDialog}
            >
              <img
                className="profile-menu__avatar"
                src={imagePreviewUrl || avatar}
                alt="Userpic"
              />
            </div>
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

