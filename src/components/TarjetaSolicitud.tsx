import React from "react";
import styles from "./CSS/TarjetaSolicitud.module.css";

interface CardOfertaProps {
  nombreEmprendedor: string;
  nombreEmprendimiento: string;
  descripcion: string;
  haParticipado: boolean;
}

const CardOferta: React.FC<CardOfertaProps> = ({
  nombreEmprendedor,
  nombreEmprendimiento,
  descripcion,
  haParticipado,
}) => {
  const handleVerAdjuntos = () => {
    alert("Ver adjuntos");
  };

  const handleAceptar = () => {
    alert("Oferta aceptada");
  };

  const handleRechazar = () => {
    alert("Oferta rechazada");
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardText}>
        <h2>{nombreEmprendedor}</h2>
        <p><strong>Nombre del emprendimiento:</strong> {nombreEmprendimiento}</p>
        <p><strong>Descripción del emprendimiento:</strong> {descripcion}</p>
        <p><strong>¿Participado anteriormente?:</strong> {haParticipado ? "Sí" : "No"}</p>
      </div>
      <div className={styles.cardButtons}>
        <button className={styles.ver} onClick={handleVerAdjuntos}>Ver adjuntos</button>
        <button className={styles.aceptar} onClick={handleAceptar}>Aceptar oferta</button>
        <button className={styles.rechazar} onClick={handleRechazar}>Rechazar oferta</button>
      </div>
    </div>
  );
};

export default CardOferta;
