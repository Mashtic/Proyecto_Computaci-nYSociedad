import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './firebaseConfig';
import { Espacio } from '../types/espacioTypes';

export const getEspaciosPorFeria = async (feriaId: string): Promise<Espacio[]> => {
  try {
    const q = query(
      collection(db, "espacios"),
      where("feriaId", "==", feriaId)
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Espacio));
  } catch (error) {
    console.error("Error al obtener espacios:", error);
    throw new Error("No se pudieron cargar los espacios");
  }
};