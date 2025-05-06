export interface Espacio {
    id?: string; // ID de Firestore (automático)
    feriaId: string; // Referencia a la feria
    nombre: string;
    disponible: boolean;
    dimensiones: string; // Cambiamos 'tamano' por 'dimensiones'
    electricidad: boolean; // Cambiamos 'electrico' por 'electricidad'
    anotaciones: string;
    precio?: number; // Nuevo campo opcional
    tipo?: 'stand' | 'mesa' | 'area'; // Nuevo campo opcional
  }