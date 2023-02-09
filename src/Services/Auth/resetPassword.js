import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";

export default function resetPasswordService(email,setError) {
    sendPasswordResetEmail(auth, email)
        .then(() => {
            setError("se envio un correo para realizar el cambio de contraseña")
        })
        .catch((error) => {

            if (error.code === "auth/user-not-found") {
                setError("El correo no pertenece a un usuario")
            }
            if (error.code === "auth/network-request-failed") {
                setError("No tienes acceso a internet")
            }
            if (error.code === "auth/invalid-email") {
                setError("El correo no tiene un formato valido")
            }
            if (error.code === "auth/quota-exceeded") {
                setError("Informar a dueño de lsitio web")
            }
            if (error.code === "auth/too-many-requests") {
                setError("Realizo muchos pedidos de cambio de contraseña")
            }
            if (error.message === "Firebase: Error (auth/unauthorized-domain).") {
                setError("No tiene acceso desde este dominio.")
            }
            // ..
        });
}



