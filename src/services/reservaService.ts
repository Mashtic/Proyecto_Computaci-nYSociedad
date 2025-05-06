import { doc, updateDoc, arrayUnion, collection, addDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';

interface Reserva {
  feriaId: string;
  espacioId: string;
  userId: string;
  estado: 'pendiente' | 'aprobada' | 'rechazada' | 'cancelada';
  fechaReserva: Date;
  documentosId?: string[];
  fechaAprobacion?: Date;
}

export const reservarEspacio = async (
  espacioId: string,
  feriaId: string,
  userId: string,
  documentosId?: string[]
): Promise<void> => {
  try {
    // 1. Crear documento en colección de reservas
    const reservasCollection = collection(db, "reservas");
    const nuevaReserva: Omit<Reserva, 'id'> = {
      feriaId,
      espacioId,
      userId,
      estado: 'pendiente',
      fechaReserva: new Date()
    };

    const reservaRef = await addDoc(reservasCollection, nuevaReserva);

    // 2. Actualizar el espacio como no disponible
    const espacioRef = doc(db, "espacios", espacioId);
    await updateDoc(espacioRef, {
      disponible: false
    });

    // 3. Actualizar la feria con referencia a la reserva
    const feriaRef = doc(db, "ferias", feriaId);
    await updateDoc(feriaRef, {
      reservas: arrayUnion(reservaRef.id),
      ultimaActualizacion: new Date()
    });

  } catch (error) {
    console.error("Error en el proceso de reserva:", error);
    throw new Error("No se pudo completar la reserva. Por favor intente nuevamente.");
  }
};

// Función para subir documentos (opcional)
export const subirDocumentosReserva = async (
  reservaId: string,
  documentos: File[]
): Promise<string[]> => {
  const documentosId: string[] = [];
  
  // Implementación para subir documentos a Firebase Storage
  // y obtener sus IDs de referencia
  
  return documentosId;
};