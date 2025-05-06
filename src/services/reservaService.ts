import { doc, updateDoc, arrayUnion, collection, addDoc, query, where, getDocs, getDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';
import { Reserva, ReservaConInfoExtra } from '../types/reservaType';



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
export const getReservasPorFeriaConInfo = async (feriaId: string): Promise<ReservaConInfoExtra[]> => {
  try {
    const reservasCollection = collection(db, 'reservas');
    const q = query(reservasCollection, where('feriaId', '==', feriaId));
    const querySnapshot = await getDocs(q);

    const reservas: ReservaConInfoExtra[] = [];

    // Iterar sobre las reservas y obtener información adicional
    for (const docSnapshot of querySnapshot.docs) {
      const data = docSnapshot.data();
      const reserva: ReservaConInfoExtra = {
        id: docSnapshot.id,
        feriaId: data.feriaId,
        espacioId: data.espacioId,
        userId: data.userId,
        estado: data.estado,
        fechaReserva: data.fechaReserva.toDate ? data.fechaReserva.toDate() : data.fechaReserva,
        documentosId: data.documentosId || [],
        fechaAprobacion: data.fechaAprobacion ? data.fechaAprobacion.toDate() : undefined,
      };

      // Obtener el nombre del emprendedor
      const userRef = doc(db, 'users', data.userId); // Suponiendo que tienes la colección de usuarios
      const userSnapshot = await getDoc(userRef);

      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        reserva.nombreEmprendedor = userData.nombre + ' ' + userData.apellido;
      }

      // Obtener el nombre del emprendimiento desde la colección 'negocios' filtrando por userId
      const negocioRef = collection(db, 'negocios');
      const negocioQuery = query(negocioRef, where('userId', '==', data.userId));
      const negocioSnapshot = await getDocs(negocioQuery);

      console.log("Buscando negocio para userId:", data.userId); 
      if (!negocioSnapshot.empty) {
        // Asumimos que solo hay un negocio por userId
        const negocioData = negocioSnapshot.docs[0].data();

        reserva.nombreEmprendimiento = negocioData.nombreNegocio || 'Nombre no disponible';
        reserva.descripcionEmprendimiento = negocioData.descripcion || 'Descripción no disponible';
      } else {
        reserva.nombreEmprendimiento = 'Nombre no disponible'; // En caso de no encontrar un negocio
      }

      reservas.push(reserva);
    }

    return reservas;
  } catch (error) {
    console.error('Error al obtener reservas con información extra:', error);
    throw new Error('No se pudieron cargar las reservas con la información adicional');
  }
};

export const actualizarEstadoReserva = async (reservaId: string, nuevoEstado: 'aprobada' | 'rechazada'): Promise<void> => {
  try {
    const reservaRef = doc(db, 'reservas', reservaId);
    await updateDoc(reservaRef, {
      estado: nuevoEstado
      });
  } catch (error) {
    console.error('Error al actualizar el estado de la reserva:', error);
    throw new Error('No se pudo actualizar el estado de la reserva');
  }
};