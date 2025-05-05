import React from 'react';
import styles from '../styles/apply-details.module.css';

interface Espacio {
  id: number;
  nombre: string;
  disponible: boolean;
  tamano: string;
  electrico: boolean;
  anotaciones: string;
}

const espacios: Espacio[] = [
  { id: 1, nombre: 'Espacio #1', disponible: true, tamano: '2×2mts', electrico: true, anotaciones: 'Acá irá información adicional sobre el espacio de ser necesario.' },
  { id: 2, nombre: 'Espacio #2', disponible: false, tamano: '2×2mts', electrico: true, anotaciones: 'En este espacio no se pueden tener comidas' },
  { id: 3, nombre: 'Espacio #3', disponible: true, tamano: '2×2mts', electrico: false, anotaciones: 'Acá irá información adicional sobre el espacio de ser necesario.' },
  { id: 4, nombre: 'Espacio #4', disponible: true, tamano: '2×2mts', electrico: true, anotaciones: 'Acá irá información adicional sobre el espacio de ser necesario.' },
];

const DetalleFeria: React.FC = () => {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Nombre de la feria</h1>
      <button className={styles.distribucionBtn}>Ver distribución del espacio</button>

      <h2 className={styles.subtitle}>Espacios disponibles</h2>
      <div className={styles.content}>
        <div className={styles.listaEspacios}>
          {espacios.map((espacio) => (
            <div key={espacio.id} className={`${styles.espacio} ${espacio.disponible ? styles.disponible : styles.noDisponible}`}>
              <h3>{espacio.nombre}</h3>
              <p><strong>Espacio disponible:</strong> {espacio.tamano}</p>
              <p><strong>¿Conexión eléctrica?:</strong> {espacio.electrico ? 'SI' : 'NO'}</p>
              <p><strong>Anotaciones:</strong> {espacio.anotaciones}</p>
              <button className={espacio.disponible ? styles.btnSeleccionar : styles.btnNoDisponible}>
                {espacio.disponible ? 'Seleccionar espacio' : 'No disponible'}
              </button>
            </div>
          ))}
        </div>

        <div className={styles.lateral}>
          <button className={styles.adjuntarBtn}>Adjuntar documentos</button>
          <div className={styles.documentos}>
            <p><strong>Documentos subidos</strong></p>
            <ul>
              <li>solicitud.pdf</li>
              <li>Permisos_sanitarios.pdf</li>
            </ul>
          </div>
          <img src="/feria.jpg" alt="Imagen feria" className={styles.imagenFeria} />
        </div>
      </div>
    </main>
  );
};

export default DetalleFeria;
