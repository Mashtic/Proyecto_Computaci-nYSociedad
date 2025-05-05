import React from "react";
import "./CSS/Encabezado.modulo.css"

const Encabezado: React.FC = () => {
  return (
    <header className= {"encabezado"}>
      <div className = "barra-central">
        <img src="src/assets/logo.png" alt="Logo" className="logo" />
        <nav className="menu-navegacion">
          <a href="/">Inicio</a>
          <a href="/solicitudes">Solicitudes</a>
          <a href="/historial">Historial</a>
          <button className = {"boton-sesion"}>Iniciar Sesión</button>
        </nav>
      </div>
    </header>
  );
};

export default Encabezado;