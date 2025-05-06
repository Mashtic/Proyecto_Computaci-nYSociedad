import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Encabezado from "./components/Header";
import PiePagina from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import InicioSesion  from "./pages/InicioSesion";
import RegistroFinal  from "./pages/RegistroFinal";
import RegistroInicial from "./pages/RegistroInicial";
import ProfilePage from "./pages/UserInfo";
import AdminSolicitud from "./pages/AdminSolicitud";
import AdminConfiguracion from "./pages/AdminConfiguracion";
import DetalleFeria from "./pages/apply-details";
import AdminSolicitudesFeria from "./pages/AdminSolicitudesFeria";

const App: React.FC = () => {
  return (
    <>
      <Encabezado />
      <main style={{ padding: "1rem" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/InicioSesion" element={<InicioSesion />} />
          <Route path="/RegistroFinal" element={<RegistroFinal />} />
          <Route path="/RegistroInicial" element={<RegistroInicial />} />
          <Route path="/admin/solicitudes" element={<AdminSolicitud />} />
          <Route path="/admin/configuracion" element={<AdminConfiguracion />} /> 
          <Route path="/apply-details" element={<DetalleFeria />} />
          <Route path="/admin/solicitudes-feria" element={<AdminSolicitudesFeria />} />
        </Routes>
      </main>
      <PiePagina />
    </>
  );
};

export default App;
