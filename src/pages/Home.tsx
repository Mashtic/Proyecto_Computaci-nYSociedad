import React from 'react';
import styles from '../styles/Home.module.css'; // Asegúrate de que la ruta sea correctaS


const Home: React.FC = () => {
  const ferias = [1, 2, 3]; // Simulando 3 ferias

  return (
    <>  
      <main className={styles.main}>
        <section className={styles.container}>
          <h1 className={styles.title}>Ferias Disponibles</h1>
          <p className={styles.subtitle}>
            Toda la información referente a fechas, disponibilidad y requisitos
          </p>
          <div className={styles.cardContainer}>
            {ferias.map((_, index) => (
              <div key={index} className={styles.card}>
                <div className={styles.imagePlaceholder}></div>
                <h2 className={styles.cardTitle}>Título de la Feria de Emprendedores</h2>
                <p className={styles.description}>
                  Feria de Emprendedores organizada por el Departamento de Servicios Generales del TEC. Una oportunidad para que PYMEs y emprendimientos locales expongan y vendan sus productos dentro de la comunidad universitaria.
                </p>
                <p><strong>Fecha del evento:</strong> 15 al 17 de marzo de 2025</p>
                <p><strong>Ubicación:</strong> Campus Central, Tecnológico de Costa Rica</p>
                <p><strong>Horario:</strong> 9:00 a.m. – 4:00 p.m.</p>
                <p><strong>Requisitos para participar:</strong></p>
                <ul>
                  <li>Estar registrado(a) en la plataforma del sistema.</li>
                  <li>Contar con un emprendimiento formal o en desarrollo.</li>
                  <li>Aceptar el reglamento de participación.</li>
                  <li>Reservar el espacio con al menos 7 días de anticipación.</li>
                  <li>Cumplir con las normas de seguridad y logística del TEC.</li>
                </ul>
                <button className={styles.button}>Solicitar Espacio</button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
