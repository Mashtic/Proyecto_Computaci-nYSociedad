import { db } from "./firebaseConfig";
import { doc, setDoc, getDoc, updateDoc, FirestoreError } from "firebase/firestore"; 

// Define una interfaz para la estructura del usuario
interface UserData {
  nombre: string;
  apellido: string;
  cedula: string;
  email: string;
  rol: string;
  // Puedes añadir más campos según necesites
  // createdAt?: Date;
  // updatedAt?: Date;
}

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

export async function getUser(userId: string): Promise<UserData | null> {
  try {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      return userDoc.data() as UserData;
    } else {
      console.log("No such user!");
      return null;
    }
  } catch (error: unknown) {
    console.error("Error getting user:", error);
    
    // Manejo de errores más tipo-safe
    if (error instanceof FirestoreError) {
      throw new Error(`Firestore error: ${error.code} - ${error.message}`);
    }
    throw new Error("Unknown error occurred while getting user");
  }
}