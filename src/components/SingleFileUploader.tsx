import React, { useState } from "react";
import "./upload.css";

const baseUrl = 'https://sairams-m1pro-system.tail4ef781.ts.net';

const SingleFileUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<
    "initial" | "uploading" | "success" | "fail"
  >("initial");
  const [progress, setProgress] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [conversationId, setConversationId] = useState("");
  const [message, setMessage] = useState("");
  const [generatedResponse, setGeneratedResponse] = useState("");
  const [generateStatus, setGenerateStatus] = useState<"initial" | "generating" | "success" | "fail">("initial");

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

  const handleGenerate = async () => {
    if (!conversationId) {
      setModalMessage("Please enter a conversation ID");
      setShowModal(true);
      return;
    }

    setGenerateStatus("generating");

    try {
      const generateResponse = await fetch(`${baseUrl}/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          id: conversationId,
          message: message
        })
      });

      if (!generateResponse.ok) {
        throw new Error(`Generation failed: ${generateResponse.status} ${generateResponse.statusText}`);
      }

      const responseData = await generateResponse.json();
      setGenerateStatus("success");
      
      if (responseData.message) {
        const formattedText = responseData.message
          .split('\n')
          .map((paragraph: string) => paragraph.trim())
          .filter((paragraph: string) => paragraph.length > 0)
          .join('\n\n');
        setGeneratedResponse(formattedText);
      } else {
        setGeneratedResponse(JSON.stringify(responseData, null, 2));
      }
    } catch (error) {
      setGenerateStatus("fail");
      setModalMessage(`Generation failed: ${(error as Error).message}`);
      setShowModal(true);
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
      <div className="conversation-id">
        <input
          type="text"
          placeholder="Enter conversation ID"
          value={conversationId}
          onChange={(e) => setConversationId(e.target.value)}
          className="conversation-input"
        />
      </div>

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
          <text className="file-text">Acceptable file type: .pdf</text>
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
            {status === "uploading"
              ? "Uploading..."
              : status === "success"
              ? "Done"
              : "Upload"}
          </button>
        </div>
      )}

      {status === "success" && (
        <div className="generate-section">
          <input
            type="text"
            placeholder="Enter message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="message-input"
          />
          <button
            className="generate-btn"
            onClick={handleGenerate}
            disabled={generateStatus === "generating"}
          >
            {generateStatus === "generating" ? "Generating..." : "Generate"}
          </button>
          {generatedResponse && (
            <div className="generated-response">
              <pre>{generatedResponse}</pre>
            </div>
          )}
        </div>
      )}

      {showModal && (
        <Modal message={modalMessage} onClose={() => setShowModal(false)} />
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

const Modal = ({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) => {
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
