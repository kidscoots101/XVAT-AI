import React from "react";
import Sidebar from "./components/Sidebar";
import SingleFileUploader from "./components/SingleFileUploader";
import "./App.css";

export default function App() {
  return (
    <div className="container">
      <SingleFileUploader />
    </div>
  );
}
