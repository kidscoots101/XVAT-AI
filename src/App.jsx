import React from "react";
import SingleFileUploader from "./components/SingleFileUploader";
import "./App.css";
// import Sidebar from "./components/Sidebar";
import { Routes, Route } from "react-router-dom";

const Dashboard = () => (
  <section className="home">
    <div className="text">Dashboard</div>
  </section>
);

const Subjects = () => (
  <section className="home">
    <div className="text">Subjects</div>
  </section>
);

const Progress = () => (
  <section className="home">
    <div className="text">Progress</div>
  </section>
);

const Quiz = () => (
  <section className="home">
    <div className="text">Quiz</div>
  </section>
);

const Logout = () => (
  <section className="home">
    <div className="text">Logout</div>
  </section>
);

export default function App() {
  return (
    <div className="container">
      <SingleFileUploader />
    </div>
  );
}
