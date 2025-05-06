// services/reservaService.ts
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from './firebaseConfig';

export const reservarEspacio = async (
  espacioId: string,
  feriaId: string,
  userId: string
) => {
  try {
    const espacioRef = doc(db, "espacios", espacioId);
    
    await updateDoc(espacioRef, {
      disponible: false,
      reservadoPor: userId,
      fechaReserva: new Date()
    });

    // También actualizar la feria para llevar registro
    const feriaRef = doc(db, "ferias", feriaId);
    await updateDoc(feriaRef, {
      reservas: arrayUnion({
        espacioId,
        userId,
        fecha: new Date()
      })
    });
  } catch (error) {
    console.error("Error al reservar:", error);
    throw error;
  }
};