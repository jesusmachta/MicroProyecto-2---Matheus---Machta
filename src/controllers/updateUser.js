
import { collection, updateDoc, doc} from "firebase/firestore";
import {db} from '../firebase'; 
// import { useUser } from "../context/user";
import { updateEmail, updateProfile } from "firebase/auth";

export async function UpdateUserFunction({ id, email, favoriteGame, name, password, userL, favoriteGameRef, emailRef, nameRef, passwordRef }) {


      const usersCollection = collection(db, "Usuarios"); 
      console.log("Dentro de la funcion"); 
      console.log(favoriteGame); 
      if(favoriteGameRef !== null){
        favoriteGame = favoriteGameRef; 
      }

      if(emailRef !== null){
        email = emailRef; 
      }

      if(nameRef !== null){
        name = nameRef; 
      }

      if(passwordRef !== null){
        password = passwordRef; 
      }
      await updateDoc(doc(usersCollection, id),{
          email, 
          favoriteGame, 
          name, 
          password, 
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
    

 
  
}


// nameRef, emailRef, passwordRef, favoriteGameRef
// export async function UpdateUserFunction2({ id, email, favoriteGame, name, nameRef, emailRef, passwordRef, favoriteGameRef }) {
//     const userL = useUser(); 

//     if(nameRef !=""){
//         name = nameRef; 
//     }
//     if(emailRef !=""){
//         email = emailRef; 
//     }

//     if(passwordRef !=""){
//         password = passwordRef; 
//     }

//     if(favoriteGameRefef !=""){
//         favoriteGame = favoriteGameRef; 
//     }


//       const usersCollection = collection(db, "Usuarios"); 
//       await updateDoc(doc(usersCollection, id),{
//           email, 
//           favoriteGame, 
//           name, 
//       }); 

//       try{
//           if(email){
//               await updateEmail(userL, email); 
//           }

//           await updateProfile(userL, {
//               displayName: name 
//           }); 
//           console.log("Se logró actualizar con éxito en la base de datos y en el auth"); 
//       }catch(error){
//           console.log("No se logró actualizar con éxito: ", error); 
//       }
    

//     updateUser();
  
// }