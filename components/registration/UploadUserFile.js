const UploadUserFile = () => (
  <div className='upload-file'>
    <div className='upload-file__img rounded-circle'>
        <div className=''>ER</div>
        <img src="" alt=""/>
    </div>
    <p className='upload-file__text'>Drop files to upload</p>
    <p className='upload-file__text'>or</p>
    <button  className='btn--uploading'><span className='btn--uploading__text'>Browse files</span></button>
      <p><u><a href="#" className="link--uploading">Skip for now</a></u></p>
  </div>
);

export default UploadUserFile
