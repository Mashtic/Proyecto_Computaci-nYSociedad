// AdminSolicitud.tsx
import React from "react";
import styles from "../styles/Admin.module.css";

const AdminSolicitud: React.FC = () => {
  return (
      <main className={styles.main}>
        <section className={styles.container}>
          <h2 className={styles.title}>Emprendimiento: Caldosas Picantes</h2>
          <p><strong>Emprendedor:</strong> Chasyanne Gutiérrez</p>
          <p><strong>Descripción:</strong> Venta de caldosas</p>
          <p><strong>Estado:</strong> <span className={styles.estadoActivo}>Activo</span></p>

          <div className={styles.botonesEstado}>
            <button className={styles.bloquear}>Bloquear</button>
            <button className={styles.activar}>Activar</button>
          </div>

          <h3>Historial de participación:</h3>
          <ul className={styles.historial}>
            {["11/3/2024 - 1 Semestre 2024", "21/4/2024 - 1 Semestre 2024", "1/5/2024 - 1 Semestre 2024", "7/7/2024 - 2 Semestre 2024", "7/9/2024 - 2 Semestre 2024", "11/3/2025 - 1 Semestre 2025"].map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>
      </main>
  );
};

export default AdminSolicitud;