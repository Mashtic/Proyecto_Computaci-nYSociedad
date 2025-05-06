import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Home.module.css';
import { getFerias } from '../services/feriaService';
import { Feria } from '../types/feriaType';
import { auth } from '../services/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { signOut } from '../services/authService';


const Home: React.FC = () => {
  const navigate = useNavigate();

  const [ferias, setFerias] = useState<Feria[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      // Usuario logeado
      setUser(currentUser);
      //console.log('Usuario logeado:', currentUser.email);
    } else {
      // No hay usuario logeado
      console.log('No hay usuario logeado');
      // navigate('/login');
    }
  });



  useEffect(() => {
    const fetchFerias = async () => {
      try {
        const feriasData = await getFerias();
        const feriasActivas = feriasData.filter(feria => 
          feria.estado === 'activa' || feria.estado ==='proximamente'
        );
        setFerias(feriasActivas);
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
      <button 
          className={styles.adminButton} 
          onClick={() => navigate('/profile')}
        >
          Ver mi perfil
        </button>
        <button 
          className={styles.adminButton} 
          onClick={() => navigate('/admin/solicitudes-feria')}
        >
          Ir a Solicitudes de Feria
        </button>
        <button 
          className={styles.logoutButton} 
          onClick={() => {
            signOut();
          }}
        >
          Cerrar Sesión
        </button>
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
                  <img 
                  src="/src/assets/noDisponible.png" 
                  alt="Imagen no disponible" 
                  className={styles.imagePlaceholder}
                  />
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