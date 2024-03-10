
import { collection, updateDoc, doc, arrayUnion} from "firebase/firestore";
import {db} from '../firebase'; 
import { getClub } from "./clubes";



export async function addSubscriptionFunction(idUser, nameClub){
    const clubes = getClub(); 
    console.log("clubes de funcion de jesus"); 
    console.log(clubes); 
    const usersCollection = collection(db, "Usuarios"); 
    console.log("nombre del club a buscar: "); 
    console.log(nameClub); 



   
    try{
        console.log("entro 1 try"); 
        let id = ""; 
        for(let i = 0; i<(clubes).length; i++){
            console.log("entro al for"); 
            if(clubes[i].nombre === nameClub){
                console.log("iteracion: ", i); 
                id = (clubes[i].id); 
                break; 
            }
           
        }
        await updateDoc(doc(usersCollection, idUser),{
            subscriptions: arrayUnion(id)

        }); 
        console.log("Se logró suscribir al usuario!"); 
    }catch(error){
        console.log("No se logro suscribir al usuario"); 
    }
    



}