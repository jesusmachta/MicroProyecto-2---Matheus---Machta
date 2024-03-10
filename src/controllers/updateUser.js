
import { collection, updateDoc, doc} from "firebase/firestore";
import {db} from '../firebase'; 
import { useUser } from "../context/user";
import { updateEmail, updateProfile } from "firebase/auth";

export function UpdateUserFunction({ id, email, favoriteGame, name }) {
    const userL = useUser(); 

    const updateUser = async () => {
      const usersCollection = collection(db, "Usuarios"); 
      await updateDoc(doc(usersCollection, id),{
          email, 
          favoriteGame, 
          name, 
      }); 

      try{
          if(email){
              await updateEmail(userL, email); 
          }

          await updateProfile(userL, {
              displayName: name 
          }); 
          console.log("Se logró actualizar con éxito en la base de datos y en el auth"); 
      }catch(error){
          console.log("No se logró actualizar con éxito: ", error); 
      }
    };

    updateUser();
  
}