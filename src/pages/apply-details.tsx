import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom'; // Cambiado de useParams
import styles from '../styles/apply-details.module.css';
import { getEspaciosPorFeria } from '../services/espacioService';
import { Espacio } from '../types/espacioTypes';
import { auth } from '../services/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { reservarEspacio } from '../services/reservaService';

const DetalleFeria: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const feriaId = searchParams.get('feriaId'); // Obtenemos el parámetro de la URL
  const [espacios, setEspacios] = useState<Espacio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    //console.log('FeriaID obtenido:', feriaId);
    
    if (!feriaId) {
      setError('No se especificó ID de feria en la URL');
      setLoading(false);
      return;
    }

    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
    });

    const cargarEspacios = async () => {
      try {
        const espaciosData = await getEspaciosPorFeria(feriaId);
        
        if (espaciosData.length === 0) {
          setError('No se encontraron espacios para esta feria');
        } else {
          setEspacios(espaciosData);
        }
      } catch (err) {
        console.error('Error al cargar espacios:', err);
        setError(err instanceof Error ? err.message : 'Error al cargar espacios');
      } finally {
        setLoading(false);
      }
    };

    cargarEspacios();

    return () => unsubscribe();
  }, [feriaId]); // Dependencia del efecto

  const handleSeleccionar = async (espacioId: string) => {
    if (!currentUser) {
      alert('Debes iniciar sesión para reservar un espacio');
      navigate(`/InicioSesion`);
      return;
    }

    try {
      
      //alert(`Espacio ${espacioId} seleccionado`);
      // Actualizar estado en Firebase y localmente
      
      //console.log('Espacio seleccionado:', espacioId);
      //console.log('Feria ID:', feriaId);
      //console.log('Usuario ID:', currentUser.uid);
      await reservarEspacio(espacioId, feriaId!, currentUser.uid);
      alert('Espacio reservado exitosamente');
      
      setEspacios(espacios.map(esp => 
        esp.id === espacioId ? { ...esp, disponible: false } : esp
      ));
    } catch (error) {
      console.error("Error al reservar:", error);
      alert("Error al reservar el espacio");
    }
  };

  if (loading) {
    return (
      <main className={styles.main}>
        <h1 className={styles.title}>Cargando espacios...</h1>
      </main>
    );
  }

  if (error) {
    return (
      <main className={styles.main}>
        <h1 className={styles.title}>Error</h1>
        <p className={styles.subtitle}>{error}</p>
      </main>
    );
  }

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
              <p><strong>Dimensiones:</strong> {espacio.dimensiones}</p>
              <p><strong>Conexión eléctrica:</strong> {espacio.electricidad ? 'Sí' : 'No'}</p>
              {espacio.precio && <p><strong>Precio:</strong> ₡{espacio.precio.toLocaleString()}</p>}
              <p><strong>Anotaciones:</strong> {espacio.anotaciones}</p>
              
              <button 
                onClick={() => espacio.id && handleSeleccionar(espacio.id)}
                className={espacio.disponible ? styles.btnSeleccionar : styles.btnNoDisponible}
                disabled={!espacio.disponible}
              >
                {espacio.disponible ? 'Seleccionar espacio' : 'No disponible'}
              </button>
            </div>
          ))}
        </div>

        <div className={styles.lateral}>
          {currentUser && (
            <>
              <button className={styles.adjuntarBtn}>Adjuntar documentos</button>
              <div className={styles.documentos}>
                <p><strong>Documentos subidos</strong></p>
                <ul>
                  <li>solicitud.pdf</li>
                  <li>Permisos_sanitarios.pdf</li>
                </ul>
              </div>
            </>
          )}
          <img src="/feria.jpg" alt="Imagen feria" className={styles.imagenFeria} />
        </div>
      </div>
    </main>
  );
};

export default DetalleFeria;