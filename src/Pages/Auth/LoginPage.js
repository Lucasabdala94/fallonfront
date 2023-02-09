import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";


export default function LoginPage() {

    const { login, resetPassword } = useAuth();
    const navigate = useNavigate();

    const [error, setError] = useState()
    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {

            await login(user.email, user.password);
            navigate('/home');
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

    //registra cambios en formularios
    const handleChange = ({ target: { name, value } }) => {
        setUser({ ...user, [name]: value })
    }


    const handleResetPassword = async (e) => {
        e.preventDefault()
        if (!user.email) return setError("Ingresá el correo que desea  cambiar contraseña");

        await resetPassword(user.email, setError)
    }

    return (
        <div>
            <h1>Login</h1>
            {error && <p>{error}</p>}
            <picture>
                <img alt="Logo fallon" src=""></img>
            </picture>
            <form onSubmit={handleSubmit} >
                <input onChange={handleChange} type="text" name="email"></input>
                <input onChange={handleChange} type="password" name="password"></input>
                <button >Login</button>
            </form>
            <button onClick={handleResetPassword}>Olvidaste tu contraseña???.....</button>
        </div>
    )
}