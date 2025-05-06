import React from "react";
import styles from "./CSS/TarjetaSolicitud.module.css";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebaseConfig";

interface CardOfertaProps {
  nombreEmprendedor: string;
  nombreEmprendimiento: string;
  descripcion: string;
  haParticipado: boolean;
  reservaId: string;
  onEstadoActualizado?: (reservaId: string, nuevoEstado: "aceptada" | "rechazada") => void;
}

const CardOferta: React.FC<CardOfertaProps> = ({
  nombreEmprendedor,
  nombreEmprendimiento,
  descripcion,
  haParticipado,
  reservaId,
  onEstadoActualizado,
}) => {
  const handleVerAdjuntos = () => {
    alert("Ver adjuntos \nEsta pendiente de implementar la funcionalidad");
  };

  const handleAceptar = async () => {
    try {
      const reservaRef = doc(db, "reservas", reservaId);
      await updateDoc(reservaRef, { estado: "aceptada" });
      onEstadoActualizado?.(reservaId, "aceptada");
    } catch (error) {
      console.error("Error al aceptar reserva:", error);
    }
  };

  const handleRechazar = async () => {
    try {
      const reservaRef = doc(db, "reservas", reservaId);
      await updateDoc(reservaRef, { estado: "rechazada" });
      onEstadoActualizado?.(reservaId, "rechazada");
    } catch (error) {
      console.error("Error al rechazar reserva:", error);
    }
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
