import { auth } from "./firebaseConfig";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { saveUser } from "./dbUserService";

export async function signUp(userData) {
  try {

    if (auth === null) {
      console.error("Firebase auth is not initialized.");
      return null;
    }

    const { email, password, nombre, apellido, cedula, rol } = userData;
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    //Una vez creado el usuario, se guarda en la base de datos
    await saveUser(userCredential.user.uid, {
      nombre,
      apellido,
      cedula,
      email,
      rol
    });

    const user = userCredential.user;
    return user;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
}

export async function signIn(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        return user;
    } catch (error) {
        console.error("Error signing in:", error);
        throw error;
    }
}