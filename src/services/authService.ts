import { auth } from "./firebaseConfig";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  UserCredential,
  User
} from "firebase/auth";
import { saveUser } from "./dbUserService";

// Definimos una interfaz para los datos del usuario
interface UserData {
  email: string;
  password: string;
  nombre: string;
  apellido: string;
  cedula: string;
  rol: string;
}

export async function signUp(userData: UserData): Promise<User | null> {
  try {
    if (auth === null) {
      console.error("Firebase auth is not initialized.");
      return null;
    }

    const { email, password, nombre, apellido, cedula, rol } = userData;
    const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);

    // Una vez creado el usuario, se guarda en la base de datos
    await saveUser(userCredential.user.uid, {
      nombre,
      apellido,
      cedula,
      email,
      rol
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
