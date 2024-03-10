import { collection, updateDoc, doc, arrayUnion, arrayRemove} from "firebase/firestore";
import {db} from '../firebase'; 
import { getClub } from "./clubes";

export async function addSubscriptionFunction(idUser, nameClub){
    const clubes = await getClub(); 
    console.log("clubes de funcion de jesus"); 
    console.log(clubes); 
    const usersCollection = collection(db, "Usuarios"); 
    console.log("nombre del club a buscar: "); 
    console.log(nameClub); 

    try{
        console.log("entro 1 try"); 
        let club = null; 
        for(let i = 0; i<(clubes).length; i++){
            console.log("entro al for"); 
            if(clubes[i].nombre === nameClub){
                console.log("iteracion: ", i); 
                club = {id: clubes[i].id, nombre: clubes[i].nombre}; 
                break; 
            }
        }
        await updateDoc(doc(usersCollection, idUser),{
            subscriptions: arrayUnion(club)
        }); 
        console.log("Se logró suscribir al usuario!"); 
    }catch(error){
        console.log("No se logro suscribir al usuario"); 
    }
}

export async function removeSubscriptionFunction(idUser, nameClub){
    const clubes = await getClub(); 
    let club = null; 
    for(let i = 0; i<(clubes).length; i++){
        if(clubes[i].nombre === nameClub){
            club = {id: clubes[i].id, nombre: clubes[i].nombre}; 
            break; 
        }
    }
    try{
        const usersCollection = collection(db, "Usuarios"); 
        await updateDoc(doc(usersCollection, idUser),{
            subscriptions: arrayRemove(club)
        }); 
        console.log("Se logró desuscribir al usuario!"); 
    }catch(error){
        console.log("No se logro desuscribir al usuario"); 
    }
}