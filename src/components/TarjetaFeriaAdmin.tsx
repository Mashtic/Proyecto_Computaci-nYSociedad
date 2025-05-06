import React from "react";
import styles from "./CSS/EventoCard.module.css";

interface EventoCardProps {
  titulo: string;
  fecha: string;
  ubicacion: string;
}

const TarjetaFeriaAdmin: React.FC<EventoCardProps> = ({ titulo, fecha, ubicacion }) => {
  return (
    <div className={styles.card}>
      <div className={styles.title}>{titulo}</div>
      <div className={styles.info}>
        <span className={styles.label}>Fecha:</span> {fecha}
      </div>
      <div className={styles.info}>
        <span className={styles.label}>Ubicación:</span> {ubicacion}
      </div>
    </div>
  );
};

export default TarjetaFeriaAdmin;
