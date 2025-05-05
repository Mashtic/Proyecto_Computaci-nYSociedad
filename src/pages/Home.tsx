import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Home.module.css';
import { getFerias } from '../services/feriaService';
import { Feria } from '../types/feriaType';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [ferias, setFerias] = useState<Feria[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFerias = async () => {
      try {
        const feriasData = await getFerias();
        setFerias(feriasData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar ferias');
      } finally {
        setLoading(false);
      }
    };

    fetchFerias();
  }, []);

  const handleButtonClick = (feriaId?: string) => {
    navigate(`/apply-details${feriaId ? `?feriaId=${feriaId}` : ''}`);
  };

  if (loading) {
    return (
      <main className={styles.main}>
        <section className={styles.container}>
          <h1 className={styles.title}>Cargando ferias...</h1>
        </section>
      </main>
    );
  }

  if (error) {
    return (
      <main className={styles.main}>
        <section className={styles.container}>
          <h1 className={styles.title}>Error</h1>
          <p className={styles.subtitle}>{error}</p>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <section className={styles.container}>
        <h1 className={styles.title}>Ferias Disponibles</h1>
        <p className={styles.subtitle}>
          Toda la información referente a fechas, disponibilidad y requisitos
        </p>
        
        {ferias.length === 0 ? (
          <div className={styles.card}>
            <p>No hay ferias disponibles actualmente</p>
          </div>
        ) : (
          <div className={styles.cardContainer}>
            {ferias.map((feria) => (
              <div key={feria.id} className={styles.card}>
                {feria.imagenURL ? (
                  <img 
                    src={feria.imagenURL} 
                    alt={feria.titulo} 
                    className={styles.imagePlaceholder}
                  />
                ) : (
                  <div className={styles.imagePlaceholder}></div>
                )}
                
                <h2 className={styles.cardTitle}>{feria.titulo || 'Título no disponible'}</h2>
                <p className={styles.description}>
                  {feria.descripcion || 'Descripción no disponible'}
                </p>
                
                <div className={styles.details}>
                  {feria.fecha && (
                    <p><strong>Fecha del evento:</strong> {feria.fecha}</p>
                  )}
                  
                  {feria.ubicacion && (
                    <p><strong>Ubicación:</strong> {feria.ubicacion}</p>
                  )}
                  
                  {feria.horario && (
                    <p><strong>Horario:</strong> {feria.horario}</p>
                  )}
                  
                  {feria.requisitos?.trim() && (
                <>
                  <p><strong>Requisitos para participar:</strong></p>
                  <ul>
                    {feria.requisitos
                      .split('\n')
                      .map((item: string, index: number) => (
                        <li key={index}>{item.trim()}</li>
                      ))}
                  </ul>
                </>
              )}
                </div>
                
                <button 
                  className={styles.button} 
                  onClick={() => handleButtonClick(feria.id)}
                >
                  Solicitar Espacio
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Home;