import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

class UploadImage extends PureComponent {

  handleImageChange(e) {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file,
        imagePreviewUrl: reader.result,
        uploadDisabled: false,
      });
    };
    reader.readAsDataURL(file);
  }


  render() {
    return (
      <div className="">
        <div className=""
             style = {{
               backgroundImage: this.props.image,
               backgroundPosition: 'center center',
               backgroundRepeat: 'no-repeat',
               backgroundSize: 'cover',
               height: 80,
               width: 80,
               borderRadius: '50%',
             }}
        />
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    image: state.dashboard.registrationData,
  }
);

const mapDispatchToProps = (dispatch) => {
  return (
    {
      uploadImage: file => dispatch(uploadImage(file)),
      handleCancel: () => {
        dispatch(cleanImage());
        dispatch(closeModal());
      },
    }
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadImage);

