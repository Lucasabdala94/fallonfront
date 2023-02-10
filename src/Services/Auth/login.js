import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";


export default async function loginService(DatoLogin,setError,navigate) {
    
    setError("");
    try {
        await signInWithEmailAndPassword(auth, DatoLogin.email, DatoLogin.password)
        navigate("/home")
    } catch (error) {

        if (error.code === "auth/wrong-password") {
            setError("correo o contraseña incorrectos")
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
    }
}