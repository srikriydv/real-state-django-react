import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFound from "./components/NotFound";
import PropertiesPage from "./pages/PropertiesPage";
import EnquiryPage from "./pages/Enquiry";
import ProfilePage from "./pages/ProfilePage";
// import ProfileUpdatePage from "./pages/ProfileUpdatePage";

function App() {
  return (
    <>
      <Header />
      <main style={{ paddingTop: "56px" }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
							path="/properties"
							element={<PropertiesPage />}
						/>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/enquiry" element={<EnquiryPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          {/* <Route path="/profile/update/:username" element={<ProfileUpdatePage />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer theme="dark" />
      </main>
      <Footer />
    </>
  );
}

export default App;
