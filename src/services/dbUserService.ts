import { db } from "./firebaseConfig";
import { doc, setDoc, getDoc, updateDoc, FirestoreError } from "firebase/firestore"; 
import { collection, addDoc } from "firebase/firestore";
import { UserProfile, Emprendimiento } from "../types/profileTypes";

// Define una interfaz para la estructura del usuario
interface UserData {
  nombre: string;
  apellido: string;
  cedula: string;
  email: string;
  rol: string; // Default value can be assigned when creating the object
  // Puedes añadir más campos según necesites
  // createdAt?: Date;
  // updatedAt?: Date;
}

export const defaultUserData: Partial<UserData> = {
  rol: "user", // Default value for rol
};

export async function saveUser(userId: string, userData: UserData): Promise<void> {
  try {
    const userRef = doc(db, "users", userId);
    await setDoc(userRef, userData);
    console.log("User created successfully:", userId);
  } catch (error: unknown) {
    console.error("Error creating user:", error);
    
    // Manejo de errores más tipo-safe
    if (error instanceof FirestoreError) {
      throw new Error(`Firestore error: ${error.code} - ${error.message}`);
    }
    throw new Error("Unknown error occurred while saving user");
  }
}

export async function saveNegocioData(businessData: {
  nombreNegocio: string;
  fechaCreacion: string;
  descripcion: string;
  sector: string;
  userId: string;
}): Promise<string> {
  try {
    const negociosCollectionRef = collection(db, "negocios");
    const docRef = await addDoc(negociosCollectionRef, businessData);
    console.log("Business data saved successfully with ID:", docRef.id);
    return docRef.id; // Return the generated document ID
  } catch (error: unknown) {
    console.error("Error saving business data:", error);
    if (error instanceof FirestoreError) {
      throw new Error(`Firestore error: ${error.code} - ${error.message}`);
    }
    throw new Error("Unknown error occurred while saving business data");
  }
}


export async function getUser(userId: string): Promise<{ user: UserProfile; emprendimiento: Emprendimiento } | null> {
  try {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();

      // Asegurémonos de que los datos coinciden con las interfaces
      const user: UserProfile = {
        nombre: userData.nombre,
        apellido: userData.apellidos,
        departamento: userData.departamento,
        email: userData.email,
        cedula: userData.cedula,
        fotoPerfil: userData.fotoPerfil || undefined,
      };

      const emprendimiento: Emprendimiento = {
        nombre: userData.emprendimiento?.nombre || '',
        descripcion: userData.emprendimiento?.descripcion || '',
        categoria: userData.emprendimiento?.categoria || '',
        fechaCreacion: userData.emprendimiento?.fechaCreacion || '',
      };

      return { user, emprendimiento };
    } else {
      console.log("No such user!");
      return null;
    }
  } catch (error) {
    console.error("Error getting user:", error);
    throw new Error("Unknown error occurred while getting user");
  }
}

export async function verifyUserPrivileges(userId: string): Promise<boolean> {
  try {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const userData = userDoc.data() as UserData;
      return userData.rol === "admin"; // Cambia esto según tu lógica de privilegios
    } else {
      console.log("No such user!");
      return false;
    }
  } catch (error: unknown) {
    console.error("Error verifying user privileges:", error);
    
    // Manejo de errores más tipo-safe
    if (error instanceof FirestoreError) {
      throw new Error(`Firestore error: ${error.code} - ${error.message}`);
    }
    throw new Error("Unknown error occurred while verifying user privileges");
  }
}