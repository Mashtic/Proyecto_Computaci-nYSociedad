import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getReservasPorFeriaConInfo } from '../services/reservaService';
import CardOferta from '../components/TarjetaSolicitud';
import { ReservaConInfoExtra } from '../types/reservaType';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminSolicitudesPendientes = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const feriaId = queryParams.get('feriaId');

    const [reservas, setReservas] = useState<ReservaConInfoExtra[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchReservas = async () => {
            try {
                if (feriaId) {
                    const reservasData = await getReservasPorFeriaConInfo(feriaId);
                    setReservas(reservasData.filter(r => r.estado === 'pendiente')); // Filtrar una sola vez aquí
                }
            } catch (err) {
                setError('Error al cargar las reservas');
            } finally {
                setLoading(false);
            }
        };

        fetchReservas();
    }, [feriaId]);

    const handleEstadoActualizado = (reservaId: string, nuevoEstado: string) => {
        setReservas(prev => prev.filter(reserva => reserva.id !== reservaId));

        toast.success(`Reserva ${nuevoEstado === 'aceptada' ? 'aceptada' : 'rechazada'} correctamente`, {
            position: "top-right",
            autoClose: 3000,
        });
    };

    if (loading) return <p>Cargando reservas...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div style={{ color: 'black' }}>
            <h2>Solicitudes Pendientes</h2>
            <ToastContainer />
            {reservas.length === 0 ? (
                <p>No hay reservas pendientes para esta feria.</p>
            ) : (
                reservas.map(reserva => (
                    <CardOferta
                        key={reserva.id}
                        reservaId={reserva.id}
                        nombreEmprendedor={reserva.nombreEmprendedor || 'Desconocido'}
                        nombreEmprendimiento={reserva.nombreEmprendimiento || `Espacio ${reserva.espacioId}`}
                        descripcion={reserva.descripcionEmprendimiento || 'Descripción no disponible'}
                        haParticipado={false}
                        onEstadoActualizado={(id, estado) => handleEstadoActualizado(id, estado)}
                    />
                ))
            )}
        </div>
    );
};

export default AdminSolicitudesPendientes;
