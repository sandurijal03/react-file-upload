import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState('');
  const [uploadedFile, setUploadedFile] = useState({});

  const onChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const { fileName, filePath } = res.data;
      setUploadedFile({ fileName, filePath });
    } catch (err) {
      if (err.response.status === 500) {
        console.log('there was problem with server');
      } else {
        console.log(err.response.data.msg);
      }
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className='text-center'>
          <label htmlFor='formFileLg' className='form-label w-100'>
            <input
              className='form-control form-control-lg'
              id='formFileLg'
              type='file'
              onChange={onChange}
            />
          </label>
        </div>
        <button className='btn btn-primary mt-4 w-100'>Upload</button>
      </form>
      {uploadedFile ? (
        <div className='row mt-5'>
          <div className='col-md-6 m-auto'>
            <h3 className='text-center'>{uploadedFile.fileName}</h3>
            <img style={{ width: '100%' }} src={uploadedFile.filePath} alt='' />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default FileUpload;
