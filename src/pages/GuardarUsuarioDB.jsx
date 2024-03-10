import {collection, addDoc, updateDoc} from "firebase/firestore"; 
import {db} from "../firebase"; 

export async function saveUser(user){
    try{
        console.log('flaggggg'); 
        console.log(user); 
        const userc = {
            email: user.email, 
            favoriteGame: user.favoriteGame, 
            name: user.name, 
            subscriptions: [" "], 
            lastName: " ", 
            username: " ", 
        }
        const usuariosRef = collection(db, "Usuarios"); 
        await addDoc(usuariosRef, userc); 
        // await updateDoc(usuariosRef, {subscriptions: user.subscriptions}); 
        console.log("guardado con exito"); 
    }catch(e){
        console.error('Error al guardar el usuario: ', e); 
    }
}






