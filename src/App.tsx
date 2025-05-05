import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Encabezado from "./components/Header";
import PiePagina from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";

//Postularse
import ApplyDetails from "./pages/apply-details";

const App: React.FC = () => {
  return (
    <Router>
      <Encabezado />
      <main style={{ padding: "1rem" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/apply-details" element={<ApplyDetails />} />

        </Routes>
      </main>
      <PiePagina />
    </Router>
  );
};

export default App;
