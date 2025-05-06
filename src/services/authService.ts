import { auth } from "./firebaseConfig";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  UserCredential, 
  User 
} from "firebase/auth";
import { saveUser, saveNegocioData, defaultUserData } from "./dbUserService";

// Definimos una interfaz para los datos del usuario y los del negocio
interface UserData {
  email: string;
  password: string;
  nombre: string;
  apellidos: string;
  cedula: string;
  rol: string;
  // Datos del negocio
  nombreNegocio: string;
  fechaCreacion: string;
  descripcion: string;
  sector: string;
  userId?: string; // Opcional, se asigna después de crear el usuario
}

export async function signUp(userData: UserData): Promise<User | null> {
  try {
    if (auth === null) {
      console.error("Firebase auth is not initialized.");
      return null;
    }

    const { 
      email, password, nombre, apellidos: apellido, cedula, rol: inputRol, 
      nombreNegocio, fechaCreacion, descripcion, sector 
    } = userData;

    const rol = inputRol || 'user';

    console.log("Rol:", rol);

    // Crear el usuario en Firebase Auth
    const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);

    // Una vez creado el usuario, se guarda en la base de datos
    const userId = userCredential.user.uid;
    
    // Guardar los datos del usuario en Firestore
    await saveUser(userId, {
      nombre,
      apellido,
      cedula,
      email,
      rol
    });

    // Guardar los datos del negocio en Firestore
    await saveNegocioData({
      nombreNegocio,
      fechaCreacion,
      descripcion,
      sector,
      userId
    });

    return userCredential.user;
  } catch (error: unknown) {
    console.error("Error signing up:", error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Unknown error occurred during sign up");
  }
}


export async function signIn(email: string, password: string): Promise<User> {
  try {
    const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: unknown) {
    console.error("Error signing in:", error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Unknown error occurred during sign in");
  }
}

export async function signOut(): Promise<void> {
  try {
    await auth.signOut();
  } catch (error: unknown) {
    console.error("Error signing out:", error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Unknown error occurred during sign out");
  }
}