import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SecretSantaPage from "./pages/SecretSantaPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/secret-santa" element={<SecretSantaPage />} />
      </Routes>
    </Router>
  );
};

export default App;
