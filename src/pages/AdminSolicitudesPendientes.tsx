import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getReservasPorFeriaConInfo } from '../services/reservaService';
import CardOferta from '../components/TarjetaSolicitud';
import { ReservaConInfoExtra } from '../types/reservaType'; // Asegúrate de importar el tipo adecuado

const AdminSolicitudesPendientes = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const feriaId = queryParams.get('feriaId');

  const [reservas, setReservas] = useState<ReservaConInfoExtra[]>([]); // Usar el tipo con información extra
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        if (feriaId) {
          const reservasData = await getReservasPorFeriaConInfo(feriaId);
          setReservas(reservasData);
        }
      } catch (err) {
        setError('Error al cargar las reservas');
      } finally {
        setLoading(false);
      }
    };

    fetchReservas();
  }, [feriaId]);

  if (loading) return <p>Cargando reservas...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Solicitudes Pendientes</h2>
      {reservas.length === 0 ? (
        <p>No hay reservas pendientes para esta feria.</p>
      ) : (
        reservas
          .filter((reserva) => reserva.estado === 'pendiente')
          .map((reserva) => (
            //console.log(reserva), 
            <CardOferta
              key={reserva.id}
              nombreEmprendedor={reserva.nombreEmprendedor || 'Desconocido'} 
              nombreEmprendimiento={reserva.nombreEmprendimiento || `Espacio ${reserva.espacioId}`} 
              descripcion={reserva.descripcionEmprendimiento || 'Descripción no disponible'} 
              haParticipado={false} 
            />
          ))
      )}
    </div>
  );
};

export default AdminSolicitudesPendientes;
