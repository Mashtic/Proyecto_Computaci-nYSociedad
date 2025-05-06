//import React from 'react';
import CardOferta from '../components/TarjetaSolicitud';

const AdminSolicitudesPendientes = () => {
    return (
        <div>
            <CardOferta
            nombreEmprendedor="Ana Ramírez"
            nombreEmprendimiento="Caldosas picantes"
            descripcion="Venta de caldosas"
            haParticipado={true}
            />

        </div>
    );
};

export default AdminSolicitudesPendientes;