import React, { useState } from "react";
import "./upload.css";

const baseUrl = 'https://sairams-m1pro-system.tail4ef781.ts.net';

const SingleFileUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"initial" | "uploading" | "success" | "fail">("initial");
  const [progress, setProgress] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [conversationId, setConversationId] = useState("");
  const [message, setMessage] = useState("");
  const [generatedResponse, setGeneratedResponse] = useState("");
  const [generateStatus, setGenerateStatus] = useState<"initial" | "generating" | "success" | "fail">("initial");
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; size: number }[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      const allowedTypes = ["application/pdf"];

      if (!allowedTypes.includes(selectedFile.type)) {
        setModalMessage("❌ Only PDF files are allowed!");
        setShowModal(true);
        setFile(null);
        return;
      }

      setFile(selectedFile);
      setStatus("initial");
    }
  };

  const handleUpload = async () => {
    if (file && conversationId) {
      setStatus("uploading");

      const formData = new FormData();
      formData.append("files", file);

      try {
        const result = await fetch(`${baseUrl}/api/upload?id=${encodeURIComponent(conversationId)}`, {
          method: "POST",
          body: formData,
        });

        if (result.ok) {
          const data = await result.json();
          console.log(data);

          let progressValue = 0;
          const interval = setInterval(() => {
            if (progressValue < 100) {
              progressValue += 10;
              setProgress(progressValue);
            } else {
              clearInterval(interval);
              setStatus("success");
              setUploadedFiles((prev) => [...prev, { name: file.name, size: file.size }]);
            }
          }, 200);
        } else {
          setStatus("fail");
          setModalMessage("Upload failed: " + result.statusText);
          setShowModal(true);
        }
      } catch (error) {
        console.error(error);
        setStatus("fail");
        setModalMessage("Upload failed: " + (error as Error).message);
        setShowModal(true);
      }
    } else if (!conversationId) {
      setModalMessage("Please enter a conversation ID");
      setShowModal(true);
    }
  };

  const handleDone = () => {
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
    <section className="home">
      <div className="content">
      <div className="top">
        <h1>Upload Files</h1>
        <h3>Upload Documents and use our AI to study more effectively.</h3>
      </div>
      <div className="rowContent">
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
            <i className="bx bxs-folder-open"></i>
            <p className="upload-text">Browse Files</p>
            <p className="file-text">Acceptable file type: .pdf</p>
          </button>
        )}
        {uploadedFiles.length > 0 ? (
            <div className="uploaded-files">
              <p className="filesHeading">Uploaded Files</p>
              <ul>
                {uploadedFiles.map((uploadedFile, index) => (
                  <li key={index}>
                    {uploadedFile.name} - {formatFileSize(uploadedFile.size)}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="uploaded-files">
              <p className="filesHeading">Uploaded Files</p>
              <p className="noFile">No files uploaded</p>
            </div>
          )}
        </div>
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
            {status === "uploading"
              ? "Uploading..."
              : status === "success"
              ? "Done"
              : "Upload"}
          </button>
        </div>
      )}
      <div className="conversation-id">
        <input
          type="text"
          placeholder="Enter conversation ID"
          value={conversationId}
          onChange={(e) => setConversationId(e.target.value)}
          className="conversation-input"
        />
      </div>
      {showModal && (
        <Modal message={modalMessage} onClose={() => setShowModal(false)} />
      )}
      </div>
    </section>
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

const Modal = ({ message, onClose }: { message: string; onClose: () => void }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{message}</p>
        <button onClick={onClose} className="modal-close-btn">
          OK
        </button>
      </div>
    </div>
  );
};

export default SingleFileUploader;
