import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Home.module.css';
import { getFerias } from '../services/feriaService';
import { Feria } from '../types/feriaType';
import { auth } from '../services/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { signOut } from '../services/authService';
import { verifyUserPrivileges } from '../services/dbUserService'; // IMPORTANTE

const AdminGestionFerias: React.FC = () => {
  const navigate = useNavigate();

  const [ferias, setFerias] = useState<Feria[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [esNoAdmin, setEsNoAdmin] = useState<boolean>(false); // NUEVO

  const handleButtonClick = (feriaId?: string) => {
    navigate(`/admin/solicitudes-pendientes${feriaId ? `?feriaId=${feriaId}` : ''}`);
    //navigate(`/apply-details${feriaId ? `?feriaId=${feriaId}` : ''}`); //Cambiar a ver las solicitudes pendientes
  };

  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const isAdmin = await verifyUserPrivileges(currentUser.uid);
        console.log('Usuario autenticado:', currentUser.email);
        console.log('Es admin:', isAdmin);
        if (isAdmin) {
          setUser(currentUser);
        } else {
          setEsNoAdmin(true);
        }
      } else {
        navigate('/InicioSesion'); // Redirigir a la página de inicio de sesión si no hay usuario autenticado
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchFerias = async () => {
      try {
        const feriasData = await getFerias();
        const feriasActivas = feriasData.filter(
          feria => feria.estado === 'activa' || feria.estado === 'proximamente'
        );
        setFerias(feriasActivas);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar ferias');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchFerias();
    }
  }, [user]);

  if (esNoAdmin) {
    return (
      <main className={styles.main}>
        <section className={styles.container}>
          <h1 className={styles.title}>Acceso Denegado</h1>
          <p className={styles.subtitle}>
            No tienes privilegios de administrador para ver esta página.
          </p>
          <button 
            className={styles.button} 
            onClick={() => navigate('/InicioSesion')}
          >
            Ir al inicio de sesión
          </button>
        </section>
      </main>
    );
  }
  

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
          className={styles.logoutButton} 
          onClick={() => {
            signOut();
          }}
        >
          Cerrar Sesión
        </button>
        <h1 className={styles.title}>Admin - Ferias Activas</h1>
        {ferias.length === 0 ? (
          <div className={styles.card}>
            <p>No hay ferias disponibles actualmente</p>
          </div>
        ) : (
          <div className={styles.cardContainer}>
            {ferias.map((feria) => (
              <div key={feria.id} className={styles.card}>
                <img
                  src={feria.imagenURL || "/src/assets/noDisponible.png"}
                  alt={feria.titulo || "Imagen no disponible"}
                  className={styles.imagePlaceholder}
                />
                <h2 className={styles.cardTitle}>{feria.titulo || 'Título no disponible'}</h2>
                <p className={styles.description}>
                  {feria.descripcion || 'Descripción no disponible'}
                </p>
                <div className={styles.details}>
                  {feria.fecha && <p><strong>Fecha del evento:</strong> {feria.fecha}</p>}
                  {feria.ubicacion && <p><strong>Ubicación:</strong> {feria.ubicacion}</p>}
                  {feria.horario && <p><strong>Horario:</strong> {feria.horario}</p>}
                  {feria.requisitos?.trim() && (
                    <>
                      <p><strong>Requisitos para participar:</strong></p>
                      <ul>
                        {feria.requisitos.split('\n').map((item, index) => (
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
                  Gestionar Feria
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default AdminGestionFerias;
