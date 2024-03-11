
import { collection, updateDoc, doc} from "firebase/firestore";
import {db} from '../firebase'; 
// import { useUser } from "../context/user";
import { updateEmail, updateProfile, sendEmailVerification } from "firebase/auth";
import Swal from 'sweetalert2'; 

export async function UpdateUserFunction({ id, email, favoriteGame, name,  userL, favoriteGameRef, emailRef, nameRef }) {

  const mostrarAlert =(text, icon, title) =>{
    // Swal.fire('Registrado con éxito!', 'success'); 
    Swal.fire({
      icon: icon, 
      title: title,
      text: text,
      showCancelButton: false,
      showCloseButton: true,
      showConfirmButton: false
    });
  }

      const usersCollection = collection(db, "Usuarios"); 
      console.log("Dentro de la funcion"); 
      console.log(favoriteGame); 
      if(favoriteGameRef !== null){
        favoriteGame = favoriteGameRef; 
        console.log(favoriteGame); 
      }

      if(emailRef !== null && emailRef.length >0 ){
        email = emailRef; 
        
      }

      if(nameRef !== null && nameRef.length > 0){
        name = nameRef; 
        console.log(name); 
      }

    
      await updateDoc(doc(usersCollection, id),{
          email, 
          favoriteGame, 
          name, 
           
      }); 
      window.location.reload(); 
      console.log("Se logro cambiar los datos en la base de datos");
      mostrarAlert("Se cambiaron sus datos exitosamente", 'success', 'Cambio de datos exitoso'); 


     
    

 
  
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