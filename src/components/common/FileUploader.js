import React, { useState } from 'react'
import {getStorageFileUrl } from '../../tools/firebase';
import { Button } from 'react-bootstrap';

const FileUploader = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [downloadURL, setDownloadURL] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file');
      return;
    }

    setUploading(true);

    try {
      const downloadURL = await getStorageFileUrl('tour-files', file.name, file);
      setDownloadURL(downloadURL);

      alert('File uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file:', error.message);
      alert('Error uploading file. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <Button onClick={handleUpload} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload File'}
      </Button>

      {downloadURL && (
          <a href={downloadURL}>File Location</a>
      )}
    </div>
  );
};

export default FileUploader;