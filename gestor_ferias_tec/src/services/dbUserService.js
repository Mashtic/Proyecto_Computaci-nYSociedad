import { db }  from "./firebaseConfig.js"
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore"; 

export async function saveUser(userId, userData) {
    try {
        const userRef = doc(db, "users", userId);
        await setDoc(userRef, userData);
        console.log("User created successfully:", userId);
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
}