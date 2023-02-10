import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../firebase";

export default async function registerService(dataRegiste, setError,navigate) {
    const { email, password } = dataRegiste;
    setError("");
    try {
        await createUserWithEmailAndPassword(auth, email, password)
        navigate('/');
    } catch (error) {
        if (error.code === "auth/weak-password") {
            setError("La contraseña debe contener mas de 6 caracteres")
        }
        if (error.code === "auth/internal-error") {
            setError("La contraseña debe contener mas de 6 caracteres")
        }
        if (error.code === "auth/missing-email") {
            setError("Debe ingresar un correo")
        }
        if (error.code === "auth/invalid-email") {
            setError("El correo debe tener un formato válido")
        }
        if (error.code === "auth/email-already-in-use") {
            setError("El correo electronico ingresado ya se encuentra registrado")
        }
        if (error.code === "auth/network-request-failed") {
            setError("No tienes acceso a internet")
        }

    }
}