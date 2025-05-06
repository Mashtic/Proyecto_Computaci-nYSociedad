import { doc, updateDoc, arrayUnion, collection, addDoc, query, where, getDocs } from 'firebase/firestore';
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

// Funcion para obtener reservas por feria
export const getReservasPorFeria = async (feriaId: string): Promise<Reserva[]> => {
  try {
    const reservasCollection = collection(db, "reservas");
    const q = query(reservasCollection, where("feriaId", "==", feriaId));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        feriaId: data.feriaId,
        espacioId: data.espacioId,
        userId: data.userId,
        estado: data.estado,
        fechaReserva: data.fechaReserva.toDate ? data.fechaReserva.toDate() : data.fechaReserva,
        documentosId: data.documentosId || [],
        fechaAprobacion: data.fechaAprobacion ? data.fechaAprobacion.toDate() : undefined
      } as Reserva;
    });
  } catch (error) {
    console.error("Error al obtener reservas:", error);
    throw new Error("No se pudieron cargar las reservas");
  }
};