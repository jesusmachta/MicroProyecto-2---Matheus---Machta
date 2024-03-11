import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

export async function saveUser(user) {
  try {
    console.log("flaggggg");
    console.log(user);
    const userc = {
      email: user.email,
      favoriteGame: user.favoriteGame,
      name: user.name,
      subscriptions: user.subscriptions,
      lastName: user.lastname,
      username: user.username,
    };
    const usuariosRef = collection(db, "Usuarios");
    await addDoc(usuariosRef, userc);
    // await updateDoc(usuariosRef, {subscriptions: user.subscriptions});
    console.log("guardado con exito");
  } catch (e) {
    console.error("Error al guardar el usuario: ", e);
  }
}
