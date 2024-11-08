import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <main className="py-3">
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
        <ToastContainer theme="dark" />
      </main>
    </>
  );
}

export default App;
