const UploadUserFile = () => (
  <div className='upload-file'>
    <div className='upload-file__container'>
        <div className='upload-file__dummy-img'><span className="dummy-img__text">ER</span></div>
        <img src="" alt="" className='upload-file__img'/>
    </div>
    <p className='upload-file__text'>Drop files to upload<br/>or</p>
    <button  className='btn--uploading'><span className='btn--uploading__text'>Browse files</span></button>
      <p><u><a href="#" className="link--uploading">Skip for now</a></u></p>
  </div>
);

export default UploadUserFile
