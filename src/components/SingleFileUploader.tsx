import React, { useState } from 'react';

const SingleFileUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<
    'initial' | 'uploading' | 'success' | 'fail'
  >('initial');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setStatus('initial');
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file) {
      setStatus('uploading');

      const formData = new FormData();
      formData.append('file', file);

      try {
        const result = await fetch('https://httpbin.org/post', {
          method: 'POST',
          body: formData,
        });

        const data = await result.json();

        console.log(data);
        setStatus('success');
      } catch (error) {
        console.error(error);
        setStatus('fail');
      }
    }
  };

  const formatFileSize = (size) => {
    const units = ["bytes", "KB", "MB", "GB", "TB"];
    let unitIndex = 0;
  
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
  
    return `${size.toFixed(2)} ${units[unitIndex]}`;
  }

  return (
    <>
      <div className="input-group">
        <input id="file" type="file" onChange={handleFileChange} />
      </div>
      {file && (
        <section>
          File details:
          <ul>
            <li>Name: {file.name}</li>
            <li>Type: {file.type}</li>
            <li>Size: {formatFileSize(file.size)} bytes</li>
          </ul>
        </section>
      )}

      {file && (
        <button
          onClick={handleUpload}
          className="submit"
        >Upload a file</button>
      )}

      <Result status={status} />
    </>
  );
};

const Result = ({ status }: { status: string }) => {
  if (status === 'success') {
    return <p>✅ File uploaded successfully!</p>;
  } else if (status === 'fail') {
    return <p>❌ File upload failed!</p>;
  } else if (status === 'uploading') {
    return <p>⏳ Uploading selected file...</p>;
  } else {
    return null;
  }
};


export default SingleFileUploader;