import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Encabezado from "./components/Header";
import PiePagina from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import InicioSesion  from "./pages/InicioSesion";
import RegistroFinal  from "./pages/RegistroFinal";
import RegistroInicial from "./pages/RegistroInicial";
import ApplyDetails from "./pages/apply-details";
import ProfilePage from "./pages/UserInfo";
import LoginForm from "./pages/LoginPage";

//Info para ver el perfil de usuario
const userData = {
  nombre: "John",
  apellidos: "Doe Ramírez Alfaro",
  departamento: "Estudiante",
  email: "jdramirez@estudiantee.cr",
  cedula: "1-0234-0678"
};

const emprendimientoData = {
  nombre: "Joyería placeholder",
  descripcion: "Venta de joyería de todo tipo, joyería personalizada, pines de metal y acrílico.",
  categoria: "Moda",
  fechaCreacion: "24/3/2019"
};

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
        </Routes>
      </main>
      <PiePagina />
    </>
  );
};

export default App;
