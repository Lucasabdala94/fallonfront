import { updateProfile} from "firebase/auth"
import { auth } from "../../firebase";




export default async function actualizarUsername(DatoResetUsername, setError) {
    
    setError("");
    await updateProfile(auth.currentUser, { displayName:`${DatoResetUsername}`,}).then(() => {
        setError("Nombre de usuario actualizado")
    }).catch((error) => {

        if (error.code === "auth/requires-recent-login") {
            setError("Para poder cambiar debe haber inicia sesión recientemente")
        }
        if (error.code === "auth/invalid-email") {
            setError("El correo debe tener un formato válido")
        }
        if (error.code === "auth/email-already-in-use") {
            setError("El correo electronico ingresado ya se encuentra registrado")
        }
        if (error.code === "auth/user-not-found") {
            setError("correo o contraseña incorrectos")
        }
        if (error.code === "auth/network-request-failed") {
            setError("No tienes acceso a internet")
        }
        if (error.message === "Firebase: Error (auth/unauthorized-domain).") {
            setError("No tiene acceso desde este dominio.")
        }
    });


}