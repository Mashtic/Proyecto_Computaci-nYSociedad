import React from "react";
import "./CSS/PiePagina.modulo.css";

const PiePagina: React.FC = () => {
  return (
    <footer className="pie-pagina">
      <div className="pie-contenido">
        <img src="src/assets/logo.png" alt="Logo" className="logo" />

        <div className="pie-contacto">
          <strong>Departamento de Servicios Generales</strong>
          <p>Teléfono: (+506) 2550-2570 / Correo: aroman@tec.ac.cr</p>
        </div>

        <div className="pie-redes">
          <a href="https://www.facebook.com"  target="_blank" rel="noreferrer">
            <img src="src/assets/facebook.png" alt="Logo" className="icono-red" />
          </a>
          <a href="https://www.instagram.com/teccostarica/"  target="_blank" rel="noreferrer">
            <img src="src/assets/instagram.png" alt="Logo" className="icono-red" />
          </a>
        </div>
      </div>

      <div className="pie-copy">
          © Tecnológico de Costa Rica, Costa Rica 2025
      </div>

    </footer>
  );
};

export default PiePagina;

