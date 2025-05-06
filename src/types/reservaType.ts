export interface Reserva {
    id: string;
    feriaId: string;
    espacioId: string;
    userId: string;
    estado: 'pendiente' | 'aprobada' | 'rechazada' | 'cancelada';
    fechaReserva: Date;
    documentosId?: string[];
    fechaAprobacion?: Date;
  }

  export interface ReservaConInfoExtra extends Reserva {
    nombreEmprendimiento?: string;
    nombreEmprendedor?: string;
    descripcionEmprendimiento?: string;
  }