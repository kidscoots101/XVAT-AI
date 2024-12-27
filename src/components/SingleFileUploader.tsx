import React, { useState } from "react";
import "./sidebar.css";

const SingleFileUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<
    "initial" | "uploading" | "success" | "fail"
  >("initial");
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setStatus("initial");
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file) {
      setStatus("uploading");

      const formData = new FormData();
      formData.append("file", file);

      try {
        const result = await fetch("https://httpbin.org/post", {
          method: "POST",
          body: formData,
        });
        const data = await result.json();

        console.log(data);

        if (result.ok) {
          let progressValue = 0;
          const interval = setInterval(() => {
            if (progressValue < 100) {
              progressValue += 10;
              setProgress(progressValue);
            } else {
              clearInterval(interval);
              setStatus("success");
            }
          }, 200);
        } else {
          setStatus("fail");
        }
      } catch (error) {
        console.error(error);
        setStatus("fail");
      }
    }
  };

  const handleDone = () => {
    // Reset everything to initial state
    setFile(null);
    setStatus("initial");
    setProgress(0);
  };

  const formatFileSize = (size: number) => {
    const units = ["bytes", "KB", "MB", "GB", "TB"];
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }

    return `${size.toFixed(2)} ${units[unitIndex]}`;
  };

  return (
    <div className="home">
      <input
        id="file"
        type="file"
        onChange={handleFileChange}
        className="dotted-file-button"
        style={{ display: "none" }}
      />

      {!file && status !== "uploading" && (
        <button
          className="file-btn"
          onClick={() => document.getElementById("file")?.click()}
        >
          <i className="bx bx-export"></i>
          <text className="upload-text">Upload File</text>
          <text className="file-text">
            Acceptable file types: .pdf, .jpeg, .jpg
          </text>
        </button>
      )}

      {file && (
        <div className="second">
          <div className="file-card">
            <i className="bx bxs-file symbol-icon"></i>
            <div className="file-info">
              <div style={{ flex: 1 }}>
                <h6>{file.name}</h6>
                <div className="progress-bg">
                  <div className="progress" style={{ width: `${progress}%` }} />
                </div>
              </div>
              {status === "initial" ? (
                <button onClick={() => setFile(null)}>
                  <i className="bx bx-x close-icon"></i>
                </button>
              ) : (
                <div className="check-circle">
                  {status === "uploading" ? (
                    `${progress}%`
                  ) : status === "success" ? (
                    <i className="bx bx-check" style={{ fontSize: "20px" }}></i>
                  ) : null}
                </div>
              )}
            </div>
          </div>
          <div className="info-box">
            <li>Name: {file.name}</li>
            <li>Type: {file.type}</li>
            <li>Size: {formatFileSize(file.size)}</li>
          </div>
          <Result status={status} />
          <button
            className="upload-btn"
            onClick={status === "success" ? handleDone : handleUpload}
          >
            {status === "success" ? "Done" : "Upload"}
          </button>
        </div>
      )}
    </div>
  );
};

const Result = ({ status }: { status: string }) => {
  const resultStyle = {
    fontWeight: "bold",
    color: "black",
    marginTop: "10px",
  };
  if (status === "success") {
    return <p style={resultStyle}>✅ File uploaded successfully!</p>;
  } else if (status === "fail") {
    return <p style={resultStyle}>❌ File upload failed!</p>;
  } else if (status === "uploading") {
    return <p style={resultStyle}>⏳ Uploading selected file...</p>;
  } else {
    return null;
  }
};

export default SingleFileUploader;
