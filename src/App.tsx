import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Encabezado from "./components/Header";
import PiePagina from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import ProfilePage from "./pages/UserInfo";

//Borrar esto cuando el backend esté listo
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
    <Router>
      <Encabezado />
      <main style={{ padding: "1rem" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/user-info" element={<ProfilePage user={userData} emprendimiento={emprendimientoData} />} />
        </Routes>
      </main>
      <PiePagina />
    </Router>
  );
};

export default App;
