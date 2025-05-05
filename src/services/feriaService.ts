// services/feriaService.ts
import { collection, getDocs, doc, getDoc, FirestoreError } from 'firebase/firestore';
import { Feria } from '../types/feriaType'; // Asegúrate de que la ruta sea correcta
import { db } from '../services/firebaseConfig'; // Asegúrate de que la ruta sea correcta

/**
 * Obtiene todas las ferias disponibles
 * @returns Promise<Feria[]> - Lista de ferias
 */
export const getFerias = async (): Promise<Feria[]> => {
  try {
    const feriasCollection = collection(db, 'ferias');
    const feriasSnapshot = await getDocs(feriasCollection);
    
    return feriasSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Feria));
  } catch (error: unknown) {
    if (error instanceof FirestoreError) {
      console.error('Error de Firestore:', error.code, error.message);
      throw new Error(`Error al obtener ferias: ${error.message}`);
    }
    throw new Error('Error desconocido al obtener ferias');
  }
};

/**
 * Obtiene una feria específica por su ID
 * @param feriaId - ID del documento de la feria
 * @returns Promise<Feria | null> - Datos de la feria o null si no existe
 */
export const getFeriaById = async (feriaId: string): Promise<Feria | null> => {
  try {
    const feriaDoc = doc(db, 'ferias', feriaId);
    const feriaSnapshot = await getDoc(feriaDoc);
    
    if (feriaSnapshot.exists()) {
      return {
        id: feriaSnapshot.id,
        ...feriaSnapshot.data()
      } as Feria;
    }
    return null;
  } catch (error: unknown) {
    if (error instanceof FirestoreError) {
      console.error('Error de Firestore:', error.code, error.message);
      throw new Error(`Error al obtener la feria: ${error.message}`);
    }
    throw new Error('Error desconocido al obtener la feria');
  }
};