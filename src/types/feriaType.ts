export interface Feria {
    id?: string; // Opcional porque Firebase lo añade automáticamente
    titulo: string;
    descripcion: string;
    fecha: string; // O podrías usar Date si prefieres
    horario: string;
    ubicacion: string;
    requisitos: string;
    // Puedes añadir más campos si necesitas
    imagenURL?: string;
    estado?: 'activa' | 'finalizada' | 'proximamente';
  }